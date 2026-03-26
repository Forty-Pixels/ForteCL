'use client';

import { useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import Image from 'next/image';
import Reveal from '@/components/Animation/Reveal';

type StatItem = {
    label: string;
    suffix?: string;
    target?: number;
    staticValue?: string;
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
            icon: (
                <Image src="/accreditations/jci-gold-badge1.png" alt="JCI Certified Logo" width={28} height={28} className="object-contain" />
            ),
        },
    ], []);

    return (
        <section ref={sectionRef} className="bg-white py-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-10">
                    {stats.map((stat, index) => (
                        <Reveal key={stat.label} delayMs={90 + index * 80}>
                            <div className="flex flex-col items-start justify-start">
                                <div className="text-[#307984] mb-3">{stat.icon}</div>
                                <h3 className="text-2xl md:text-3xl font-bold text-[#307984] mb-2 font-poppins">
                                    {typeof stat.target === 'number' ? (
                                        <CountText target={stat.target} suffix={stat.suffix} shouldStart={isVisible} />
                                    ) : (
                                        stat.staticValue
                                    )}
                                </h3>
                                <p className="text-gray-600 font-medium text-xs md:text-sm leading-snug max-w-[140px]">
                                    {stat.label}
                                </p>
                            </div>
                        </Reveal>
                    ))}
                </div>
            </div>
        </section>
    );
}
