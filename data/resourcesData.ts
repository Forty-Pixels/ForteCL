export interface ResourcePost {
    title: string;
    slug: string;
    image: string;
    category: string;
    date: string;
    author: string;
    excerpt: string;
    content?: any[]; // Sanity Portable Text compatible
}

export const resourcePosts: ResourcePost[] = [
    {
        title: 'What Is a Respiratory Virus?',
        slug: 'what-is-a-respiratory-virus',
        image: '/Landing-page/news/image-1.png',
        category: 'Health Awareness',
        date: 'March 20, 2026',
        author: 'Forte Medical Team',
        excerpt: 'Understanding the common types of respiratory viruses, their symptoms, and how to protect yourself during peak seasons.',
    },
    {
        title: 'Vitamins & Monitoring',
        slug: 'vitamins-monitoring',
        image: '/Landing-page/news/image-2.png',
        category: 'Wellness',
        date: 'March 15, 2026',
        author: 'Dr. Sarah Ahmed',
        excerpt: 'Why monitoring your vitamin levels is crucial for long-term health and how regular blood tests can guide your supplementation.',
    },
    {
        title: 'Pre-Marital Screening',
        slug: 'pre-marital-screening',
        image: '/Landing-page/news/image-3.png',
        category: 'Testing Guides',
        date: 'March 10, 2026',
        author: 'Forte Medical Team',
        excerpt: 'Everything you need to know about pre-marital screening in the UAE, including mandatory tests and genetic counseling.',
    },
    {
        title: 'Genomic Testing Role',
        slug: 'genomic-testing-role',
        image: '/Landing-page/news/image-4.png',
        category: 'Advanced Diagnostics',
        date: 'March 05, 2026',
        author: 'Clinical Genomics Dept',
        excerpt: 'The role of genomic testing in personalized medicine and how it helps in identifying predispositions to complex conditions.',
    },
    {
        title: 'Lab Results Dashboard',
        slug: 'lab-results-dashboard',
        image: '/Landing-page/news/image-5.png',
        category: 'Technology',
        date: 'February 28, 2026',
        author: 'Forte IT Team',
        excerpt: 'A guide on how to read and interpret your digital lab results using the new Forte Clinical Laboratory patient dashboard.',
    },
    {
        title: 'Ensuring Test Accuracy',
        slug: 'ensuring-test-accuracy',
        image: '/Landing-page/news/image-6.png',
        category: 'Quality Control',
        date: 'February 22, 2026',
        author: 'Quality Assurance Head',
        excerpt: 'An inside look at the protocols we follow to ensure medical-grade precision for every single sample processed in our lab.',
    },
    {
        title: 'Cardiac Risk Assessment',
        slug: 'cardiac-risk-assessment',
        image: '/Landing-page/news/new-item-2.png',
        category: 'Health Awareness',
        date: 'February 15, 2026',
        author: 'Cardiology Specialist',
        excerpt: 'How regular lipid profiles and biomarkers like hs-CRP can help assess your risk for cardiovascular diseases.',
    },
    {
        title: 'Routine Blood Panels',
        slug: 'routine-blood-panels',
        image: '/Landing-page/tests/test-1.png',
        category: 'Checkups',
        date: 'February 10, 2026',
        author: 'Forte Medical Team',
        excerpt: 'Why an annual routine blood panel is the single most important tool in preventive healthcare.',
    },
];
