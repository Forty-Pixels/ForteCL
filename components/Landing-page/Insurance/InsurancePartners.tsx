'use client';

import Image from 'next/image';
import Reveal from '@/components/Animation/Reveal';

const partners = [
    { name: 'Emarat Takaful', image: '/Landing-page/insurance/partner-1.webp' },
    { name: 'SALAMA', image: '/Landing-page/insurance/partner-2.webp' },
    { name: 'NGI', image: '/Landing-page/insurance/partner-3.webp' },
    { name: 'NLG', image: '/Landing-page/insurance/partner-4.webp' },
    { name: 'MetLife', image: '/Landing-page/insurance/partner-5.webp' },
    { name: 'Life Line', image: '/Landing-page/insurance/partner-6.webp' },
    { name: 'Orient Insurance', image: '/Landing-page/insurance/partner-7.webp' },
    { name: 'AMAN', image: '/Landing-page/insurance/partner-8.webp' },
    { name: 'ALMADALLAH', image: '/Landing-page/insurance/partner-9.webp' },
    { name: 'Nextcare', image: '/Landing-page/insurance/partner-10.webp' },
    { name: 'NAS', image: '/Landing-page/insurance/partner-11.webp' },
    { name: 'FMC NETWORK UAE', image: '/Landing-page/insurance/partner-12.webp' },
    { name: 'SAICO', image: '/Landing-page/insurance/partner-13.webp' },
    { name: 'NOOR TAKAFUL', image: '/Landing-page/insurance/partner-14.webp' },
    { name: 'ecare INTERNATIONAL', image: '/Landing-page/insurance/partner-15.webp' },
    { name: 'DUBAI INSURANCE', image: '/Landing-page/insurance/partner-16.webp' },
    { name: 'DNI', image: '/Landing-page/insurance/partner-17.webp' },
    { name: 'Daman', image: '/Landing-page/insurance/partner-18.webp' },
    { name: 'Al-Buhaira', image: '/Landing-page/insurance/partner-19.webp' },
    { name: 'AFNIC', image: '/Landing-page/insurance/partner-20.webp' },
    { name: 'ADNIC', image: '/Landing-page/insurance/partner-21.webp' },
    { name: 'Aafiya', image: '/Landing-page/insurance/partner-22.webp' },
    { name: 'Watania Takaful', image: '/Landing-page/insurance/partner-23.webp' },
    { name: 'MSH International', image: '/Landing-page/insurance/partner-24.webp' },
];

export default function InsurancePartners() {
    // Duplicate the partners array twice to ensure a seamless infinite loop on all screen sizes
    const marqueeItems = [...partners, ...partners];

    return (
        <section className="bg-white py-6 md:py-8 overflow-hidden">
            <div className="max-w-[1440px] mx-auto">
                <div className="mb-6 text-center px-4">
                    <Reveal delayMs={70}>
                        <h2 className="text-xl md:text-3xl font-bold text-gray-900">
                            Our Insurance Partners
                        </h2>
                    </Reveal>
                </div>

                <div className="relative w-full overflow-hidden">
                    {/* Gradient Overlays for smooth edges */}
                    <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white to-transparent z-10"></div>
                    <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white to-transparent z-10"></div>

                    {/* Marquee Container */}
                    <div className="flex w-fit animate-marquee hover:pause-marquee gap-8 md:gap-12 items-center py-2">
                        {marqueeItems.map((partner, index) => (
                            <div 
                                key={`${partner.name}-${index}`} 
                                className="flex-shrink-0 w-64 md:w-80 lg:w-[400px] h-32 md:h-44 lg:h-56 relative transition-all duration-300 transform hover:scale-105"
                            >
                                <Image
                                    src={partner.image}
                                    alt={partner.name}
                                    fill
                                    className="object-contain"
                                />
                            </div>
                        ))}
                    </div>
                </div>

            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
                @keyframes marquee {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
                .animate-marquee {
                    animation: marquee 55s linear infinite;
                }
                .hover\\:pause-marquee:hover {
                    animation-play-state: paused;
                }
            `}} />
        </section>
    );
}
