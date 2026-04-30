import { DEPARTMENTS_DATA } from '@/constants/departments';
import DepartmentDetailView from '@/components/Departments/Details/DepartmentDetailView';
import Footer from '@/components/Landing-page/Footer/Footer';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { client } from '@/lib/sanity';
import { allLabTestsWithDepartmentQuery } from '@/lib/queries';

interface DepartmentPageProps {
    params: Promise<{
        slug: string;
    }>;
}

type DepartmentTestRecord = {
    slug: string;
    name: string;
    tat?: string;
    sampleType?: string[];
    departmentTitle?: string;
    departmentSlug?: string;
};

const normalizeText = (value?: string) =>
    (value || '')
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();

const DEPARTMENT_ALIASES: Record<string, string[]> = {
    hematology: ['hematology'],
    microbiology: ['microbiology'],
    immunology: ['immunology'],
    serology: ['serology'],
    biochemistry: ['biochemistry', 'clinical biochemistry', 'clinical chemistry'],
    pathology: ['pathology', 'histopathology', 'histo pathology', 'clinical pathology'],
    molecular: ['molecular', 'molecular biology', 'molecular diagnostics', 'genetics'],
    cytopathology: ['cytopathology', 'cytology', 'histopathology cytopathology'],
};

const resolveDepartmentIdFromCms = (record: DepartmentTestRecord) => {
    const slugNorm = normalizeText(record.departmentSlug);
    const titleNorm = normalizeText(record.departmentTitle);

    let best: { id: string; score: number } | null = null;

    for (const [id, aliases] of Object.entries(DEPARTMENT_ALIASES)) {
        let score = 0;
        const idNorm = normalizeText(id);

        if (slugNorm && (slugNorm === idNorm || slugNorm.includes(idNorm) || idNorm.includes(slugNorm))) {
            score += 8;
        }

        for (const alias of aliases) {
            const aliasNorm = normalizeText(alias);
            if (!aliasNorm) continue;
            if (titleNorm === aliasNorm) score += 6;
            else if (titleNorm.includes(aliasNorm) || aliasNorm.includes(titleNorm)) score += 4;
            if (slugNorm === aliasNorm || slugNorm.includes(aliasNorm)) score += 5;
        }

        if (score > 0 && (!best || score > best.score)) {
            best = { id, score };
        }
    }

    if (!best || best.score < 4) return null;
    return best.id;
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

    const allCmsTestsWithDepartment: DepartmentTestRecord[] = await client.fetch(allLabTestsWithDepartmentQuery);

    const cmsTests = allCmsTestsWithDepartment
        .filter((test) => resolveDepartmentIdFromCms(test) === slug)
        .map((test) => ({
            slug: test.slug,
            name: test.name,
            tat: test.tat,
            sampleType: test.sampleType,
        }));

    // Manually add NIPT test for Molecular department
    if (slug === 'molecular') {
        cmsTests.unshift({
            slug: 'nipt',
            name: 'NIPT Test',
            tat: '7-10 Days',
            sampleType: ['Blood']
        });
    }

    const allCmsTests = allCmsTestsWithDepartment.map((test) => ({
        slug: test.slug,
        name: test.name,
    }));

    return (
        <main className="min-h-screen bg-white">
            <DepartmentDetailView
                department={department}
                cmsTests={cmsTests}
                allCmsTests={allCmsTests}
            />
            <Footer />
        </main>
    );
}
