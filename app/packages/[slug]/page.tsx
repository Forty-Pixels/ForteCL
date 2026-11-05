import { client } from '@/lib/sanity';
import { packageBySlugQuery, allPackageSlugsQuery } from '@/lib/queries';
import PackageDetailView from '@/components/Packages/Details/PackageDetailView';
import Footer from '@/components/Landing-page/Footer/Footer';
import { notFound, redirect } from 'next/navigation';
import { Metadata } from 'next';

// Package edits should appear on the next request after publishing in Studio.
export const dynamic = 'force-dynamic';
const packageClient = client.withConfig({ useCdn: false });

interface PackagePageProps {
    params: Promise<{
        slug: string;
    }>;
}

export async function generateMetadata({ params }: PackagePageProps): Promise<Metadata> {
    const { slug } = await params;
    const pkg = await packageClient.fetch(packageBySlugQuery, { slug }, { cache: 'no-store' });
    
    if (!pkg) return { title: 'Package Not Found' };

    return {
        title: `${pkg.title} | Health Packages | Forte Clinical Laboratory`,
        description: pkg.description || `Learn more about our ${pkg.title} health package at Forte Clinical Laboratory.`,
    };
}

export async function generateStaticParams() {
    const slugs = await client.fetch(allPackageSlugsQuery);
    return slugs.map((s: { slug: string }) => ({
        slug: s.slug,
    }));
}

export default async function PackagePage({ params }: PackagePageProps) {
    const { slug } = await params;
    const pkg = await packageClient.fetch(packageBySlugQuery, { slug }, { cache: 'no-store' });

    if (!pkg) {
        notFound();
    }

    // Packages with home collection have their own page under Home Collection.
    if (pkg.homeServiceIncluded === true) redirect(`/home-collection/${slug}`);

    return (
        <main className="min-h-screen">
            <PackageDetailView pkg={pkg} />
            <Footer />
        </main>
    );
}
