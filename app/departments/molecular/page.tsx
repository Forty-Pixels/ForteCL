import { DEPARTMENTS_DATA } from '@/constants/departments';
import DepartmentDetailView from '@/components/Departments/Details/DepartmentDetailView';
import Footer from '@/components/Landing-page/Footer/Footer';
import { notFound } from 'next/navigation';

export const metadata = {
    title: 'Molecular Biology / Genetics | Forte Clinical Laboratory',
    description: 'Advanced molecular level detection, genetic testing, and personalized medicine diagnostics.',
};

export default function MolecularPage() {
    const department = DEPARTMENTS_DATA.find(d => d.id === 'molecular');
    if (!department) notFound();

    return (
        <main className="min-h-screen bg-white">
            <DepartmentDetailView department={department} />
            <Footer />
        </main>
    );
}
