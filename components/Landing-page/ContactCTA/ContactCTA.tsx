'use client';

import { useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import Image from 'next/image';
import Reveal from '@/components/Animation/Reveal';

type StatItem = {
    label: string;
    suffix?: string;
    target?: number;
    staticValue?: string;
    note: string;
    icon: ReactNode;
};

function useCountUp(target: number, shouldStart: boolean, durationMs = 1300) {
    const [value, setValue] = useState(0);

    useEffect(() => {
        if (!shouldStart) return;

        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (prefersReducedMotion) {
            const frameId = requestAnimationFrame(() => setValue(target));
            return () => cancelAnimationFrame(frameId);
        }

        let startTime: number | null = null;
        let frameId = 0;

        const tick = (now: number) => {
            if (startTime === null) startTime = now;
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / durationMs, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setValue(Math.round(target * eased));

            if (progress < 1) {
                frameId = requestAnimationFrame(tick);
            }
        };

        frameId = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(frameId);
    }, [durationMs, shouldStart, target]);

    return value;
}

function CountText({ target, suffix = '+', shouldStart }: { target: number; suffix?: string; shouldStart: boolean }) {
    const value = useCountUp(target, shouldStart);
    return (
        <span>
            {value.toLocaleString()}
            {suffix}
        </span>
    );
}

export default function ContactCTA() {
    const sectionRef = useRef<HTMLElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const section = sectionRef.current;
        if (!section) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (!entry.isIntersecting) return;
                setIsVisible(true);
                observer.disconnect();
            },
            { threshold: 0.25 }
        );

        observer.observe(section);
        return () => observer.disconnect();
    }, []);

    const stats = useMemo<StatItem[]>(() => [
        {
            label: 'Parameters processed daily',
            target: 10000,
            suffix: '+',
            note: 'High-throughput workflow with verified reporting.',
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="8" height="4" x="8" y="2" rx="1" ry="1" />
                    <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
                    <path d="M9 12h6" />
                    <path d="M9 16h6" />
                    <path d="M9 8h6" />
                </svg>
            ),
        },
        {
            label: 'Special tests under one roof',
            target: 4500,
            suffix: '+',
            note: 'Comprehensive diagnostics from one location.',
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M10 2v2" />
                    <path d="M14 2v2" />
                    <path d="M3 21h18" />
                    <path d="M6 21V6a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v15" />
                    <path d="M10 12h4" />
                    <path d="M10 16h4" />
                </svg>
            ),
        },
        {
            label: 'Sample Collection',
            staticValue: '24/7',
            note: 'Walk-ins and home collection support every day.',
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                    <path d="M16 2.1a10 10 0 0 1 5.9 5.9" />
                </svg>
            ),
        },
        {
            label: 'JCI Certified',
            staticValue: 'JCI Certified',
            note: 'Accredited quality and safety standards.',
            icon: (
                <Image src="/accreditations/jci-gold-badge1.png" alt="JCI Certified Logo" width={32} height={32} className="object-contain" />
            ),
        },
    ], []);

    return (
        <section ref={sectionRef} className="pt-8 pb-10 md:pt-10 md:pb-12 bg-white border-t border-gray-100 overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
                <div className="grid grid-cols-1 lg:grid-cols-[0.94fr_1.06fr] gap-4 lg:gap-10 items-stretch">
                    {/* Left Side: Stats 2x2 */}
                    <div className="mx-auto grid h-full w-full max-w-[548px] content-center grid-cols-2 gap-x-6 gap-y-7">
                        {stats.map((stat, index) => (
                            <Reveal key={stat.label} delayMs={100 + index * 100}>
                                <div className="flex min-h-[184px] flex-col rounded-2xl border border-[#307984]/10 bg-white p-4 shadow-sm transition-transform duration-300 motion-safe:hover:scale-[1.04]">
                                    <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-lg bg-[#fff5ea] text-[#f88c29]">
                                        <div className="scale-75 origin-center">{stat.icon}</div>
                                    </div>
                                    <h3 className="text-xl md:text-2xl font-bold text-[#f88c29] mb-0 font-poppins">
                                        {typeof stat.target === 'number' ? (
                                            <CountText target={stat.target} suffix={stat.suffix} shouldStart={isVisible} />
                                        ) : (
                                            stat.staticValue
                                        )}
                                    </h3>
                                    <p className="text-[#1f2937] font-bold text-[11px] md:text-xs leading-tight mb-0.5 uppercase tracking-wider opacity-70">
                                        {stat.label}
                                    </p>
                                    <p className="text-gray-400 text-[10px] md:text-[11px] leading-snug max-w-[196px] line-clamp-2 font-medium">
                                        {stat.note}
                                    </p>
                                </div>
                            </Reveal>
                        ))}
                    </div>

                    {/* Right Side: Form (The "Table") */}
                    <Reveal delayMs={200} className="w-full h-full">
                        <form className="h-full rounded-[30px] p-5 md:p-8 bg-white shadow-[0_14px_38px_rgba(12,44,62,0.09)] border border-[#e8eff0] flex flex-col">
                            <div className="mb-4 md:mb-5">
                                <span className="inline-flex items-center rounded-full border border-[#307984]/20 bg-[#f5faf9] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-[#307984]">
                                    Trusted Diagnostics
                                </span>
                                <h2 className="mt-3 text-lg md:text-2xl font-black text-[#1f2937] leading-tight">
                                    Looking For Trusted Diagnostics In Dubai?
                                </h2>
                                <p className="mt-2 text-gray-500 text-xs md:text-[13px] font-medium">
                                    Fill the contact form and our team will get back to you shortly.
                                </p>
                            </div>

                            <div className="space-y-3.5 flex-1">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                                    <div className="space-y-1">
                                        <label className="text-[9px] font-black uppercase tracking-wider text-gray-400 ml-1">First Name</label>
                                        <input
                                            type="text"
                                            placeholder="First name"
                                            className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-[#fbfdfd] border border-gray-200 text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#307984] focus:bg-white transition-all"
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-[9px] font-black uppercase tracking-wider text-gray-400 ml-1">Last Name</label>
                                        <input
                                            type="text"
                                            placeholder="Last name"
                                            className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-[#fbfdfd] border border-gray-200 text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#307984] focus:bg-white transition-all"
                                        />
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                                    <div className="space-y-1">
                                        <label className="text-[9px] font-black uppercase tracking-wider text-gray-400 ml-1">Phone</label>
                                        <input
                                            type="text"
                                            placeholder="+971 -- --- ----"
                                            className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-[#fbfdfd] border border-gray-200 text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#307984] focus:bg-white transition-all"
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-[9px] font-black uppercase tracking-wider text-gray-400 ml-1">Email</label>
                                        <input
                                            type="email"
                                            placeholder="your@email.com"
                                            className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-[#fbfdfd] border border-gray-200 text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#307984] focus:bg-white transition-all"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[9px] font-black uppercase tracking-wider text-gray-400 ml-1">Message</label>
                                    <textarea
                                        placeholder="Briefly describe your inquiry..."
                                        rows={3}
                                        className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-[#fbfdfd] border border-gray-200 text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#307984] focus:bg-white transition-all resize-none"
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="mt-4 group relative overflow-hidden inline-flex w-full justify-center bg-[#f88c29] hover:bg-[#e67b1d] text-white font-bold py-3 px-8 rounded-xl transition-all text-sm shadow-md"
                            >
                                <span className="relative z-10 flex items-center gap-2">
                                    Submit Inquiry
                                    <svg className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                    </svg>
                                </span>
                            </button>
                        </form>
                    </Reveal>
                </div>
            </div>
        </section>
    );
}
