// ── GROQ queries for Sanity CMS ──────────────────────────

// ─── Lab Tests ───────────────────────────────────────────

import { DEPARTMENT_CATEGORIES } from '@/constants/department-categories';

const homepageTestFields = `{name, "slug":slug.current, "department":department->title,
  "departmentSlug":department->slug.current,
  "sampleType":coalesce(resultSection.sampleType,sampleType),
  "tat":coalesce(resultSection.tat,tat)}`;

/** Ordered, editor-selected homepage finder tests by department. */
export const homepageTestFinderQuery = `*[_type == "homepageTestFinder" && _id == "homepage-test-finder"][0]{
  ${DEPARTMENT_CATEGORIES.map(category => `"${category.id}": ${category.id}[]->${homepageTestFields}`).join(',\n  ')}
}`;

/** Fetch all lab tests (listing page) */
export const allLabTestsQuery = `*[_type == "labTest" && slug.current != "std19"] | order(name asc) {
  "slug": slug.current,
  name,
  "diseaseFilter": diseaseFilter->title,
  "department": department->title,
  "departmentSlug": department->slug.current,
  "tat": coalesce(resultSection.tat, tat),
  "sampleType": coalesce(resultSection.sampleType, sampleType),
  "overview": coalesce(introSection.overview, overview),
  "imageUrl": coalesce(heroSection.image.asset->url, image.asset->url)
}`;

/** Fetch a single lab test by slug (detail page) */
export const labTestBySlugQuery = `*[_type == "labTest" && slug.current == $slug][0] {
  "slug": slug.current,
  name,
  "diseaseFilter": diseaseFilter->title,
  "department": department->title,
  "departmentSlug": department->slug.current,
  "tat": coalesce(resultSection.tat, tat),
  "sampleType": coalesce(resultSection.sampleType, sampleType),
  "overview": coalesce(introSection.overview, overview),
  "keyServices": coalesce(heroSection.highlights, keyServices),
  "howItems": howSection.items,
  "commonTests": coalesce(considerSection.items, commonTests),
  "accuracyNote": coalesce(accuracySection.note, accuracyNote),
  "faqs": coalesce(faqSection.items, faqs),
  "packages": coalesce(panelsSection.items, packages),
  heroSection, introSection, importanceSection, considerSection, howSection, processSection,
  accuracySection, panelsSection, faqSection, ctaSection,
  pageCopy,
  "imageUrl": coalesce(heroSection.image.asset->url, image.asset->url),
  "introImageUrl": coalesce(introSection.image.asset->url, introImage.asset->url),
  "secondaryImageUrl": coalesce(introSection.secondaryImage.asset->url, secondaryImage.asset->url),
  "contextImageUrl": coalesce(considerSection.image.asset->url, contextImage.asset->url),
  "ctaImageUrl": coalesce(ctaSection.image.asset->url, ctaImage.asset->url),
  "subSections": coalesce(additionalInfoSection.sections[]{title, content, items, "imageUrl": image.asset->url}, subSections[]{title, content, items, "imageUrl": image.asset->url}),
  "process": coalesce(processSection.steps[]{title, description, "imageUrl": image.asset->url}, process[]{title, description, "imageUrl": image.asset->url}),
  "relatedTests": relatedTests[]->{
    name,
    "slug": slug.current,
    "department": department->title,
    "departmentSlug": department->slug.current
  }
}`;

/** Fetch all lab test slugs (for generateStaticParams) */
export const allLabTestSlugsQuery = `*[_type == "labTest" && slug.current != "std19"] { "slug": slug.current }`;

/** Fetch all lab test names/slugs (for cross-linking from departments) */
export const allLabTestNamesAndSlugsQuery = `*[
  _type == "labTest" &&
  defined(slug.current) && slug.current != "std19"
] | order(name asc) {
  name,
  "slug": slug.current
}`;

/** Fetch all lab tests with department metadata for department-page mapping */
export const allLabTestsWithDepartmentQuery = `*[
  _type == "labTest" &&
  defined(slug.current) && slug.current != "std19"
] | order(name asc) {
  "slug": slug.current,
  name,
  "tat": coalesce(resultSection.tat, tat),
  "sampleType": coalesce(resultSection.sampleType, sampleType),
  "departmentTitle": department->title,
  "departmentSlug": department->slug.current
}`;

