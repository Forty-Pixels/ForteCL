import DepartmentsHero from '@/components/Departments/Hero/DepartmentsHero';
import DepartmentGrid from '@/components/Departments/List/DepartmentGrid';
import Footer from '@/components/Landing-page/Footer/Footer';

export default function DepartmentsPage() {
    return (
        <main className="min-h-screen bg-white">
            <DepartmentsHero />
            <div className="pt-4">
                <DepartmentGrid />
            </div>
            <Footer />
        </main>
    );
}
