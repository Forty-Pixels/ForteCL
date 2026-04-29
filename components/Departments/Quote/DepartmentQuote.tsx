'use client';

import Reveal from '@/components/Animation/Reveal';

interface DepartmentQuoteProps {
    quote?: string;
    highlightedText?: string;
}

export default function DepartmentQuote({ 
    quote = "AT FORTE CLINICAL LABORATORY, OUR COMMITMENT TO DIAGNOSTIC PRECISION AND CLINICAL EXCELLENCE",
    highlightedText = " IS THE FOUNDATION OF EVERYTHING WE DO. WE GO BEYOND STANDARD PROCESSES TO PROVIDE ANSWERS THAT EMPOWER HEALTHCARE PROVIDERS AND IMPROVE PATIENT OUTCOMES."
}: DepartmentQuoteProps) {
    return (
        <section className="py-10 bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 lg:px-12 relative">
                <Reveal>
                    <div className="flex flex-col items-end text-right space-y-6 max-w-[950px] ml-auto">
                        <blockquote className="text-[1.8rem] lg:text-[2.2rem] leading-[1.2] font-bold tracking-tighter text-[#333] uppercase">
                            "{quote}
                            <span className="text-[#f88c29] font-black">{highlightedText}"</span>
                        </blockquote>
                    </div>
                </Reveal>
            </div>
        </section>
    );
}
