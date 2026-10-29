import { createClient } from '@sanity/client';
import { DEPARTMENT_CATEGORIES } from '../constants/department-categories';
import { getDepartmentTitle } from '../lib/department-utils';
import { homepageTestFinderQuery } from '../lib/queries';

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION!,
  useCdn: false,
});
async function main() {
const selections = await client.fetch(homepageTestFinderQuery);
if (!selections) throw new Error('Homepage test finder document is missing');
const results = DEPARTMENT_CATEGORIES.map(category => {
  const tests = selections[category.id] || [];
  if (tests.length > 6) throw new Error(`${category.title} has more than six tests`);
  const slugs = tests.map((test: { slug?: string }) => test?.slug);
  if (slugs.some((slug: string | undefined) => !slug || slug === 'std19')) throw new Error(`${category.title} has a missing or excluded test`);
  if (new Set(slugs).size !== slugs.length) throw new Error(`${category.title} has duplicate tests`);
  for (const test of tests) {
    if (getDepartmentTitle(test.department, test.departmentSlug) !== category.title) {
      throw new Error(`${test.name} is in the wrong category`);
    }
  }
  return { category: category.title, tests: tests.length, first: tests[0]?.name || null };
});
console.log(JSON.stringify(results, null, 2));
}

main().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
