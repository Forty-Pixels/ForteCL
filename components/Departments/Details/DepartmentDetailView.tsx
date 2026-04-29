'use client';

import Link from 'next/link';
import Image from 'next/image';
import Reveal from '@/components/Animation/Reveal';
import Navbar from '@/components/Navbar/Navbar';
import { Department } from '@/constants/departments';
import { InformationCircleIcon, ArrowRightIcon, PhoneIcon } from '@heroicons/react/24/outline';
import DepartmentQuote from '@/components/Departments/Quote/DepartmentQuote';
import DepartmentDifference from '@/components/Departments/Difference/DepartmentDifference';
import DepartmentCTA from '@/components/Departments/CTA/DepartmentCTA';

const WhatsAppIcon = ({ className }: { className?: string }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.414 0 .011 5.403.011 12.038c0 2.12.553 4.189 1.604 6.04l-1.705 6.226 6.37-1.67a11.803 11.803 0 005.766 1.498h.005c6.634 0 12.038-5.403 12.038-12.039a11.811 11.811 0 00-3.414-8.417" />
    </svg>
);

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

            {/* The ORANGE BOX HERO with Diagonal Stripes Background */}
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

                <div className="w-full pl-6 lg:pl-12 relative z-10">
                    <div className="relative bg-[#f88c29] rounded-tl-[4rem] rounded-bl-none p-8 sm:p-12 lg:p-20 shadow-2xl ml-auto w-full lg:w-[96%] min-h-[400px] flex flex-col justify-center">
                        {/* Floating Action Icons */}
                        <div className="absolute right-6 top-1/2 -translate-y-1/2 flex flex-col gap-4">
                            <a href="tel:+97142729302" className="w-12 h-12 bg-[#1a1a1a] rounded-full flex items-center justify-center text-white shadow-xl hover:scale-110 transition-transform">
                                <PhoneIcon className="w-6 h-6" />
                            </a>
                            <a href="https://wa.me/97142729302" target="_blank" className="w-12 h-12 bg-[#25D366] rounded-full flex items-center justify-center text-white shadow-xl hover:scale-110 transition-transform">
                                <WhatsAppIcon className="w-6 h-6" />
                            </a>
                        </div>

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
            <section className="bg-white pt-0 pb-10">
                <div className="w-full pl-6 lg:pl-12">
                    <div className="bg-white rounded-bl-[1.5rem] p-8 sm:p-12 lg:p-20 shadow-xl ml-auto w-full lg:w-[96%]">
                        <h2 className="text-2xl font-bold text-[#333] uppercase mb-8 tracking-tight">
                            TESTS & PROCEDURES
                        </h2>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            {cmsTests.map((test, index) => (
                                <Reveal key={test.slug} delayMs={index * 50}>
                                    <Link 
                                        href={`/departments/${department.id}/${test.slug}`}
                                        className="group relative bg-[#f88c29] rounded-[0.75rem] p-5 h-[140px] flex flex-col justify-between transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
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
