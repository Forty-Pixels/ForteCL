import AboutHero from '@/components/About/Hero/AboutHero';
import LeadingTheWay from '@/components/About/LeadingTheWay/LeadingTheWay';
import MissionVision from '@/components/About/MissionVision/MissionVision';
import AdvancedDepartments from '@/components/About/AdvancedDepartments/AdvancedDepartments';
import Footer from '@/components/Landing-page/Footer/Footer';

export default function AboutPage() {
    return (
        <main className="min-h-screen bg-black">
            <AboutHero />
            <LeadingTheWay />
            <MissionVision />
            <AdvancedDepartments />
            <Footer />
        </main>
    );
}
