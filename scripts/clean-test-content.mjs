import { createClient } from '@sanity/client';
import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import labTestData from '../data/labTestsData.ts';
import departmentData from '../constants/departments.ts';
import categoryData from '../constants/department-categories.ts';

const apply = process.argv.includes('--apply');
const { labTests } = labTestData;
const { DEPARTMENTS_DATA } = departmentData;
const { DEPARTMENT_CATEGORIES } = categoryData;
const localBySlug = new Map(labTests.map(test => [test.slug, test]));
const normalize = value => (value || '').toLowerCase().replace(/[^a-z0-9]/g, '');
const stable = value => Array.isArray(value) ? value.map(stable) : value && typeof value === 'object'
  ? Object.fromEntries(Object.keys(value).sort().map(key => [key, stable(value[key])])) : value;
const equal = (a, b) => JSON.stringify(stable(a)) === JSON.stringify(stable(b));
const departmentFor = title => {
  const value = normalize(title);
  const category = DEPARTMENT_CATEGORIES.find(item => [item.id, item.title, ...item.aliases].some(alias => normalize(alias) === value));
  return DEPARTMENTS_DATA.find(item => item.id === category?.id);
};

if (apply && !process.env.SANITY_WRITE_TOKEN) throw new Error('SANITY_WRITE_TOKEN is required for --apply');
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION,
  token: apply ? process.env.SANITY_WRITE_TOKEN : undefined,
  useCdn: false,
});
const documents = await client.fetch(`*[_type == "labTest"]{...,"slugValue":slug.current,"departmentTitle":department->title}`);
const changes = [];
for (const doc of documents) {
  const local = localBySlug.get(doc.slugValue);
  const department = departmentFor(local?.department || doc.departmentTitle);
  const unset = [];
  const set = {};
  if (department) {
    if (!local?.overview && doc.overview === department.description) unset.push('overview');
    if (!local?.keyServices && equal(doc.keyServices, department.keyServices)) unset.push('keyServices');
    if (!local?.commonTests && equal(doc.commonTests?.map(({name,description}) => ({name,description})), department.commonTests)) unset.push('commonTests');
    if (!local?.subSections && equal(doc.subSections?.map(section => ({title:section.title,content:section.items || section.content})), department.subSections?.map(section => ({title:section.title,content:section.content})))) unset.push('subSections');
    if (!local?.faqs && equal(doc.faqs?.map(({question,answer}) => ({question,answer})), department.faqs)) unset.push('faqs');
  }
  const text = doc.content?.map(block => block.children?.map(child => child.text).join('')).filter(Boolean) || [];
  const generatedHeadings = ['When This Test Is Commonly Recommended', 'Before The Test', 'How Results Are Interpreted', 'Turnaround And Sample Details', 'Clinical Note'];
  if (doc.content?.length === 16 && text.some(line => line.includes('is a focused laboratory test used to evaluate')) && generatedHeadings.every(heading => text.includes(heading))) unset.push('content');
  if (!local?.process && doc.process?.length === 4 && doc.process[0]?.description === 'Schedule your test through our website or via WhatsApp.' && doc.process[3]?.description === 'Receive your digital report when laboratory processing is complete.') unset.push('process');
  if (doc.slugValue === 'nipt') {
    if (doc.accuracyNote?.includes('99.99%')) set.accuracyNote = local.accuracyNote;
    if (doc.process?.[3]?.description?.includes('99.99%')) set.process = doc.process.map((step, index) => index === 3 ? {...step, description: local.process[3].description} : step);
  }
  if (doc.pageCopy?.ctaHeading === `Book Your ${doc.name} Screening Today` || doc.pageCopy?.ctaDescription === 'Take the first step towards precise diagnosis and better health. Our experts are ready to assist you.') {
    set.pageCopy = {
      ...doc.pageCopy,
      ...(doc.pageCopy.ctaHeading === `Book Your ${doc.name} Screening Today` ? { ctaHeading: `Book ${doc.name} Today` } : {}),
      ...(doc.pageCopy.ctaDescription === 'Take the first step towards precise diagnosis and better health. Our experts are ready to assist you.' ? { ctaDescription: 'Contact our team to learn about this test and booking options.' } : {}),
    };
  }
  if (unset.length || Object.keys(set).length) changes.push({ id: doc._id, slug: doc.slugValue, unset, set });
}
const counts = {};
for (const change of changes) for (const field of change.unset) counts[field] = (counts[field] || 0) + 1;
console.log(JSON.stringify({ reviewed: documents.length, changed: changes.length, unsetCounts: counts, niptUpdated: changes.some(change => change.slug === 'nipt') }, null, 2));
if (!apply) {
  console.log('Dry run. Pass --apply to remove only fields matching copied department templates.');
  process.exit(0);
}
const backupDirectory = join(process.cwd(), 'scripts', 'backups');
mkdirSync(backupDirectory, { recursive: true });
const backupPath = join(backupDirectory, `test-content-${new Date().toISOString().replace(/[:.]/g, '-')}.json`);
writeFileSync(backupPath, JSON.stringify(documents.filter(doc => changes.some(change => change.id === doc._id)), null, 2));
console.log(`Backup: ${backupPath}`);
let updated = 0;
for (const change of changes) {
  try {
    let patch = client.patch(change.id);
    if (change.unset.length) patch = patch.unset(change.unset);
    if (Object.keys(change.set).length) patch = patch.set(change.set);
    await patch.commit();
    updated++;
  } catch (error) {
    console.error(`Failed ${change.slug}: ${error.message}`);
    process.exitCode = 1;
  }
}
console.log({ updated, attempted: changes.length });
