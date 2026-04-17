'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { StarIcon } from '@heroicons/react/24/solid';

interface Review {
    id: number;
    name: string;
    role: string;
    text: string;
    rating: number;
    date: string;
    avatarBg: string;
}

const reviews: Review[] = [
    {
        id: 1,
        name: "Shafeeq Ahamed",
        role: "Verified Patient",
        text: "Excellent service & Fast result... Appreciate your services \ud83d\udc4d ...",
        rating: 5,
        date: "a month ago",
        avatarBg: "bg-teal-500"
    },
    {
        id: 2,
        name: "Rujana Naz",
        role: "Verified Patient",
        text: "I chose Forte Clinical Laboratory for the NIPT Advanced test, and I\u2019m very satisfied with the service. The home sample collection was handled with great care and professionalism, and the process was quick and painless. I received my results in just 6 days, which really exceeded my expectations. Clear communication, reliable reporting, and excellent overall service. I would confidently recommend Forte Clinical Laboratory to others.",
        rating: 5,
        date: "a month ago",
        avatarBg: "bg-orange-500"
    },
    {
        id: 3,
        name: "Najim Shafana",
        role: "Verified Patient",
        text: "Accurate and reliable NIPT reports, delivered within just a few days and cost is more affordable for all test when compared to others.They also have free home collection also.",
        rating: 5,
        date: "2 months ago",
        avatarBg: "bg-indigo-500"
    },
    {
        id: 4,
        name: "Asif muhammedHaris",
        role: "Verified Patient",
        text: "A comforting, smooth experience with caring people\u2014thank you, Forte Clinical Laboratory.",
        rating: 5,
        date: "2 months ago",
        avatarBg: "bg-blue-500"
    },
    {
        id: 5,
        name: "shaffa zeenath",
        role: "Verified Patient",
        text: "Fast and efficient service with very kind staff. Great experience! This is now my go-to lab and I recommend it to others!!",
        rating: 5,
        date: "2 months ago",
        avatarBg: "bg-purple-500"
    },
    {
        id: 6,
        name: "Muhammed Rashid",
        role: "Verified Patient",
        text: "I had my food intolerance test done at Forte Clinical Laboratory. The service was fast, professional, and well-organized. Results were accurate and delivered on time. A highly recommended and trustworthy laboratory.",
        rating: 5,
        date: "2 months ago",
        avatarBg: "bg-pink-500"
    },
    {
        id: 7,
        name: "Afroze Naveed",
        role: "Verified Patient",
        text: "Excellent place, I had a very good experience with Forte Clinical Laboratory. The staff were well professional, polite and supportive. Sample collection was smooth, lab reports were delivered on time, correlation excellent and overall hygiene and safety standards were well maintained. Highly recommended.",
        rating: 5,
        date: "2 months ago",
        avatarBg: "bg-emerald-500"
    },
    {
        id: 8,
        name: "Jiya Madhav",
        role: "Verified Patient",
        text: "Accurate, high-quality NIPT reports delivered within a few days. Enjoy the comfort of free home sample collection at no extra cost. Trusted results , reliable care Thank you Forte team for the wonderful service.",
        rating: 5,
        date: "2 months ago",
        avatarBg: "bg-cyan-500"
    },
    {
        id: 9,
        name: "Ameenashijaskhan",
        role: "Verified Patient",
        text: "I did the NIPT Advanced test at Forte Clinical Laboratory last week and had a very good experience. The sample collection was smooth, and I received the report within 5 days. The pricing was reasonable compared to other laboratories. My doctor also specifically recommended Forte for their trust and reliability, which gave me extra confidence in choosing them. Thank you for best service",
        rating: 5,
        date: "2 months ago",
        avatarBg: "bg-sky-500"
    },
    {
        id: 10,
        name: "Minhaaz Riffat",
        role: "Verified Patient",
        text: "Very happy with the service I recieved at Forte, the staff were very friendly and kind. The reports were sent on time to registered contact info.",
        rating: 5,
        date: "3 months ago",
        avatarBg: "bg-red-500"
    }
];



