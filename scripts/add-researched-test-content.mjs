import { createClient } from '@sanity/client';
import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { overviews } from './researched-test-overviews.mjs';

const apply = process.argv.includes('--apply');
if (apply && !process.env.SANITY_WRITE_TOKEN) throw new Error('SANITY_WRITE_TOKEN is required for --apply');
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION,
  token: apply ? process.env.SANITY_WRITE_TOKEN : undefined,
  useCdn: false,
});
const docs = await client.fetch('*[_type == "labTest"]{_id,_rev,name,"slug":slug.current,"overview":coalesce(introSection.overview,overview),"overviewSource":coalesce(introSection.overviewSource,overviewSource)}');
const bySlug = new Map(docs.map(doc => [doc.slug, doc]));
const missing = Object.keys(overviews).filter(slug => !bySlug.has(slug));
if (missing.length) throw new Error(`Missing Sanity tests: ${missing.join(', ')}`);
const neutral = 'Contact Forte Clinical Laboratory for panel details, sample requirements, and turnaround time.';
const changes = Object.entries(overviews).flatMap(([slug, [overview, overviewSource]]) => {
  const doc = bySlug.get(slug);
  if (doc.overview && doc.overview !== neutral && doc.overview !== overview) return [];
  if (doc.overview === overview && doc.overviewSource === overviewSource) return [];
  return [{ doc, overview, overviewSource }];
});
console.log(JSON.stringify({researched: Object.keys(overviews).length, toUpdate: changes.length, skippedExisting: Object.keys(overviews).length - changes.length, slugs: changes.map(change => change.doc.slug)}, null, 2));
if (!apply) {
  console.log('Dry run. Pass --apply to write missing overviews and replace only the four neutral panel placeholders.');
  process.exit(0);
}
const backupDirectory = join(process.cwd(), 'scripts', 'backups');
mkdirSync(backupDirectory, { recursive: true });
const backupPath = join(backupDirectory, `researched-content-${new Date().toISOString().replace(/[:.]/g, '-')}.json`);
writeFileSync(backupPath, JSON.stringify(changes.map(change => change.doc), null, 2));
console.log(`Backup: ${backupPath}`);
let updated = 0;
for (const change of changes) {
  try {
    await client.patch(change.doc._id).ifRevisionId(change.doc._rev).set({'introSection.overview': change.overview, 'introSection.overviewSource': change.overviewSource}).commit();
    updated++;
  } catch (error) {
    console.error(`Failed ${change.doc.slug}: ${error.message}`);
    process.exitCode = 1;
  }
}
console.log(JSON.stringify({updated, attempted: changes.length}));
