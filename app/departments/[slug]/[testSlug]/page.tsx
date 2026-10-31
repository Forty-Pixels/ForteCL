import { DEPARTMENTS_DATA } from '@/constants/departments';
import { labTests } from '@/data/labTestsData';
import { client } from '@/lib/sanity';
import { labTestBySlugQuery } from '@/lib/queries';
import TestDetailView from '@/components/Departments/Details/TestDetailView';
import Footer from '@/components/Landing-page/Footer/Footer';
import { notFound, redirect } from 'next/navigation';
import { Metadata } from 'next';
import { getTestImage } from '@/lib/department-utils';
import { STD_PANELS } from '@/data/stdPanels';
import { NIPT_FAQS } from '@/data/niptFaqs';

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
    
    // Try to find in CMS first
    const cmsTest = await freshClient.fetch(labTestBySlugQuery, { slug: testSlug }, { cache: 'no-store' });
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
    if (testSlug === 'std19') notFound();
    const department = DEPARTMENTS_DATA.find(d => d.id === slug);

    if (!department) notFound();

    // Fetch from CMS
    const cmsTest = await freshClient.fetch(labTestBySlugQuery, { slug: testSlug }, { cache: 'no-store' });
    
    // Find in local data as fallback
    const localTest = labTests.find(t => t.slug === testSlug);

    if (!cmsTest && !localTest) {
        if (STD_PANELS.some(panel => panel.slug === testSlug)) {
            redirect(`/std-tests#${testSlug}`);
        }
        notFound();
    }

    const testData = cmsTest || localTest;
    const getField = (field: string) => cmsTest ? cmsTest[field] : localTest?.[field as keyof typeof localTest];
    const subSections = getField('subSections');
    const process = getField('process');

    // Map to TestDetailView props
    const viewData = {
        title: testData.name,
        tat: getField('tat'),
        sampleType: getField('sampleType'),
        description: getField('overview') ?? (cmsTest ? '' : department.description),
        importanceSection: cmsTest ? cmsTest.importanceSection : localTest?.importanceSection,
        image: getTestImage(testData),
        introImage: cmsTest?.introImageUrl,
        secondaryImage: cmsTest?.secondaryImageUrl,
        contextImage: cmsTest?.contextImageUrl,
        ctaImage: cmsTest?.ctaImageUrl,
        keyServices: getField('keyServices') ?? (cmsTest ? [] : department.keyServices),
        howItems: cmsTest ? (cmsTest.howItems ?? []) : (getField('keyServices') ?? department.keyServices)?.map((title: string) => ({
            title,
            description: 'Professional diagnostic services tailored to your specific clinical needs.',
        })),
        commonTests: getField('commonTests') ?? (cmsTest ? [] : department.commonTests),
        subSections: (subSections ?? (cmsTest ? [] : department.subSections))?.map((section: { title: string; content?: string | string[]; items?: string[]; image?: string; imageUrl?: string }) => ({
            ...section,
            content: section.items?.length ? section.items : section.content ?? '',
            image: section.imageUrl ?? section.image,
        })),
        process: (process ?? (cmsTest ? [] : department.process))?.map((step: { title: string; description: string; image?: string; imageUrl?: string }) => ({
            ...step,
            image: step.imageUrl ?? step.image,
        })),
        faqs: getField('faqs') ?? (cmsTest ? [] : testSlug === 'nipt' ? NIPT_FAQS : department.faqs),
        accuracyNote: getField('accuracyNote'),
        packages: getField('packages'),
        pageCopy: cmsTest ? {
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
        } : getField('pageCopy'),
    };

    return (
        <main className="min-h-screen bg-white">
            <TestDetailView test={viewData} />
            <Footer />
        </main>
    );
}
