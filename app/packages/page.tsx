import PackagesHero from '@/components/Packages/Hero/PackagesHero';
import PackagesList from '@/components/Packages/List/PackagesList';
import Footer from '@/components/Landing-page/Footer/Footer';

export default function PackagesPage() {
    return (
        <main className="min-h-screen bg-black">
            <PackagesHero />
            <PackagesList />
            <Footer />
        </main>
    );
}
