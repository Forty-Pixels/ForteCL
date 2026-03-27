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
    relatedTests?: { name: string; slug: string }[];
}
