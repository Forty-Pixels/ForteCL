'use client';

import Navbar from '@/components/Navbar/Navbar';

export default function AboutHero() {
    return (
        <section
            className="relative h-screen min-h-[600px] w-full bg-black bg-cover bg-center"
            style={{ backgroundImage: 'url("/About/hero/bg-image.png")' }}
        >
            <Navbar currentPage="About" />

            {/* Hero Content */}
            <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 w-full mx-auto max-w-7xl">
                <h1 className="text-white font-bold tracking-tight text-3xl sm:text-4xl lg:text-6xl max-w-5xl text-center mb-8 leading-[1.2]">
                    A Diagnostic Laboratory Built for Precision and People
                </h1>

                <p className="text-white text-center max-w-4xl text-sm sm:text-base lg:text-lg mb-10 leading-relaxed opacity-90 px-4">
                    Founded on the principles of preventive medicine, Forte Clinical Laboratory brings together
                    cutting-edge automated technology, evidence-based practices and expert clinical knowledge —
                    all in a single 5,000 sq.ft facility in Al Garhoud, Dubai.
                </p>
            </div>
        </section>
    );
}
