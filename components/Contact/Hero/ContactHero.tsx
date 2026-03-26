'use client';

import Navbar from '@/components/Navbar/Navbar';

export default function ContactHero() {
    return (
        <section
            className="relative h-screen min-h-[600px] w-full bg-black bg-cover bg-center"
            style={{ backgroundImage: 'url("/contact/bg-hero.png")' }}
        >
            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-black/40"></div>

            <Navbar currentPage="Contact" />

            {/* Hero Content */}
            <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 w-full mx-auto max-w-7xl">
                <h1 className="text-white font-bold tracking-tight text-2xl sm:text-3xl lg:text-5xl max-w-4xl text-center mb-6 leading-[1.2]">
                    Get in Touch. <br />
                    We're Here to Help.
                </h1>

                <p className="text-white text-center max-w-3xl text-xs lg:text-sm mb-8 leading-relaxed opacity-90 px-4">
                    Whether you have a question about our tests, need assistance with your reports, or want
                    to partner with us, our team is ready to provide the answers and support you need.
                </p>
            </div>
        </section>
    );
}
