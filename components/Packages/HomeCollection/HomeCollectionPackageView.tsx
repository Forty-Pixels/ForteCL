import Image from 'next/image';
import Link from 'next/link';
import type { ReactNode } from 'react';
import type { SanityImageSource } from '@sanity/image-url';
import { urlFor } from '@/lib/sanity';
import { getPackagePricing } from '@/lib/package-details';
import Reveal from '@/components/Animation/Reveal';
import BookActionButton from '@/components/Booking/BookActionButton';
import Navbar from '@/components/Navbar/Navbar';

const PHONE = '+971569925611';
const PHONE_LABEL = '+971 56 992 5611';
const WHATSAPP = '971569925611';

export interface HomeCollectionPackage {
    amount?: number | null;
    title: string;
    slug: string;
    description: string;
    image?: SanityImageSource;
    testsTotal?: number;
    subTests?: { title: string; explanation?: string }[];
    overview?: string;
    benefits?: string[];
    preparation?: string;
    faqs?: { question: string; answer: string }[];
    homeCollection?: {
        eyebrow?: string;
        headline?: string;
        subheadline?: string;
        directAnswer?: string;
        collectionHours?: string;
        coverageAreas?: string[];
        steps?: { title: string; description?: string }[];
        highlights?: { title: string; description?: string }[];
        whatsappMessage?: string;
    } | null;
}

const DEFAULT_STEPS = [
    { title: 'Call or WhatsApp Us', description: 'Tell us which package you want and where you are. Our team replies quickly, every day.' },
    { title: 'Confirm the Details', description: 'We confirm your slot, the preparation needed and the total cost before the visit.' },
    { title: 'Attend Your Appointment', description: 'A trained phlebotomist visits your home, office or hotel. Results are shared digitally.' },
];

const DEFAULT_HIGHLIGHTS = [
    { title: 'DHA-Licensed Laboratory', description: 'Your samples are processed in-house at our DHA-approved laboratory in Dubai.' },
    { title: 'Trained Phlebotomists', description: 'Experienced staff collect your sample safely and comfortably at your door.' },
    { title: 'Flexible Appointments', description: 'Choose a time that suits your day, including early morning slots for fasting tests.' },
    { title: 'Digital Reports', description: 'Receive results securely by WhatsApp or email once they are authorised.' },
    { title: 'Clear Charges Before Booking', description: 'The package price is confirmed upfront. Pay upon collection, no card needed.' },
    { title: 'Appointments Across Dubai', description: 'Home, office and hotel visits across Dubai and Sharjah. Ask us about your area.' },
];

const P = {
    phone: 'M3 5a2 2 0 012-2h3.3a1 1 0 01.9.7l1.5 4.5a1 1 0 01-.5 1.2l-2.3 1.1a11 11 0 005.5 5.5l1.1-2.3a1 1 0 011.2-.5l4.5 1.5a1 1 0 01.7.9V19a2 2 0 01-2 2h-1C9.7 21 3 14.3 3 6V5z',
    clipboard: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4',
    home: 'M3 12l9-9 9 9M5 10v10a1 1 0 001 1h3v-6h6v6h3a1 1 0 001-1V10',
    shield: 'M9 12l2 2 4-4m5.6-4A12 12 0 0112 2.9 12 12 0 013.4 6a12 12 0 00-.4 3c0 5.6 3.8 10.3 9 11.7 5.2-1.4 9-6.1 9-11.7 0-1-.1-2-.4-3z',
    clock: 'M12 6v6l4 2m6-2a10 10 0 11-20 0 10 10 0 0120 0z',
    doc: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.6a1 1 0 01.7.3l5.4 5.4a1 1 0 01.3.7V19a2 2 0 01-2 2z',
    users: 'M17 20h5v-2a4 4 0 00-3-3.9M9 20H4v-2a4 4 0 013-3.9m10-6.1a3 3 0 11-6 0 3 3 0 016 0zM7 10a3 3 0 106 0 3 3 0 00-6 0z',
    card: 'M3 10h18M5 5h14a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2z',
    pin: 'M17.7 16.7L13.4 21a2 2 0 01-2.8 0l-4.3-4.3a8 8 0 1111.4 0zM15 11a3 3 0 11-6 0 3 3 0 016 0z',
    flask: 'M9 3h6M10 3v6L4.5 19a1.5 1.5 0 001.3 2.2h12.4a1.5 1.5 0 001.3-2.2L14 9V3',
    check: 'M5 13l4 4L19 7',
    arrow: 'M5 12h14m-6-6l6 6-6 6',
};

