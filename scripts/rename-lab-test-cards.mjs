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

const renames = [
  { slug: 'food-allergy-panel', name: 'Allergy, Food (60 Panel)' },
  { slug: 'bhcg', name: 'Beta HCG' },
];

try {
  for (const rename of renames) {
    const tests = await client.fetch(
      '*[_type == "labTest" && slug.current == $slug]{_id,name}',
      { slug: rename.slug },
    );
    if (tests.length !== 1) {
      throw new Error(`Expected one lab test for ${rename.slug}; found ${tests.length}.`);
    }

    const test = tests[0];
    console.log(`${rename.slug}: ${test.name} -> ${rename.name}`);
    if (process.argv.includes('--apply') && test.name !== rename.name) {
      await client.patch(test._id).set({ name: rename.name }).commit();
    }
  }
} catch (error) {
  console.error(error instanceof Error ? error.message : 'Sanity request failed.');
  process.exitCode = 1;
}
