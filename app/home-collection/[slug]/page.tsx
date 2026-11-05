import type { Metadata } from 'next';
import { notFound, redirect } from 'next/navigation';
import { client } from '@/lib/sanity';
import { packageBySlugQuery } from '@/lib/queries';
import PackageDetailView from '@/components/Packages/Details/PackageDetailView';
import Footer from '@/components/Landing-page/Footer/Footer';

export const dynamic = 'force-dynamic';
const packageClient = client.withConfig({ useCdn: false });

interface Props {
    params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const pkg = await packageClient.fetch(packageBySlugQuery, { slug }, { cache: 'no-store' });
    if (!pkg) return { title: 'Package Not Found' };
    return {
        title: `${pkg.title} | Home Collection | Forte Clinical Laboratory`,
        description: pkg.description || `Book the ${pkg.title} package with home collection from Forte Clinical Laboratory.`,
    };
}

export default async function HomeCollectionPackagePage({ params }: Props) {
    const { slug } = await params;
    const pkg = await packageClient.fetch(packageBySlugQuery, { slug }, { cache: 'no-store' });
    if (!pkg) notFound();
    // Only packages with home collection live here; others keep their Health Packages page.
    if (pkg.homeServiceIncluded !== true) redirect(`/packages/${slug}`);

    return (
        <main className="min-h-screen">
            <PackageDetailView pkg={pkg} variant="home" />
            <Footer />
        </main>
    );
}
