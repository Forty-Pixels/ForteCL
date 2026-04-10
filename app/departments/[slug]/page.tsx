import { DEPARTMENTS_DATA } from '@/constants/departments';
import DepartmentDetailView from '@/components/Departments/Details/DepartmentDetailView';
import Footer from '@/components/Landing-page/Footer/Footer';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

interface DepartmentPageProps {
    params: {
        slug: string;
    };
}

export async function generateMetadata({ params }: DepartmentPageProps): Promise<Metadata> {
    const department = DEPARTMENTS_DATA.find(d => d.id === params.slug);
    
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

export default function DepartmentPage({ params }: DepartmentPageProps) {
    const department = DEPARTMENTS_DATA.find(d => d.id === params.slug);

    if (!department) {
        notFound();
    }

    return (
        <main className="min-h-screen bg-white">
            <DepartmentDetailView department={department} />
            <Footer />
        </main>
    );
}
