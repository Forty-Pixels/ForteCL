import PackagesHero from '@/components/Packages/Hero/PackagesHero';
import PackagesList from '@/components/Packages/List/PackagesList';
import Footer from '@/components/Landing-page/Footer/Footer';
import { client } from '@/lib/sanity';
import { allPackagesQuery } from '@/lib/queries';

// Revalidate every 60 seconds
export const revalidate = 60;

export default async function PackagesPage() {
    const packages = await client.fetch(allPackagesQuery);

    return (
        <main className="min-h-screen bg-black">
            <PackagesHero />
            <PackagesList initialPackages={packages} />
            <Footer />
        </main>
    );
}
