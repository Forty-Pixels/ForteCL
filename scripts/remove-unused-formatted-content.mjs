import { createClient } from '@sanity/client';
import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const apply = process.argv.includes('--apply');
if (apply && !process.env.SANITY_WRITE_TOKEN) throw new Error('SANITY_WRITE_TOKEN is required for --apply');
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION,
  token: apply ? process.env.SANITY_WRITE_TOKEN : undefined,
  useCdn: false,
});
const docs = await client.fetch('*[_type == "labTest" && defined(additionalInfoSection.content)]{_id,_rev,name,"slug":slug.current,"content":additionalInfoSection.content}');
console.log(JSON.stringify({withFormattedContent: docs.length, tests: docs.map(doc => ({slug: doc.slug, blocks: doc.content?.length || 0}))}, null, 2));
if (!apply) process.exit(0);
const expectedSlug = '17-oh-progesterone';
if (docs.some(doc => doc.slug !== expectedSlug)) throw new Error('Unexpected test content found; review before removing.');
const backupDirectory = join(process.cwd(), 'scripts', 'backups');
mkdirSync(backupDirectory, {recursive: true});
const path = join(backupDirectory, `removed-formatted-content-${new Date().toISOString().replace(/[:.]/g, '-')}.json`);
writeFileSync(path, JSON.stringify(docs, null, 2));
console.log(`Backup: ${path}`);
for (const doc of docs) {
  await client.patch(doc._id).ifRevisionId(doc._rev).unset(['additionalInfoSection.content']).commit();
}
console.log(JSON.stringify({removed: docs.length}));
