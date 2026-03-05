'use client';
import { useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const tests = [
    { name: 'Lipid Profile', image: '/Landing-page/tests/test-1.png' },
    { name: 'Thyroid Profile', image: '/Landing-page/tests/test-2.png' },
    { name: 'Liver Function', image: '/Landing-page/tests/test-3.png' },
    { name: 'Kidney Function', image: '/Landing-page/tests/test-4.png' },
    { name: 'Complete Blood Count (CBC)', image: '/Landing-page/tests/test-5.png' },
    { name: 'Urine Analysis', image: '/Landing-page/tests/test-6.png' },
    { name: 'Electrolytes', image: '/Landing-page/tests/test-7.png' },
    { name: 'Diabetes Care', image: '/Landing-page/tests/test-8.png' },
    { name: 'STD Testing', image: '/Landing-page/tests/test-9.png' },
    { name: 'Allergy Panel', image: '/Landing-page/tests/test-10.png' },
    { name: 'Pre-Marital Screening', image: '/Landing-page/tests/test-11.png' },
    { name: 'Cancer Markers', image: '/Landing-page/tests/test-12.png' },
];

// Triple the tests to simulate infinity
const infiniteTests = [...tests, ...tests, ...tests];

export default function LabTests() {
    const scrollRef = useRef<HTMLDivElement>(null);

    // Initialize to middle section
    useEffect(() => {
        if (scrollRef.current) {
            const cardWidth = 360 + 24; // Width + gap
            scrollRef.current.scrollLeft = cardWidth * tests.length;
        }
    }, []);

    const scrollLeft = () => {
        if (scrollRef.current) {
            const cardWidth = 360 + 24;
            scrollRef.current.scrollBy({ left: -cardWidth, behavior: 'smooth' });
        }
    };

    const scrollRight = () => {
        if (scrollRef.current) {
            const cardWidth = 360 + 24;
            scrollRef.current.scrollBy({ left: cardWidth, behavior: 'smooth' });
        }
    };

    const handleScroll = () => {
        if (!scrollRef.current) return;
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
        const cardWidth = 360 + 24;
        const totalTestsWidth = cardWidth * tests.length;

        // If too far left, jump to middle
        if (scrollLeft < totalTestsWidth - cardWidth * 2) {
            scrollRef.current.scrollLeft += totalTestsWidth;
        }
        // If too far right, jump to middle
        else if (scrollLeft > totalTestsWidth * 2) {
            scrollRef.current.scrollLeft -= totalTestsWidth;
        }
    };

    return (
        <section className="bg-[#111111] py-24 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col lg:flex-row items-center lg:items-start gap-12 lg:gap-16">

                    {/* Left Content */}
                    <div className="w-full lg:w-[60%] flex flex-col items-start pt-4 lg:pr-12">
                        <span className="text-[#2DD4BF] font-semibold text-sm tracking-widest mb-4 uppercase">
                            Lab Tests
                        </span>
                        <h2 className="text-white text-4xl md:text-5xl lg:text-[2.8rem] font-bold mb-8 leading-[1.15]">
                            Redefining Diagnostics<br className="hidden lg:block" /> with World Class Lab<br className="hidden lg:block" /> Test Services
                        </h2>
                        <p className="text-gray-300 text-sm md:text-base mb-6 leading-relaxed opacity-90 max-w-lg">
                            From routine blood tests and hormone panels to advanced diagnostic screenings, Forte Clinical Laboratory offers a comprehensive range of tests tailored to individual and clinical needs — including home sample collection in Dubai, STD testing, and pre-marital screening packages.
                        </p>
                        <p className="text-gray-300 text-sm md:text-base mb-10 leading-relaxed opacity-90 max-w-lg">
                            Experience precision in diagnostics with CBC, lipid profiles, glucose monitoring, genetic analysis and more. All performed with the latest technology medical science has to offer
                        </p>

                        <Link href="/tests" className="bg-[#2DD4BF] hover:bg-teal-300 text-white px-8 py-3.5 rounded-md font-medium transition-colors text-center w-full sm:w-auto">
                            View All Tests
                        </Link>
                    </div>

                    {/* Right Content - Carousel */}
                    <div className="w-full lg:w-[40%] mt-12 lg:mt-0 relative">
                        <div
                            ref={scrollRef}
                            onScroll={handleScroll}
                            className="flex gap-6 overflow-x-auto snap-x snap-mandatory hide-scrollbar pb-4 -mr-[50vw] pr-[50vw]"
                            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                        >
                            {infiniteTests.map((test, index) => (
                                <div
                                    key={index}
                                    className="min-w-[320px] max-w-[320px] md:min-w-[360px] md:max-w-[360px] h-[450px] md:h-[500px] relative rounded-2xl overflow-hidden snap-start flex-shrink-0 group cursor-pointer bg-gray-800"
                                >
                                    <Image
                                        src={test.image}
                                        alt={test.name}
                                        fill
                                        sizes="(max-width: 768px) 320px, 360px"
                                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-black/40 to-transparent opacity-90"></div>
                                    <h3 className="absolute bottom-8 left-8 right-8 text-white font-bold text-2xl md:text-[1.75rem] leading-tight">
                                        {test.name.split(' ').map((word, i) => (
                                            <span key={i}>{word}<br /></span>
                                        ))}
                                    </h3>
                                </div>
                            ))}
                        </div>

                        {/* Navigation Arrows DOWN (Under the images) */}
                        <div className="flex gap-4 mt-8 justify-start lg:justify-start">
                            <button
                                onClick={scrollLeft}
                                className="w-12 h-12 rounded-full border border-gray-600 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all"
                                aria-label="Previous"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                            </button>
                            <button
                                onClick={scrollRight}
                                className="w-12 h-12 rounded-full border border-gray-600 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all"
                                aria-label="Next"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                            </button>
                        </div>
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
