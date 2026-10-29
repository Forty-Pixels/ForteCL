import { createClient } from '@sanity/client';
import { createReadStream, existsSync, mkdirSync, writeFileSync } from 'node:fs';
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
const docs = await client.fetch('*[_type == "labTest" && slug.current != "std19"]');
const legacyFields = [
  'tat', 'sampleType', 'content', 'overview', 'overviewSource', 'startingPrice',
  'keyServices', 'commonTests', 'subSections', 'process', 'accuracyNote', 'packages',
  'faqs', 'pageCopy', 'image', 'introImage', 'secondaryImage', 'contextImage', 'ctaImage',
];
const defaultProcess = [
  ['Book Online', 'Schedule your test through our website or via WhatsApp.', 'p_book.png'],
  ['Sample Collection', 'Our certified nurse will visit your location for home sample collection.', 'p_sample.png'],
  ['Lab Processing', 'Your sample is processed in our state-of-the-art lab with precision.', 'p_lab.png'],
  ['Get Reports', 'Receive your digital report when laboratory processing is complete.', 'p_report.png'],
];
const defaultHowDescription = 'Professional diagnostic services tailored to your specific clinical needs.';
const key = (prefix, index) => `${prefix}-${index}`;
const entries = docs.filter(doc => !doc.heroSection);
console.log(JSON.stringify({total: docs.length, toMigrate: entries.length, alreadyMigrated: docs.length - entries.length, slugs: entries.map(doc => doc.slug.current)}, null, 2));
if (!apply) {
  console.log('Dry run. Pass --apply to back up and migrate the listed test documents.');
  process.exit(0);
}
const backupDirectory = join(process.cwd(), 'scripts', 'backups');
mkdirSync(backupDirectory, {recursive: true});
const backupPath = join(backupDirectory, `section-migration-${new Date().toISOString().replace(/[:.]/g, '-')}.json`);
writeFileSync(backupPath, JSON.stringify(entries, null, 2));
console.log(`Backup: ${backupPath}`);
const assetCache = new Map();
async function defaultImage(filename) {
  const path = join(process.cwd(), 'public', filename);
  if (!existsSync(path)) return undefined;
  if (!assetCache.has(filename)) {
    const asset = await client.assets.upload('image', createReadStream(path), {filename});
    assetCache.set(filename, {_type: 'image', asset: {_type: 'reference', _ref: asset._id}});
  }
  return assetCache.get(filename);
}
const object = value => Object.fromEntries(Object.entries(value).filter(([, field]) => field !== undefined && field !== null));
let migrated = 0;
for (const doc of entries) {
  try {
    const page = doc.pageCopy || {};
    const highlights = doc.keyServices || [];
    const steps = doc.process?.length ? doc.process : await Promise.all(defaultProcess.map(async ([title, description, filename], index) => ({
      _type: 'object', _key: key('process', index), title, description, image: await defaultImage(filename),
    })));
    const sections = {
      heroSection: object({image: doc.image, highlights}),
      resultSection: object({tat: doc.tat, sampleType: doc.sampleType}),
      introSection: object({
        heading: page.introHeading || `What is ${doc.name}?`,
        overview: doc.overview, overviewSource: doc.overviewSource,
        image: doc.introImage, secondaryImage: doc.secondaryImage,
      }),
      additionalInfoSection: object({sections: doc.subSections}),
      considerSection: object({
        heading: page.considerHeading || `Who May Consider ${doc.name}`,
        items: doc.commonTests, image: doc.contextImage,
      }),
      howSection: {
        heading: page.howHeading || `How ${doc.name} Works`,
        items: highlights.map((title, index) => ({
          _type: 'object', _key: key('how', index), title,
          description: page.howDescription || defaultHowDescription,
        })),
      },
      processSection: {
        heading: page.processHeading || 'Our Simple 4 Step Process',
        subtitle: page.processSubtitle || 'Efficient • Reliable • Professional',
        steps,
      },
      accuracySection: object({heading: page.accuracyHeading || 'Accuracy and Reliability', note: doc.accuracyNote}),
      panelsSection: object({
        heading: page.packagesHeading || 'Choose Your Screening Panel',
        subtitle: page.packagesSubtitle || 'Select the right level of detailed screening',
        items: doc.packages,
      }),
      faqSection: object({heading: page.faqHeading || 'Frequently Asked Questions', items: doc.faqs}),
      ctaSection: object({
        heading: page.ctaHeading || `Book ${doc.name} Today`,
        description: page.ctaDescription || 'Contact our team to learn about this test and booking options.',
        image: doc.ctaImage,
      }),
    };
    await client.patch(doc._id).ifRevisionId(doc._rev).set(sections).unset(legacyFields).commit();
    migrated++;
  } catch (error) {
    console.error(`Failed ${doc.slug?.current}: ${error.message}`);
    process.exitCode = 1;
  }
}
console.log(JSON.stringify({migrated, attempted: entries.length, uploadedDefaultImages: assetCache.size}));
