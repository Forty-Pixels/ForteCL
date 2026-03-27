'use client';

import Navbar from '@/components/Navbar/Navbar';

export default function PackagesHero() {
    return (
        <section
            className="relative h-screen min-h-[600px] w-full bg-black bg-cover bg-center"
            style={{ backgroundImage: 'url("/Packages/hero/labtesting 1.png")' }}
        >
            <div className="absolute inset-0 bg-black/40"></div>

            <Navbar currentPage="Packages" />

            {/* Hero Content */}
            <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 w-full mx-auto max-w-7xl">
                <h1 className="text-white font-bold tracking-tight text-3xl sm:text-4xl lg:text-5xl max-w-xs sm:max-w-xl lg:max-w-3xl text-center mb-4 sm:mb-5 leading-tight sm:leading-tight lg:leading-tight">
                    Health Screening Packages <br className="hidden md:block" />
                    Designed for You
                </h1>

                <p className="text-white text-center max-w-xs sm:max-w-lg lg:max-w-3xl text-xs sm:text-sm lg:text-base mb-8 sm:mb-10 leading-relaxed opacity-90 px-4 sm:px-0">
                    Comprehensive health checkup packages tailored for individuals, families and corporate
                    giving you a full diagnostic picture in one convenient visit or home collection
                </p>
            </div>
        </section>
    );
}
