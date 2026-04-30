'use client';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Reveal from '@/components/Animation/Reveal';
import { urlFor } from '@/lib/sanity';

const PLACEHOLDER_IMAGES = [
    '/Landing-page/tests/test-5.png',
    '/Landing-page/tests/test-8.png',
    '/Landing-page/tests/test-1.png',
    '/Landing-page/tests/test-2.png',
    '/Landing-page/tests/test-3.png',
    '/Landing-page/tests/test-4.png',
    '/Landing-page/tests/test-6.png',
    '/Landing-page/tests/test-9.png',
    '/Landing-page/tests/test-10.png',
];

interface LabTestsProps {
    tests?: any[];
}

export default function LabTests({ tests = [] }: LabTestsProps) {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);

    // Limit to 18 tests for the carousel
    const displayTests = tests.length > 0 ? tests.slice(0, 18) : [];
    
    const chunked = [];
    for (let i = 0; i < displayTests.length; i += 6) {
        chunked.push(displayTests.slice(i, i + 6));
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

    useEffect(() => {
        const el = scrollRef.current;
        if (!el) return;

        const updateScrollState = () => {
            const maxScrollLeft = el.scrollWidth - el.clientWidth;
            const threshold = 8;
            setCanScrollLeft(el.scrollLeft > threshold);
            setCanScrollRight(el.scrollLeft < maxScrollLeft - threshold);
        };

        updateScrollState();
        el.addEventListener('scroll', updateScrollState, { passive: true });
        window.addEventListener('resize', updateScrollState);

        return () => {
            el.removeEventListener('scroll', updateScrollState);
            window.removeEventListener('resize', updateScrollState);
        };
    }, [displayTests]);

    return (
        <section className="relative w-full overflow-hidden bg-white py-8 lg:py-10">
            <div className="flex flex-col lg:flex-row items-stretch lg:h-[500px] lg:gap-4">
                
                {/* Left Column (50%) - Image + Content */}
                <div className="w-full lg:w-[49%] relative flex flex-col justify-center py-12 lg:py-0 px-8 sm:px-14 lg:pl-20 xl:pl-[calc((100vw-1280px)/2+3rem)] lg:pr-10 min-h-[400px] lg:min-h-0">
                    {/* Shaped background image container */}
                    <div className="absolute inset-y-4 inset-x-4 sm:inset-x-6 overflow-hidden rounded-[40px_110px_40px_110px] lg:left-12 lg:right-10 lg:rounded-[30px_82px_26px_90px]">
                        <Image
                            src="/lab-tests/left-image.png"
                            alt="Lab Excellence"
                            fill
                            className="object-cover object-right"
                            priority
                        />
                        <div className="absolute inset-0 bg-black/45" />
                    </div>

                    <div className="relative z-10 flex flex-col items-start max-w-[34rem]">
                        <Reveal delayMs={70}>
                            <span className="text-[#f88c29] font-black text-[10px] tracking-[0.3em] mb-4 uppercase block">
                                Lab Tests
                            </span>
                        </Reveal>
                        <Reveal delayMs={140}>
                            <h2 className="text-white text-xl sm:text-2xl md:text-3xl lg:text-[1.8rem] xl:text-[2.7rem] font-black mb-2 sm:mb-4 lg:mb-4 leading-tight">
                                4,500+ Specialised Tests.<br /> One Location.
                            </h2>
                        </Reveal>
                        <Reveal delayMs={210}>
                            <p className="text-white/80 text-[11px] sm:text-[12px] md:text-[13px] lg:text-[12px] xl:text-sm mb-5 sm:mb-7 lg:mb-6 leading-relaxed">
                                From everyday blood work to molecular diagnostics and genetic screening, Forte Clinical Laboratory processes over 10,000 parameters daily with the capacity to handle 4,500+ special tests under one roof. Our in-house pathologists, consultants and microbiologists review and authorise every report — so you get results you can act on.
                            </p>
                        </Reveal>

                        <Reveal delayMs={280}>
                            <Link href="/lab-tests" className="bg-[#f88c29] hover:bg-[#e67b1d] text-white px-4 py-2 sm:px-5 sm:py-2.5 md:px-7 md:py-3.5 lg:px-5 lg:py-2.5 xl:px-7 xl:py-3.5 rounded-xl text-[9px] sm:text-[10px] md:text-xs lg:text-[10px] xl:text-xs font-bold transition-all text-center w-full sm:w-auto uppercase tracking-wider active:scale-95 shadow-lg shadow-black/20">
                                Explore All Tests
                            </Link>
                        </Reveal>
                    </div>
                </div>

                {/* Right Column (50%) - Subtle Teal Tint + Carousel */}
                <div className="w-full lg:w-[49%] flex flex-col justify-center py-12 lg:py-0 px-6 sm:px-8 lg:pl-2 lg:pr-8 relative border-t lg:border-t-0 lg:border-l border-gray-100/50">
                    <Reveal delayMs={180} className="w-full relative flex justify-start">
                        <div className="w-full max-w-[560px] relative">
                        <div
                            ref={scrollRef}
                            className="flex overflow-x-auto snap-x snap-mandatory hide-scrollbar gap-3 pb-1 w-full h-[320px] sm:h-[340px] md:h-[360px] lg:h-[320px]"
                            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                        >
                            {chunked.map((slide, slideIndex) => (
                                <div
                                    key={slideIndex}
                                    className="min-w-full grid grid-cols-2 sm:grid-cols-3 grid-rows-3 sm:grid-rows-2 gap-2.5 sm:gap-3 snap-start flex-shrink-0 h-full"
                                >
                                    {slide.map((test, index) => (
                                        <Link
                                            key={test.slug || index}
                                            href={`/lab-tests/${test.slug}`}
                                            className="relative overflow-hidden group cursor-pointer bg-white transition-all duration-500 shadow-sm hover:shadow-lg h-full rounded-tl-[2rem] rounded-br-[2rem] rounded-tr-lg rounded-bl-lg border border-white block"
                                        >
                                            <Image
                                                src={test.image ? urlFor(test.image).url() : PLACEHOLDER_IMAGES[index % PLACEHOLDER_IMAGES.length]}
                                                alt={test.name}
                                                fill
                                                sizes="(max-width: 640px) 50vw, 20vw"
                                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                                            />
                                            {/* Minimal Bottom Gradient for text clarity only */}
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/5 to-transparent opacity-90"></div>
                                            <div className="absolute inset-x-0 bottom-0 p-3">
                                                <h3 className="text-white font-semibold text-[11px] md:text-xs leading-snug">
                                                    {test.name}
                                                </h3>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            ))}
                        </div>

                            {(canScrollRight || canScrollLeft) && chunked.length > 1 ? (
                                <div className="mt-3 flex items-center justify-end gap-3">
                                    <button
                                        onClick={scrollLeft}
                                        disabled={!canScrollLeft}
                                        className={`w-11 h-11 rounded-full border flex items-center justify-center transition-all shadow-sm ${
                                            canScrollLeft
                                                ? 'border-gray-200 bg-white text-[#202020] hover:bg-[#f88c29] hover:border-[#f88c29] hover:text-white active:scale-90'
                                                : 'border-gray-200 bg-white text-gray-300 cursor-not-allowed'
                                        }`}
                                        aria-label="Previous Slide"
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                                    </button>
                                    <button
                                        onClick={scrollRight}
                                        disabled={!canScrollRight}
                                        className={`w-11 h-11 rounded-full border flex items-center justify-center transition-all shadow-sm ${
                                            canScrollRight
                                                ? 'border-gray-200 bg-white text-[#202020] hover:bg-[#f88c29] hover:border-[#f88c29] hover:text-white active:scale-90'
                                                : 'border-gray-200 bg-white text-gray-300 cursor-not-allowed'
                                        }`}
                                        aria-label="Next Slide"
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                                    </button>
                                </div>
                            ) : null}
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
