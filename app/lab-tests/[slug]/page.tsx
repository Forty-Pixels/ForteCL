import { notFound, redirect } from 'next/navigation';
import TestDetailHero from '@/components/LabTests/TestDetail/TestDetailHero';
import TestDetailContent from '@/components/LabTests/TestDetail/TestDetailContent';
import Footer from '@/components/Landing-page/Footer/Footer';
import { client } from '@/lib/sanity';
import { labTestBySlugQuery, allLabTestSlugsQuery, allLabTestsQuery } from '@/lib/queries';
import { getTestLink } from '@/lib/department-utils';

interface Props {
    params: Promise<{ slug: string }>;
}

// Revalidate every 60 seconds
export const revalidate = 60;

export async function generateStaticParams() {
    const slugs: { slug: string }[] = await client.fetch(allLabTestSlugsQuery);
    return slugs.map(s => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props) {
    const { slug } = await params;
    const test = await client.fetch(labTestBySlugQuery, { slug });
    if (!test) return { title: 'Test Not Found' };
    return {
        title: `${test.name} | Forte Clinical Laboratory`,
        description: `Learn about the ${test.name} test at Forte Clinical Laboratory Dubai.`,
    };
}

export default async function TestDetailPage({ params }: Props) {
    const { slug } = await params;
    
    // Fetch both the current test and all tests (for the sidebar)
    const [test, allTests] = await Promise.all([
        client.fetch(labTestBySlugQuery, { slug }),
        client.fetch(allLabTestsQuery)
    ]);

    if (!test) notFound();
    
    // Link to the department-based path instead of /lab-tests/[slug]
    const targetLink = getTestLink(test);
    if (targetLink !== `/lab-tests/${slug}`) {
        redirect(targetLink);
    }

    return (
        <main className="min-h-screen bg-white">
            <TestDetailHero test={test} />
            <TestDetailContent test={test} allTests={allTests} />
            <Footer />
        </main>
    );
}
