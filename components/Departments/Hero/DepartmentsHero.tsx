'use client';

import Reveal from '@/components/Animation/Reveal';
import Navbar from '@/components/Navbar/Navbar';
import Image from 'next/image';

export default function DepartmentsHero() {
    return (
        <section className="relative min-h-[60vh] lg:min-h-[80vh] flex items-center pt-24 lg:pt-32 pb-56 lg:pb-32 overflow-hidden bg-slate-900">
            <div className="absolute top-0 left-0 w-full z-50">
                <Navbar currentPage="Departments" />
            </div>

            {/* Background with abstract medical feel */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/all_departments_hero.png" 
                    alt="Departments Hero"
                    fill
                    className="object-cover opacity-50 lg:opacity-70"
                    priority
                />
            </div>

            <div className="container mx-auto px-6 relative z-10 text-center">
                <Reveal>
                    <div className="max-w-4xl mx-auto">
                        <span className="text-[#f88c29] font-black uppercase tracking-[0.5em] text-[10px] lg:text-xs mb-8 block opacity-0 select-none pointer-events-none">
                            Our Clinical Infrastructure
                        </span>
                        <h1 className="text-4xl lg:text-8xl font-black text-white mb-10 leading-[1.1] uppercase tracking-tighter">
                            World-Class <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-[#f88c29]">Diagnostic Expertise</span>
                        </h1>
                        <p className="text-gray-200 text-base lg:text-xl max-w-2xl mx-auto leading-relaxed font-medium opacity-90">
                            Operating across specialized departments, Forte Clinical Laboratory provides a comprehensive suite of diagnostic services powered by advanced technology and medical excellence.
                        </p>
                    </div>
                </Reveal>
            </div>

        </section>
    );
}
