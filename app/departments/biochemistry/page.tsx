import { DEPARTMENTS_DATA } from '@/constants/departments';
import DepartmentDetailView from '@/components/Departments/Details/DepartmentDetailView';
import Footer from '@/components/Landing-page/Footer/Footer';
import { notFound } from 'next/navigation';

export const metadata = {
    title: 'Clinical Biochemistry Department | Forte Clinical Laboratory',
    description: 'Analysis of blood and body fluids to evaluate organ function and metabolic disorders.',
};

export default function BiochemistryPage() {
    const department = DEPARTMENTS_DATA.find(d => d.id === 'biochemistry');
    if (!department) notFound();

    return (
        <main className="min-h-screen bg-white">
            <DepartmentDetailView department={department} />
            <Footer />
        </main>
    );
}
