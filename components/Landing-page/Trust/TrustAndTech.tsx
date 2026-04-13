import Image from 'next/image';
import Reveal from '@/components/Animation/Reveal';

const logos = [
    { src: '/Landing-page/trust/bio-rad1.png', alt: 'Bio-Rad EQAS' },
    { src: '/Landing-page/trust/siemens1.png', alt: 'Siemens' },
    { src: '/Landing-page/trust/tech-med1.png', alt: 'TechMed' },
    { src: '/Landing-page/trust/gold-logo1.png', alt: 'Joint Commission International' },
];

export default function TrustAndTech() {
    return (
        <section className="relative w-full flex items-center py-10 md:py-12 lg:py-14 overflow-hidden">
            <div className="absolute inset-0 z-0 h-full w-full">
                <Image
                    src="/Landing-page/trust/bg-v3.png"
                    alt="Lab Technicians Working"
                    fill
                    className="object-cover object-center"
                    priority
                />
            </div>

            <div className="absolute inset-0 z-10 bg-[#0D3B66]/85 md:bg-[#0D3B66]/70 lg:bg-transparent"></div>
            <div className="absolute inset-0 z-10 hidden lg:block bg-gradient-to-l from-[#0D3B66]/98 via-[#0D3B66]/80 to-transparent"></div>

            <div className="relative z-20 max-w-7xl mx-auto px-6 sm:px-8 lg:px-8 w-full">
                <div className="grid grid-cols-1 lg:grid-cols-[54%_46%] gap-8 lg:gap-10 items-center">
                    <div className="order-2 lg:order-1">
                        <Reveal delayMs={90}>
                            <div className="grid grid-cols-2 gap-4 sm:gap-5 items-end">
                                <div className="relative">
                                    <div className="absolute -left-2 sm:-left-3 top-2 bottom-16 w-2 sm:w-3 rounded-full bg-[#2ab56f]" />
                                    <div className="relative aspect-[4/5] overflow-hidden rounded-[88px_18px_18px_18px] border border-white/40 shadow-xl">
                                        <Image
                                            src="/office2.png"
                                            alt="Forte laboratory workspace and team area"
                                            fill
                                            className="object-cover"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/35 to-transparent" />
                                        <div className="absolute left-3 bottom-3 bg-white/90 text-[#1f2937] rounded-full px-3 py-1 text-[9px] font-black tracking-wider uppercase">
                                            5,000 sq.ft Facility
                                        </div>
                                    </div>
                                </div>

                                <div className="relative">
                                    <div className="absolute -right-2 sm:-right-3 top-8 bottom-20 w-2 sm:w-3 rounded-full bg-[#2e6ab7]" />
                                    <div className="relative aspect-[4/5] overflow-hidden rounded-[18px_18px_92px_18px] border border-white/40 shadow-xl">
                                        <Image
                                            src="/office1.png"
                                            alt="Forte office and diagnostic facility interior"
                                            fill
                                            className="object-cover"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                                    </div>
                                </div>
                            </div>
                        </Reveal>
                       
                    </div>

                    <div className="order-1 lg:order-2 flex flex-col items-center text-center lg:items-start lg:text-left text-white">
                        <Reveal delayMs={70}>
                            <span className="text-[#f88c29] font-medium text-[0.65rem] tracking-[0.2em] mb-3 uppercase block">
                                Precision & Accreditation
                            </span>
                        </Reveal>
                        <Reveal delayMs={140}>
                            <h2 className="text-2xl sm:text-3xl md:text-3xl lg:text-3xl xl:text-4xl font-bold mb-5 leading-[1.1] max-w-xl">
                                Built on International Standards of Quality
                            </h2>
                        </Reveal>
                        <Reveal delayMs={210}>
                            <p className="text-white/90 text-xs md:text-sm mb-8 leading-relaxed max-w-lg opacity-90">
                                Forte Clinical Laboratory is ISO 9001-2015 certified across Biochemistry, Haematology, Microbiology, Immunology, Serology and Clinical Pathology. We are JCI accredited, Bio-Rad certified for clinical chemistry and haematology quality, and partner with Siemens — a global pioneer in healthcare technology — to ensure our processes meet the highest international benchmarks.
                            </p>
                        </Reveal>

                        <Reveal delayMs={290} className="w-full">
                            <div className="grid grid-cols-2 gap-4 w-full max-w-[280px] sm:max-w-[340px] lg:max-w-[400px] mx-auto lg:mx-0">
                                {logos.map((logo, index) => (
                                    <div key={index} className="bg-white rounded-[24px] p-4 flex items-center justify-center h-12 sm:h-14 lg:h-16 transition-all hover:scale-105 hover:ring-2 hover:ring-[#f88c29] shadow-sm">
                                        <div className="relative w-full h-full">
                                            <Image src={logo.src} alt={logo.alt} fill className="object-contain" priority />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </Reveal>
                    </div>
                </div>
            </div>
        </section>
    );
}
