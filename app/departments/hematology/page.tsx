import { DEPARTMENTS_DATA } from '@/constants/departments';
import DepartmentDetailView from '@/components/Departments/Details/DepartmentDetailView';
import Footer from '@/components/Landing-page/Footer/Footer';
import { notFound } from 'next/navigation';

export const metadata = {
    title: 'Hematology Department | Forte Clinical Laboratory',
    description: 'Specialized analysis and diagnosis of blood-related disorders at Forte Clinical Laboratory.',
};

export default function HematologyPage() {
    const department = DEPARTMENTS_DATA.find(d => d.id === 'hematology');
    if (!department) notFound();

    return (
        <main className="min-h-screen bg-white">
            <DepartmentDetailView department={department} />
            <Footer />
        </main>
    );
}
