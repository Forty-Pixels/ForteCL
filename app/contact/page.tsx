import ContactHero from '@/components/Contact/Hero/ContactHero';
import ContactContent from '@/components/Contact/Content/ContactContent';
import ContactMap from '@/components/Contact/Map/ContactMap';
import Footer from '@/components/Landing-page/Footer/Footer';

export default function ContactPage() {
    return (
        <main className="min-h-screen bg-black">
            <ContactHero />
            <ContactContent />
            <ContactMap />
            <Footer />
        </main>
    );
}
