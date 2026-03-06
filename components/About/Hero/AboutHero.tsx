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
            <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 -mt-20 sm:-mt-24 w-full mx-auto max-w-7xl">
                <h1 className="text-white font-bold tracking-tight text-3xl sm:text-4xl lg:text-6xl max-w-5xl text-center mb-8 leading-[1.2]">
                    Forte Clinical Laboratory <br />
                    Dubai&apos;s Premier Diagnostic Lab
                </h1>

                <p className="text-white text-center max-w-4xl text-sm sm:text-base lg:text-lg mb-10 leading-relaxed opacity-90 px-4">
                    Your health, our priority. Experience timely and reliable diagnostic services with state-of-the-art technology and highly skilled pathologists in the heart of Dubai.
                </p>
            </div>
        </section>
    );
}
