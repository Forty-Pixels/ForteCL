'use client';

import { useRef } from 'react';
import Image from 'next/image';
import Reveal from '@/components/Animation/Reveal';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

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
    const scrollRef = useRef<HTMLDivElement>(null);

    const scroll = (direction: 'left' | 'right') => {
        if (scrollRef.current) {
            const { current } = scrollRef;
            const scrollAmount = direction === 'left' ? -current.clientWidth : current.clientWidth;
            current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    };

    return (
        <section className="bg-white py-16 md:py-20 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative group">
                <div className="mb-12 text-center">
                    <Reveal delayMs={70}>
                        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900">
                            Insurance Partners
                        </h2>
                    </Reveal>
                </div>

                <div className="relative">
                    {/* Navigation Buttons */}
                    <button 
                        onClick={() => scroll('left')}
                        className="absolute -left-2 sm:-left-8 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white shadow-lg border border-[#307984]/20 flex items-center justify-center text-[#307984] hover:bg-[#307984] hover:text-white transition-all duration-300"
                        aria-label="Previous partners"
                    >
                        <ChevronLeftIcon className="w-5 h-5" />
                    </button>
                    
                    <button 
                        onClick={() => scroll('right')}
                        className="absolute -right-2 sm:-right-8 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white shadow-lg border border-[#307984]/20 flex items-center justify-center text-[#307984] hover:bg-[#307984] hover:text-white transition-all duration-300"
                        aria-label="Next partners"
                    >
                        <ChevronRightIcon className="w-5 h-5" />
                    </button>

                    {/* Logos Container */}
                    <div 
                        ref={scrollRef}
                        className="flex overflow-x-auto snap-x snap-mandatory hide-scrollbar gap-8 items-center py-4 px-2"
                        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                    >
                        {partners.map((partner, index) => (
                            <div 
                                key={index} 
                                className="flex-shrink-0 w-32 md:w-40 lg:w-44 h-16 relative snap-center grayscale hover:grayscale-0 opacity-60 hover:opacity-100 transition-all duration-300"
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
                .hide-scrollbar::-webkit-scrollbar {
                    display: none;
                }
            `}} />
        </section>
    );
}
