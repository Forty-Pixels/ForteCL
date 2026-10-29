import { createClient } from '@sanity/client';
import { readFileSync } from 'node:fs';

const backupPath = process.argv[2];
if (!backupPath) throw new Error('Pass the section-migration backup JSON path.');
const before = JSON.parse(readFileSync(backupPath, 'utf8'));
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION,
  useCdn: false,
});
const after = await client.fetch('*[_type == "labTest" && slug.current != "std19"]');
const byId = new Map(after.map(doc => [doc._id, doc]));
const same = (a, b) => JSON.stringify(a ?? null) === JSON.stringify(b ?? null);
const issues = [];
for (const old of before) {
  const doc = byId.get(old._id);
  const slug = old.slug?.current;
  if (!doc) { issues.push(`${slug}: missing document`); continue; }
  const checks = [
    ['hero image', doc.heroSection?.image, old.image],
    ['hero highlights', doc.heroSection?.highlights, old.keyServices || []],
    ['turnaround', doc.resultSection?.tat, old.tat],
    ['sample', doc.resultSection?.sampleType, old.sampleType],
    ['overview', doc.introSection?.overview, old.overview],
    ['overview source', doc.introSection?.overviewSource, old.overviewSource],
    ['introduction image', doc.introSection?.image, old.introImage],
    ['second introduction image', doc.introSection?.secondaryImage, old.secondaryImage],
    ['additional sections', doc.additionalInfoSection?.sections, old.subSections],
    ['consider list', doc.considerSection?.items, old.commonTests],
    ['consider image', doc.considerSection?.image, old.contextImage],
    ['accuracy', doc.accuracySection?.note, old.accuracyNote],
    ['panels', doc.panelsSection?.items, old.packages],
    ['FAQs', doc.faqSection?.items, old.faqs],
    ['CTA image', doc.ctaSection?.image, old.ctaImage],
  ];
  for (const [label, actual, expected] of checks) if (!same(actual, expected)) issues.push(`${slug}: ${label} changed`);
  if (!same(doc.howSection?.items?.map(item => item.title), old.keyServices || [])) issues.push(`${slug}: how list changed`);
  if (old.process?.length) {
    if (!same(doc.processSection?.steps, old.process)) issues.push(`${slug}: process changed`);
  } else if (doc.processSection?.steps?.length !== 4) issues.push(`${slug}: default process missing`);
  for (const [index, step] of (doc.processSection?.steps || []).entries()) {
    if (!step.image?.asset?._ref) issues.push(`${slug}: process image ${index + 1} missing`);
  }
  if (Object.hasOwn(doc, 'pageCopy')) issues.push(`${slug}: old page copy still present`);
}
console.log(JSON.stringify({compared: before.length, current: after.length, issues: issues.length, details: issues.slice(0, 30)}, null, 2));
if (issues.length || after.length !== before.length) process.exitCode = 1;
