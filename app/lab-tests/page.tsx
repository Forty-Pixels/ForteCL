import LabTestsHero from '@/components/LabTests/Hero/LabTestsHero';
import LabTestsTable from '@/components/LabTests/Table/LabTestsTable';
import Footer from '@/components/Landing-page/Footer/Footer';
import { client } from '@/lib/sanity';
import {
    allLabTestsQuery,
    distinctDiseaseFiltersQuery,
} from '@/lib/queries';
import { DEPARTMENT_TITLES } from '@/constants/department-categories';

export const metadata = {
    title: 'Lab Tests | Forte Clinical Laboratory',
    description: 'Browse our extensive list of diagnostic tests. From routine blood work to advanced diagnostics — accurate, reliable and timely results.',
};

// Revalidate every 60 seconds so CMS changes appear quickly
export const revalidate = 60;

export default async function LabTestsPage({ searchParams }: {
    searchParams: Promise<{ department?: string; search?: string }>;
}) {
    const filters = await searchParams;
    const [tests, diseaseFilters] = await Promise.all([
        client.fetch(allLabTestsQuery),
        client.fetch(distinctDiseaseFiltersQuery),
    ]);

    // Inject NIPT test manually
    const allTests = [
        {
            name: 'NIPT Test (Prenatal Screening)',
            slug: 'nipt',
            department: 'Molecular Biology/Genetics',
            diseaseFilter: 'Genetic Tests',
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
                key={JSON.stringify([filters.department, filters.search])}
                tests={allTests}
                diseaseFilters={diseaseFilters}
                departments={DEPARTMENT_TITLES}
                initialDepartment={DEPARTMENT_TITLES.includes(filters.department || '') ? filters.department : ''}
                initialSearch={filters.search || ''}
            />
            <Footer />
        </main>
    );
}
