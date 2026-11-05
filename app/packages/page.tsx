import PackagesHero from '@/components/Packages/Hero/PackagesHero';
import PackagesList from '@/components/Packages/List/PackagesList';
import Footer from '@/components/Landing-page/Footer/Footer';
import { client } from '@/lib/sanity';
import HomeCollectionPanel from '@/components/Packages/HomeCollection/HomeCollectionPanel';
import { allPackagesQuery, homeCollectionPackagesQuery } from '@/lib/queries';

// Revalidate every 60 seconds
export const revalidate = 60;

export default async function PackagesPage() {
    const [packages, homePackages] = await Promise.all([
        client.fetch(allPackagesQuery),
        client.fetch(homeCollectionPackagesQuery),
    ]);

    return (
        <main className="min-h-screen bg-black">
            <PackagesHero />
            <PackagesList initialPackages={packages} />
            {homePackages.length > 0 && <div className="bg-white py-14"><HomeCollectionPanel packages={homePackages} /></div>}
            <Footer />
        </main>
    );
}
