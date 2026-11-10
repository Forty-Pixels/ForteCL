import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { CheckIcon, ShieldCheckIcon, ClockIcon, DocumentTextIcon, HomeIcon, MapPinIcon, UserGroupIcon } from '@heroicons/react/24/outline';
import Navbar from '@/components/Navbar/Navbar';
import Footer from '@/components/Landing-page/Footer/Footer';
import styles from './page.module.css';

export const metadata: Metadata = {
    title: 'Lab Tests at Home in Dubai | Forte Clinical Laboratory',
    description: 'Arrange lab tests with home sample collection in Dubai. Professional collection, in-house laboratory processing and digital reports from Forte Clinical Laboratory.',
};

const whatsapp = `https://wa.me/971569925611?text=${encodeURIComponent('Hi Forte, I would like to arrange lab tests at home in Dubai. Please confirm availability, preparation, pricing and report times.')}`;
const phone = 'tel:+971569925611';
const button = 'inline-flex min-h-10 items-center justify-center rounded-full px-5 py-2.5 text-xs font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#307984]';

const workflow = [
    { icon: ClockIcon, time: '30 Mins', title: 'Team Arrival', text: 'Our collection specialist visits your home, hotel or office with sterile equipment for a comfortable sample draw.' },
    { icon: ShieldCheckIcon, time: '45 Mins', title: 'Cold-Chain Lab Transport', text: 'Your samples travel in sealed, temperature-controlled medical containers directly to our laboratory for processing.' },
    { icon: DocumentTextIcon, time: 'Under 2 Hours', title: 'Official PDF Report Delivered', text: 'Receive your authorised laboratory report digitally, with convenient delivery through WhatsApp or email.' },
];

const benefits = [
    { icon: ShieldCheckIcon, title: 'DHA-approved laboratory', text: 'Your samples are processed in-house at Forte Clinical Laboratory in Dubai.' },
    { icon: UserGroupIcon, title: 'Experienced collection team', text: 'Trained phlebotomists provide attentive, professional sample collection at your appointment.' },
    { icon: ClockIcon, title: '30-minute doorstep arrival', text: 'Our collection team reaches your Dubai address in 30 minutes, so your lab appointment fits into your day.' },
    { icon: DocumentTextIcon, title: 'Digital reports', text: 'Receive your authorised results by WhatsApp or email without another trip to the laboratory.' },
    { icon: HomeIcon, title: 'Protected sample transport', text: 'Sealed samples travel in temperature-controlled containers to preserve their condition on the way to the laboratory.' },
    { icon: CheckIcon, title: 'Clear information before booking', text: 'Know the price, preparation requirements and expected report time before confirming your visit.' },
];

const faqs = [
    { question: 'How do I book lab tests at home in Dubai?', answer: 'Call or WhatsApp Forte with your test request, location and preferred appointment time. Our team will confirm availability, the charge and any preparation before you book.' },
    { question: 'How soon can someone visit me?', answer: 'Our team can reach your address in Dubai in 30 minutes. Send your location on WhatsApp to arrange your collection.' },
    { question: 'When will I receive my results?', answer: 'Our rapid reporting service delivers results in under 2 hours. Our team confirms the report time for your requested tests when you book, as specialised tests may require longer.' },
    { question: 'Do I need to fast before sample collection?', answer: 'Preparation depends on the tests requested. Send us your test list or referral so our team can confirm the instructions that apply to your appointment.' },
    { question: 'Can I send a photo of my doctor’s referral?', answer: 'Yes. Send a clear photo of your referral through WhatsApp. Our team can review the requested tests and confirm availability, preparation and pricing.' },
    { question: 'Can I use my health insurance?', answer: 'Coverage depends on your insurer, policy and requested tests. Contact our team before booking to confirm the available payment options and documentation, and check reimbursement requirements with your insurer.' },
    { question: 'Can you collect samples at an office or hotel?', answer: 'Tell us your office or hotel address when enquiring. Our team will confirm collection availability and any access arrangements needed for the visit.' },
    { question: 'How is my report shared?', answer: 'Authorised reports are shared digitally through the contact method agreed when you book. Please confirm the correct recipient details with our team.' },
];

