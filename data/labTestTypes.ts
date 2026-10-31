import type { PortableTextBlock } from '@portabletext/react';

export interface LabTest {
    slug: string;
    name: string;
    diseaseFilter: string;
    department: string;
    tat: string;
    sampleType: string[];
    overview?: string;
    importanceSection?: { content?: string; richContent?: PortableTextBlock[] };
    procedure?: string;
    symptoms?: string[];
    normalRanges?: string[];
    abnormalLevels?: string;
    content?: any[]; // Sanity Portable Text
    image?: string;
    imageUrl?: string;
    introImageUrl?: string;
    secondaryImageUrl?: string;
    contextImageUrl?: string;
    ctaImageUrl?: string;
    subSections?: { title: string; content: string | string[]; image?: string }[];
    process?: { title: string; description: string; image: string }[];
    faqs?: { question: string; answer: string }[];
    keyServices?: string[];
    commonTests?: { name: string; description: string }[];
    relatedTests?: { name: string; slug: string }[];
    accuracyNote?: string;
    pageCopy?: Record<string, string>;
    packages?: {
        name: string;
        description: string;
        features: string[];
        color?: string;
    }[];
}
