import { client } from '@/lib/sanity';
import { packageBySlugQuery, allPackageSlugsQuery } from '@/lib/queries';
import PackageDetailView from '@/components/Packages/Details/PackageDetailView';
import Footer from '@/components/Landing-page/Footer/Footer';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

interface PackagePageProps {
    params: Promise<{
        slug: string;
    }>;
}

export async function generateMetadata({ params }: PackagePageProps): Promise<Metadata> {
    const { slug } = await params;
    const pkg = await client.fetch(packageBySlugQuery, { slug });
    
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
    const pkg = await client.fetch(packageBySlugQuery, { slug });

    if (!pkg) {
        notFound();
    }

    return (
        <main className="min-h-screen">
            <PackageDetailView pkg={pkg} />
            <Footer />
        </main>
    );
}
