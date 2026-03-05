import Image from 'next/image';

const logos = [
    { src: '/Landing-page/trust/bio-rad.png', alt: 'Bio-Rad EQAS' },
    { src: '/Landing-page/trust/siemens.png', alt: 'Siemens' },
    { src: '/Landing-page/trust/gold-logo.png', alt: 'Joint Commission International' },
    { src: '/Landing-page/trust/tech-med.png', alt: 'TechMed' },
];

export default function TrustAndTech() {
    return (
        <section className="relative w-full min-h-screen lg:h-screen overflow-hidden flex items-center md:items-end pb-12 md:pb-24">
            {/* Background Image - Absolute and Full Bleed */}
            <div className="absolute inset-0 z-0 h-full w-full">
                <Image
                    src="/Landing-page/trust/bg.png"
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
                            Cutting-Edge Diagnostics
                        </span>
                        <h2 className="text-3xl sm:text-4xl md:text-4xl lg:text-4xl xl:text-5xl font-bold mb-6 leading-[1.1] max-w-xl">
                            Powered by the Future of Lab Technology
                        </h2>
                        <p className="text-white/90 text-sm md:text-base mb-10 leading-relaxed max-w-lg opacity-90">
                            Experience the pinnacle of accuracy with our advanced laboratory technology, delivering reliable results across every diagnostic discipline. From home sample collection to complex genomic testing, we set the standard in health monitoring with unmatched quality in every test we perform
                        </p>

                        {/* Logo Grid */}
                        <div className="w-full max-w-[320px] sm:max-w-[400px] lg:max-w-[450px] mx-auto lg:mx-0">
                            <div className="flex gap-4 sm:gap-6 lg:gap-8 mb-4 sm:mb-6 lg:mb-8">
                                {logos.slice(0, 3).map((logo, index) => (
                                    <div key={index} className={`relative flex-1 h-14 sm:h-16 lg:h-18 transition-transform hover:scale-105 ${index === 2 ? 'lg:-ml-4' : ''}`}>
                                        <Image src={logo.src} alt={logo.alt} fill className="object-contain" priority />
                                    </div>
                                ))}
                            </div>
                            <div className="flex justify-start">
                                <div className="relative w-1/3 h-14 sm:h-16 lg:h-18 transition-transform hover:scale-105">
                                    <Image src={logos[3].src} alt={logos[3].alt} fill className="object-contain" priority />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
