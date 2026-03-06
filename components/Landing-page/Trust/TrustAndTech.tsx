import Image from 'next/image';

const logos = [
    { src: '/Landing-page/trust/bio-rad1.png', alt: 'Bio-Rad EQAS' },
    { src: '/Landing-page/trust/siemens1.png', alt: 'Siemens' },
    { src: '/Landing-page/trust/tech-med1.png', alt: 'TechMed' },
    { src: '/Landing-page/trust/gold-logo1.png', alt: 'Joint Commission International' },
];

export default function TrustAndTech() {
    return (
        <section className="relative w-full min-h-screen flex items-center lg:items-end pt-24 pb-12 md:pb-24 overflow-hidden">
            {/* Background Image - Absolute and Full Bleed */}
            <div className="absolute inset-0 z-0 h-full w-full">
                <Image
                    src="/Landing-page/trust/bg-v3.png"
                    alt="Lab Technicians Working"
                    fill
                    className="object-cover object-center"
                    priority
                />
            </div>

            {/* Gradient Overlay - Full coverage on mobile, right-heavy on desktop */}
            <div className="absolute inset-0 z-10 bg-[#0D3B66]/85 md:bg-[#0D3B66]/70 lg:bg-transparent"></div>
            <div className="absolute inset-0 z-10 hidden lg:block bg-gradient-to-l from-[#0D3B66]/98 via-[#0D3B66]/80 to-transparent"></div>

            <div className="relative z-20 max-w-7xl mx-auto px-6 sm:px-8 lg:px-8 w-full">
                <div className="grid grid-cols-1 lg:grid-cols-[58%_42%]">
                    {/* Left side - only visible on desktop */}
                    <div className="hidden lg:block"></div>

                    {/* Content Area */}
                    <div className="flex flex-col items-center text-center lg:items-start lg:text-left lg:pl-12 text-white">
                        <span className="text-white font-medium text-xs tracking-[0.2em] mb-4 uppercase">
                            Precision & Accreditation
                        </span>
                        <h2 className="text-3xl sm:text-4xl md:text-4xl lg:text-4xl xl:text-5xl font-bold mb-6 leading-[1.1] max-w-xl">
                            Built on International Standards of Quality
                        </h2>
                        <p className="text-white/90 text-sm md:text-base mb-10 leading-relaxed max-w-lg opacity-90">
                            Forte Clinical Laboratory is ISO 9001-2015 certified across Biochemistry, Haematology, Microbiology, Immunology, Serology and Clinical Pathology. We are JCI accredited, Bio-Rad certified for clinical chemistry and haematology quality, and partner with Siemens — a global pioneer in healthcare technology — to ensure our processes meet the highest international benchmarks.
                        </p>

                        {/* Logo Grid */}
                        <div className="grid grid-cols-2 gap-4 w-full max-w-[280px] sm:max-w-[340px] lg:max-w-[400px] mx-auto lg:mx-0">
                            {logos.map((logo, index) => (
                                <div key={index} className="bg-white rounded-[24px] p-4 flex items-center justify-center h-14 sm:h-16 lg:h-18 transition-transform hover:scale-105 shadow-sm">
                                    <div className="relative w-full h-full">
                                        <Image src={logo.src} alt={logo.alt} fill className="object-contain" priority />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
