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

export default function Stats() {
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
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                    <path d="M16 2.1a10 10 0 0 1 5.9 5.9" />
                </svg>
            ),
        },
        {
            label: 'Joint Commission International',
            staticValue: 'JCI Certified',
            note: 'Accredited quality and safety standards.',
            icon: (
                <Image src="/accreditations/jci-gold-badge1.png" alt="JCI Certified Logo" width={42} height={42} className="object-contain" />
            ),
        },
    ], []);

    return (
        <section ref={sectionRef} className="bg-gradient-to-b from-white to-[#f7fcfb] py-10 md:py-11">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
                    {stats.map((stat, index) => (
                        <Reveal key={stat.label} delayMs={90 + index * 80}>
                            <div className="h-full rounded-2xl border border-[#307984]/15 bg-gradient-to-b from-white to-[#f1f8f7] p-5 md:p-6 transition-transform duration-300 hover:-translate-y-1">
                                <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl ${stat.label === 'Joint Commission International' ? 'bg-[#fff5ea] text-[#f88c29]' : 'bg-[#e5f3f1] text-[#307984]'}`}>
                                    {stat.icon}
                                </div>
                                <h3 className="text-3xl md:text-[2rem] font-bold text-[#f88c29] mb-1 font-poppins leading-tight">
                                    {typeof stat.target === 'number' ? (
                                        <CountText target={stat.target} suffix={stat.suffix} shouldStart={isVisible} />
                                    ) : (
                                        stat.staticValue
                                    )}
                                </h3>
                                <p className="text-gray-700 font-semibold text-sm md:text-[15px] leading-snug">
                                    {stat.label}
                                </p>
                                <p className="mt-2 text-xs md:text-sm text-gray-500 leading-snug">
                                    {stat.note}
                                </p>
                            </div>
                        </Reveal>
                    ))}
                </div>
            </div>
        </section>
    );
}
