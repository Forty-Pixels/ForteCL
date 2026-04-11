import AboutHero from '@/components/About/Hero/AboutHero';
import LeadingTheWay from '@/components/About/LeadingTheWay/LeadingTheWay';
import MissionVision from '@/components/About/MissionVision/MissionVision';
import Facilities from '@/components/About/Facilities/Facilities';
import QualityPolicy from '@/components/About/QualityPolicy/QualityPolicy';
import Footer from '@/components/Landing-page/Footer/Footer';

export default function AboutPage() {
    return (
        <main className="min-h-screen bg-black overflow-x-hidden">
            <AboutHero />
            <LeadingTheWay />
            <Facilities />
            <MissionVision />
            <QualityPolicy />
            <Footer />
        </main>
    );
}
