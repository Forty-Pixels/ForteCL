export interface LabTest {
    slug: string;
    name: string;
    diseaseFilter: string;
    department: string;
    tat: string;
    sampleType: string[];
    overview?: string;
    procedure?: string;
    symptoms?: string[];
    normalRanges?: string[];
    abnormalLevels?: string;
    content?: any[]; // Sanity Portable Text
    image?: string;
    subSections?: { title: string; content: string | string[]; image?: string }[];
    process?: { title: string; description: string; image: string }[];
    faqs?: { question: string; answer: string }[];
    keyServices?: string[];
    relatedTests?: { name: string; slug: string }[];
    accuracyNote?: string;
    packages?: {
        name: string;
        description: string;
        features: string[];
        color?: string;
    }[];
}
