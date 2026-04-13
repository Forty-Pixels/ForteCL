'use client';

import { motion } from 'framer-motion';
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

export default function ReviewsSection() {
    // Duplicate reviews for infinite scroll
    const marqueeItems = [...reviews, ...reviews];
    const cardGradients = [
        'linear-gradient(135deg, #2f7f88 0%, #42afbf 100%)',
        'linear-gradient(135deg, #2c6f85 0%, #3f99aa 55%, #63bfcc 100%)',
        'linear-gradient(135deg, #255e73 0%, #307984 58%, #4ca8b6 100%)',
    ];

    return (
        <section className="py-6 bg-[#F8FAFB] overflow-hidden">
            <div className="max-w-[1440px] mx-auto px-6">
                {/* Header */}
                <div className="text-center mb-4">
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <span className="text-[#f88c29] font-bold text-[10px] tracking-[0.2em] uppercase mb-1 block">
                            Patient Testimonials
                        </span>
                        <h2 className="text-2xl md:text-3xl font-black text-[#202020] mb-2">
                            Trusted by Thousands in Dubai
                        </h2>
                        <div className="flex items-center justify-center gap-2">
                            <div className="flex">
                                {[...Array(5)].map((_, i) => (
                                    <StarIcon key={i} className="w-4 h-4 text-[#f88c29]" />
                                ))}
                            </div>
                            <span className="text-[11px] font-bold text-gray-500">4.7 / 5.0 Rating on Google</span>
                        </div>
                    </motion.div>
                </div>

            {/* Marquee Container */}
            <div className="relative w-full overflow-hidden">
                <div className="flex w-fit animate-reviews-marquee hover:pause-marquee gap-6 py-2">
                    {marqueeItems.map((review, index) => (
                        (() => {
                            const cardGradient = cardGradients[index % cardGradients.length];
                            return (
                        <div 
                            key={`${review.id}-${index}`}
                            style={{ background: cardGradient }}
                            className="flex-shrink-0 w-[300px] sm:w-[320px] h-[340px] p-5 rounded-[1.5rem] border border-white/10 shadow-[0_12px_28px_rgba(16,57,70,0.24)] hover:shadow-[0_16px_34px_rgba(16,57,70,0.32)] transition-all duration-300 relative group flex flex-col justify-between overflow-hidden"
                        >
                            <div className="absolute inset-0 bg-[linear-gradient(160deg,rgba(255,255,255,0.06)_0%,rgba(10,40,52,0.22)_100%)]" />

                            {/* Google Logo Shadow */}
                            <div className="absolute top-5 right-5 opacity-14 group-hover:opacity-20 transition-opacity">
                                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
                                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                                </svg>
                            </div>

                            <div className="relative z-10">
                                {/* Header: User Info */}
                                <div className="flex items-center gap-3 mb-3">
                                    <div className={`w-8 h-8 rounded-full ${review.avatarBg} flex items-center justify-center text-white font-bold text-xs shadow-inner`}>
                                        {review.name.split(' ').map(n => n[0]).join('')}
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-white text-xs leading-tight">{review.name}</h4>
                                        <p className="text-[8px] text-white/75 font-medium uppercase tracking-wider">{review.role} • {review.date}</p>
                                    </div>
                                </div>

                                {/* Rating */}
                                <div className="flex mb-2">
                                    {[...Array(review.rating)].map((_, i) => (
                                        <StarIcon key={i} className="w-3 h-3 text-[#ffd58a]" />
                                    ))}
                                </div>

                                {/* Review Text */}
                                <p className="text-[11px] text-white/90 leading-relaxed italic line-clamp-12">
                                    &ldquo;{review.text}&rdquo;
                                </p>
                            </div>

                            {/* Verified Source */}
                            <div className="relative z-10 mt-1 pt-2 border-t border-white/20">
                                <span className="text-[8px] text-white/75 flex items-center gap-1 font-bold uppercase tracking-widest">
                                    <svg className="w-2.5 h-2.5 text-[#83f1bd]" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                    Verified Google Review
                                </span>
                            </div>
                        </div>
                            );
                        })()
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
                .pause-marquee:hover {
                    animation-play-state: paused;
                }
            `}} />
        </section>
    );
}