function ContactButtons({ light = false }: { light?: boolean }) {
    return <div className="flex flex-wrap gap-3">
        <a href={whatsapp} target="_blank" rel="noopener noreferrer" className={`${button} ${light ? 'bg-white text-[#045d65] hover:bg-[#e9f3f2]' : 'bg-[#045d65] text-white hover:bg-[#034b52]'}`}>Book on WhatsApp <span aria-hidden="true" className="ml-3">↗</span></a>
        <a href={phone} className={`${button} border ${light ? 'border-white/40 text-white hover:bg-white/10' : 'border-[#045d65]/25 text-[#045d65] hover:bg-[#e9f3f2]'}`}>Call +971 56 992 5611</a>
    </div>;
}

function Label({ children }: { children: React.ReactNode }) {
    return <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-[#307984]">{children}</p>;
}

function SpeedCard() {
    return <aside className={styles.speedCard} aria-labelledby="speed-heading">
        <div className={styles.speedBody}>
            <div className={styles.speedHead}>
                <p className={styles.speedLabel}>Rapid Clinical Workflow</p>
                <h2 id="speed-heading" className={styles.speedTitle}>Sample-to-Report Speed Meter</h2>
                <span className={styles.speedEcg}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path d="M3 12h4l2-6 4 12 2-6h6" /></svg></span>
            </div>
            <ol className={styles.speedList}>
                {workflow.map(({ icon: Icon, time, title, text }) => <li key={title} className={styles.speedStep}>
                    <span className={styles.speedIcon}><Icon aria-hidden="true" /></span>
                    <div><div className={styles.speedRow}><span className={styles.speedTime}>{time}</span><h3>{title}</h3></div><p className={styles.speedText}>{text}</p></div>
                </li>)}
            </ol>
        </div>
        <div className={styles.speedFoot}><span><ShieldCheckIcon aria-hidden="true" />DHA-approved laboratory</span><span>Sterile Single-Use Kits</span></div>
    </aside>;
}

function CollectionProcess() {
    return <section className={styles.process} aria-labelledby="process-heading">
        <span className={styles.processBadge}>Simple 3-Step Process</span>
        <h2 id="process-heading">How Doorstep Lab Testing Works</h2>
        <p className={styles.processSubtitle}>From your first message to professional sample collection and digital results.</p>
        <ol className={styles.processSteps}>
            {[
                { title: 'Select Test & Share Location', text: 'Send your test request or a clear photo of your referral on WhatsApp. Tell us where and when you need collection.', note: 'No app download or account needed.' },
                { title: 'Sterile Doorstep Sample Draw', text: 'Our collection professional arrives at your address with single-use equipment and prepares your samples for safe transport.', note: 'Professional collection at your doorstep.' },
                { title: 'In-House Processing & Digital PDF', text: 'Forte processes your samples in-house and shares your authorised report directly through WhatsApp or email.', note: 'Your results delivered digitally.' },
            ].map((step, index) => <li key={step.title} className={styles.processCircle}><span className={styles.processNumber}>Step 0{index + 1}</span><h3>{step.title}</h3><p>{step.text}</p><span className={styles.processNote}>✓ {step.note}</span></li>)}
        </ol>
        <a href={whatsapp} target="_blank" rel="noopener noreferrer" className={styles.processCta}>Book Your Collection on WhatsApp <span aria-hidden="true">↗</span></a>
    </section>;
}

export default function LabTestServiceDubaiPage() {
    return (
        <div className="min-h-screen bg-white text-[#172e32]">
            <Navbar />
            <main className={`${styles.page} mx-auto max-w-[1440px] px-5 pb-12 pt-24 sm:px-8 sm:pt-28 lg:px-[50px]`}>
                <nav aria-label="Breadcrumb" className="mb-4 flex flex-wrap gap-2 text-xs text-gray-500">
                    <Link href="/" className="hover:text-[#045d65]">Home</Link><span aria-hidden="true">/</span><span aria-current="page">Lab Test Service in Dubai</span>
                </nav>

                <section className={styles.hero}>
                    <Image src="/home-collection/home-blood-test-woman.png" alt="" fill priority sizes="100vw" className={styles.heroBackground} />
                    <div className={styles.heroCopy}>
                        <Label>DHA-approved laboratory · 30-minute arrival</Label>
                        <h1>Lab Tests at Home in Dubai <span>Reports in Under 2 Hours</span></h1>
                        <p className={styles.heroDescription}>Professional sample collection at your home, hotel or office in 30 minutes. Your samples are processed in-house at Forte Clinical Laboratory, with authorised reports delivered to your phone in under 2 hours.</p>
                        <ul className={styles.heroChecks}>
                            {['30-minute arrival', 'Reports in under 2 hours', 'In-house laboratory', 'Sterile, single-use kits'].map(item => <li key={item}><CheckIcon aria-hidden="true" />{item}</li>)}
                        </ul>
                        <ContactButtons />
                    </div>
                    <SpeedCard />
                </section>

                <CollectionProcess />

                <section className="grid items-center gap-10 border-t border-gray-100 py-10 lg:grid-cols-2">
                    <div className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-[#e9f3f2]">
                        <Image src="/home-collection/care-at-home-solo.png" alt="Healthcare professional preparing sample collection equipment" fill sizes="(min-width: 1024px) 45vw, 100vw" className="object-cover" />
                    </div>
                    <div>
                        <Label>Lab tests at home</Label>
                        <h2 className="text-2xl font-bold leading-tight tracking-tight sm:text-3xl">Less travel.<br /><span className="text-[#045d65]">More room for your day.</span></h2>
                        <p className="mt-5 text-sm leading-6 text-gray-500">Whether you are keeping up with a routine health check or following your doctor’s request, home collection makes arranging your lab work easier. Our team helps you understand the next steps and schedules your visit around available appointments.</p>
                        <p className="mt-4 text-sm leading-6 text-gray-500">From safe sample collection to in-house processing at Forte, your appointment connects you with our laboratory without the need to travel for collection.</p>
                        <div className="mt-6"><ContactButtons /></div>
                    </div>
                </section>

                <section className="py-10 sm:py-12">
                    <div className="flex flex-col justify-between gap-5 rounded-3xl border border-[#c9dfdd] p-5 sm:p-6 lg:flex-row lg:items-center">
                        <div className="max-w-xl"><h2 className="text-2xl font-bold">Not sure where to start?</h2><p className="mt-3 text-sm leading-6 text-gray-500">Send your request to our team. We can help with test availability, preparation, collection arrangements and pricing.</p></div>
                        <a href={whatsapp} target="_blank" rel="noopener noreferrer" className={`${button} shrink-0 bg-[#045d65] text-white hover:bg-[#034b52]`}>Speak to our team ↗</a>
                    </div>
                </section>

                <section aria-labelledby="benefits-heading">
                    <Label>Why choose Forte</Label>
                    <h2 id="benefits-heading" className="text-2xl font-bold tracking-tight sm:text-3xl">Clinical care, with your <span className="text-[#045d65]">comfort in mind.</span></h2>
                    <div className={styles.benefits}>
                        {benefits.map(({ icon: Icon, title, text }) => <div key={title} className={styles.benefitCard}>
                            <Icon className="mb-4 h-8 w-8 text-[#307984]" aria-hidden="true" /><h3 className="text-lg font-semibold">{title}</h3><p className="mt-3 text-sm leading-6 text-gray-500">{text}</p>
                        </div>)}
                    </div>
                </section>

                <section className={styles.coverage} aria-labelledby="coverage-heading">
                    <div className={styles.coverageHeader}><Label>Citywide mobile coverage</Label><h2 id="coverage-heading">Popular Areas We Cover Across Dubai</h2><p>From private homes to hotel suites and offices, our collection team brings laboratory services closer to you.</p></div>
                    <div className={styles.coverageGrid}>
                        <div className={styles.coverageIntro}><MapPinIcon aria-hidden="true" /><h3>Dubai Service Coverage</h3><p>Professional sample collection at your address, with 30-minute arrival across Dubai. Share your location with our team to arrange your visit.</p><a href={whatsapp} target="_blank" rel="noopener noreferrer">Need collection in another area? ↗</a></div>
                        <div className={styles.areas}>
                            {['Downtown Dubai', 'Palm Jumeirah', 'Al Barsha', 'Dubai Marina', 'Arabian Ranches', 'Dubai Hills'].map(area => <a key={area} href={`https://wa.me/971569925611?text=${encodeURIComponent(`Hi Forte, I would like to book home sample collection in ${area}.`)}`} target="_blank" rel="noopener noreferrer" className={styles.area}><MapPinIcon aria-hidden="true" /><div><strong>{area}</strong><span>30-minute arrival</span></div></a>)}
                        </div>
                    </div>
                </section>

                <section aria-labelledby="gallery-heading">
                    <div className={styles.coverageHeader}><Label>Easy testing</Label><h2 id="gallery-heading">From Your Doorstep to Our Laboratory</h2></div>
                    <div className={styles.gallery}>
                        {[
                            { src: '/home-collection/home-blood-test-woman.png', alt: 'Sample collection during a home appointment', caption: 'Convenient home appointments' },
                            { src: '/home-collection/care-at-home-solo.png', alt: 'Collection professional preparing sample tubes', caption: 'Professional sample collection' },
                            { src: '/lab-tests/lab-1.png', alt: 'Laboratory testing and analysis', caption: 'Dedicated laboratory processing' },
                        ].map(item => <figure key={item.src} className={styles.galleryItem}><Image src={item.src} alt={item.alt} fill sizes="(min-width: 601px) 33vw, 100vw" /><figcaption>{item.caption}</figcaption></figure>)}
                    </div>
                </section>

                <section aria-labelledby="faq-heading" className="mx-auto max-w-4xl">
                    <div className="mb-7 text-center"><Label>Frequently asked questions</Label><h2 id="faq-heading" className="text-2xl font-bold tracking-tight sm:text-3xl">A little clarity <span className="text-[#045d65]">before you book.</span></h2></div>
                    {faqs.map(faq => <details key={faq.question} className="group border-b border-[#dfeae8] py-4">
                        <summary className="flex cursor-pointer list-none items-center justify-between gap-5 rounded text-sm font-semibold focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#045d65] sm:text-base">{faq.question}<span aria-hidden="true" className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#e9f3f2] text-lg text-[#045d65] group-open:rotate-45">+</span></summary>
                        <p className="mt-4 max-w-3xl text-sm leading-6 text-gray-500">{faq.answer}</p>
                    </details>)}
                </section>

                <section className="mt-10 rounded-[2rem] bg-[#045d65] px-6 py-8 text-white sm:mt-12 sm:p-8">
                    <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-white/70">Let’s arrange your collection</p>
                    <h2 className="max-w-2xl text-2xl font-bold leading-tight tracking-tight sm:text-3xl">Your next health check starts with a conversation.</h2>
                    <p className="mb-7 mt-4 max-w-xl text-sm leading-6 text-white/80">Tell us what you need and where you are in Dubai. We will help you confirm your appointment, preparation and report timing.</p>
                    <ContactButtons light />
                </section>
            </main>
            <Footer />
        </div>
    );
}
