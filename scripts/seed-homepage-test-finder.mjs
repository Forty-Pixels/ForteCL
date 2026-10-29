import { createClient } from '@sanity/client';
import categoryData from '../constants/department-categories.ts';
import departmentUtils from '../lib/department-utils.ts';

const { DEPARTMENT_CATEGORIES } = categoryData;
const { getDepartmentTitle } = departmentUtils;

const apply = process.argv.includes('--apply');
if (apply && !process.env.SANITY_WRITE_TOKEN) throw new Error('SANITY_WRITE_TOKEN is required for --apply');
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION,
  token: apply ? process.env.SANITY_WRITE_TOKEN : undefined,
  useCdn: false,
});
const documentId = 'homepage-test-finder';
const existing = await client.getDocument(documentId);
const tests = await client.fetch(`*[_type == "labTest" && defined(slug.current) && slug.current != "std19"]{
  _id, name, "slug":slug.current, "department":department->title, "departmentSlug":department->slug.current
}`);
const nameOverrides = {'food-allergy-panel': 'Allergy, Food (60 Panel)', bhcg: 'Beta HCG'};
const selections = Object.fromEntries(DEPARTMENT_CATEGORIES.map(category => [
  category.id,
  tests
    .filter(test => getDepartmentTitle(test.department, test.departmentSlug) === category.title)
    .sort((a, b) => (nameOverrides[a.slug] || a.name).localeCompare(nameOverrides[b.slug] || b.name))
    .slice(0, 6)
    .map((test, index) => ({_type: 'reference', _key: `${category.id}-${index}`, _ref: test._id})),
]));
console.log(JSON.stringify({
  existing: Boolean(existing),
  departmentTitles: [...new Set(tests.map(test => test.department).filter(Boolean))].sort(),
  categories: DEPARTMENT_CATEGORIES.map(category => ({
    category: category.title,
    selected: selections[category.id].map(reference => tests.find(test => test._id === reference._ref)?.name),
  })),
}, null, 2));
if (!apply) {
  console.log('Dry run. Pass --apply to create the singleton with the current first six tests in each category.');
  process.exit(0);
}
if (existing) {
  console.log('Singleton already exists; leaving editor choices untouched.');
  process.exit(0);
}
await client.createIfNotExists({_id: documentId, _type: 'homepageTestFinder', ...selections});
console.log(`Created ${documentId}`);
