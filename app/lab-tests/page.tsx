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
    title: 'Medical Tests in Dubai | Forte Clinical Laboratory',
    description: 'Browse our extensive list of diagnostic tests. From routine blood work to advanced diagnostics — accurate, reliable and timely results.',
};

export const dynamic = 'force-dynamic';
const freshClient = client.withConfig({ useCdn: false });

export default async function LabTestsPage({ searchParams }: {
    searchParams: Promise<{ department?: string; search?: string }>;
}) {
    const filters = await searchParams;
    const [tests, diseaseFilters] = await Promise.all([
        freshClient.fetch(allLabTestsQuery, {}, { cache: 'no-store' }),
        freshClient.fetch(distinctDiseaseFiltersQuery, {}, { cache: 'no-store' }),
    ]);

    return (
        <main className="min-h-screen bg-white">
            <LabTestsHero />
            <LabTestsTable
                key={JSON.stringify([filters.department, filters.search])}
                tests={tests}
                diseaseFilters={diseaseFilters}
                departments={DEPARTMENT_TITLES}
                initialDepartment={DEPARTMENT_TITLES.includes(filters.department || '') ? filters.department : ''}
                initialSearch={filters.search || ''}
            />
            <Footer />
        </main>
    );
}
