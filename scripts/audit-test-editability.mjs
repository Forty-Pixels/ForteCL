import { createClient } from '@sanity/client';
import labTestData from '../data/labTestsData.ts';
const { labTests } = labTestData;

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION,
  useCdn: false,
});

const counts = await client.fetch(`{
  "total": count(*[_type == "labTest"]),
  "withImage": count(*[_type == "labTest" && defined(heroSection.image.asset)]),
  "withIntroImage": count(*[_type == "labTest" && defined(introSection.image.asset)]),
  "withSecondaryImage": count(*[_type == "labTest" && defined(introSection.secondaryImage.asset)]),
  "withContextImage": count(*[_type == "labTest" && defined(considerSection.image.asset)]),
  "withCtaImage": count(*[_type == "labTest" && defined(ctaSection.image.asset)]),
  "withCommonTests": count(*[_type == "labTest" && defined(considerSection.items)]),
  "withHeroHighlights": count(*[_type == "labTest" && defined(heroSection.highlights)]),
  "withHowItems": count(*[_type == "labTest" && defined(howSection.items)]),
  "withSubSections": count(*[_type == "labTest" && defined(additionalInfoSection.sections)]),
  "withOverview": count(*[_type == "labTest" && defined(introSection.overview)]),
  "withFaqs": count(*[_type == "labTest" && defined(faqSection.items)]),
  "withProcess": count(*[_type == "labTest" && defined(processSection.steps)]),
  "nipt": *[_type == "labTest" && slug.current == "nipt"][0]{_id,name, "hasFaqs": defined(faqSection.items)},
  "sti28": *[_type == "labTest" && slug.current == "sti28"][0]{_id,name,"commonTests":considerSection.items,"hasImage":defined(heroSection.image.asset),"hasContextImage":defined(considerSection.image.asset)}
}`);
console.log(counts);
console.log(await client.fetch(`{
  "missingImages": *[_type == "labTest" && !defined(heroSection.image.asset)].slug.current,
  "missingConsiderLists": *[_type == "labTest" && !defined(considerSection.items)].slug.current,
  "missingContextImages": *[_type == "labTest" && !defined(considerSection.image.asset)].slug.current
}`));
const cmsSlugs = await client.fetch(`*[_type == "labTest" && defined(slug.current)].slug.current`);
const missing = labTests.filter(test => !cmsSlugs.includes(test.slug));
console.log({localTotal: labTests.length, localMissingFromSanity: missing.length, missingSlugs: missing.map(test => test.slug)});
