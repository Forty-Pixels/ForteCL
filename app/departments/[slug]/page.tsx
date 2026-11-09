import { DEPARTMENTS_DATA } from '@/constants/departments';
import DepartmentDetailView from '@/components/Departments/Details/DepartmentDetailView';
import Footer from '@/components/Landing-page/Footer/Footer';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { client } from '@/lib/sanity';
import { allLabTestsWithDepartmentQuery } from '@/lib/queries';
import { resolveDepartmentId } from '@/lib/department-utils';

interface DepartmentPageProps {
    params: Promise<{
        slug: string;
    }>;
}

export const dynamic = 'force-dynamic';
const freshClient = client.withConfig({ useCdn: false });

type DepartmentTestRecord = {
    slug: string;
    name: string;
    tat?: string;
    sampleType?: string[];
    departmentTitle?: string;
    departmentSlug?: string;
};

export async function generateMetadata({ params }: DepartmentPageProps): Promise<Metadata> {
    const { slug } = await params;
    const department = DEPARTMENTS_DATA.find(d => d.id === slug);
    
    if (!department) {
        return {
            title: 'Department Not Found | Forte Clinical Laboratory',
        };
    }

    return {
        title: `${department.title} | Forte Clinical Laboratory`,
        description: department.description.substring(0, 160),
    };
}

export async function generateStaticParams() {
    return DEPARTMENTS_DATA.map((dept) => ({
        slug: dept.id,
    }));
}

export default async function DepartmentPage({ params }: DepartmentPageProps) {
    const { slug } = await params;
    const department = DEPARTMENTS_DATA.find(d => d.id === slug);

    if (!department) {
        notFound();
    }

    const allCmsTestsWithDepartment: DepartmentTestRecord[] = await freshClient.fetch(allLabTestsWithDepartmentQuery, {}, { cache: 'no-store' });

    const cmsTests = allCmsTestsWithDepartment
        .filter((test) => resolveDepartmentId(test.departmentTitle, test.departmentSlug) === slug)
        .map((test) => ({
            slug: test.slug,
            name: test.name,
            tat: test.tat,
            sampleType: test.sampleType,
        }));

    return (
        <main className="min-h-screen bg-white">
            <DepartmentDetailView
                department={department}
                cmsTests={cmsTests}
            />
            <Footer />
        </main>
    );
}
