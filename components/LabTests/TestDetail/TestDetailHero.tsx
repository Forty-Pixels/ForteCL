import Image from 'next/image';
import Reveal from '@/components/Animation/Reveal';
import Navbar from '@/components/Navbar/Navbar';
import { LabTest } from '@/data/labTestTypes';

interface Props {
    test: LabTest;
}

export default function TestDetailHero({ test }: Props) {
    return (
        <section className="relative h-[65vh] min-h-[500px] flex items-center justify-center overflow-hidden">
            <Navbar currentPage="Lab Tests" />
            <Image
                src="/Landing-page/tests/test-8.png"
                alt={test.name}
                fill
                className="object-cover"
                priority
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/80" />

            <div className="relative z-10 text-center px-4 max-w-3xl mx-auto">
                <Reveal delayMs={70}>
                    <span className="text-[#f88c29] font-semibold text-xs tracking-[0.2em] mb-4 uppercase block">
                        Lab Test
                    </span>
                </Reveal>
                <Reveal delayMs={140}>
                    <h1 className="text-white text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
                        {test.name}
                    </h1>
                </Reveal>
                <Reveal delayMs={210}>
                    <p className="text-gray-300 text-sm leading-relaxed">
                        Accurate diagnostics for better health. Get crucial insights about your body&apos;s functioning.
                    </p>
                </Reveal>
            </div>
        </section>
    );
}
