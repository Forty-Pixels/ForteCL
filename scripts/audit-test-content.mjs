import { createClient } from '@sanity/client';
import labTestData from '../data/labTestsData.ts';
import departmentData from '../constants/departments.ts';
import categoryData from '../constants/department-categories.ts';

const { labTests } = labTestData;
const { DEPARTMENTS_DATA } = departmentData;
const { DEPARTMENT_CATEGORIES } = categoryData;
const normalize = value => (value || '').toLowerCase().replace(/[^a-z0-9]/g, '');
const departmentFor = title => {
  const value = normalize(title);
  const category = DEPARTMENT_CATEGORIES.find(item => [item.id, item.title, ...item.aliases].some(alias => normalize(alias) === value));
  return DEPARTMENTS_DATA.find(item => item.id === category?.id);
};
const stable = value => Array.isArray(value) ? value.map(stable) : value && typeof value === 'object'
  ? Object.fromEntries(Object.keys(value).sort().map(key => [key, stable(value[key])])) : value;
const equal = (a, b) => JSON.stringify(stable(a)) === JSON.stringify(stable(b));
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION,
  useCdn: false,
});
const cms = await client.fetch(`*[_type == "labTest"]{
  _id, "slug":slug.current, name,
  "tat":resultSection.tat, "sampleType":resultSection.sampleType,
  "overview":introSection.overview, "keyServices":heroSection.highlights,
  "commonTests":considerSection.items[]{name,description},
  "subSections":additionalInfoSection.sections[]{title,content,items},
  "faqs":faqSection.items[]{question,answer},
  "accuracyNote":accuracySection.note,
  "process":processSection.steps[]{title,description},
  "packages":panelsSection.items[]{name,description,features},
  "department":department->title, "imageName":heroSection.image.asset->originalFilename
}`);
const localBySlug = new Map(labTests.map(test => [test.slug, test]));
const report = [];
for (const test of cms) {
  const local = localBySlug.get(test.slug);
  const dept = departmentFor(local?.department || test.department);
  const flags = [];
  if (!local) flags.push('no-local-test-data');
  if (local && test.name !== local.name) flags.push('name-differs-from-local');
  if (local?.department && normalize(local.department) !== normalize(test.department) && dept && normalize(dept.title) !== normalize(test.department)) flags.push('department-mismatch');
  if (local?.tat && test.tat !== local.tat) flags.push('tat-differs-from-local');
  if (local?.sampleType?.length && !equal(test.sampleType, local.sampleType)) flags.push('sample-differs-from-local');
  if (dept && !local?.overview && test.overview === dept.description) flags.push('department-overview');
  if (dept && !local?.keyServices && equal(test.keyServices, dept.keyServices)) flags.push('department-key-services');
  if (dept && !local?.commonTests && equal(test.commonTests, dept.commonTests)) flags.push('department-consider-list');
  if (dept && !local?.subSections && equal(test.subSections?.map(section => ({title:section.title, content:section.items || section.content})), dept.subSections?.map(section => ({title:section.title, content:section.content})))) flags.push('department-subsections');
  if (dept && !local?.faqs && equal(test.faqs, dept.faqs)) flags.push('department-faqs');
  const allText = JSON.stringify(test);
  if (/99\.99%|completely safe|no risk|within 24 hours|guarantee/i.test(allText)) flags.push('strong-medical-or-timing-claim');
  if (flags.length) report.push({ slug:test.slug, flags });
}
const counts = {};
for (const row of report) for (const flag of row.flags) counts[flag] = (counts[flag] || 0) + 1;
if (process.argv.includes('--missing-overview')) {
  console.log(JSON.stringify(cms.filter(test => !test.overview).map(test => ({slug:test.slug,name:test.name,department:test.department,tat:test.tat,sampleType:test.sampleType})), null, 2));
}
else if (!process.argv.includes('--examples')) console.log(JSON.stringify({ total:cms.length, flagged:report.length, counts, report }, null, 2));
else {
  console.log(JSON.stringify(cms.filter(test => ['alkaline-phosphatase', 'cbc', 'nipt', 'sti28', 'std14'].includes(test.slug))
    .map(test => ({slug:test.slug, overview:test.overview, commonTests:test.commonTests, faqs:test.faqs})), null, 2));
}
