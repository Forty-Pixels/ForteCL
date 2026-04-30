import LabTestsHero from '@/components/LabTests/Hero/LabTestsHero';
import LabTestsTable from '@/components/LabTests/Table/LabTestsTable';
import Footer from '@/components/Landing-page/Footer/Footer';
import { client } from '@/lib/sanity';
import {
    allLabTestsQuery,
    distinctDiseaseFiltersQuery,
    distinctDepartmentsQuery,
} from '@/lib/queries';

export const metadata = {
    title: 'Lab Tests | Forte Clinical Laboratory',
    description: 'Browse our extensive list of diagnostic tests. From routine blood work to advanced diagnostics — accurate, reliable and timely results.',
};

// Revalidate every 60 seconds so CMS changes appear quickly
export const revalidate = 60;

export default async function LabTestsPage() {
    const [tests, diseaseFilters, departments] = await Promise.all([
        client.fetch(allLabTestsQuery),
        client.fetch(distinctDiseaseFiltersQuery),
        client.fetch(distinctDepartmentsQuery),
    ]);

    // Inject NIPT test manually
    const allTests = [
        {
            name: 'NIPT Test (Prenatal Screening)',
            slug: 'nipt',
            department: 'Molecular Biology / Genetics',
            category: ['Prenatal', 'Genetics'],
            tat: '7-10 Days',
            price: 'Contact for Price'
        },
        ...tests
    ];

    return (
        <main className="min-h-screen bg-white">
            <LabTestsHero />
            <LabTestsTable
                tests={allTests}
                diseaseFilters={diseaseFilters}
                departments={departments}
            />
            <Footer />
        </main>
    );
}