function ReviewCard({ review, index }: { review: Review; index: number }) {
    const [isExpanded, setIsExpanded] = useState(false);
    const maxLength = 120;
    const isLongText = review.text.length > maxLength;
    const displayText = isExpanded ? review.text : review.text.slice(0, maxLength);

    return (
        <div 
            className={`flex-shrink-0 ${isExpanded ? 'w-[320px] h-auto z-20 scale-100' : 'w-[260px] h-[240px]'} p-4 rounded-2xl border border-gray-100 bg-white shadow-sm hover:shadow-md transition-all duration-300 relative group flex flex-col`}
        >
            <div className="relative z-10 flex flex-col h-full">
                {/* Header: User Info */}
                <div className="flex items-center gap-3 mb-3">
                    <div className={`w-7 h-7 rounded-full ${review.avatarBg} flex items-center justify-center text-white font-bold text-[10px] shadow-sm`}>
                        {review.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                        <h4 className="font-bold text-gray-900 text-[11px] leading-tight">{review.name}</h4>
                        <p className="text-[9px] text-gray-400 font-medium uppercase tracking-wider">{review.role} • {review.date}</p>
                    </div>
                </div>

                {/* Rating */}
                <div className="flex mb-2">
                    {[...Array(review.rating)].map((_, i) => (
                        <StarIcon key={i} className="w-2.5 h-2.5 text-[#f88c29]" />
                    ))}
                </div>

                {/* Review Text */}
                <div className="relative flex-1">
                    <p className={`text-[11px] text-gray-600 leading-relaxed ${!isExpanded && 'line-clamp-5'}`}>
                        &ldquo;{displayText}{!isExpanded && isLongText && '...'}&rdquo;
                    </p>
                    {isLongText && (
                        <button 
                            onClick={(e) => {
                                e.stopPropagation();
                                setIsExpanded(!isExpanded);
                            }}
                            className="mt-1 text-[10px] font-bold text-[#307984] hover:underline"
                        >
                            {isExpanded ? 'Show less' : 'Read more'}
                        </button>
                    )}
                </div>

                {/* Verified Source */}
                <div className="mt-auto pt-2 border-t border-gray-50 flex items-center justify-between">
                    <span className="text-[9px] text-gray-400 flex items-center gap-1 font-bold uppercase tracking-widest">
                        <svg className="w-2.5 h-2.5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        Google Review
                    </span>
                    <div className="opacity-20">
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
                            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function ReviewsSection() {
    // Duplicate reviews for infinite scroll
    const marqueeItems = [...reviews, ...reviews];

    return (
        <section className="py-10 bg-[#fbfcfd] overflow-hidden">
            <div className="max-w-[1440px] mx-auto px-6">
                {/* Header */}
                <div className="text-center mb-8">
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <span className="text-[#f88c29] font-bold text-[10px] tracking-[0.2em] uppercase mb-1.5 block">
                            Patient Testimonials
                        </span>
                        <h2 className="text-2xl md:text-3xl font-black text-[#1a1a1a] mb-3">
                            Trusted by Thousands in Dubai
                        </h2>
                        <div className="flex items-center justify-center gap-2">
                            <div className="flex">
                                {[...Array(5)].map((_, i) => (
                                    <StarIcon key={i} className="w-3.5 h-3.5 text-[#f88c29]" />
                                ))}
                            </div>
                            <span className="text-[11px] font-bold text-gray-400">4.7 / 5.0 Rating on Google</span>
                        </div>
                    </motion.div>
                </div>

            {/* Marquee Container */}
            <div className="relative w-full overflow-hidden">
                <div className="flex w-fit animate-reviews-marquee hover:pause-marquee gap-4 py-6">
                    {marqueeItems.map((review, index) => (
                        <ReviewCard key={`${review.id}-${index}`} review={review} index={index} />
                    ))}
                </div>
            </div>

            {/* Final CTA */}
            <div className="mt-4 text-center">
                <motion.a
                    href="https://www.google.com/maps/place/Forte+Clinical+Laboratory/@25.2513176,55.3392117,17z/data=!4m7!3m6!1s0x3e5f5dc493f1e96b:0x1f7cf27e212b52f1!8m2!3d25.2513176!4d55.3392117!9m1!1b1"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="inline-flex items-center gap-1.5 bg-[#307984] text-white px-6 py-2 rounded-full font-bold text-[11px] shadow-lg hover:bg-[#256069] transition-all"
                >
                    View More
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                </motion.a>
            </div>
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
                @keyframes reviews-marquee {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
                .animate-reviews-marquee {
                    animation: reviews-marquee 80s linear infinite;
                }
                @media (min-width: 1024px) {
                    .pause-marquee:hover {
                        animation-play-state: paused;
                    }
                }
            `}} />
        </section>
    );
}
