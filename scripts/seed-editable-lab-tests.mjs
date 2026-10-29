import { createClient } from '@sanity/client';
import { createReadStream, existsSync } from 'node:fs';
import { join } from 'node:path';
import labTestData from '../data/labTestsData.ts';
import stdPanelData from '../data/stdPanels.ts';
import departmentData from '../constants/departments.ts';
import categoryData from '../constants/department-categories.ts';

const { labTests } = labTestData;
const { STD_PANELS } = stdPanelData;
const { DEPARTMENTS_DATA } = departmentData;
const { DEPARTMENT_CATEGORIES } = categoryData;
const testsToSeed = [
  ...labTests,
  ...STD_PANELS.filter(panel => !labTests.some(test => test.slug === panel.slug)).map(panel => ({
    ...panel,
    department: 'Molecular',
    diseaseFilter: 'Specialized Tests',
    overview: 'Contact Forte Clinical Laboratory for panel details, sample requirements, and turnaround time.',
  })),
];
const apply = process.argv.includes('--apply');
const newOnly = process.argv.includes('--new-only');
const incompleteOnly = process.argv.includes('--incomplete-only');
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION,
  token: apply ? process.env.SANITY_WRITE_TOKEN : undefined,
  useCdn: false,
});

if (apply && !process.env.SANITY_WRITE_TOKEN) throw new Error('SANITY_WRITE_TOKEN is required for --apply');

const normalize = value => (value || '').toLowerCase().replace(/[^a-z0-9]/g, '');
const departmentFor = title => {
  const value = normalize(title);
  const category = DEPARTMENT_CATEGORIES.find(item =>
    [item.id, item.title, ...item.aliases].some(alias => normalize(alias) === value));
  return DEPARTMENTS_DATA.find(item => item.id === category?.id);
};
const key = (prefix, index) => `${prefix}-${index}`;
const availablePath = (...paths) => paths.find(path => path && path.startsWith('/') && existsSync(join(process.cwd(), 'public', path.slice(1))));
const imageCache = new Map();
const defaultPageCopy = name => ({
  heroSubtitle: 'Accurate diagnostics for better health. Get crucial insights about your body’s functioning.',
  introHeading: `What is ${name}?`,
  considerHeading: `Who May Consider ${name}`,
  howHeading: `How ${name} Works`,
  howDescription: 'Professional diagnostic services tailored to your specific clinical needs.',
  processHeading: 'Our Simple 4 Step Process',
  processSubtitle: 'Efficient • Reliable • Professional',
  accuracyHeading: 'Accuracy and Reliability',
  packagesHeading: 'Choose Your Screening Panel',
  packagesSubtitle: 'Select the right level of detailed screening',
  faqHeading: 'Frequently Asked Questions',
  ctaHeading: `Book ${name} Today`,
  ctaDescription: 'Contact our team to learn about this test and booking options.',
});

async function imageFromPath(path) {
  if (!path || !path.startsWith('/')) return undefined;
  const file = join(process.cwd(), 'public', path.slice(1));
  if (!existsSync(file)) return undefined;
  if (!imageCache.has(file)) {
    const asset = await client.assets.upload('image', createReadStream(file), { filename: path.split('/').at(-1) });
    imageCache.set(file, { _type: 'image', asset: { _type: 'reference', _ref: asset._id } });
  }
  return imageCache.get(file);
}

const [existing, departments, categories] = await Promise.all([
  client.fetch(`*[_type == "labTest" && defined(slug.current)]{
    _id,"slug":slug.current,
    "hasImage":defined(heroSection.image.asset),
    "hasIntroImage":defined(introSection.image.asset),
    "hasSecondaryImage":defined(introSection.secondaryImage.asset),
    "hasContextImage":defined(considerSection.image.asset),
    "hasCtaImage":defined(ctaSection.image.asset),
    "hasSubSections":defined(additionalInfoSection.sections),
    "hasProcess":defined(processSection.steps),
    "hasCommonTests":defined(considerSection.items)
  }`),
  client.fetch(`*[_type == "department"]{_id,title}`),
  client.fetch(`*[_type == "diseaseCategory"]{_id,title}`),
]);
const existingBySlug = new Map(existing.map(doc => [doc.slug, doc]));
const departmentAliases = { molecular: 'molecularbiologygenetics', biochemistry: 'clinicalchemistry' };
const reference = (items, title, aliases = {}) => {
  const target = aliases[normalize(title)] || normalize(title);
  const found = items.find(item => normalize(item.title) === target);
  return found ? { _type: 'reference', _ref: found._id } : undefined;
};

const missing = testsToSeed.filter(test => !existingBySlug.has(test.slug));
console.log(`Website tests: ${testsToSeed.length}; new Sanity records: ${missing.length}; existing records to fill: ${testsToSeed.length - missing.length}`);
if (!apply) {
  console.log('Dry run. Pass --apply to create missing records and fill missing fields.');
  process.exit(0);
}

