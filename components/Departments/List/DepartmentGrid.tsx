'use client';

import Link from 'next/link';
import Image from 'next/image';
import { DEPARTMENTS_DATA } from '@/constants/departments';
import Reveal from '@/components/Animation/Reveal';
import { BeakerIcon, ArrowRightIcon, ShieldCheckIcon } from '@heroicons/react/24/outline';

import { InformationCircleIcon } from '@heroicons/react/24/solid';

export default function DepartmentGrid() {
    return (
        <section className="bg-white pt-0 pb-10">
            <div className="w-full pl-6 lg:pl-12">
                <div className="bg-white rounded-bl-[1.5rem] p-8 sm:p-12 lg:p-20 shadow-xl ml-auto w-full lg:w-[96%]">
                    <h2 className="text-2xl font-bold text-[#333] uppercase mb-8 tracking-tight">
                        DIAGNOSTIC DEPARTMENTS
                    </h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {DEPARTMENTS_DATA.map((dept, index) => (
                        <Reveal key={dept.id} delayMs={index * 50}>
                            <Link 
                                href={`/departments/${dept.id}`}
                                className="group relative bg-[#f88c29] rounded-[0.75rem] p-5 h-[140px] flex flex-col justify-between transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
                            >
                                <div className="flex justify-between items-start">
                                    <h3 className="text-base font-bold text-white leading-tight max-w-[85%] uppercase">
                                        {dept.title}
                                    </h3>
                                    <InformationCircleIcon className="w-6 h-6 text-white/50 group-hover:text-white transition-colors" />
                                </div>

                                <div className="flex justify-end">
                                    <ArrowRightIcon className="w-6 h-6 text-white group-hover:translate-x-2 transition-transform" />
                                </div>
                            </Link>
                        </Reveal>
                    ))}
                </div>

                </div>
            </div>
        </section>
    );
}