/** Fetch distinct disease filters (from the dedicated document type) */
export const distinctDiseaseFiltersQuery = `*[_type == "diseaseCategory"] | order(title asc).title`;

/** Fetch distinct departments (from the dedicated document type) */
export const distinctDepartmentsQuery = `*[_type == "department"] | order(title asc).title`;

/** Fetch tests for a department page by department slug */
export const labTestsByDepartmentSlugQuery = `*[
  _type == "labTest" &&
  defined(slug.current) &&
  slug.current != "std19" &&
  department->slug.current == $slug
] | order(name asc) {
  "slug": slug.current,
  name,
  "tat": coalesce(resultSection.tat, tat),
  "sampleType": coalesce(resultSection.sampleType, sampleType)
}`;


// ─── Packages ────────────────────────────────────────────

/** Fetch all packages (listing page) */
export const allPackagesQuery = `*[_type == "package"] | order(_createdAt asc) {
  amount,
  homeServiceIncluded,
  turnaroundTime,
  "id": slug.current,
  title,
  "slug": slug.current,
  description,
  image,
  testsTotal,
  subTests,
  overview,
  benefits,
  preparation,
  faqs
}`;

/** Fetch a single package by slug (detail page) */
export const packageBySlugQuery = `*[_type == "package" && slug.current == $slug][0] {
  amount,
  homeServiceIncluded,
  turnaroundTime,
  "id": slug.current,
  title,
  "slug": slug.current,
  description,
  image,
  testsTotal,
  subTests,
  overview,
  benefits,
  preparation,
  faqs
}`;

/** Fetch all package slugs (for generateStaticParams) */
export const allPackageSlugsQuery = `*[_type == "package"] { "slug": slug.current }`;

// ─── Resources & Health Insights ────────────────────────

/** Fetch all resource posts (listing page) */
export const allResourcesQuery = `*[_type == "post"] | order(publishedAt desc) {
  "slug": slug.current,
  title,
  author,
  "category": category->title,
  publishedAt,
  excerpt,
  "image": mainImage.asset->url
}`;

/** Fetch the six newest published resources for the homepage */
export const homepageResourcesQuery = `*[_type == "post" && defined(slug.current) && defined(publishedAt)] | order(publishedAt desc)[0...6] {
  "slug": slug.current,
  title,
  "category": category->title,
  publishedAt,
  excerpt,
  "image": mainImage.asset->url
}`;

/** Fetch a single resource post by slug (detail page) */
export const resourceBySlugQuery = `*[_type == "post" && slug.current == $slug][0] {
  "slug": slug.current,
  title,
  author,
  "category": category->title,
  publishedAt,
  excerpt,
  "image": mainImage.asset->url,
  body
}`;

/** Fetch all resource slugs (for generateStaticParams) */
export const allResourceSlugsQuery = `*[_type == "post"] { "slug": slug.current }`;

/** Fetch distinct resource categories */
export const distinctResourceCategoriesQuery = `*[_type == "resourceCategory"] | order(title asc).title`;

/** Navbar "Health Packages" dropdown (singleton controlled in Studio) */
export const packagesMenuQuery = `*[_type == "packagesMenu" && _id == "packages-menu"][0]{
  enabled,
  viewAllLabel,
  "items": items[defined(package)]{
    label,
    badge,
    "title": package->title,
    "slug": package->slug.current,
    "amount": package->amount
  }[defined(slug)]
}`;

/** Packages that include home collection (feeds the "Collected at Home" panel) */
export const homeCollectionPackagesQuery = `*[_type == "package" && homeServiceIncluded == true && defined(slug.current)] | order(_createdAt asc) {
  title,
  amount,
  image,
  description,
  testsTotal,
  benefits,
  "subTests": subTests[]{title},
  "slug": slug.current
}`;

/** Home collection landing page content (singleton controlled in Studio) */
export const homeCollectionPageQuery = `*[_type == "homeCollectionPage" && _id == "home-collection-page"][0]{
  eyebrow, headline, subheadline, directAnswer, collectionHours, coverageAreas,
  steps, highlights, faqs, closingHeading, closingText, whatsappMessage,
  heroImage
}`;
