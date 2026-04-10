import { DEPARTMENTS_DATA } from '@/constants/departments';
import DepartmentDetailView from '@/components/Departments/Details/DepartmentDetailView';
import Footer from '@/components/Landing-page/Footer/Footer';
import { notFound } from 'next/navigation';

export const metadata = {
    title: 'Serology Department | Forte Clinical Laboratory',
    description: 'Detection of antibodies and antigens to monitor infectious diseases and immune responses.',
};

export default function SerologyPage() {
    const department = DEPARTMENTS_DATA.find(d => d.id === 'serology');
    if (!department) notFound();

    return (
        <main className="min-h-screen bg-white">
            <DepartmentDetailView department={department} />
            <Footer />
        </main>
    );
}
