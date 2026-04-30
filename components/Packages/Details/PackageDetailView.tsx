'use client';

import React from 'react';
import Image from 'next/image';
import { urlFor } from '@/lib/sanity';
import Reveal from '@/components/Animation/Reveal';
import BookActionButton from '@/components/Booking/BookActionButton';
import { motion } from 'framer-motion';
import Link from 'next/link';

import Navbar from '@/components/Navbar/Navbar';

interface PackageDetailViewProps {
    pkg: {
        title: string;
        slug: string;
        description: string;
        image: any;
        testsTotal?: number;
        subTests?: { title: string; explanation?: string }[];
        overview?: string;
        benefits?: string[];
        preparation?: string;
        faqs?: { question: string; answer: string }[];
    };
}

export default function PackageDetailView({ pkg }: PackageDetailViewProps) {
    const parsePrice = (title: string) => {
        const match = title.match(/(?:—\s*)?(AED\s*\d+)/i);
        if (match) {
            return {
                cleanTitle: title.replace(match[0], '').trim(),
                price: match[1]
            };
        }
        return { cleanTitle: title, price: null };
    };

    const { cleanTitle, price } = parsePrice(pkg.title);

    return (
        <div className="min-h-screen bg-[#fafafa] selection:bg-[#f88c29]/30 font-sans">
            <Navbar currentPage="Packages" />

            {/* REFINED HERO SECTION */}
            <section className="relative pt-44 pb-16 overflow-hidden">
                <div className="absolute top-0 right-0 w-1/3 h-[60%] bg-gradient-to-bl from-[#f88c29]/5 to-transparent rounded-bl-[5rem] -z-10"></div>
                
                <div className="max-w-6xl mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                        
                        {/* Text Content - More Compact */}
                        <div className="lg:col-span-7 space-y-6">
                            <Reveal>
                                <div className="space-y-3">
                                    <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#f88c29]/10 text-[#f88c29] text-[9px] font-black uppercase tracking-wider">
                                        Clinical Profile
                                    </div>
                                    <h1 className="text-4xl md:text-5xl font-black text-[#0f172a] leading-[1.1] tracking-tight">
                                        {cleanTitle}
                                    </h1>
                                </div>
                            </Reveal>

                            <Reveal delayMs={100}>
                                <p className="text-base text-gray-500 leading-relaxed max-w-xl font-medium">
                                    {pkg.description}
                                </p>
                            </Reveal>

                            <Reveal delayMs={200}>
                                <div className="flex items-center gap-6">
                                    <div className="flex flex-col">
                                        <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-0.5">Price</span>
                                        <span className="text-3xl font-black text-[#f88c29]">{price || '—'}</span>
                                    </div>
                                    <div className="w-px h-8 bg-gray-200"></div>
                                    <div className="flex flex-col">
                                        <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-0.5">Tests</span>
                                        <span className="text-3xl font-black text-[#0f172a]">{pkg.testsTotal || pkg.subTests?.length || 0}</span>
                                    </div>
                                </div>
                            </Reveal>

                            <Reveal delayMs={300}>
                                <div className="pt-2">
                                    <BookActionButton
                                        label="Book Appointment"
                                        whatsappText={`Hi, I would like to book the ${cleanTitle} package.`}
                                        className="bg-[#0f172a] hover:bg-[#1e293b] text-white px-8 py-3.5 rounded-xl font-bold text-sm transition-all shadow-xl shadow-[#0f172a]/10 hover:-translate-y-0.5 flex items-center justify-center gap-2 group"
                                    />
                                </div>
                            </Reveal>
                        </div>

                        {/* Floating Hero Image - Restoring the rotated premium look */}
                        <Reveal delayMs={400} className="lg:col-span-5 relative group lg:-mt-12">
                            <div className="absolute -inset-4 bg-gradient-to-tr from-[#f88c29]/20 to-[#307984]/20 rounded-[4rem] blur-3xl opacity-50 group-hover:opacity-80 transition-opacity duration-1000"></div>
                            <div className="relative aspect-[4/5] rounded-[3.5rem] overflow-hidden border-[12px] border-white shadow-2xl rotate-2 group-hover:rotate-0 transition-transform duration-700">
                                {pkg.image ? (
                                    <Image
                                        src={urlFor(pkg.image).url()}
                                        alt={pkg.title}
                                        fill
                                        className="object-cover"
                                        priority
                                    />
                                ) : (
                                    <div className="w-full h-full bg-[#f1f5f9] flex items-center justify-center">
                                        <svg className="w-16 h-16 text-gray-200" fill="currentColor" viewBox="0 0 24 24"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14zm-5.04-6.71l-2.75 3.54-1.96-2.36L6.5 17h11l-3.54-4.71z"/></svg>
                                    </div>
                                )}
                            </div>
                            
                            {/* Floating Badge - Restored */}
                            <motion.div 
                                animate={{ y: [0, -10, 0] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                className="absolute -bottom-6 -left-6 p-5 rounded-3xl bg-white shadow-xl border border-gray-50 max-w-[160px] z-20"
                            >
                                <div className="flex items-center gap-2.5 mb-2">
                                    <div className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse"></div>
                                    <span className="text-[9px] font-black uppercase tracking-widest text-gray-400">Available</span>
                                </div>
                                <p className="text-[10px] font-bold text-[#0f172a] leading-tight">Mobile collection available across Dubai & Sharjah.</p>
                            </motion.div>
                        </Reveal>
                    </div>
                </div>
            </section>

            {/* CLEAN CONTENT GRID */}
            <section className="pb-24">
                <div className="max-w-6xl mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                        
                        {/* LEFT CONTENT */}
                        <div className="lg:col-span-8 space-y-16">
                            
                            {/* Overview - More Compact */}
                            {pkg.overview && (
                                <Reveal>
                                    <div className="bg-white rounded-[2rem] p-8 md:p-10 shadow-sm border border-gray-100">
                                        <h2 className="text-xl font-black text-[#0f172a] mb-5 flex items-center gap-3">
                                            <span className="w-1.5 h-6 bg-[#f88c29] rounded-full"></span>
                                            Package Overview
                                        </h2>
                                        <p className="text-base text-gray-500 leading-relaxed font-medium">
                                            {pkg.overview}
                                        </p>
                                    </div>
                                </Reveal>
                            )}

                            {/* Included Tests Grid - More Compact */}
                            <div className="space-y-8">
                                <div className="space-y-1">
                                    <h2 className="text-xl font-black text-[#0f172a]">Tests Breakdown</h2>
                                    <p className="text-gray-400 text-xs font-medium">{pkg.subTests?.length || 0} individual parameters analyzed.</p>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {pkg.subTests?.map((test, i) => (
                                        <Reveal key={i} delayMs={i * 30}>
                                            <div className="group p-5 rounded-2xl bg-white border border-gray-100 hover:border-[#f88c29]/20 hover:shadow-md transition-all duration-300">
                                                <h4 className="text-[#0f172a] font-bold text-sm mb-1.5 group-hover:text-[#f88c29] transition-colors">
                                                    {test.title}
                                                </h4>
                                                {test.explanation && (
                                                    <p className="text-gray-400 text-[11px] leading-relaxed font-medium">
                                                        {test.explanation}
                                                    </p>
                                                )}
                                            </div>
                                        </Reveal>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* RIGHT SIDEBAR - COMPACT */}
                        <div className="lg:col-span-4 space-y-6">
                            <div className="sticky top-32 space-y-6">
                                
                                {/* Refined Booking Card */}
                                <Reveal delayMs={200}>
                                    <div className="bg-white rounded-[2rem] p-6 shadow-sm border border-gray-100 space-y-6">
                                        <div className="space-y-4">
                                            <h3 className="text-sm font-black text-[#0f172a] uppercase tracking-wider">Booking Summary</h3>
                                            <div className="space-y-2.5">
                                                <div className="flex justify-between items-center text-[11px] font-medium">
                                                    <span className="text-gray-400">Selected Profile</span>
                                                    <span className="text-[#0f172a] text-right font-bold truncate max-w-[120px]">{cleanTitle}</span>
                                                </div>
                                                <div className="flex justify-between items-center text-[11px] font-medium">
                                                    <span className="text-gray-400">Home Service</span>
                                                    <span className="text-green-600 font-bold uppercase">Included</span>
                                                </div>
                                                <div className="pt-3 border-t border-gray-50 flex justify-between items-end">
                                                    <span className="text-[10px] font-black text-gray-400 uppercase">Total Amount</span>
                                                    <span className="text-2xl font-black text-[#f88c29] leading-none">{price || '—'}</span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Compact Prep Box */}
                                        {pkg.preparation && (
                                            <div className="p-4 rounded-xl bg-orange-50/50 border border-orange-100 space-y-1.5">
                                                <div className="flex items-center gap-1.5 text-[#f88c29] font-black text-[9px] uppercase tracking-wider">
                                                    <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                                    Preparation
                                                </div>
                                                <p className="text-[#0f172a] text-[10px] font-bold leading-tight">{pkg.preparation}</p>
                                            </div>
                                        )}

                                        <div className="space-y-2">
                                            <BookActionButton
                                                label="Confirm Selection"
                                                whatsappText={`Hi, I would like to book the ${cleanTitle} package.`}
                                                className="w-full bg-[#f88c29] hover:bg-[#e67b1d] text-white py-3.5 rounded-xl font-black text-sm transition-all"
                                            />
                                            <p className="text-[9px] text-center text-gray-400 font-medium tracking-tight">Pay upon collection. No card needed.</p>
                                        </div>
                                    </div>
                                </Reveal>

                                {/* Mini Benefits */}
                                <Reveal delayMs={300}>
                                    <div className="px-4 space-y-4">
                                        <h4 className="text-[10px] font-black text-[#0f172a] uppercase tracking-widest">Why Forte?</h4>
                                        <ul className="space-y-3">
                                            {(pkg.benefits || [
                                                "Professional Home Nursing",
                                                "Accurate Clinical Results",
                                                "Secure Digital Privacy"
                                            ]).map((benefit, i) => (
                                                <li key={i} className="flex gap-3 items-start">
                                                    <svg className="w-4 h-4 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                                                    <span className="text-[11px] text-gray-500 font-medium leading-tight">{benefit}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </Reveal>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* REFINED FAQ SECTION */}
            <section className="py-24 bg-white border-t border-gray-50">
                <div className="max-w-3xl mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-2xl font-black text-[#0f172a]">Common Questions</h2>
                    </div>
                    
                    <div className="space-y-3">
                        {(pkg.faqs && pkg.faqs.length > 0 ? pkg.faqs : [
                            { question: "When will I receive my reports?", answer: "Most reports are delivered within 24 hours via email and WhatsApp." },
                            { question: "Can I book for my family?", answer: "Yes, group mobile collections can be scheduled in a single visit." }
                        ]).map((faq, i) => (
                            <details key={i} className="group p-5 rounded-2xl bg-[#fafafa] border border-gray-100 open:bg-white open:shadow-md transition-all duration-300">
                                <summary className="font-bold text-sm text-[#0f172a] list-none cursor-pointer flex justify-between items-center outline-none">
                                    {faq.question}
                                    <div className="w-6 h-6 rounded-lg border border-gray-200 flex items-center justify-center group-open:bg-[#f88c29] group-open:border-[#f88c29] transition-all">
                                        <svg className="w-3 h-3 text-gray-400 group-open:text-white group-open:rotate-180 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" /></svg>
                                    </div>
                                </summary>
                                <div className="mt-4 text-gray-500 text-[12px] leading-relaxed font-medium animate-in fade-in slide-in-from-top-1">
                                    {faq.answer}
                                </div>
                            </details>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
