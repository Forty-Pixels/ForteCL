import { DEPARTMENTS_DATA } from '@/constants/departments';
import { client } from '@/lib/sanity';
import { labTestBySlugQuery } from '@/lib/queries';
import TestDetailView from '@/components/Departments/Details/TestDetailView';
import Footer from '@/components/Landing-page/Footer/Footer';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { getTestImage, resolveDepartmentId } from '@/lib/department-utils';

interface TestPageProps {
    params: Promise<{
        slug: string;
        testSlug: string;
    }>;
}

export const dynamic = 'force-dynamic';
const freshClient = client.withConfig({ useCdn: false });

export async function generateMetadata({ params }: TestPageProps): Promise<Metadata> {
    const { slug, testSlug } = await params;
    if (testSlug === 'std19') return { title: 'Test Not Found' };
    
    const cmsTest = await freshClient.fetch(labTestBySlugQuery, { slug: testSlug }, { cache: 'no-store' });
    if (cmsTest && resolveDepartmentId(cmsTest.department, cmsTest.departmentSlug) === slug) {
        return {
            title: `${cmsTest.name} | ${cmsTest.department} | Forte Clinical Laboratory`,
            description: cmsTest.overview || `Learn more about ${cmsTest.name} at Forte Clinical Laboratory.`,
        };
    }

    return { title: 'Test Not Found' };
}

export default async function TestPage({ params }: TestPageProps) {
    const { slug, testSlug } = await params;
    if (testSlug === 'std19') notFound();
    const department = DEPARTMENTS_DATA.find(d => d.id === slug);

    if (!department) notFound();

    const cmsTest = await freshClient.fetch(labTestBySlugQuery, { slug: testSlug }, { cache: 'no-store' });
    if (!cmsTest || resolveDepartmentId(cmsTest.department, cmsTest.departmentSlug) !== slug) notFound();

    const subSections = cmsTest.subSections;
    const process = cmsTest.process;

    // Map to TestDetailView props
    const viewData = {
        title: cmsTest.name,
        tat: cmsTest.tat,
        sampleType: cmsTest.sampleType,
        organismsSection: cmsTest.organismsSection,
        description: cmsTest.overview ?? '',
        importanceSection: cmsTest.importanceSection,
        image: getTestImage(cmsTest),
        introImage: cmsTest.introImageUrl,
        secondaryImage: cmsTest.secondaryImageUrl,
        contextImage: cmsTest.contextImageUrl,
        ctaImage: cmsTest.ctaImageUrl,
        keyServices: cmsTest.keyServices ?? [],
        howItems: cmsTest.howItems ?? [],
        commonTests: cmsTest.commonTests ?? [],
        subSections: (subSections ?? [])?.map((section: { title: string; content?: string | string[]; items?: string[]; image?: string; imageUrl?: string }) => ({
            ...section,
            content: section.items?.length ? section.items : section.content ?? '',
            image: section.imageUrl ?? section.image,
        })),
        process: (process ?? [])?.map((step: { title: string; description: string; image?: string; imageUrl?: string }) => ({
            ...step,
            image: step.imageUrl ?? step.image,
        })),
        faqs: cmsTest.faqs ?? [],
        accuracyNote: cmsTest.accuracyNote,
        packages: cmsTest.packages,
        pageCopy: {
            introHeading: cmsTest.introSection?.heading ?? cmsTest.pageCopy?.introHeading,
            considerHeading: cmsTest.considerSection?.heading ?? cmsTest.pageCopy?.considerHeading,
            howHeading: cmsTest.howSection?.heading ?? cmsTest.pageCopy?.howHeading,
            processHeading: cmsTest.processSection?.heading ?? cmsTest.pageCopy?.processHeading,
            processSubtitle: cmsTest.processSection?.subtitle ?? cmsTest.pageCopy?.processSubtitle,
            accuracyHeading: cmsTest.accuracySection?.heading ?? cmsTest.pageCopy?.accuracyHeading,
            packagesHeading: cmsTest.panelsSection?.heading ?? cmsTest.pageCopy?.packagesHeading,
            packagesSubtitle: cmsTest.panelsSection?.subtitle ?? cmsTest.pageCopy?.packagesSubtitle,
            faqHeading: cmsTest.faqSection?.heading ?? cmsTest.pageCopy?.faqHeading,
            ctaHeading: cmsTest.ctaSection?.heading ?? cmsTest.pageCopy?.ctaHeading,
            ctaDescription: cmsTest.ctaSection?.description ?? cmsTest.pageCopy?.ctaDescription,
        },
    };

    return (
        <main className="min-h-screen bg-white">
            <TestDetailView test={viewData} />
            <Footer />
        </main>
    );
}
