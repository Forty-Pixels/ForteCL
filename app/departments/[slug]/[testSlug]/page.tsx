import { DEPARTMENTS_DATA } from '@/constants/departments';
import { labTests } from '@/data/labTestsData';
import { client } from '@/lib/sanity';
import { labTestBySlugQuery } from '@/lib/queries';
import TestDetailView from '@/components/Departments/Details/TestDetailView';
import Footer from '@/components/Landing-page/Footer/Footer';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

interface TestPageProps {
    params: Promise<{
        slug: string;
        testSlug: string;
    }>;
}

export async function generateMetadata({ params }: TestPageProps): Promise<Metadata> {
    const { slug, testSlug } = await params;
    
    // Try to find in CMS first
    const cmsTest = await client.fetch(labTestBySlugQuery, { slug: testSlug });
    if (cmsTest) {
        return {
            title: `${cmsTest.name} | ${cmsTest.department} | Forte Clinical Laboratory`,
            description: cmsTest.overview || `Learn more about ${cmsTest.name} at Forte Clinical Laboratory.`,
        };
    }

    // Fallback to local data
    const localTest = labTests.find(t => t.slug === testSlug);
    if (localTest) {
        return {
            title: `${localTest.name} | ${localTest.department} | Forte Clinical Laboratory`,
        };
    }

    return { title: 'Test Not Found' };
}

export default async function TestPage({ params }: TestPageProps) {
    const { slug, testSlug } = await params;
    const department = DEPARTMENTS_DATA.find(d => d.id === slug);

    if (!department) notFound();

    // Fetch from CMS
    const cmsTest = await client.fetch(labTestBySlugQuery, { slug: testSlug });
    
    // Find in local data as fallback
    const localTest = labTests.find(t => t.slug === testSlug);

    if (!cmsTest && !localTest) {
        notFound();
    }

    const testData = cmsTest || localTest;

    // Map to TestDetailView props
    const viewData = {
        title: testData.name,
        description: testData.overview || department.description,
        image: testData.image || department.image,
        keyServices: testData.keyServices || department.keyServices,
        commonTests: department.commonTests, // This usually lists what the test is for
        subSections: testData.subSections || department.subSections,
        process: testData.process || department.process,
        faqs: testData.faqs || department.faqs,
    };

    return (
        <main className="min-h-screen bg-white">
            <TestDetailView test={viewData} />
            <Footer />
        </main>
    );
}
