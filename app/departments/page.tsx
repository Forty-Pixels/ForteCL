import DepartmentsHero from '@/components/Departments/Hero/DepartmentsHero';
import DepartmentNav from '@/components/Departments/List/DepartmentNav';
import DepartmentList from '@/components/Departments/List/DepartmentList';
import Footer from '@/components/Landing-page/Footer/Footer';

export default function DepartmentsPage() {
    return (
        <main className="min-h-screen bg-white">
            <DepartmentsHero />
            <DepartmentNav />
            <div className="pt-8">
                <DepartmentList />
            </div>
            <Footer />
        </main>
    );
}
