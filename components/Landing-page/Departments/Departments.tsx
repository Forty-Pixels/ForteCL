import Image from 'next/image';
import Link from 'next/link';
import Reveal from '@/components/Animation/Reveal';

export default function Departments() {
    return (
        <section className="bg-white py-16 md:py-24 lg:py-32">
            <div className="w-full pl-4 sm:pl-6 lg:pl-16 xl:pl-24 pr-0">
                <div className="grid grid-cols-1 lg:grid-cols-[60%_40%] gap-12 lg:gap-8 items-center">
                    <div className="flex flex-col items-start order-2 lg:order-1 max-w-7xl mx-auto lg:mx-0 w-full pr-4 sm:pr-8">
                        <Reveal delayMs={70}>
                            <span className="text-[#307984] font-semibold text-sm xl:text-base tracking-wider mb-4 block">
                                Departments
                            </span>
                        </Reveal>
                        <Reveal delayMs={140}>
                            <h2 className="text-2xl sm:text-4xl lg:text-5xl xl:text-[3.4rem] font-bold text-[#202020] mb-6 leading-[1.2] lg:leading-[1.1] max-w-full">
                                Every Discipline. <br className="hidden lg:block" />
                                Under One Roof.
                            </h2>
                        </Reveal>
                        <Reveal delayMs={210}>
                            <p className="text-gray-600 text-sm md:text-base lg:text-lg mb-10 leading-relaxed lg:max-w-[85%] pr-4">
                                Our specialised departments cover the full spectrum of diagnostic medicine — from haematology and biochemistry to molecular diagnostics, oncology, genetic screening and beyond. Each department runs on automated, evidence-based systems designed to minimise error and maximise accuracy, with every result reviewed by qualified professionals before it reaches you.
                            </p>
                        </Reveal>

                        <Reveal delayMs={280}>
                            <Link
                                href="/departments"
                                className="bg-[#307984] hover:bg-[#307984]/90 text-white px-8 py-3.5 rounded-lg font-medium transition-colors text-center text-sm md:text-base"
                            >
                                View All Departments
                            </Link>
                        </Reveal>
                    </div>

                    <Reveal delayMs={170} className="order-1 lg:order-2">
                        <div className="relative w-full h-[350px] sm:h-[450px] lg:h-[500px] xl:h-[600px] rounded-tl-2xl rounded-bl-2xl overflow-hidden shadow-sm">
                            <Image
                                src="/Landing-page/departments/lab_specialist_high_res1.png"
                                alt="Lab specialist using microscope"
                                fill
                                className="object-cover object-center"
                                priority
                            />
                        </div>
                    </Reveal>
                </div>
            </div>
        </section>
    );
}
