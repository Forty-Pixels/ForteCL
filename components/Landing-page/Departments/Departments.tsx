import Image from 'next/image';
import Link from 'next/link';
import Reveal from '@/components/Animation/Reveal';

export default function Departments() {
    return (
        <section className="bg-white py-12 md:py-16 lg:py-20 overflow-hidden">
            <div className="w-full pl-4 sm:pl-6 lg:pl-8 xl:pl-[calc(50%-38rem)] pr-0">
                <div className="grid grid-cols-1 lg:grid-cols-[60%_40%] gap-8 lg:gap-6 items-center">
                    <div className="flex flex-col items-start order-2 lg:order-1 max-w-7xl mx-auto lg:mx-0 w-full pr-4 sm:pr-8">
                        <Reveal delayMs={70}>
                            <span className="text-[#f88c29] font-semibold text-xs xl:text-sm tracking-wider mb-3 block">
                                Departments
                            </span>
                        </Reveal>
                        <Reveal delayMs={140}>
                            <h2 className="text-xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-[#202020] mb-5 leading-[1.2] lg:leading-[1.1] max-w-full">
                                Every Discipline. <br className="hidden lg:block" />
                                Under One Roof.
                            </h2>
                        </Reveal>
                        <Reveal delayMs={210}>
                            <p className="text-gray-600 text-xs md:text-sm lg:text-base mb-8 leading-relaxed lg:max-w-[85%] pr-4">
                                Our specialised departments cover the full spectrum of diagnostic medicine — from haematology and biochemistry to molecular diagnostics, oncology, genetic screening and beyond. Each department runs on automated, evidence-based systems designed to minimise error and maximise accuracy, with every result reviewed by qualified professionals before it reaches you.
                            </p>
                        </Reveal>

                        <Reveal delayMs={280}>
                            <Link
                                href="/departments"
                                className="bg-[#307984] hover:bg-[#307984]/90 text-white px-6 py-3 rounded-lg font-medium transition-colors text-center text-xs md:text-sm"
                            >
                                View All Departments
                            </Link>
                        </Reveal>
                    </div>

                    <Reveal delayMs={170} className="order-1 lg:order-2">
                        <div className="relative w-full h-[300px] sm:h-[350px] lg:h-[400px] xl:h-[500px] rounded-tl-2xl rounded-bl-2xl overflow-hidden shadow-sm">
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
