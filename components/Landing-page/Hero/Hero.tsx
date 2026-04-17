'use client';

import Link from 'next/link';
import Navbar from '@/components/Navbar/Navbar';
import Reveal from '@/components/Animation/Reveal';
import BookActionButton from '@/components/Booking/BookActionButton';

export default function Hero() {
    return (
        <section className="relative h-screen min-h-[600px] w-full overflow-hidden bg-black">
            <video
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 w-full h-full object-cover"
            >
                <source src="/Landing-page/hero-video.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-black/55"></div>

            <Navbar currentPage="Home" />

            <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 w-full mx-auto max-w-7xl">
                <Reveal delayMs={60}>
                    <span className="text-white font-light text-[0.7rem] sm:text-xs tracking-widest mb-4 sm:mb-6 text-center px-4 block">
                        DHA Approved Diagnostic Laboratory & Home Testing
                    </span>
                </Reveal>

                <Reveal delayMs={140}>
                    <h1 className="text-white font-bold tracking-tight text-3xl sm:text-4xl lg:text-5xl max-w-xs sm:max-w-xl lg:max-w-4xl text-center mb-4 sm:mb-6 leading-tight sm:leading-tight lg:leading-tight">
                        The UAE’s Largest and Most Trusted Molecular Diagnostics & Genetic Testing Partner.
                    </h1>
                </Reveal>

                <Reveal delayMs={210}>
                    <p className="text-white text-center max-w-xs sm:max-w-lg lg:max-w-3xl text-sm md:text-base lg:text-lg mb-8 sm:mb-10 leading-relaxed opacity-90 px-4 sm:px-0">
                        Dubai’s Latest Purpose-Built, State-of-the-Art, Fully Automated Laboratory.
                    </p>
                </Reveal>

                <Reveal delayMs={280}>
                    <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4 w-full sm:w-auto px-4">
                        <BookActionButton
                            label="Book a Test"
                            whatsappText="Hi, I would like to book a test from the home page."
                            className="bg-[#f88c29] hover:bg-[#e67b1d] text-white rounded-md px-5 sm:px-6 py-2.5 sm:py-2.5 text-sm font-medium transition-all w-full sm:w-auto text-center shadow-lg"
                        />
                        <Link
                            href="/lab-tests"
                            className="border-2 border-[#f88c29] hover:bg-[#f88c29]/10 text-white rounded-md px-5 sm:px-6 py-2.5 sm:py-2.5 text-sm font-medium transition-all w-full sm:w-auto text-center backdrop-blur-sm"
                        >
                            Explore Lab Tests
                        </Link>
                    </div>
                </Reveal>
            </div>
        </section>
    );
}
