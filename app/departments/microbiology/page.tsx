import { DEPARTMENTS_DATA } from '@/constants/departments';
import DepartmentDetailView from '@/components/Departments/Details/DepartmentDetailView';
import Footer from '@/components/Landing-page/Footer/Footer';
import { notFound } from 'next/navigation';

export const metadata = {
    title: 'Microbiology Department | Forte Clinical Laboratory',
    description: 'Expert analysis of microorganisms, pathogen detection, and antibiotic sensitivity testing.',
};

export default function MicrobiologyPage() {
    const department = DEPARTMENTS_DATA.find(d => d.id === 'microbiology');
    if (!department) notFound();

    return (
        <main className="min-h-screen bg-white">
            <DepartmentDetailView department={department} />
            <Footer />
        </main>
    );
}
