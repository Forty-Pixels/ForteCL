'use client';

import Link from 'next/link';
import Navbar from '@/components/Navbar/Navbar';
import Reveal from '@/components/Animation/Reveal';

export default function Hero() {
    return (
        <section
            className="relative h-screen min-h-[600px] w-full bg-black bg-cover bg-center"
            style={{ backgroundImage: 'url("/Landing-page/hero-image.png")' }}
        >
            <div className="absolute inset-0 bg-black/55"></div>

            <Navbar currentPage="Home" />

            <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 -mt-20 sm:-mt-24 w-full mx-auto max-w-7xl">
                <Reveal delayMs={60}>
                    <span className="text-white font-light text-xs sm:text-sm tracking-widest mb-4 sm:mb-6 text-center px-4 block">
                        DHA Approved Diagnostic Laboratory & Home Testing
                    </span>
                </Reveal>

                <Reveal delayMs={140}>
                    <h1 className="text-white font-bold tracking-tight text-4xl sm:text-5xl lg:text-6xl max-w-xs sm:max-w-2xl lg:max-w-4xl text-center mb-4 sm:mb-6 leading-tight sm:leading-tight lg:leading-tight">
                        Diagnostic Results You Can Count On
                    </h1>
                </Reveal>

                <Reveal delayMs={210}>
                    <p className="text-white text-center max-w-xs sm:max-w-xl lg:max-w-4xl text-sm sm:text-base lg:text-lg mb-8 sm:mb-10 leading-relaxed opacity-90 px-4 sm:px-0">
                        Combining cutting edge technology with experienced professionals, Forte Clinical Laboratory<br className="hidden md:block" />
                        delivers lab test services and health screening you can trust. From routine blood panels to<br className="hidden md:block" />
                        complex genomics all under one roof in Al Garhoud, Dubai.
                    </p>
                </Reveal>

                <Reveal delayMs={280}>
                    <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4 w-full sm:w-auto px-4">
                        <Link
                            href="/book-test"
                            className="bg-[#2DD4BF] hover:bg-teal-300 text-white rounded-md px-6 sm:px-8 py-3.5 sm:py-3 font-medium transition-colors w-full sm:w-auto text-center"
                        >
                            Book a Test
                        </Link>
                        <Link
                            href="/reports"
                            className="border-2 border-[#2DD4BF] hover:bg-[#2DD4BF]/10 text-white rounded-md px-6 sm:px-8 py-3.5 sm:py-3 font-medium transition-colors w-full sm:w-auto text-center backdrop-blur-sm"
                        >
                            Check Reports Online
                        </Link>
                    </div>
                </Reveal>
            </div>
        </section>
    );
}
