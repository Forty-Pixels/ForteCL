import Image from 'next/image';
import Reveal from '@/components/Animation/Reveal';
import Navbar from '@/components/Navbar/Navbar';

export default function LabTestsHero() {
    return (
        <section className="relative h-[75vh] min-h-[600px] flex items-center justify-center overflow-hidden">
            <Navbar currentPage="Lab Tests" />
            {/* Background */}
            <Image
                src="/Landing-page/tests/test-8.png"
                alt="Lab Tests"
                fill
                className="object-cover"
                priority
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/80" />

            {/* Content */}
            <div className="relative z-10 text-center px-4 max-w-3xl mx-auto">
                <Reveal delayMs={70}>
                    <span className="text-[#f88c29] font-semibold text-xs tracking-[0.2em] mb-4 uppercase block">
                        Precision Testing For Better Living
                    </span>
                </Reveal>
                <Reveal delayMs={140}>
                    <h1 className="text-white text-4xl md:text-5xl lg:text-6xl font-bold mb-5 leading-tight">
                        A-Z Lab Tests
                    </h1>
                </Reveal>
                <Reveal delayMs={210}>
                    <p className="text-gray-300 text-sm md:text-base leading-relaxed max-w-2xl mx-auto">
                        Browse our extensive list of diagnostic tests. From routine blood work to advanced diagnostics — ensuring accurate and timely results.
                    </p>
                </Reveal>
            </div>
        </section>
    );
}
