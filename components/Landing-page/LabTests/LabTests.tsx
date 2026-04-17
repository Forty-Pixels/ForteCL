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
        <section className="bg-gradient-to-br from-[#307984] to-[#3C8E9B] py-6 md:py-8 lg:py-10 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col lg:flex-row items-center lg:items-start gap-10 lg:gap-12">

                    {/* Left Content */}
                    <div className="w-full lg:w-[45%] flex flex-col items-start pt-2 lg:pr-6">
                        <Reveal delayMs={70}>
                            <span className="text-[#f88c29] font-semibold text-xs tracking-widest mb-3 uppercase block">
                                Lab Tests
                            </span>
                        </Reveal>
                        <Reveal delayMs={140}>
                            <h2 className="text-white text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-[1.15]">
                                4,500+ Specialised Tests.<br className="hidden lg:block" /> One Location.
                            </h2>
                        </Reveal>
                        <Reveal delayMs={210}>
                            <p className="text-white/90 text-xs md:text-sm mb-8 leading-relaxed">
                                From everyday blood work to molecular diagnostics and genetic screening, Forte Clinical Laboratory processes over 10,000 parameters daily with the capacity to handle 4,500+ special tests under one roof. Our in-house pathologists, consultants and microbiologists review and authorise every report — so you get results you can act on.
                            </p>
                        </Reveal>

                        <Reveal delayMs={280}>
                            <Link href="/lab-tests" className="bg-[#f88c29] hover:bg-[#e67b1d] text-white px-6 py-3 rounded-md text-sm font-bold transition-colors text-center w-full sm:w-auto">
                                Explore Lab Tests
                            </Link>
                        </Reveal>
                    </div>

                    {/* Right Content - Carousel */}
                    <Reveal delayMs={180} className="w-full lg:w-[55%] mt-12 lg:mt-0 relative">
                        <div
                            ref={scrollRef}
                            className="flex overflow-x-auto snap-x snap-mandatory hide-scrollbar pb-4"
                            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                        >
                            {chunked.map((slide, slideIndex) => (
                                <div
                                    key={slideIndex}
                                    className="min-w-full grid grid-cols-2 sm:grid-cols-3 grid-rows-3 sm:grid-rows-2 gap-3 snap-start flex-shrink-0"
                                >
                                    {slide.map((test, index) => (
                                        <div
                                            key={index}
                                            className="relative aspect-square md:aspect-[4/5] rounded-xl overflow-hidden group cursor-pointer bg-gray-800 border-2 border-[#f88c29] transition-all duration-300"
                                        >
                                            <Image
                                                src={test.image}
                                                alt={test.name}
                                                fill
                                                sizes="(max-width: 640px) 50vw, 25vw"
                                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent"></div>
                                            <div className="absolute inset-0 p-3 flex flex-col justify-end">
                                                <h3 className="text-white font-bold text-xs md:text-sm leading-tight">
                                                    {test.name}
                                                </h3>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </div>

                        {/* Navigation Arrows DOWN (Under the images) */}
                        <div className="flex gap-4 mt-5 justify-end">
                            <button
                                onClick={scrollLeft}
                                className="w-10 h-10 rounded-full border border-white/40 flex items-center justify-center text-white hover:bg-[#f88c29] hover:border-[#f88c29] transition-all"
                                aria-label="Previous Slide"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                            </button>
                            <button
                                onClick={scrollRight}
                                className="w-10 h-10 rounded-full border border-white/40 flex items-center justify-center text-white hover:bg-[#f88c29] hover:border-[#f88c29] transition-all"
                                aria-label="Next Slide"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
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