let created = 0;
let filled = 0;
for (const test of testsToSeed) {
  if (newOnly && existingBySlug.has(test.slug)) continue;
  const current = existingBySlug.get(test.slug);
  if (incompleteOnly && current?.hasImage && current?.hasIntroImage && current?.hasSecondaryImage && current?.hasContextImage && current?.hasCtaImage && current?.hasCommonTests) continue;
  try {
    const existingDoc = existingBySlug.get(test.slug);
    const department = departmentFor(test.department);
    const sections = test.subSections ?? department?.subSections ?? [];
    const heroImagePath = availablePath(test.image, department?.image, '/lab-tests/lab-1.png');
    const secondaryImagePath = availablePath(sections[0]?.image, heroImagePath);
    const contextImagePath = availablePath(sections[1]?.image, sections[0]?.image, heroImagePath);
    const fields = {
      name: test.name,
      slug: { _type: 'slug', current: test.slug },
      diseaseFilter: reference(categories, test.diseaseFilter),
      department: reference(departments, test.department, departmentAliases),
      tat: test.tat,
      sampleType: test.sampleType,
      overview: test.overview || undefined,
      keyServices: test.keyServices,
      commonTests: test.commonTests?.map((item, index) => ({ _type: 'object', _key: key('common', index), ...item })),
      subSections: existingDoc?.hasSubSections ? undefined : await Promise.all((test.subSections || []).map(async (section, index) => ({
        _type: 'object', _key: key('section', index), title: section.title,
        ...(Array.isArray(section.content) ? { items: section.content } : { content: section.content }),
        image: await imageFromPath(section.image),
      }))),
      process: existingDoc?.hasProcess ? undefined : await Promise.all((test.process || []).map(async (step, index) => ({
        _type: 'object', _key: key('process', index), title: step.title, description: step.description,
        image: await imageFromPath(step.image),
      }))),
      accuracyNote: test.accuracyNote,
      packages: test.packages?.map((panel, index) => ({
        _type: 'object', _key: key('panel', index), name: panel.name,
        description: panel.description, features: panel.features,
      })),
      faqs: test.faqs?.map((faq, index) => ({ _type: 'object', _key: key('faq', index), ...faq })),
      image: existingDoc?.hasImage ? undefined : await imageFromPath(heroImagePath),
      introImage: existingDoc?.hasIntroImage ? undefined : await imageFromPath(heroImagePath),
      secondaryImage: existingDoc?.hasSecondaryImage ? undefined : await imageFromPath(secondaryImagePath),
      contextImage: existingDoc?.hasContextImage ? undefined : await imageFromPath(contextImagePath),
      ctaImage: existingDoc?.hasCtaImage ? undefined : await imageFromPath(heroImagePath),
      pageCopy: defaultPageCopy(test.name),
    };
    const page = fields.pageCopy;
    const defaultSteps = [
      ['Book Online', 'Schedule your test through our website or via WhatsApp.', '/p_book.png'],
      ['Sample Collection', 'Our certified nurse will visit your location for home sample collection.', '/p_sample.png'],
      ['Lab Processing', 'Your sample is processed in our state-of-the-art lab with precision.', '/p_lab.png'],
      ['Get Reports', 'Receive your digital report when laboratory processing is complete.', '/p_report.png'],
    ];
    const steps = fields.process?.length ? fields.process : await Promise.all(defaultSteps.map(async ([title, description, path], index) => ({
      _type: 'object', _key: key('process', index), title, description, image: await imageFromPath(path),
    })));
    const populated = Object.fromEntries(Object.entries({
      name: fields.name, slug: fields.slug, diseaseFilter: fields.diseaseFilter, department: fields.department,
      heroSection: { image: fields.image, highlights: fields.keyServices || [] },
      resultSection: { tat: fields.tat, sampleType: fields.sampleType },
      introSection: { heading: page.introHeading, overview: fields.overview, image: fields.introImage, secondaryImage: fields.secondaryImage },
      additionalInfoSection: { sections: fields.subSections },
      considerSection: { heading: page.considerHeading, items: fields.commonTests, image: fields.contextImage },
      howSection: { heading: page.howHeading, items: (fields.keyServices || []).map((title, index) => ({
        _type: 'object', _key: key('how', index), title, description: page.howDescription,
      })) },
      processSection: { heading: page.processHeading, subtitle: page.processSubtitle, steps },
      accuracySection: { heading: page.accuracyHeading, note: fields.accuracyNote },
      panelsSection: { heading: page.packagesHeading, subtitle: page.packagesSubtitle, items: fields.packages },
      faqSection: { heading: page.faqHeading, items: fields.faqs },
      ctaSection: { heading: page.ctaHeading, description: page.ctaDescription, image: fields.ctaImage },
    }).filter(([, value]) => value !== undefined && value !== null));
    if (existingDoc) {
      await client.patch(existingDoc._id).setIfMissing(populated).commit();
      filled++;
    } else {
      await client.createIfNotExists({ _id: `test-${test.slug}`, _type: 'labTest', ...populated });
      created++;
    }
  } catch (error) {
    console.error(`Failed ${test.slug}: ${error.message}`);
    process.exitCode = 1;
  }
}
console.log({ created, filled, uploadedImages: imageCache.size });
