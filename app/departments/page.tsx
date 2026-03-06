import DepartmentsHero from '@/components/Departments/Hero/DepartmentsHero';
import DepartmentGrid from '@/components/Departments/Grid/DepartmentGrid';
import Footer from '@/components/Landing-page/Footer/Footer';

export default function DepartmentsPage() {
    return (
        <main className="min-h-screen bg-black">
            <DepartmentsHero />
            <DepartmentGrid />
            <Footer />
        </main>
    );
}
