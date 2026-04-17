'use client';
import { useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Reveal from '@/components/Animation/Reveal';
import { resourcePosts } from '@/data/resourcesData';

const infiniteNewsItems = [...resourcePosts, ...resourcePosts, ...resourcePosts];

export default function NewsInsights() {
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    // Initialize to middle section
    useEffect(() => {
        if (scrollContainerRef.current) {
            const container = scrollContainerRef.current;
            const singleSetWidth = (container.children[0] as HTMLElement).offsetWidth * resourcePosts.length + (24 * resourcePosts.length);
            container.scrollLeft = singleSetWidth;
        }
    }, []);

    const handleScroll = () => {
        if (!scrollContainerRef.current) return;
        const container = scrollContainerRef.current;
        const { scrollLeft } = container;
        const cardWidth = (container.children[0] as HTMLElement).offsetWidth;
        const gap = 24;
        const totalItemsWidth = (cardWidth + gap) * resourcePosts.length;

        // If too far left, jump to middle
        if (scrollLeft < totalItemsWidth / 2) {
            container.scrollLeft += totalItemsWidth;
        }
        // If too far right, jump to middle
        else if (scrollLeft > totalItemsWidth * 2) {
            container.scrollLeft -= totalItemsWidth;
        }
    };

    const scroll = (direction: 'left' | 'right') => {
        if (scrollContainerRef.current) {
            const container = scrollContainerRef.current;
            const viewWidth = container.clientWidth;
            const scrollAmount = direction === 'left' ? -viewWidth : viewWidth;
            container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    };

    return (
        <section className="py-10 md:py-12 bg-[#307984] overflow-hidden relative">
            {/* Background Accent */}
            <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none overflow-hidden">
                <div className="absolute -top-[10%] -left-[10%] w-[30%] h-[30%] bg-white rounded-full blur-[100px]" />
                <div className="absolute -bottom-[10%] -right-[10%] w-[30%] h-[30%] bg-[#f88c29] rounded-full blur-[100px]" />
            </div>

            <div className="max-w-[1440px] mx-auto px-6 relative z-10">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
                    <div className="max-w-xl">
                        <Reveal delayMs={100}>
                            <span className="text-[#f88c29] font-bold text-[9px] tracking-[0.2em] uppercase mb-2 block">
                                News & Insights
                            </span>
                        </Reveal>
                        <Reveal delayMs={200}>
                            <h2 className="text-2xl md:text-3xl font-black text-white leading-tight">
                                Stay Informed. <br />
                                <span className="text-white/80">Empower Your Health Journey.</span>
                            </h2>
                        </Reveal>
                    </div>
                    
                    <Reveal delayMs={300}>
                        <div className="flex gap-2.5">
                            <button
                                onClick={() => scroll('left')}
                                className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-[#307984] transition-all duration-300 group"
                                aria-label="Previous articles"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                                </svg>
                            </button>
                            <button
                                onClick={() => scroll('right')}
                                className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-[#307984] transition-all duration-300 group"
                                aria-label="Next articles"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4 group-hover:translate-x-0.5 transition-transform">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                                </svg>
                            </button>
                        </div>
                    </Reveal>
                </div>

                {/* Carousel */}
                <Reveal delayMs={400}>
                    <div
                        ref={scrollContainerRef}
                        onScroll={handleScroll}
                        className="flex overflow-x-auto gap-5 pb-8 snap-x snap-mandatory scrollbar-hide w-full scroll-smooth"
                        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                    >
                        {infiniteNewsItems.map((item, index) => (
                            <Link
                                key={index}
                                href={`/resources/${item.slug}`}
                                className="w-full md:w-full lg:w-[320px] flex-shrink-0 snap-start group/card"
                            >
                                <div className="bg-white rounded-[1.5rem] overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1.5 flex flex-col h-full border border-white/10">
                                    {/* Image Container */}
                                    <div className="relative aspect-[16/10] overflow-hidden">
                                        <Image
                                            src={item.image}
                                            alt={item.title}
                                            fill
                                            className="object-cover transform transition-transform duration-700 group-hover/card:scale-110"
                                            unoptimized
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-500" />
                                        
                                        <div className="absolute top-3 left-3 bg-[#307984] text-white text-[8px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full shadow-lg">
                                            {item.category}
                                        </div>
                                    </div>

                                    {/* Content Area */}
                                    <div className="p-5 flex flex-col flex-1">
                                        <div className="flex items-center gap-2 mb-2.5">
                                            <span className="text-[#f88c29] font-bold text-[8px] uppercase tracking-widest">{item.date}</span>
                                        </div>
                                        
                                        <h3 className="text-[#1a1a1a] font-bold text-base md:text-lg leading-[1.3] mb-3 group-hover/card:text-[#307984] transition-colors duration-300 line-clamp-2">
                                            {item.title}
                                        </h3>
                                        
                                        <p className="text-gray-500 text-[10px] leading-relaxed mb-4 line-clamp-2">
                                            {item.excerpt}
                                        </p>

                                        <div className="mt-auto flex items-center justify-between">
                                            <span className="text-[#307984] font-bold text-[9px] uppercase tracking-[0.2em] flex items-center gap-1.5 group/btn">
                                                Read More
                                                <svg className="w-3.5 h-3.5 transform group-hover/btn:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                                </svg>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </Reveal>
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
                .scrollbar-hide::-webkit-scrollbar {
                    display: none;
                }
            `}} />
        </section>
    );
}
