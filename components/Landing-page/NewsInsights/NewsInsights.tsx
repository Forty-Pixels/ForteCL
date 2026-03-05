'use client';
import { useRef, useEffect } from 'react';
import Image from 'next/image';

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
        title: 'What Are Vitamins and Why Does Monitoring Them Matter?',
        image: '/Landing-page/news/vitamin_monitoring_high_res.png',
    },
    {
        title: 'What Is the Pre-Marital Screening Package?',
        image: '/Landing-page/news/image-3.png',
    },
    {
        title: 'The Role of Genomic Testing in Preventive Care',
        image: '/Landing-page/news/image-4.png',
    },
    {
        title: 'Understanding Your Lab Results Dashboard',
        image: '/Landing-page/news/image-5.png',
    },
    {
        title: 'Behind the Scenes: How We Ensure Test Accuracy',
        image: '/Landing-page/news/image-6.png',
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
        if (scrollLeft < totalItemsWidth - (cardWidth + gap) * 2) {
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
            // Scroll by exactly one card width
            const scrollAmount = (container.children[0] as HTMLElement).offsetWidth + 24;

            if (direction === 'left') {
                container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
            } else {
                container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
            }
        }
    };

    return (
        <section className="py-20 md:py-32 bg-gradient-to-br from-[#307984] to-[#42AFBF]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">

                {/* Header */}
                <span className="text-white/90 font-medium text-sm tracking-wider mb-4 uppercase inline-block">
                    News & Insights
                </span>
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                    Stay Informed. Stay Ahead
                </h2>
                <p className="text-white/90 text-sm md:text-base max-w-2xl mx-auto mb-16 leading-relaxed">
                    Explore the latest health tips, diagnostic breakthroughs and wellness guidance from our expert team.
                    Our articles keep you educated and empowered to make better health decisions.
                </p>

                {/* Carousel Wrapper with space for arrows */}
                <div className="relative group px-10 sm:px-16 lg:px-0">

                    {/* Left Arrow */}
                    <button
                        onClick={() => scroll('left')}
                        className="absolute left-0 lg:-left-16 top-[40%] -translate-y-1/2 z-10 p-2 text-white hover:text-white/80 transition-colors opacity-70 group-hover:opacity-100"
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
                        className="flex overflow-x-auto gap-6 pb-8 snap-x snap-mandatory scrollbar-hide w-full"
                        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                    >
                        {infiniteNewsItems.map((item, index) => (
                            <div
                                key={index}
                                className="w-full min-w-full sm:min-w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] lg:min-w-[calc(33.333%-16px)] flex-shrink-0 snap-start flex flex-col pt-1"
                            >
                                <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-lg mb-6 bg-white/10">
                                    <Image
                                        src={item.image}
                                        alt={item.title}
                                        fill
                                        className="object-cover transform transition-transform duration-500 hover:scale-110"
                                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                    />
                                </div>
                                <h3 className="text-white font-medium text-lg leading-snug px-2 text-center">
                                    {item.title}
                                </h3>
                            </div>
                        ))}
                    </div>

                    {/* Right Arrow */}
                    <button
                        onClick={() => scroll('right')}
                        className="absolute right-0 lg:-right-16 top-[40%] -translate-y-1/2 z-10 p-2 text-white hover:text-white/80 transition-colors opacity-70 group-hover:opacity-100"
                        aria-label="Next articles"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6 sm:w-8 sm:h-8">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                        </svg>
                    </button>

                </div>
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
