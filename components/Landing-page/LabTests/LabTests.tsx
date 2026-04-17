'use client';
import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Reveal from '@/components/Animation/Reveal';

const mainTests = [
    { name: 'Diabetes Care', image: '/Landing-page/tests/test-8.png' },
    { name: 'Liver Function Profile', image: '/Landing-page/tests/test-3.png' },
    { name: 'Kidney Function Panel', image: '/Landing-page/tests/test-4.png' },
    { name: 'Thyroid Profile', image: '/Landing-page/tests/test-2.png' },
    { name: 'Lipid Profile', image: '/Landing-page/tests/test-1.png' },
    { name: 'Complete Blood Count', image: '/Landing-page/tests/test-5.png' },
    { name: 'Electrolytes Panel', image: '/Landing-page/tests/test-7.png' },
    { name: 'Mineral Panel', image: '/Landing-page/tests/test-mineral.png' },
    { name: 'HIV Screening', image: '/Landing-page/tests/test-hiv.png' },
    { name: 'Fertility (Female)', image: '/Landing-page/tests/test-fertility.png' },
    { name: 'Hormone Panel (Male)', image: '/Landing-page/tests/test-hormone.png' },
    { name: 'Vitamin B12', image: '/Landing-page/tests/test-vitamin-b12.png' },
    { name: 'Vitamin D Panel', image: '/Landing-page/tests/test-6.png' },
    { name: 'Iron Studies', image: '/Landing-page/tests/test-9.png' },
    { name: 'Cardiac Risk Panel', image: '/Landing-page/tests/test-10.png' },
    { name: 'Prenatal Wellness Panel', image: '/Landing-page/tests/test-11.png' },
    { name: 'Bone Health Panel', image: '/Landing-page/tests/test-12.png' },
    { name: 'General Wellness Profile', image: '/Landing-page/tests/test-2.png' },
];

export default function LabTests() {
    const scrollRef = useRef<HTMLDivElement>(null);

    // 18 tests max, rendered as 3 slides of 6 cards each
    const allTests = mainTests.slice(0, 18);
    const chunked = [];
    for (let i = 0; i < allTests.length; i += 6) {
        chunked.push(allTests.slice(i, i + 6));
    }

    const scrollLeft = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({ left: -scrollRef.current.clientWidth, behavior: 'smooth' });
        }
    };

    const scrollRight = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({ left: scrollRef.current.clientWidth, behavior: 'smooth' });
        }
    };

    return (
        <section className="relative w-full overflow-hidden bg-white">
            <div className="flex flex-col lg:flex-row items-stretch lg:h-[660px]">
                
                {/* Left Column (50%) - Image + Content */}
                <div className="w-full lg:w-[50%] relative flex flex-col justify-center py-16 lg:py-0 px-6 sm:px-10 lg:pl-[calc((100vw-1280px)/2+2rem)] lg:pr-12 min-h-[500px] lg:min-h-0">
                    {/* Background Image */}
                    <Image 
                        src="/lab-tests/left-image.png"
                        alt="Lab Excellence"
                        fill
                        className="object-cover"
                        priority
                    />
                    {/* Dark Overlay for content readability (Reduced) */}
                    <div className="absolute inset-0 bg-black/40" />

                    <div className="relative z-10 flex flex-col items-start max-w-lg">
                        <Reveal delayMs={70}>
                            <span className="text-[#f88c29] font-black text-[10px] tracking-[0.3em] mb-4 uppercase block">
                                Lab Tests
                            </span>
                        </Reveal>
                        <Reveal delayMs={140}>
                            <h2 className="text-white text-3xl md:text-4xl lg:text-5xl font-black mb-6 leading-tight">
                                4,500+ Specialised Tests.<br /> One Location.
                            </h2>
                        </Reveal>
                        <Reveal delayMs={210}>
                            <p className="text-white/80 text-[13px] md:text-sm mb-10 leading-relaxed line-clamp-4 lg:line-clamp-none">
                                From everyday blood work to molecular diagnostics and genetic screening, Forte Clinical Laboratory processes over 10,000 parameters daily with the capacity to handle 4,500+ special tests under one roof. Our in-house pathologists, consultants and microbiologists review and authorise every report — so you get results you can act on.
                            </p>
                        </Reveal>

                        <Reveal delayMs={280}>
                            <Link href="/lab-tests" className="bg-[#f88c29] hover:bg-[#e67b1d] text-white px-8 py-4 rounded-xl text-xs font-bold transition-all text-center w-full sm:w-auto uppercase tracking-wider active:scale-95 shadow-lg shadow-black/20">
                                Explore All Tests
                            </Link>
                        </Reveal>
                    </div>
                </div>

                {/* Right Column (50%) - White + Carousel */}
                <div className="w-full lg:w-[50%] bg-white flex flex-col justify-center py-16 lg:py-0 px-6 sm:px-10 lg:px-12 relative">
                    <Reveal delayMs={180} className="w-full relative flex flex-col items-center">
                        <div
                            ref={scrollRef}
                            className="flex overflow-x-auto snap-x snap-mandatory hide-scrollbar gap-4 pb-4 w-full h-[500px]"
                            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                        >
                            {chunked.map((slide, slideIndex) => (
                                <div
                                    key={slideIndex}
                                    className="min-w-full grid grid-cols-2 sm:grid-cols-3 grid-rows-3 sm:grid-rows-2 gap-3 lg:gap-4 snap-start flex-shrink-0 h-full"
                                >
                                    {slide.map((test, index) => (
                                        <div
                                            key={index}
                                            className="relative rounded-[1.25rem] overflow-hidden group cursor-pointer bg-gray-50 transition-all duration-300 shadow-xl h-full"
                                        >
                                            <Image
                                                src={test.image}
                                                alt={test.name}
                                                fill
                                                sizes="(max-width: 640px) 50vw, 25vw"
                                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                                            />
                                            {/* Minimal Bottom Gradient for text clarity only */}
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                                            <div className="absolute inset-0 p-3 flex flex-col justify-end">
                                                <h3 className="text-white font-bold text-[10px] md:text-xs leading-tight">
                                                    {test.name}
                                                </h3>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </div>

                        {/* Navigation Arrows */}
                        <div className="flex gap-4 mt-6 justify-end w-full">
                            <button
                                onClick={scrollLeft}
                                className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center text-[#202020] hover:bg-[#f88c29] hover:border-[#f88c29] hover:text-white transition-all shadow-sm"
                                aria-label="Previous Slide"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                            </button>
                            <button
                                onClick={scrollRight}
                                className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center text-[#202020] hover:bg-[#f88c29] hover:border-[#f88c29] hover:text-white transition-all shadow-sm"
                                aria-label="Next Slide"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                            </button>
                        </div>
                    </Reveal>
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
