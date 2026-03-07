'use client';

import { useEffect, useRef, type ReactNode, type CSSProperties } from 'react';

type RevealProps = {
    children: ReactNode;
    className?: string;
    delayMs?: number;
};

export default function Reveal({ children, className = '', delayMs = 0 }: RevealProps) {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (prefersReducedMotion) {
            el.dataset.revealed = 'true';
            return;
        }

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (!entry.isIntersecting) return;
                    entry.target.setAttribute('data-revealed', 'true');
                    observer.unobserve(entry.target);
                });
            },
            { threshold: 0.12, rootMargin: '0px 0px -10% 0px' }
        );

        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    return (
        <div
            ref={ref}
            className={`reveal ${className}`}
            style={{ '--reveal-delay': `${delayMs}ms` } as CSSProperties}
        >
            {children}
        </div>
    );
}
