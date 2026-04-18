'use client';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Reveal from '@/components/Animation/Reveal';

const mainTests = [
    { name: 'Complete Blood Count (CBC)', image: '/Landing-page/tests/test-5.png' },
    { name: 'Fasting Blood Glucose', image: '/Landing-page/tests/test-8.png' },
    { name: 'HbA1c (Glycated Hemoglobin)', image: '/Landing-page/tests/test-8.png' },
    { name: 'Cholesterol Total', image: '/Landing-page/tests/test-1.png' },
    { name: 'HDL Cholesterol', image: '/Landing-page/tests/test-1.png' },
    { name: 'LDL Cholesterol', image: '/Landing-page/tests/test-1.png' },
    { name: 'TSH (Thyroid Stimulating Hormone)', image: '/Landing-page/tests/test-2.png' },
    { name: 'Free T4 (Thyroxine)', image: '/Landing-page/tests/test-2.png' },
    { name: 'Alanine Transaminase (ALT / SGPT)', image: '/Landing-page/tests/test-3.png' },
    { name: 'Aspartate Aminotransferase (AST/SGOT)', image: '/Landing-page/tests/test-3.png' },
    { name: 'Creatinine', image: '/Landing-page/tests/test-4.png' },
    { name: 'Urea (BUN)', image: '/Landing-page/tests/test-4.png' },
    { name: 'Vitamin D (25-OH)', image: '/Landing-page/tests/test-6.png' },
    { name: 'Vitamin B12', image: '/Landing-page/tests/test-vitamin-b12.png' },
    { name: 'Iron Studies', image: '/Landing-page/tests/test-9.png' },
    { name: 'Ferritin', image: '/Landing-page/tests/test-9.png' },
    { name: 'C Reactive Protein (CRP)', image: '/Landing-page/tests/test-10.png' },
    { name: 'ESR (Erythrocyte Sedimentation Rate)', image: '/Landing-page/tests/test-10.png' },
];

export default function LabTests() {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);

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
    }, []);

    return (
        <section className="relative w-full overflow-hidden bg-white py-8 lg:py-10">
            <div className="flex flex-col lg:flex-row items-stretch lg:h-[500px] lg:gap-4">
                
                {/* Left Column (50%) - Image + Content */}
                <div className="w-full lg:w-[49%] relative flex flex-col justify-center py-10 lg:py-0 px-6 sm:px-10 lg:pl-[calc((100vw-1280px)/2+3rem)] lg:pr-10 min-h-[360px] lg:min-h-0">
                    {/* Shaped background image container */}
                    <div className="absolute inset-y-4 left-8 right-3 overflow-hidden rounded-[30px_82px_26px_90px] sm:left-10 sm:right-5 lg:left-16 lg:right-10">
                        <Image
                            src="/lab-tests/left-image.png"
                            alt="Lab Excellence"
                            fill
                            className="object-cover object-right"
                            priority
                        />
                        <div className="absolute inset-0 bg-black/40" />
                    </div>

                    <div className="relative z-10 flex flex-col items-start max-w-[34rem]">
                        <Reveal delayMs={70}>
                            <span className="text-[#f88c29] font-black text-[10px] tracking-[0.3em] mb-4 uppercase block">
                                Lab Tests
                            </span>
                        </Reveal>
                        <Reveal delayMs={140}>
                            <h2 className="text-white text-3xl md:text-4xl lg:text-[2.7rem] font-black mb-5 leading-tight">
                                4,500+ Specialised Tests.<br /> One Location.
                            </h2>
                        </Reveal>
                        <Reveal delayMs={210}>
                            <p className="text-white/80 text-[13px] md:text-sm mb-8 leading-relaxed line-clamp-4 lg:line-clamp-none">
                                From everyday blood work to molecular diagnostics and genetic screening, Forte Clinical Laboratory processes over 10,000 parameters daily with the capacity to handle 4,500+ special tests under one roof. Our in-house pathologists, consultants and microbiologists review and authorise every report — so you get results you can act on.
                            </p>
                        </Reveal>

                        <Reveal delayMs={280}>
                            <Link href="/lab-tests" className="bg-[#f88c29] hover:bg-[#e67b1d] text-white px-7 py-3.5 rounded-xl text-xs font-bold transition-all text-center w-full sm:w-auto uppercase tracking-wider active:scale-95 shadow-lg shadow-black/20">
                                Explore All Tests
                            </Link>
                        </Reveal>
                    </div>
                </div>

                {/* Right Column (50%) - Subtle Teal Tint + Carousel */}
                <div className="w-full lg:w-[49%] flex flex-col justify-center py-10 lg:py-0 px-6 sm:px-8 lg:pl-2 lg:pr-8 relative border-t lg:border-t-0 lg:border-l border-gray-100/50">
                    <Reveal delayMs={180} className="w-full relative flex justify-start">
                        <div className="w-full max-w-[560px] relative">
                        <div
                            ref={scrollRef}
                            className="flex overflow-x-auto snap-x snap-mandatory hide-scrollbar gap-3 pb-1 w-full h-[300px] md:h-[320px]"
                            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                        >
                            {chunked.map((slide, slideIndex) => (
                                <div
                                    key={slideIndex}
                                    className="min-w-full grid grid-cols-2 sm:grid-cols-3 grid-rows-3 sm:grid-rows-2 gap-2.5 sm:gap-3 snap-start flex-shrink-0 h-full"
                                >
                                    {slide.map((test, index) => (
                                        <div
                                            key={index}
                                            className="relative overflow-hidden group cursor-pointer bg-white transition-all duration-500 shadow-sm hover:shadow-lg h-full rounded-tl-[2.25rem] rounded-br-[2.25rem] rounded-tr-lg rounded-bl-lg border border-white"
                                        >
                                            <Image
                                                src={test.image}
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
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </div>

                            {canScrollRight || canScrollLeft ? (
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
