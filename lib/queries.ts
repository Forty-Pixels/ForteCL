// ── GROQ queries for Sanity CMS ──────────────────────────

// ─── Lab Tests ───────────────────────────────────────────

/** Fetch all lab tests (listing page) */
export const allLabTestsQuery = `*[_type == "labTest"] | order(name asc) {
  "slug": slug.current,
  name,
  "diseaseFilter": diseaseFilter->title,
  "department": department->title,
  tat,
  sampleType,
  image
}`;

/** Fetch a single lab test by slug (detail page) */
export const labTestBySlugQuery = `*[_type == "labTest" && slug.current == $slug][0] {
  "slug": slug.current,
  name,
  "diseaseFilter": diseaseFilter->title,
  "department": department->title,
  tat,
  sampleType,
  content,
  image,
  "relatedTests": relatedTests[]->{
    name,
    "slug": slug.current
  }
}`;

/** Fetch all lab test slugs (for generateStaticParams) */
export const allLabTestSlugsQuery = `*[_type == "labTest"] { "slug": slug.current }`;

/** Fetch all lab test names/slugs (for cross-linking from departments) */
export const allLabTestNamesAndSlugsQuery = `*[
  _type == "labTest" &&
  defined(slug.current)
] | order(name asc) {
  name,
  "slug": slug.current
}`;

/** Fetch all lab tests with department metadata for department-page mapping */
export const allLabTestsWithDepartmentQuery = `*[
  _type == "labTest" &&
  defined(slug.current)
] | order(name asc) {
  "slug": slug.current,
  name,
  tat,
  sampleType,
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
  department->slug.current == $slug
] | order(name asc) {
  "slug": slug.current,
  name,
  tat,
  sampleType
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
  subTests
}`;

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
