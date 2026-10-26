import dotenv from 'dotenv';
import { createClient } from '@sanity/client';

dotenv.config({ path: '.env.local' });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: '2026-03-27',
  token: process.env.SANITY_WRITE_TOKEN,
  useCdn: false,
});

try {
  const tests = await client.fetch(
    '*[_type == "labTest" && slug.current == "acid-fast-stain"]{_id,name,department->{_id,title}}',
  );
  const departments = await client.fetch(
    '*[_type == "department"]{_id,title,"slug":slug.current}',
  );
  const targetDepartments = departments.filter((department) =>
    department.slug === 'microbiology' || department.title?.toLowerCase() === 'microbiology',
  );

  if (tests.length !== 1 || targetDepartments.length > 1) {
    throw new Error(`Expected one matching test and at most one Microbiology department; found ${tests.length} tests and ${targetDepartments.length} matching departments.`);
  }

  const test = tests[0];
  console.log(`${test.name}: ${test.department?.title ?? 'Unassigned'} -> Microbiology`);

  if (process.argv.includes('--apply')) {
    const target = targetDepartments[0] ?? await client.createIfNotExists({
      _id: 'department-microbiology',
      _type: 'department',
      title: 'Microbiology',
      slug: { _type: 'slug', current: 'dept-microbiology' },
    });
    await client.patch(test._id).set({ department: { _type: 'reference', _ref: target._id } }).commit();
    console.log('Sanity department updated.');
  }
} catch (error) {
  console.error(error instanceof Error ? error.message : 'Sanity request failed.');
  process.exitCode = 1;
}
