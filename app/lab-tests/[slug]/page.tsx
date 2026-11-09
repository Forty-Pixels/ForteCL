import { notFound, redirect } from 'next/navigation';
import TestDetailHero from '@/components/LabTests/TestDetail/TestDetailHero';
import TestDetailContent from '@/components/LabTests/TestDetail/TestDetailContent';
import OrganismsSection from '@/components/LabTests/OrganismsSection';
import Footer from '@/components/Landing-page/Footer/Footer';
import { client } from '@/lib/sanity';
import { labTestBySlugQuery, allLabTestSlugsQuery, allLabTestsQuery } from '@/lib/queries';
import { getTestLink } from '@/lib/department-utils';

interface Props {
    params: Promise<{ slug: string }>;
}

export const dynamic = 'force-dynamic';
const freshClient = client.withConfig({ useCdn: false });

export async function generateStaticParams() {
    const slugs: { slug: string }[] = await client.fetch(allLabTestSlugsQuery);
    return slugs.map(s => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props) {
    const { slug } = await params;
    if (slug === 'std19') return { title: 'Test Not Found' };
    const test = await freshClient.fetch(labTestBySlugQuery, { slug }, { cache: 'no-store' });
    if (!test) return { title: 'Test Not Found' };
    return {
        title: `${test.name} | Forte Clinical Laboratory`,
        description: `Learn about the ${test.name} test at Forte Clinical Laboratory Dubai.`,
    };
}

export default async function TestDetailPage({ params }: Props) {
    const { slug } = await params;
    if (slug === 'std19') notFound();
    
    // Fetch both the current test and all tests (for the sidebar)
    const [test, allTests] = await Promise.all([
        freshClient.fetch(labTestBySlugQuery, { slug }, { cache: 'no-store' }),
        freshClient.fetch(allLabTestsQuery, {}, { cache: 'no-store' })
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
            <OrganismsSection section={test.organismsSection} />
            <TestDetailContent test={test} allTests={allTests} />
            <Footer />
        </main>
    );
}
