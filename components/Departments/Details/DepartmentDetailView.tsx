'use client';

import Image from 'next/image';
import Link from 'next/link';
import Reveal from '@/components/Animation/Reveal';
import { Department } from '@/constants/departments';
import { 
    CheckCircleIcon, 
    BeakerIcon, 
    ShieldCheckIcon, 
    InformationCircleIcon,
    ArrowLeftIcon
} from '@heroicons/react/24/outline';

import Navbar from '@/components/Navbar/Navbar';

interface DepartmentDetailViewProps {
    department: Department;
}

export default function DepartmentDetailView({ department }: DepartmentDetailViewProps) {
    return (
        <section className="bg-white min-h-screen pb-24 pt-20 sm:pt-24 lg:pt-28">
            <Navbar currentPage="Departments" />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="py-4 lg:py-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start relative">
                        
                        {/* Content Side - STICKY (Restored Original Layout) */}
                        <div className="lg:sticky lg:top-[120px] self-start h-fit">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-11 h-11 rounded-2xl bg-[#307984]/10 flex items-center justify-center text-[#307984]">
                                    <BeakerIcon className="w-5 h-5" />
                                </div>
                                <h1 className="text-3xl lg:text-4xl font-black text-[#202020] tracking-tight">
                                    {department.title}
                                </h1>
                            </div>

                            <p className="text-gray-600 text-sm lg:text-[15px] leading-relaxed mb-10">
                                {department.description}
                            </p>

                            {/* SubSections */}
                            {department.subSections && department.subSections.map((sub, sIdx) => (
                                <div key={sIdx} className="mb-8 bg-[#fcfcfc] p-6 rounded-[2.5rem] border border-gray-100 shadow-sm transition-all hover:shadow-md">
                                    <h3 className="text-[13px] font-black text-[#307984] mb-4 flex items-center gap-3 uppercase tracking-wider">
                                        <InformationCircleIcon className="w-4 h-4" />
                                        {sub.title}
                                    </h3>
                                    <div className="space-y-3">
                                        {Array.isArray(sub.content) ? (
                                            <ul className="grid grid-cols-1 gap-3">
                                                {sub.content.map((item, iIdx) => (
                                                    <li key={iIdx} className="text-xs text-gray-700 font-bold flex items-center gap-3">
                                                        <div className="w-2 h-2 rounded-full bg-[#f88c29]/40" />
                                                        {item}
                                                    </li>
                                                ))}
                                            </ul>
                                        ) : (
                                            <p className="text-xs text-gray-600 leading-relaxed font-bold">
                                                {sub.content}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            ))}

                            {/* Key Services */}
                            <h3 className="text-[10px] font-black text-[#f88c29] uppercase tracking-[0.2em] mb-5 px-1">
                                Core Capabilities
                            </h3>
                            <div className="flex flex-wrap gap-2.5 mb-10">
                                {department.keyServices.map((service, sIndex) => (
                                    <span 
                                        key={sIndex}
                                        className="px-4 py-2 rounded-full bg-white text-[#307984] text-[10px] font-black border border-gray-100 shadow-sm transition-all hover:bg-[#307984] hover:text-white hover:border-[#307984]"
                                    >
                                        {service}
                                    </span>
                                ))}
                            </div>

                            {/* Comparison Table */}
                            {department.table && (
                                <div className="pt-4">
                                    <div className="overflow-x-auto rounded-[2rem] border border-gray-100 shadow-sm">
                                        <table className="w-full text-left border-collapse">
                                            <thead>
                                                <tr className="bg-[#307984]">
                                                    {department.table.headers.map((h, i) => (
                                                        <th key={i} className="px-6 py-5 text-[11px] font-black text-white uppercase tracking-wider">
                                                            {h}
                                                        </th>
                                                    ))}
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-gray-100">
                                                {department.table.rows.map((row, rIdx) => (
                                                    <tr key={rIdx} className="hover:bg-gray-50 transition-colors">
                                                        {row.map((cell, cIdx) => (
                                                            <td key={cIdx} className={`px-6 py-5 text-[11px] ${cIdx === 0 ? 'font-black text-[#202020]' : 'text-gray-600 font-bold'}`}>
                                                                    {cell}
                                                            </td>
                                                        ))}
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Image & Tests Column */}
                        <div className="space-y-8 lg:mt-4">
                            <Reveal delayMs={300}>
                                <div className="relative aspect-[4/3] w-full rounded-[2.5rem] overflow-hidden shadow-2xl group border-[12px] border-gray-50/50">
                                    <Image
                                        src={department.image}
                                        alt={department.title}
                                        fill
                                        className="object-cover transition-transform duration-1000 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-60" />
                                </div>
                            </Reveal>

                            <div className="bg-[#f8fafc] rounded-[2.5rem] p-8 sm:p-10 border border-gray-100 shadow-inner">
                                <div className="flex items-center justify-between mb-8">
                                    <h3 className="text-xl font-black text-[#202020] tracking-tight">
                                        Standard Procedures
                                    </h3>
                                    <ShieldCheckIcon className="w-8 h-8 text-[#307984] opacity-20" />
                                </div>
                                
                                <div className="grid grid-cols-1 gap-6">
                                    {department.commonTests.map((test, tIndex) => (
                                        <Reveal key={tIndex} delayMs={500 + (tIndex * 50)}>
                                            <div className="group flex items-start gap-4">
                                                <div className="mt-1 flex-shrink-0 w-7 h-7 rounded-xl bg-white border border-gray-200 flex items-center justify-center group-hover:bg-[#307984] group-hover:border-[#307984] transition-all shadow-sm">
                                                    <CheckCircleIcon className="w-4 h-4 text-[#307984] group-hover:text-white transition-colors" />
                                                </div>
                                                <div>
                                                    <h4 className="text-sm font-black text-gray-800 mb-1 group-hover:text-[#307984] transition-colors leading-tight">
                                                        {test.name}
                                                    </h4>
                                                    <p className="text-[11px] text-gray-500 leading-relaxed font-bold max-w-lg">
                                                        {test.description}
                                                    </p>
                                                </div>
                                            </div>
                                        </Reveal>
                                    ))}
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
}
