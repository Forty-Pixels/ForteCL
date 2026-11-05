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
                            className="bg-[#045d65] hover:bg-[#08717a] text-white rounded-md px-5 sm:px-6 py-2.5 sm:py-2.5 text-sm font-medium transition-all w-full sm:w-auto text-center shadow-lg"
                        />
                        <Link
                            href="/lab-tests"
                            className="border-2 border-[#A7DCC0] hover:bg-[#045d65]/70 text-white rounded-md px-5 sm:px-6 py-2.5 sm:py-2.5 text-sm font-medium transition-all w-full sm:w-auto text-center backdrop-blur-sm"
                        >
                            Medical Tests
                        </Link>
                    </div>
                </Reveal>
            </div>
            <Reveal delayMs={350} className="absolute right-4 top-24 z-10 sm:right-8 sm:top-28">
                <a
                    href="https://wa.me/971569925611"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Chat with us on WhatsApp"
                    className="flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg ring-2 ring-white/30 transition-all hover:scale-110 hover:bg-[#1ebe5b]"
                >
                    <svg className="h-7 w-7" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.414 0 .011 5.403.011 12.038c0 2.12.553 4.189 1.604 6.04l-1.705 6.226 6.37-1.67a11.803 11.803 0 005.766 1.498h.005c6.634 0 12.038-5.403 12.038-12.039a11.811 11.811 0 00-3.414-8.417" />
                    </svg>
                </a>
            </Reveal>
        </section>
    );
}
