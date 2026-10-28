import { readFileSync } from 'node:fs';
import { createClient } from '@sanity/client';

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
  useCdn: false,
});

const departments = await client.fetch('*[_type == "department"]{_id,title,"slug":slug.current}');
const tests = await client.fetch('*[_type == "labTest"]{_id,name,"departmentId":department._ref}');

for (const department of departments.sort((a, b) => a.title.localeCompare(b.title))) {
  const assigned = tests.filter(test => test.departmentId === department._id);
  console.log(JSON.stringify({ ...department, count: assigned.length, tests: assigned.map(test => test.name) }));
}

const unassigned = tests.filter(test => !test.departmentId || !departments.some(department => department._id === test.departmentId));
console.log(JSON.stringify({ title: 'UNASSIGNED', count: unassigned.length, tests: unassigned.map(test => test.name) }));
