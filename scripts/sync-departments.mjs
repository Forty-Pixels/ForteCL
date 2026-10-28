import { readFileSync } from 'node:fs';
import { createClient } from '@sanity/client';

const apply = process.argv.includes('--apply');
const env = Object.fromEntries(
  readFileSync(new URL('../.env.local', import.meta.url), 'utf8')
    .split(/\r?\n/)
    .filter(line => line && !line.startsWith('#') && line.includes('='))
    .map(line => {
      const separator = line.indexOf('=');
      return [line.slice(0, separator), line.slice(separator + 1).trim()];
    }),
);

const client = createClient({
  projectId: env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: env.NEXT_PUBLIC_SANITY_API_VERSION,
  token: apply ? env.SANITY_WRITE_TOKEN : undefined,
  useCdn: false,
});

const desired = [
  { _id: 'dept-biochemistry', title: 'Clinical Chemistry', slug: 'clinical-chemistry' },
  { _id: 'dept-hematology', title: 'Hematology', slug: 'hematology' },
  { _id: 'dept-pathology', title: 'Pathology', slug: 'pathology' },
  { _id: 'department-microbiology', title: 'Microbiology', slug: 'microbiology' },
  { _id: 'dept-serology', title: 'Serology', slug: 'serology' },
  { _id: 'dept-cytology', title: 'Cytology', slug: 'cytology' },
  { _id: 'dept-histopathology', title: 'Histopathology', slug: 'histopathology' },
  { _id: 'dept-immunology', title: 'Immunology', slug: 'immunology' },
  { _id: 'dept-molecular-genetics', title: 'Molecular Biology/Genetics', slug: 'molecular-biology-genetics' },
];

const duplicateId = 'dept-clinical-chemistry';
const departments = await client.fetch('*[_type == "department"]{_id,title,"slug":slug.current}');
const tests = await client.fetch('*[_type == "labTest"]{_id,name,"departmentId":department._ref}');
const unknownDepartments = departments.filter(department =>
  !desired.some(target => target._id === department._id) && department._id !== duplicateId,
);
if (unknownDepartments.length) {
  throw new Error(`Unexpected department documents: ${unknownDepartments.map(department => department._id).join(', ')}`);
}

const duplicateTests = tests.filter(test => test.departmentId === duplicateId);
if (duplicateTests.some(test => test.name !== 'Bicarbonates')) {
  throw new Error(`Unexpected tests linked to duplicate Clinical Chemistry: ${duplicateTests.map(test => test.name).join(', ')}`);
}

const actions = desired.map(target => {
  const current = departments.find(department => department._id === target._id);
  return {
    action: current ? 'update' : 'create',
    title: target.title,
    from: current?.title,
    tests: tests.filter(test => test.departmentId === target._id).length,
  };
});
console.log(JSON.stringify({ actions, reassign: duplicateTests.map(test => test.name), removeDuplicate: departments.some(department => department._id === duplicateId) }, null, 2));
if (!apply) {
  console.log('Dry run only. Pass --apply to update Sanity.');
  process.exit(0);
}
if (!env.SANITY_WRITE_TOKEN) throw new Error('SANITY_WRITE_TOKEN is required for --apply');

let transaction = client.transaction();
for (const target of desired) {
  const fields = { title: target.title, slug: { _type: 'slug', current: target.slug } };
  if (departments.some(department => department._id === target._id)) {
    transaction = transaction.patch(target._id, patch => patch.set(fields));
  } else {
    transaction = transaction.create({ _id: target._id, _type: 'department', ...fields });
  }
}
for (const test of duplicateTests) {
  transaction = transaction.patch(test._id, patch => patch.set({ department: { _type: 'reference', _ref: 'dept-biochemistry' } }));
}
await transaction.commit();

if (departments.some(department => department._id === duplicateId)) {
  const remainingReferences = await client.fetch('*[_id != $id && references($id)]{_id,_type}', { id: duplicateId });
  if (remainingReferences.length) {
    throw new Error(`Duplicate department still has references: ${remainingReferences.map(record => record._id).join(', ')}`);
  }
  await client.delete(duplicateId);
}

const result = await client.fetch('*[_type == "department"] | order(title asc){_id,title,"slug":slug.current}');
if (result.length !== desired.length || desired.some(target => !result.some(department => department._id === target._id && department.title === target.title))) {
  throw new Error('Sanity department verification failed');
}
console.log(`Verified ${result.length} departments in Sanity.`);
