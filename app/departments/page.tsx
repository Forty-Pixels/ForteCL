import DepartmentsHero from '@/components/Departments/Hero/DepartmentsHero';
import DepartmentGrid from '@/components/Departments/List/DepartmentGrid';
import DepartmentQuote from '@/components/Departments/Quote/DepartmentQuote';
import DepartmentDifference from '@/components/Departments/Difference/DepartmentDifference';
import DepartmentCTA from '@/components/Departments/CTA/DepartmentCTA';
import Footer from '@/components/Landing-page/Footer/Footer';

export default function DepartmentsPage() {
    return (
        <main className="min-h-screen bg-white">
            <DepartmentsHero />
            <DepartmentGrid />
            <DepartmentQuote />
            <DepartmentDifference />
            <DepartmentCTA />
            <Footer />
        </main>
    );
}
