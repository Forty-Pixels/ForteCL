'use client';

import Image from 'next/image';
import Navbar from '@/components/Navbar/Navbar';

export default function DepartmentsHero() {
    return (
        <section className="relative w-full bg-white pt-32 pb-0 overflow-hidden flex items-end">
            <Navbar currentPage="Departments" />
            
            {/* Bold Diagonal Stripes with Fade */}
            <div className="absolute inset-0 opacity-[0.04] pointer-events-none" 
                 style={{ 
                    backgroundImage: 'repeating-linear-gradient(-45deg, #000, #000 30px, transparent 30px, transparent 100px)',
                    maskImage: 'linear-gradient(to bottom, black 20%, transparent 80%)',
                    WebkitMaskImage: 'linear-gradient(to bottom, black 20%, transparent 80%)'
                 }} 
            />
            
            <div className="w-full pl-6 lg:pl-12 relative z-10">
                <div className="relative bg-[#f88c29] rounded-tl-[1.5rem] p-8 sm:p-12 lg:p-20 shadow-2xl ml-auto w-full lg:w-[96%]">
                    <div className="max-w-5xl space-y-10">
                        <h1 className="text-white font-black tracking-tight text-2xl sm:text-4xl lg:text-5xl leading-[1.1] uppercase">
                            EXCELLENCE IN CLINICAL <br />
                            <span className="text-white/80">DIAGNOSTICS & RESEARCH.</span>
                        </h1>
                        <p className="text-white/90 text-base sm:text-lg max-w-3xl leading-relaxed font-medium">
                            For more than two decades, Forte Clinical Laboratory has been a leader 
                            in diagnostic innovation, providing accurate results to those seeking 
                            answers to complex medical questions. Our testing is developed by an 
                            integrated team of clinical and laboratory experts dedicated to the 
                            highest standards of precision. By combining advanced technology with 
                            deep scientific insight, we ensure every test result is a reliable 
                            step toward better patient care.
                        </p>
                        
                        <div className="pt-12">
                            <div className="w-full h-[2px] bg-white/20">
                                <div className="w-1/4 h-full bg-white" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
