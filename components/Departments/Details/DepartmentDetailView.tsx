'use client';

import Link from 'next/link';
import Reveal from '@/components/Animation/Reveal';
import Navbar from '@/components/Navbar/Navbar';
import { Department } from '@/constants/departments';
import { InformationCircleIcon, ArrowRightIcon, PhoneIcon } from '@heroicons/react/24/outline';
import DepartmentQuote from '@/components/Departments/Quote/DepartmentQuote';
import DepartmentDifference from '@/components/Departments/Difference/DepartmentDifference';
import DepartmentCTA from '@/components/Departments/CTA/DepartmentCTA';

interface TestRecord {
    slug: string;
    name: string;
    tat?: string;
    sampleType?: string[];
}

interface DepartmentDetailViewProps {
    department: Department;
    cmsTests: TestRecord[];
    allCmsTests: { name: string; slug: string }[];
}

export default function DepartmentDetailView({ department, cmsTests, allCmsTests }: DepartmentDetailViewProps) {
    return (
        <main className="bg-white min-h-screen">
            <div className="absolute top-0 left-0 w-full z-50">
                <Navbar currentPage="Departments" />
            </div>

            {/* The TEAL BOX HERO with Diagonal Stripes Background */}
            <section className="relative pt-40 pb-0 bg-white overflow-hidden flex items-start">
                {/* Diagonal Stripes Background */}
                <div className="absolute inset-0 z-0">
                    <div 
                        className="absolute inset-0 opacity-[0.05]" 
                        style={{ 
                            backgroundImage: 'repeating-linear-gradient(-45deg, #000, #000 20px, transparent 20px, transparent 40px)',
                        }}
                    />
                    {/* Vertical Fade Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-white" />
                </div>

                <div className="w-full relative z-10 flex justify-end">
                    <div className="relative bg-[#045d65] rounded-tl-[4rem] rounded-bl-none p-8 sm:p-12 lg:p-20 shadow-2xl w-full lg:w-[96%] min-h-[400px] flex flex-col justify-center">

                        <a
                            href="tel:+97142718226"
                            aria-label={`Call Forte Clinical Laboratory about ${department.title} at +971 4 271 8226`}
                            className="mb-8 inline-flex self-start items-center gap-3 rounded-full border border-white/50 bg-white/10 px-5 py-3 text-white transition-colors hover:bg-white/20 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white lg:absolute lg:right-20 lg:top-12 lg:mb-0"
                        >
                            <PhoneIcon className="h-5 w-5 shrink-0" aria-hidden="true" />
                            <span className="text-sm font-semibold">Call us: +971 4 271 8226</span>
                        </a>

                        <Reveal>
                            <div className="max-w-4xl">
                                <h1 className="text-3xl lg:text-5xl font-black text-white mb-8 leading-tight uppercase tracking-tight">
                                    {department.title} <br /> EXCELLENCE IN CLINICAL DIAGNOSTICS.
                                </h1>
                                <p className="text-white/90 text-sm lg:text-base leading-relaxed mb-12 max-w-2xl font-medium">
                                    {department.description}
                                </p>
                                
                                {/* Bottom Progress Line */}
                                <div className="relative w-full h-[2px] bg-white/20">
                                    <div className="absolute left-0 top-0 h-full w-1/3 bg-white" />
                                </div>
                            </div>
                        </Reveal>
                    </div>
                </div>
            </section>

            {/* Reusing the OLD Department Grid layout with the white container box */}
            <section className="bg-white pt-0 pb-10 overflow-hidden">
                <div className="w-full flex justify-end">
                    <div className="bg-white rounded-bl-[1.5rem] p-8 sm:p-12 lg:p-20 shadow-xl w-full lg:w-[96%]">
                        <h2 className="text-2xl font-bold text-[#333] uppercase mb-8 tracking-tight">
                            TESTS & PROCEDURES
                        </h2>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            {cmsTests.map((test, index) => (
                                <Reveal key={test.slug} delayMs={index * 50}>
                                    <Link 
                                        href={test.slug === 'nipt' ? `/departments/molecular/nipt` : `/departments/${department.id}/${test.slug}`}
                                        className="group relative bg-[#045d65] rounded-[0.75rem] p-5 h-[140px] flex flex-col justify-between transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
                                    >
                                        <div className="flex justify-between items-start">
                                            <h3 className="text-base font-bold text-white leading-tight max-w-[85%] uppercase">
                                                {test.name}
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

                        {cmsTests.length === 0 && (
                            <div className="text-center py-10">
                                <p className="text-gray-400 font-bold uppercase tracking-widest">
                                    No tests listed for this department yet.
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* Supplementary content */}
            <DepartmentQuote 
                quote={department.quote?.text} 
                highlightedText={department.quote?.highlightedText} 
            />
            <DepartmentDifference 
                title={department.difference?.title}
                image={department.difference?.image || department.image}
                items={department.difference?.items}
            />
            <DepartmentCTA />
        </main>
    );
}
