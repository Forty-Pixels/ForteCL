'use client';

import Image from 'next/image';
import Reveal from '@/components/Animation/Reveal';

const partners = [

    { name: 'ALMADALLAH Healthcare Management', image: '/Landing-page/insurance/partner-14.webp' },
    { name: 'NGI National General Insurance', image: '/Landing-page/insurance/partner-20.webp' },
    { name: 'eCare International', image: '/Landing-page/insurance/partner-8.webp' },
    { name: 'NAS', image: '/Landing-page/insurance/partner-11.webp' },
    { name: 'FMC Network UAE', image: '/Landing-page/insurance/partner-12.webp' },
    { name: 'Lifeline', image: '/Landing-page/insurance/partner-17.webp' },
    { name: 'Inaya', image: '/Landing-page/insurance/inayah-logo.jpg' },
    { name: 'Enaya', image: '/Landing-page/insurance/enaya-logo.svg' },
    { name: 'Neuron', image: '/Landing-page/insurance/neuron-logo.png' },

];

export default function InsurancePartners() {
    // Duplicate the partners array twice to ensure a seamless infinite loop on all screen sizes
    const marqueeItems = [...partners, ...partners];

    return (
        <section className="py-7 md:py-9 overflow-hidden bg-white">
            <div className="max-w-[1440px] mx-auto px-4 md:px-6">
                <div className="mb-4 md:mb-5 text-center">
                    <Reveal delayMs={30}>
                        <div className="inline-flex items-center rounded-full border border-[#307984]/20 bg-white px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-[#307984]">
                            Trusted Coverage Network
                        </div>
                    </Reveal>

                    <Reveal delayMs={60}>
                        <h2 className="mt-2 text-2xl md:text-3xl font-bold text-[#f88c29]">
                            Insurance Partners
                        </h2>
                    </Reveal>

                    <Reveal delayMs={90}>
                        <p className="mt-1 text-sm text-gray-600">
                            Cashless tie-ups • Fast approval support • UAE network
                        </p>
                    </Reveal>
                </div>

                <div className="relative w-full overflow-hidden rounded-2xl border border-[#307984]/10 bg-white p-3 md:p-4">
                    {/* Gradient overlays for smooth marquee edges */}
                    <div className="absolute left-0 top-0 bottom-0 w-28 md:w-32 bg-gradient-to-r from-white to-transparent z-10"></div>
                    <div className="absolute right-0 top-0 bottom-0 w-28 md:w-32 bg-gradient-to-l from-white to-transparent z-10"></div>

                    {/* Marquee container */}
                    <div className="flex w-fit animate-marquee hover:pause-marquee gap-4 md:gap-7 items-center py-2 md:py-3">
                        {marqueeItems.map((partner, index) => (
                            <div
                                key={`${partner.name}-${index}`}
                                className="flex-shrink-0 w-[200px] md:w-[270px] lg:w-[310px] h-[90px] md:h-[125px] lg:h-[145px] relative rounded-xl border border-gray-100 bg-white px-5 py-3 transition-transform duration-300 hover:scale-[1.02]"
                            >
                                <Image
                                    src={partner.image}
                                    alt={partner.name}
                                    fill
                                    className="object-contain p-3 md:p-4"
                                />
                            </div>
                        ))}
                    </div>
                </div>

            </div>

            <style
                dangerouslySetInnerHTML={{
                    __html: `
                @keyframes marquee {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
                .animate-marquee {
                    animation: marquee 50s linear infinite;
                }
                .hover\\:pause-marquee:hover {
                    animation-play-state: paused;
                }
            `,
                }}
            />
        </section>
    );
}
