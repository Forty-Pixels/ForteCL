// ── GROQ queries for Sanity CMS ──────────────────────────

// ─── Lab Tests ───────────────────────────────────────────

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
  heroSection, introSection, considerSection, howSection, processSection,
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
