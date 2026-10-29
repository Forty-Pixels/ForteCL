import { createClient } from '@sanity/client';
import categoryData from '../constants/department-categories.ts';

const { DEPARTMENT_CATEGORIES } = categoryData;
const normalize = value => (value || '').toLowerCase().replace(/[^a-z0-9]/g, '');
const departmentId = title => DEPARTMENT_CATEGORIES.find(item => [item.id, item.title, ...item.aliases].some(alias => normalize(alias) === normalize(title)))?.id;
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION,
  useCdn: false,
});
const tests = await client.fetch(`*[_type == "labTest" && defined(slug.current) && slug.current != "std19"]{
  "slug":slug.current,name,"department":department->title,
  "hasCommonTests":defined(considerSection.items) && count(considerSection.items) > 0,
  "hasFaqs":defined(faqSection.items) && count(faqSection.items) > 0
}`);
let nextIndex = 0;
const failures = [];
let passed = 0;
async function worker() {
  while (nextIndex < tests.length) {
    const test = tests[nextIndex++];
    const department = departmentId(test.department);
    const path = department ? `/departments/${department}/${test.slug}` : `/lab-tests/${test.slug}`;
    try {
      const response = await fetch(`http://localhost:3000${path}`);
      const html = await response.text();
      const visibleHtml = html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/g, '');
      const issues = [];
      if (!response.ok) issues.push(`HTTP ${response.status}`);
      if (!visibleHtml.includes(test.name.replaceAll('&', '&amp;'))) issues.push('missing test name');
      if (!test.hasCommonTests && visibleHtml.includes('Who May Consider')) issues.push('empty consider section shown');
      if (!test.hasFaqs && visibleHtml.includes('Frequently Asked Questions')) issues.push('empty FAQ section shown');
      if (issues.length) failures.push({ slug: test.slug, path, issues });
      else passed++;
    } catch (error) {
      failures.push({ slug: test.slug, path, issues: [error.message] });
    }
  }
}
await Promise.all(Array.from({ length: 4 }, worker));
console.log(JSON.stringify({ total: tests.length, passed, failures }, null, 2));
if (failures.length) process.exitCode = 1;
