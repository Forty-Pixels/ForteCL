import { DEPARTMENTS_DATA } from '@/constants/departments';
import DepartmentDetailView from '@/components/Departments/Details/DepartmentDetailView';
import Footer from '@/components/Landing-page/Footer/Footer';
import { notFound } from 'next/navigation';

export const metadata = {
    title: 'Histopathology & Cytopathology | Forte Clinical Laboratory',
    description: 'In-depth study of diseases at the microscopic level through tissues and cellular analysis.',
};

export default function CytopathologyPage() {
    const department = DEPARTMENTS_DATA.find(d => d.id === 'cytopathology');
    if (!department) notFound();

    return (
        <main className="min-h-screen bg-white">
            <DepartmentDetailView department={department} />
            <Footer />
        </main>
    );
}