function Icon({ d, className = 'h-5 w-5', sw = 1.8 }: { d: string; className?: string; sw?: number }) {
    return (
        <svg className={className} fill="none" stroke="currentColor" strokeWidth={sw} viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d={d} />
        </svg>
    );
}

const WhatsAppIcon = ({ className }: { className?: string }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.414 0 .011 5.403.011 12.038c0 2.12.553 4.189 1.604 6.04l-1.705 6.226 6.37-1.67a11.803 11.803 0 005.766 1.498h.005c6.634 0 12.038-5.403 12.038-12.039a11.811 11.811 0 00-3.414-8.417" />
    </svg>
);

function SectionLabel({ children }: { children: ReactNode }) {
    return <span className="inline-block rounded-full bg-[#e3f1f0] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-[#045d65]">{children}</span>;
}

/** Colours the last word(s) of a heading in the brand teal, like the reference's two-tone headings. */
function TwoTone({ text, tail = 1 }: { text: string; tail?: number }) {
    const words = text.trim().split(/\s+/);
    if (words.length <= tail) return <span className="text-[#045d65]">{text}</span>;
    return (
        <>
            {words.slice(0, -tail).join(' ')} <span className="text-[#045d65]">{words.slice(-tail).join(' ')}</span>
        </>
    );
}

