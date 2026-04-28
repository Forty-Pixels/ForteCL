'use client';

import Link from 'next/link';
import Reveal from '@/components/Animation/Reveal';
import { ArrowRightIcon } from '@heroicons/react/24/outline';

export default function DepartmentCTA() {
    return (
        <section className="bg-white pt-10 pb-0">
            <div className="max-w-7xl mx-auto px-6 lg:px-12">
                <Reveal>
                    <div className="bg-[#f88c29] rounded-t-[1.5rem] p-12 sm:p-16 lg:p-20 flex flex-col lg:flex-row items-center justify-between gap-12">
                        <div className="max-w-xl text-center lg:text-left">
                            <h2 className="text-white text-xl sm:text-2xl lg:text-3xl font-black leading-[1.2] uppercase tracking-tight">
                                TAKING YOUR CLINICAL DIAGNOSTICS <br />
                                <span className="text-white/80">TO THE NEXT LEVEL.</span>
                            </h2>
                        </div>

                        <div className="w-full lg:w-auto min-w-[300px]">
                            <Link 
                                href="/contact" 
                                className="group block border-y border-white/20 py-6 flex items-center justify-between hover:bg-white/5 transition-colors px-4"
                            >
                                <span className="text-white text-base font-bold uppercase tracking-widest">Connect with us</span>
                                <ArrowRightIcon className="w-5 h-5 text-white group-hover:translate-x-2 transition-transform" />
                            </Link>
                        </div>
                    </div>
                </Reveal>
            </div>
        </section>
    );
}
