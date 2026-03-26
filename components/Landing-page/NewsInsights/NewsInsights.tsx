'use client';
import { useRef, useEffect } from 'react';
import Image from 'next/image';
import Reveal from '@/components/Animation/Reveal';

interface NewsItem {
    title: string;
    image: string;
}

const newsItems: NewsItem[] = [
    {
        title: 'What Is a Respiratory Virus?',
        image: '/Landing-page/news/image-1.png',
    },
    {
        title: 'Vitamins & Monitoring',
        image: '/Landing-page/news/image-2.png',
    },
    {
        title: 'Pre-Marital Screening',
        image: '/Landing-page/news/image-3.png',
    },
    {
        title: 'Genomic Testing Role',
        image: '/Landing-page/news/image-4.png',
    },
    {
        title: 'Lab Results Dashboard',
        image: '/Landing-page/news/image-5.png',
    },
    {
        title: 'Ensuring Test Accuracy',
        image: '/Landing-page/news/image-6.png',
    },
    {
        title: 'Cardiac Risk Assessment',
        image: '/Landing-page/news/new-item-2.png', 
    },
    {
        title: 'Routine Blood Panels',
        image: '/Landing-page/tests/test-1.png', 
    },
    {
        title: 'Thyroid Health Guide',
        image: '/Landing-page/news/new-item-4.png', 
    },
    {
        title: 'Allergy Testing Process',
        image: '/Landing-page/news/new-item-1.png', 
    },
    {
        title: 'Metabolic Health Stats',
        image: '/Landing-page/news/new-item-3.png', 
    },
    {
        title: 'Pediatric Wellness',
        image: '/Landing-page/tests/test-2.png',
    },
];

const infiniteNewsItems = [...newsItems, ...newsItems, ...newsItems];

export default function NewsInsights() {
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    // Initialize to middle section
    useEffect(() => {
        if (scrollContainerRef.current) {
            const container = scrollContainerRef.current;
            const singleSetWidth = (container.children[0] as HTMLElement).offsetWidth * newsItems.length + (24 * newsItems.length);
            container.scrollLeft = singleSetWidth;
        }
    }, []);

    const handleScroll = () => {
        if (!scrollContainerRef.current) return;
        const container = scrollContainerRef.current;
        const { scrollLeft } = container;
        const cardWidth = (container.children[0] as HTMLElement).offsetWidth;
        const gap = 24;
        const totalItemsWidth = (cardWidth + gap) * newsItems.length;

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
            // Scroll by one full view width (adjust for gaps)
            const viewWidth = container.clientWidth;
            const scrollAmount = direction === 'left' ? -viewWidth : viewWidth;
            
            container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    };

    return (
        <section className="py-20 md:py-32 bg-gradient-to-br from-[#307984] to-[#3C8E9B]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">

                {/* Header */}
                <Reveal delayMs={70}>
                    <span className="text-[#f88c29] font-medium text-sm tracking-wider mb-4 uppercase inline-block">
                        News & Insights
                    </span>
                </Reveal>
                <Reveal delayMs={140}>
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                        Stay Informed. Stay Ahead
                    </h2>
                </Reveal>
                <Reveal delayMs={210}>
                    <p className="text-white/90 text-sm md:text-base max-w-2xl mx-auto mb-16 leading-relaxed">
                        Explore the latest health tips, diagnostic breakthroughs and wellness guidance from our expert team.
                        Our articles keep you educated and empowered to make better health decisions.
                    </p>
                </Reveal>

                {/* Carousel Wrapper with space for arrows */}
                <Reveal delayMs={280}>
                    <div className="relative group px-10 sm:px-16 lg:px-0">

                        {/* Left Arrow */}
                        <button
                            onClick={() => scroll('left')}
                            className="absolute left-0 lg:-left-20 top-[35%] sm:top-[38%] lg:top-[33%] -translate-y-1/2 z-10 p-2 text-white hover:text-white/80 transition-colors opacity-70 group-hover:opacity-100"
                            aria-label="Previous articles"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6 sm:w-8 sm:h-8">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                            </svg>
                        </button>

                        {/* Scrollable Track */}
                        <div
                            ref={scrollContainerRef}
                            onScroll={handleScroll}
                            className="flex overflow-x-auto gap-6 pb-8 snap-x snap-mandatory scrollbar-hide w-full scroll-smooth"
                            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                        >
                            {infiniteNewsItems.map((item, index) => (
                                <div
                                    key={index}
                                    className="w-[calc(100%-24px)] min-w-[calc(100%-24px)] sm:w-[calc(50%-12px)] sm:min-w-[calc(50%-12px)] lg:w-[calc(16.666%-20px)] lg:min-w-[calc(16.666%-20px)] flex-shrink-0 flex flex-col pt-1 snap-start"
                                >
                                    <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-lg mb-4 bg-[#061414]/20 group-hover:shadow-xl transition-all border border-white/5">
                                        <Image
                                            src={item.image}
                                            alt={item.title}
                                            fill
                                            className="object-cover transform transition-transform duration-500 hover:scale-110"
                                            unoptimized
                                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 16vw"
                                        />
                                    </div>
                                    <h3 className="text-white font-medium text-sm md:text-base leading-snug px-1 text-center">
                                        {item.title}
                                    </h3>
                                </div>
                            ))}
                        </div>

                        {/* Right Arrow */}
                        <button
                            onClick={() => scroll('right')}
                            className="absolute right-0 lg:-right-20 top-[35%] sm:top-[38%] lg:top-[33%] -translate-y-1/2 z-10 p-2 text-white hover:text-white/80 transition-colors opacity-70 group-hover:opacity-100"
                            aria-label="Next articles"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6 sm:w-8 sm:h-8">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                            </svg>
                        </button>

                    </div>
                </Reveal>
            </div>

            {/* Global CSS to hide scrollbar explicitly for webkit browsers */}
            <style dangerouslySetInnerHTML={{
                __html: `
                .scrollbar-hide::-webkit-scrollbar {
                    display: none;
                }
            `}} />
        </section>
    );
}
