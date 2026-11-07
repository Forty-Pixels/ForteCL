'use client';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Reveal from '@/components/Animation/Reveal';
import { getTestLink, getTestImage } from '@/lib/department-utils';

interface LabTestsProps {
    tests?: {
        slug: string;
        name: string;
        imageUrl?: string;
        image?: string;
        department?: string;
        departmentTitle?: string;
        departmentSlug?: string;
    }[];
}

export default function LabTests({ tests = [] }: LabTestsProps) {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);

    // Limit to 18 tests for the carousel
    const displayTests = tests.slice(0, 18);
    
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
        <section className="relative w-full overflow-hidden bg-white py-10 lg:py-16">
            <div className="mx-auto grid max-w-[1440px] grid-cols-1 gap-8 px-5 sm:px-8 lg:min-h-[500px] lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:items-center lg:gap-10 lg:px-12">
                
                {/* Left Column (50%) - Image + Content */}
                <div className="relative flex min-h-[440px] w-full flex-col justify-center px-8 py-12 sm:px-12 lg:h-[500px] lg:px-14">
                    {/* Shaped background image container */}
                    <div className="absolute inset-y-4 inset-x-4 overflow-hidden rounded-[40px_110px_40px_110px] sm:inset-x-6 lg:rounded-[30px_82px_26px_90px]">
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
                            <span className="text-[#a7dcc0] font-black text-[10px] tracking-[0.3em] mb-4 uppercase block">
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
                            <Link href="/lab-tests" className="bg-[#045d65] hover:bg-[#08717a] text-white px-4 py-2 sm:px-5 sm:py-2.5 md:px-7 md:py-3.5 lg:px-5 lg:py-2.5 xl:px-7 xl:py-3.5 rounded-xl text-[9px] sm:text-[10px] md:text-xs lg:text-[10px] xl:text-xs font-bold transition-all text-center w-full sm:w-auto uppercase tracking-wider active:scale-95 shadow-lg shadow-black/20">
                                Explore All Tests
                            </Link>
                        </Reveal>
                    </div>
                </div>

                {/* Right Column (50%) - Subtle Teal Tint + Carousel */}
                <div className="relative flex min-w-0 w-full flex-col justify-center border-t border-gray-100 py-8 lg:border-t-0 lg:py-0">
                    <Reveal delayMs={180} className="relative w-full">
                        <div className="relative w-full">
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
                                            href={getTestLink(test)}
                                            className="relative overflow-hidden group cursor-pointer bg-white transition-all duration-500 shadow-sm hover:shadow-lg h-full rounded-tl-[2rem] rounded-br-[2rem] rounded-tr-lg rounded-bl-lg border border-white block"
                                        >
                                            <Image
                                                src={getTestImage(test)}
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
                                                ? 'border-gray-200 bg-white text-[#202020] hover:bg-[#045d65] hover:border-[#045d65] hover:text-white active:scale-90'
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
                                                ? 'border-gray-200 bg-white text-[#202020] hover:bg-[#045d65] hover:border-[#045d65] hover:text-white active:scale-90'
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
