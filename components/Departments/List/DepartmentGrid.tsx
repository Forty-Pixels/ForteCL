'use client';

import Link from 'next/link';
import Image from 'next/image';
import { DEPARTMENTS_DATA } from '@/constants/departments';
import Reveal from '@/components/Animation/Reveal';
import { ArrowRightIcon } from '@heroicons/react/24/outline';

export default function DepartmentGrid() {
    return (
        <section className="bg-white pt-16 lg:pt-24 pb-24 relative overflow-hidden rounded-t-[2.5rem] lg:rounded-t-[4rem] -mt-16 lg:-mt-20 z-20">
            {/* Background decorative elements */}
            <div className="absolute top-0 right-0 w-1/3 h-full bg-[#f88c29]/5 -skew-x-12 translate-x-1/2" />
            
            <div className="container mx-auto px-6 max-w-7xl relative z-10">
                <div className="mb-16">
                    <h2 className="text-sm font-black text-[#f88c29] uppercase tracking-[0.4em] mb-4">
                        Clinical Excellence
                    </h2>
                    <h3 className="text-4xl lg:text-5xl font-black text-gray-900 leading-tight">
                        Our Specialized <br /> Diagnostic Departments
                    </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {DEPARTMENTS_DATA.map((dept, index) => (
                        <Reveal key={dept.id} delayMs={index * 100}>
                            <Link 
                                href={`/departments/${dept.id}`}
                                className="group block relative h-[400px] rounded-[2.5rem] overflow-hidden shadow-2xl transition-all duration-500 hover:-translate-y-2"
                            >
                                {/* Department Image Background */}
                                <Image
                                    src={dept.image}
                                    alt={dept.title}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                
                                {/* Overlay Gradient */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent transition-opacity group-hover:opacity-100 opacity-90" />
                                
                                {/* Content */}
                                <div className="absolute inset-0 p-8 flex flex-col justify-end">
                                    <div className="mb-4">
                                        <div className="h-1 w-8 bg-[#f88c29] mb-4 group-hover:w-16 transition-all duration-500" />
                                        <h4 className="text-2xl font-black text-white uppercase tracking-tight mb-2">
                                            {dept.title}
                                        </h4>
                                        <p className="text-gray-300 text-xs font-medium line-clamp-2 leading-relaxed mb-6 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                                            {dept.description}
                                        </p>
                                    </div>

                                    <div className="flex items-center gap-2 text-white text-[10px] font-black uppercase tracking-widest">
                                        Explore Department
                                        <ArrowRightIcon className="w-4 h-4 transition-transform group-hover:translate-x-2" />
                                    </div>
                                </div>

                                {/* Hover Border Effect */}
                                <div className="absolute inset-0 border-2 border-transparent group-hover:border-[#f88c29]/30 rounded-[2.5rem] transition-all duration-500" />
                            </Link>
                        </Reveal>
                    ))}
                </div>
            </div>
        </section>
    );
}