export default function HomeCollectionPackageView({ pkg }: { pkg: HomeCollectionPackage }) {
    const { cleanTitle, price } = getPackagePricing(pkg.title, pkg.amount);
    const hc = pkg.homeCollection ?? {};
    const steps = hc.steps?.filter(step => step.title?.trim()).length ? hc.steps!.filter(step => step.title?.trim()) : DEFAULT_STEPS;
    const highlights = hc.highlights?.filter(item => item.title?.trim()).length ? hc.highlights!.filter(item => item.title?.trim()) : DEFAULT_HIGHLIGHTS;
    const areas = hc.coverageAreas?.filter(item => item.trim()) ?? [];
    const benefits = pkg.benefits?.filter(item => item.trim()) ?? [];
    const subTests = pkg.subTests ?? [];
    const testCount = pkg.testsTotal ?? subTests.length;
    const message = hc.whatsappMessage?.trim() || `Hi, I would like to book the ${cleanTitle} package with home collection.`;
    const whatsappUrl = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(message)}`;
    const headline = hc.headline || cleanTitle;
    const directAnswer = hc.directAnswer?.trim() || pkg.overview?.trim() || pkg.description;
    const heroImage = pkg.image ? urlFor(pkg.image).width(1200).url() : null;
    const stepIcons = [P.phone, P.clipboard, P.home];
    const highlightIcons = [P.shield, P.users, P.clock, P.doc, P.card, P.pin];

    const stats = [
        { value: 'Home', caption: 'Collection included' },
        { value: '24/7', caption: 'Booking enquiries' },
        { value: 'DHA', caption: 'Licensed laboratory' },
        { value: String(testCount), caption: testCount === 1 ? 'Test included' : 'Tests included' },
    ];

    return (
        <div className="min-h-screen bg-white font-sans">
            <Navbar currentPage="Packages" />

            {/* FLOATING CALL / WHATSAPP (left edge, like the reference) */}
            <div className="fixed left-3 top-1/2 z-[90] flex -translate-y-1/2 flex-col gap-2.5">
                <a href={`tel:${PHONE}`} aria-label="Call us" className="flex h-11 w-11 items-center justify-center rounded-full bg-[#045d65] text-white shadow-lg transition-transform hover:scale-110">
                    <Icon d={P.phone} className="h-5 w-5" />
                </a>
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="flex h-11 w-11 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-110">
                    <WhatsAppIcon className="h-6 w-6" />
                </a>
            </div>

            <main className="mx-auto max-w-6xl space-y-20 px-4 pb-20 pt-28 sm:pt-32">
                {/* 1. HERO */}
                <section className="grid items-center gap-8 rounded-[2rem] bg-[#e9f3f2] p-6 sm:p-10 lg:grid-cols-2 lg:p-12">
                    <div className="space-y-5">
                        <Reveal>
                            <span className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[#045d65]">
                                <span className="h-1.5 w-1.5 rounded-full bg-[#045d65]" />
                                {hc.eyebrow || 'DHA Licensed · Enquiries 24/7'}
                            </span>
                        </Reveal>
                        <Reveal delayMs={80}>
                            <h1 className="text-4xl font-black leading-[1.08] tracking-tight text-[#0f172a] sm:text-5xl">
                                <TwoTone text={headline} />
                            </h1>
                        </Reveal>
                        <Reveal delayMs={140}>
                            <p className="whitespace-pre-line text-sm leading-relaxed text-gray-600">
                                <strong className="text-[#0f172a]">Care that fits your day.</strong> {hc.subheadline || pkg.description}
                            </p>
                        </Reveal>
                        <Reveal delayMs={200}>
                            <div className="flex flex-wrap gap-3">
                                <BookActionButton
                                    label="Book an Appointment"
                                    whatsappText={message}
                                    className="rounded-full bg-[#045d65] px-6 py-3 text-xs font-bold text-white shadow-md transition-colors hover:bg-[#034b52]"
                                />
                                <a href={`tel:${PHONE}`} className="rounded-full border border-[#045d65]/20 bg-white px-6 py-3 text-xs font-bold text-[#0f172a] transition-colors hover:border-[#045d65]">
                                    Call Our Team
                                </a>
                            </div>
                        </Reveal>
                        <Reveal delayMs={260}>
                            <ul className="flex flex-wrap gap-x-5 gap-y-2 text-[11px] font-semibold text-gray-600">
                                {['DHA Licensed Care', 'Appointments Confirmed', 'Home, Hotel & Office'].map(t => (
                                    <li key={t} className="flex items-center gap-1.5"><span className="h-1.5 w-1.5 rounded-full bg-[#045d65]" />{t}</li>
                                ))}
                            </ul>
                        </Reveal>
                    </div>

                    <Reveal delayMs={160}>
                        <div className="relative">
                            <div className="relative aspect-[4/4.4] overflow-hidden rounded-3xl bg-white shadow-xl">
                                {heroImage ? (
                                    <Image src={heroImage} alt={pkg.title} fill priority sizes="(min-width:1024px) 40vw, 100vw" className="object-cover" />
                                ) : (
                                    <div className="h-full w-full bg-gradient-to-br from-[#045d65] to-[#023f45]" />
                                )}
                            </div>
                            <span className="absolute right-4 top-4 rounded-full bg-white px-3 py-1.5 text-[10px] font-bold text-[#045d65] shadow-md">Care at Home</span>
                            <div className="absolute bottom-4 left-4 flex items-center gap-3 rounded-2xl bg-white px-4 py-3 shadow-xl">
                                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#045d65] text-white"><Icon d={P.home} className="h-5 w-5" /></span>
                                <div>
                                    <p className="text-[11px] font-black text-[#0f172a]">Home Collection</p>
                                    <p className="text-[10px] text-gray-500">{price ? `Package ${price}` : 'Included in this package'}</p>
                                </div>
                            </div>
                        </div>
                    </Reveal>
                </section>

                {/* 2. DIRECT ANSWER + STAT BAR */}
                <section className="-mt-10 space-y-3">
                    <Reveal>
                        <div className="rounded-2xl border-l-4 border-[#045d65] bg-[#f1f8f7] px-6 py-5">
                            <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-[#045d65]">Direct Answer</p>
                            <p className="mt-2 line-clamp-4 whitespace-pre-line text-[13px] leading-relaxed text-gray-600">{directAnswer}</p>
                        </div>
                    </Reveal>
                    <Reveal delayMs={80}>
                        <div className="grid grid-cols-2 gap-y-5 rounded-2xl bg-[#045d65] px-4 py-6 text-center text-white md:grid-cols-4 md:divide-x md:divide-white/20">
                            {stats.map(stat => (
                                <div key={stat.caption} className="px-3">
                                    <p className="text-3xl font-black leading-none sm:text-4xl">{stat.value}</p>
                                    <p className="mt-1.5 text-[10px] font-semibold uppercase tracking-wider text-white/70">{stat.caption}</p>
                                </div>
                            ))}
                        </div>
                    </Reveal>
                </section>

                {/* 3. FEATURE: PACKAGE AT HOME */}
                <section className="space-y-6">
                    <Reveal>
                        <SectionLabel>Package At Home</SectionLabel>
                        <h2 className="mt-3 text-3xl font-black text-[#0f172a] sm:text-4xl"><TwoTone text={`${cleanTitle}, Collected at Home`} tail={3} /></h2>
                        <p className="mt-3 max-w-2xl text-xs leading-relaxed text-gray-500">
                            {pkg.overview || pkg.description}
                        </p>
                    </Reveal>
                    <div className="grid gap-4 lg:grid-cols-[1.6fr_1fr]">
                        <Reveal>
                            <div className="grid h-full overflow-hidden rounded-3xl bg-[#e9f3f2] sm:grid-cols-2">
                                <div className="relative min-h-[260px]">
                                    {heroImage && <Image src={heroImage} alt={pkg.title} fill sizes="(min-width:1024px) 25vw, 100vw" className="object-cover" />}
                                    <span className="absolute bottom-3 left-3 rounded-full bg-[#045d65] px-3 py-1.5 text-[10px] font-bold text-white">{price ? `Package ${price}` : 'Home collection'}</span>
                                </div>
                                <div className="flex flex-col justify-center gap-4 p-7">
                                    <span className="w-fit rounded-full bg-white px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider text-[#045d65]">DHA Licensed</span>
                                    <h3 className="text-2xl font-black leading-tight text-[#0f172a]">Sample Collection at Your Doorstep</h3>
                                    <p className="text-[11px] leading-relaxed text-gray-600">
                                        A licensed professional visits you at home, collects your sample in a single visit and our laboratory delivers your digital report.
                                    </p>
                                    <BookActionButton
                                        label="Book a Home Blood Test →"
                                        whatsappText={message}
                                        className="w-fit rounded-full bg-[#045d65] px-5 py-2.5 text-[11px] font-bold text-white transition-colors hover:bg-[#034b52]"
                                    />
                                    <div className="flex flex-wrap gap-3 text-[10px] font-semibold text-gray-500">
                                        {['Slots confirmed', 'Digital results', 'Confirm payment'].map(t => (
                                            <span key={t} className="flex items-center gap-1"><Icon d={P.check} className="h-3 w-3 text-[#045d65]" sw={3} />{t}</span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </Reveal>
                        <Reveal delayMs={100}>
                            <div className="flex h-full flex-col rounded-3xl bg-gradient-to-br from-[#0b3c41] to-[#04282c] p-7 text-white">
                                <span className="w-fit rounded-full bg-white/10 px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider text-[#A7DCC0]">Explore Tests</span>
                                <ul className="mt-5 flex-1 divide-y divide-white/10">
                                    {(subTests.length ? subTests.slice(0, 6).map(t => t.title) : [cleanTitle]).map(name => (
                                        <li key={name} className="flex items-center justify-between py-3 text-sm font-semibold">
                                            <span>{name}</span><Icon d={P.arrow} className="h-3.5 w-3.5 text-white/40" />
                                        </li>
                                    ))}
                                </ul>
                                <Link href="/packages" className="mt-4 flex items-center justify-between rounded-xl bg-white/10 px-4 py-3 text-sm font-bold transition-colors hover:bg-white/20">
                                    All Packages <Icon d={P.arrow} className="h-4 w-4" />
                                </Link>
                            </div>
                        </Reveal>
                    </div>
                </section>

                {/* 4. CHOOSE THE CARE YOU NEED -> what's included */}
                {subTests.length > 0 && (
                    <section className="space-y-8">
                        <Reveal>
                            <SectionLabel>What&apos;s Included</SectionLabel>
                            <h2 className="mt-3 text-3xl font-black text-[#0f172a] sm:text-4xl"><TwoTone text="Tests You Get in This Package" tail={3} /></h2>
                            <p className="mt-3 max-w-2xl text-xs leading-relaxed text-gray-500">
                                {subTests.length} parameters, all collected in a single home visit. Each result is reviewed and authorised by our laboratory team.
                            </p>
                        </Reveal>
                        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                            {subTests.map((test, i) => (
                                <Reveal key={i} delayMs={(i % 3) * 70}>
                                    <article className="h-full overflow-hidden rounded-2xl border border-[#e3efee] bg-white">
                                        <div className="relative flex h-32 items-center justify-center bg-gradient-to-br from-[#e9f3f2] to-[#cfe6e4]">
                                            <Icon d={P.flask} className="h-12 w-12 text-[#045d65]/40" sw={1.2} />
                                            <span className="absolute right-3 top-3 rounded-full bg-[#045d65] px-2.5 py-1 text-[9px] font-bold text-white">Home visit included</span>
                                        </div>
                                        <div className="space-y-2 p-5">
                                            <h3 className="text-sm font-bold text-[#0f172a]">{test.title}</h3>
                                            {test.explanation && <p className="text-[11px] leading-relaxed text-gray-500">{test.explanation}</p>}
                                            <ul className="space-y-1 pt-1 text-[10px] text-gray-500">
                                                <li className="flex items-center gap-1.5"><span className="h-1 w-1 rounded-full bg-[#045d65]" />Collected at your address</li>
                                                <li className="flex items-center gap-1.5"><span className="h-1 w-1 rounded-full bg-[#045d65]" />Digital report</li>
                                            </ul>
                                            <BookActionButton label="Book Now →" whatsappText={message} className="pt-2 text-[11px] font-bold text-[#045d65] hover:underline" />
                                        </div>
                                    </article>
                                </Reveal>
                            ))}
                        </div>
                        {(benefits.length > 0 || pkg.preparation) && (
                            <div className={`grid gap-4 ${benefits.length > 0 && pkg.preparation ? 'md:grid-cols-2' : ''}`}>
                                {benefits.length > 0 && (
                                    <div className="rounded-2xl bg-[#f1f8f7] p-6">
                                        <h3 className="text-sm font-black text-[#0f172a]">Key benefits</h3>
                                        <ul className="mt-3 list-disc space-y-2 pl-5 text-[13px] leading-relaxed text-gray-600 marker:text-[#045d65]">
                                            {benefits.map((b, i) => <li key={i}>{b}</li>)}
                                        </ul>
                                    </div>
                                )}
                                {pkg.preparation && (
                                    <div className="rounded-2xl bg-[#f1f8f7] p-6">
                                        <h3 className="text-sm font-black text-[#0f172a]">Before the visit</h3>
                                        <p className="mt-3 whitespace-pre-line text-[13px] leading-relaxed text-gray-600">{pkg.preparation}</p>
                                    </div>
                                )}
                            </div>
                        )}
                    </section>
                )}

                {/* 5. THREE SIMPLE STEPS */}
                <section className="space-y-10 text-center">
                    <Reveal>
                        <SectionLabel>How It Works</SectionLabel>
                        <h2 className="mt-3 text-3xl font-black text-[#0f172a] sm:text-4xl">Arrange Your Care in <span className="text-[#045d65]">{steps.length} Simple Steps</span></h2>
                        <p className="mx-auto mt-3 max-w-md text-xs leading-relaxed text-gray-500">Tell us what you need and where you are. We will discuss the service, appointment options and costs before you confirm.</p>
                    </Reveal>
                    <div className="grid gap-5 md:grid-cols-3">
                        {steps.map((step, i) => (
                            <Reveal key={i} delayMs={i * 90}>
                                <div className="relative h-full rounded-2xl border border-[#d9ebe9] bg-[#f1f8f7] px-6 pb-8 pt-10 text-center">
                                    <span className="absolute right-4 top-3 text-[10px] font-bold text-[#045d65]/50">{String(i + 1).padStart(2, '0')}</span>
                                    <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-white text-[#045d65] shadow-sm"><Icon d={stepIcons[i % stepIcons.length]} /></span>
                                    <h3 className="mt-4 text-sm font-bold text-[#0f172a]">{step.title}</h3>
                                    {step.description && <p className="mt-2 text-[11px] leading-relaxed text-gray-500">{step.description}</p>}
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </section>

                {/* 6. SUPPORT FOR YOUR CARE AT HOME */}
                <section className="space-y-8">
                    <Reveal>
                        <SectionLabel>Why Choose Us</SectionLabel>
                        <h2 className="mt-3 text-3xl font-black text-[#0f172a] sm:text-4xl">Support for Your <span className="text-[#045d65]">Care at Home</span></h2>
                    </Reveal>
                    <div className="grid items-center gap-10 lg:grid-cols-2">
                        <Reveal>
                            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-[#e9f3f2]">
                                {heroImage && <Image src={heroImage} alt="Home collection with Forte Clinical Laboratory" fill sizes="(min-width:1024px) 45vw, 100vw" className="object-cover" />}
                                <div className="absolute bottom-4 left-4 flex items-center gap-2.5 rounded-xl bg-white px-3.5 py-2.5 shadow-lg">
                                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#045d65] text-white"><Icon d={P.shield} className="h-4 w-4" /></span>
                                    <div>
                                        <p className="text-[10px] font-black text-[#0f172a]">DHA-Licensed Care</p>
                                        <p className="text-[9px] text-gray-500">{hc.collectionHours || 'Home appointments confirmed'}</p>
                                    </div>
                                </div>
                            </div>
                        </Reveal>
                        <div className="space-y-5">
                            {highlights.map((item, i) => (
                                <Reveal key={i} delayMs={i * 50}>
                                    <div className="flex gap-4">
                                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#e3f1f0] text-[#045d65]"><Icon d={highlightIcons[i % highlightIcons.length]} className="h-4 w-4" /></span>
                                        <div>
                                            <h3 className="text-sm font-bold text-[#0f172a]">{item.title}</h3>
                                            {item.description && <p className="mt-1 text-[11px] leading-relaxed text-gray-500">{item.description}</p>}
                                        </div>
                                    </div>
                                </Reveal>
                            ))}
                        </div>
                    </div>
                    {areas.length > 0 && (
                        <div className="flex flex-wrap items-center gap-2 pt-2">
                            <span className="mr-1 text-xs font-bold text-[#0f172a]">We collect in:</span>
                            {areas.map(area => <span key={area} className="rounded-full bg-[#e3f1f0] px-3.5 py-1.5 text-[11px] font-semibold text-[#045d65]">{area}</span>)}
                        </div>
                    )}
                </section>

                {/* 7. FAQ (two columns) */}
                {!!pkg.faqs?.length && (
                    <section className="space-y-8 text-center">
                        <Reveal>
                            <SectionLabel>FAQ</SectionLabel>
                            <h2 className="mt-3 text-3xl font-black text-[#0f172a] sm:text-4xl">Your Questions About <span className="text-[#045d65]">Home Collection</span></h2>
                        </Reveal>
                        <div className="grid gap-x-8 text-left md:grid-cols-2">
                            {pkg.faqs.map((faq, i) => (
                                <details key={i} className="group self-start border-b border-[#e3efee] py-4">
                                    <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-[13px] font-bold text-[#0f172a] outline-none">
                                        {faq.question}
                                        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#e3f1f0] text-base leading-none text-[#045d65] transition-transform group-open:rotate-45">+</span>
                                    </summary>
                                    <p className="mt-3 whitespace-pre-line text-xs leading-relaxed text-gray-500">{faq.answer}</p>
                                </details>
                            ))}
                        </div>
                        <p className="text-[11px] text-gray-500">Still have questions? <a href={`tel:${PHONE}`} className="font-bold text-[#045d65]">Call {PHONE_LABEL}</a></p>
                    </section>
                )}

                {/* 8. CLOSING BANNER */}
                <section>
                    <div className="rounded-[2rem] bg-gradient-to-br from-[#045d65] to-[#023f45] px-6 py-14 text-center text-white sm:px-14">
                        <h2 className="mx-auto max-w-xl text-3xl font-black leading-tight sm:text-4xl">Arrange Your Home Collection in Dubai</h2>
                        <p className="mx-auto mt-3 max-w-md text-xs leading-relaxed text-white/75">Tell us the care you need, your location and your preferred time. Our team will confirm the appointment options and full charge before you book.</p>
                        <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
                            <a href={`tel:${PHONE}`} className="flex w-full items-center justify-center gap-2 rounded-full bg-white px-7 py-3 text-xs font-bold text-[#045d65] transition-colors hover:bg-gray-100 sm:w-auto">
                                <Icon d={P.phone} className="h-4 w-4" /> Call {PHONE_LABEL}
                            </a>
                            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="flex w-full items-center justify-center gap-2 rounded-full bg-[#25D366] px-7 py-3 text-xs font-bold text-white transition-colors hover:bg-[#1ebe5b] sm:w-auto">
                                <WhatsAppIcon className="h-4 w-4" /> WhatsApp Us
                            </a>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}
