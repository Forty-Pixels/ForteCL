// ── GROQ queries for Sanity CMS ──────────────────────────

// ─── Lab Tests ───────────────────────────────────────────

/** Fetch all lab tests (listing page) */
export const allLabTestsQuery = `*[_type == "labTest"] | order(name asc) {
  "slug": slug.current,
  name,
  "diseaseFilter": diseaseFilter->title,
  "department": department->title,
  tat,
  sampleType
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
  "relatedTests": relatedTests[]->{
    name,
    "slug": slug.current
  }
}`;

/** Fetch all lab test slugs (for generateStaticParams) */
export const allLabTestSlugsQuery = `*[_type == "labTest"] { "slug": slug.current }`;

/** Fetch distinct disease filters (from the dedicated document type) */
export const distinctDiseaseFiltersQuery = `*[_type == "diseaseCategory"] | order(title asc).title`;

/** Fetch distinct departments (from the dedicated document type) */
export const distinctDepartmentsQuery = `*[_type == "department"] | order(title asc).title`;


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
