import type { Metadata } from 'next';
import { client } from '@/lib/sanity';
import { homeCollectionPageQuery, homeCollectionPackagesQuery } from '@/lib/queries';
import HomeCollectionPage from '@/components/Packages/HomeCollection/HomeCollectionPage';
import Footer from '@/components/Landing-page/Footer/Footer';

// Edits in Studio appear on the next request.
export const dynamic = 'force-dynamic';
const freshClient = client.withConfig({ useCdn: false });

export const metadata: Metadata = {
    title: 'Home Blood Test Collection in Dubai | Forte Clinical Laboratory',
    description: 'Book a health package with home sample collection in Dubai. DHA-approved laboratory, confirmed appointments and digital reports.',
};

export default async function HomeCollectionRoute() {
    const [content, packages] = await Promise.all([
        freshClient.fetch(homeCollectionPageQuery, {}, { cache: 'no-store' }),
        freshClient.fetch(homeCollectionPackagesQuery, {}, { cache: 'no-store' }),
    ]);

    return (
        <>
            <HomeCollectionPage content={content} packages={packages ?? []} />
            <Footer />
        </>
    );
}
