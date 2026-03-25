'use client';
import { useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Reveal from '@/components/Animation/Reveal';

const tests = [
    { name: 'Diabetes Care', image: '/Landing-page/tests/test-8.png' },
    { name: 'Liver Tests', image: '/Landing-page/tests/test-3.png' },
    { name: 'Kidney Tests', image: '/Landing-page/tests/test-4.png' },
    { name: 'Thyroid Tests', image: '/Landing-page/tests/test-2.png' },
    { name: 'Lipid Profile', image: '/Landing-page/tests/test-1.png' },
    { name: 'Complete Blood Count (CBC)', image: '/Landing-page/tests/test-5.png' },
    { name: 'Electrolytes Panel', image: '/Landing-page/tests/test-7.png' },
    { name: 'Mineral Panel', image: '/Landing-page/tests/test-mineral.png' },
    { name: 'HIV Test', image: '/Landing-page/tests/test-hiv.png' },
    { name: 'Fertility (Female)', image: '/Landing-page/tests/test-fertility.png' },
    { name: 'Hormone Panel (Men)', image: '/Landing-page/tests/test-hormone.png' },
    { name: 'Vitamin B12', image: '/Landing-page/tests/test-vitamin-b12.png' },
];

// Triple the tests to simulate infinity
const infiniteTests = [...tests, ...tests, ...tests];

export default function LabTests() {
    const scrollRef = useRef<HTMLDivElement>(null);

    // Create chunks of 8 tests
    const allTests = [...tests, ...tests]; // 24 total to have 3 full slides of 8
    const chunked = [];
    for (let i = 0; i < allTests.length; i += 8) {
        chunked.push(allTests.slice(i, i + 8));
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
        <section className="bg-[#111111] py-24 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col lg:flex-row items-center lg:items-start gap-12 lg:gap-16">

                    {/* Left Content */}
                    <div className="w-full lg:w-[45%] flex flex-col items-start pt-4 lg:pr-8">
                        <Reveal delayMs={70}>
                            <span className="text-[#2DD4BF] font-semibold text-sm tracking-widest mb-4 uppercase block">
                                Lab Tests
                            </span>
                        </Reveal>
                        <Reveal delayMs={140}>
                            <h2 className="text-white text-4xl md:text-5xl lg:text-[2.8rem] font-bold mb-8 leading-[1.15]">
                                4,500+ Specialised Tests.<br className="hidden lg:block" /> One Location.
                            </h2>
                        </Reveal>
                        <Reveal delayMs={210}>
                            <p className="text-gray-300 text-sm md:text-base mb-10 leading-relaxed opacity-90">
                                From everyday blood work to molecular diagnostics and genetic screening, Forte Clinical Laboratory processes over 10,000 parameters daily with the capacity to handle 4,500+ special tests under one roof. Our in-house pathologists, consultants and microbiologists review and authorise every report — so you get results you can act on.
                            </p>
                        </Reveal>

                        <Reveal delayMs={280}>
                            <Link href="/tests" className="bg-[#2DD4BF] hover:bg-teal-300 text-[#111] px-8 py-3.5 rounded-md font-bold transition-colors text-center w-full sm:w-auto">
                                View All Tests
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
                                    className="min-w-full grid grid-cols-2 sm:grid-cols-4 grid-rows-4 sm:grid-rows-2 gap-3 snap-start flex-shrink-0"
                                >
                                    {slide.map((test, index) => (
                                        <div
                                            key={index}
                                            className="relative aspect-square md:aspect-[4/5] rounded-xl overflow-hidden group cursor-pointer bg-gray-800"
                                        >
                                            <Image
                                                src={test.image}
                                                alt={test.name}
                                                fill
                                                sizes="(max-width: 640px) 50vw, 25vw"
                                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent"></div>
                                            <div className="absolute inset-0 p-4 flex flex-col justify-end">
                                                <h3 className="text-white font-bold text-sm md:text-[0.95rem] leading-tight">
                                                    {test.name}
                                                </h3>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </div>

                        {/* Navigation Arrows DOWN (Under the images) */}
                        <div className="flex gap-4 mt-6 justify-start">
                            <button
                                onClick={scrollLeft}
                                className="w-10 h-10 rounded-full border border-gray-600 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all"
                                aria-label="Previous Slide"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                            </button>
                            <button
                                onClick={scrollRight}
                                className="w-10 h-10 rounded-full border border-gray-600 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all"
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
