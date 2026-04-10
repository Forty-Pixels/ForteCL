'use client';

import Link from 'next/link';
import Image from 'next/image';
import { DEPARTMENTS_DATA } from '@/constants/departments';
import Reveal from '@/components/Animation/Reveal';
import { BeakerIcon, ArrowRightIcon } from '@heroicons/react/24/outline';

export default function DepartmentGrid() {
    return (
        <section className="py-8 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {DEPARTMENTS_DATA.map((dept, index) => (
                        <Reveal key={dept.id} delayMs={index * 100}>
                            <Link 
                                href={`/departments/${dept.id}`}
                                className="group bg-white rounded-[1.5rem] border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:shadow-[0_15px_40px_rgba(48,121,132,0.1)] transition-all duration-500 overflow-hidden flex flex-col h-full"
                            >
                                {/* Image Holder - BALANCED HEIGHT */}
                                <div className="relative h-40 overflow-hidden">
                                    <Image
                                        src={dept.image}
                                        alt={dept.title}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                    <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-white to-transparent opacity-40" />
                                    
                                    {/* Icon Badge - BALANCED */}
                                    <div className="absolute top-4 right-4 w-9 h-9 rounded-xl bg-white/90 backdrop-blur-md shadow-sm flex items-center justify-center text-[#307984] group-hover:bg-[#307984] group-hover:text-white transition-all duration-300">
                                        <BeakerIcon className="w-4.5 h-4.5" />
                                    </div>
                                </div>

                                {/* Content - READABLE & COMPACT */}
                                <div className="p-5 flex-grow flex flex-col">
                                    <h3 className="text-base font-bold text-[#1F2937] mb-2 group-hover:text-[#307984] transition-colors leading-tight">
                                        {dept.title}
                                    </h3>
                                    <p className="text-gray-400 text-xs leading-relaxed line-clamp-2 mb-4">
                                        {dept.description}
                                    </p>
                                    
                                    <div className="mt-auto flex items-center justify-between">
                                        <span className="text-[#307984] group-hover:text-[#f88c29] text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5 group-hover:gap-2.5 transition-all">
                                            View Details
                                            <ArrowRightIcon className="w-3 h-3" />
                                        </span>
                                        <div className="w-8 h-1 bg-gray-50 rounded-full overflow-hidden">
                                            <div className="w-0 group-hover:w-full h-full bg-[#f88c29] transition-all duration-700" />
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </Reveal>
                    ))}
                </div>
            </div>
        </section>
    );
}
