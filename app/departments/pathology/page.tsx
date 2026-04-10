import { DEPARTMENTS_DATA } from '@/constants/departments';
import DepartmentDetailView from '@/components/Departments/Details/DepartmentDetailView';
import Footer from '@/components/Landing-page/Footer/Footer';
import { notFound } from 'next/navigation';

export const metadata = {
    title: 'Pathology / Histopathology Department | Forte Clinical Laboratory',
    description: 'Microscopic examination of tissues and cells for early detection of cancer and tissue abnormalities.',
};

export default function PathologyPage() {
    const department = DEPARTMENTS_DATA.find(d => d.id === 'pathology');
    if (!department) notFound();

    return (
        <main className="min-h-screen bg-white">
            <DepartmentDetailView department={department} />
            <Footer />
        </main>
    );
}
