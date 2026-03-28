'use client';

import Image from 'next/image';
import Reveal from '@/components/Animation/Reveal';
import { DEPARTMENTS_DATA } from '@/constants/departments';
import { 
    CheckCircleIcon, 
    BeakerIcon, 
    ShieldCheckIcon, 
    InformationCircleIcon
} from '@heroicons/react/24/outline';

export default function DepartmentList() {
    return (
        <section className="bg-white pb-32">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {DEPARTMENTS_DATA.map((dept, index) => (
                    <div 
                        key={dept.id} 
                        id={dept.id}
                        className={`py-20 lg:py-32 border-b border-gray-100 last:border-0 scroll-mt-[140px] ${
                            index % 2 !== 0 ? 'bg-[#fcfdfd] -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8' : ''
                        }`}
                    >
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start relative">
                            
                            {/* Content Side - STICKY */}
                            <div className={`lg:sticky lg:top-[160px] self-start h-fit ${index % 2 !== 0 ? 'lg:order-2' : ''}`}>
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-12 h-12 rounded-xl bg-[#307984]/10 flex items-center justify-center text-[#307984]">
                                        <BeakerIcon className="w-6 h-6" />
                                    </div>
                                    <h2 className="text-3xl lg:text-4xl font-black text-[#202020]">
                                        {dept.title}
                                    </h2>
                                </div>

                                <p className="text-gray-600 text-base lg:text-lg leading-relaxed mb-10">
                                    {dept.description}
                                </p>

                                {/* SubSections (if any) */}
                                {dept.subSections && dept.subSections.map((sub, sIdx) => (
                                    <div key={sIdx} className="mb-10 lg:mb-12 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm transition-all hover:shadow-md">
                                        <h3 className="text-lg font-bold text-[#307984] mb-4 flex items-center gap-2">
                                            <InformationCircleIcon className="w-5 h-5" />
                                            {sub.title}
                                        </h3>
                                        <div className="space-y-3">
                                            {Array.isArray(sub.content) ? (
                                                <ul className="grid grid-cols-1 gap-3">
                                                    {sub.content.map((item, iIdx) => (
                                                        <li key={iIdx} className="text-sm text-gray-700 font-medium flex items-center gap-2">
                                                            <div className="w-1.5 h-1.5 rounded-full bg-[#307984]/40" />
                                                            {item}
                                                        </li>
                                                    ))}
                                                </ul>
                                            ) : (
                                                <p className="text-sm text-gray-600 leading-relaxed font-medium">
                                                    {sub.content}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                ))}

                                {/* Key Services */}
                                <h3 className="text-sm font-black text-[#f88c29] uppercase tracking-widest mb-6 px-1">
                                    Our Key Services
                                </h3>
                                <div className="flex flex-wrap gap-2.5 mb-8">
                                    {dept.keyServices.map((service, sIndex) => (
                                        <span 
                                            key={sIndex}
                                            className="px-4 py-2 rounded-full bg-white text-[#307984] text-xs font-bold border border-gray-100 shadow-sm transition-all hover:bg-[#307984] hover:text-white hover:border-[#307984]"
                                        >
                                            {service}
                                        </span>
                                    ))}
                                </div>

                                {/* Comparison Table (Special for Pathology/Cytopathology) */}
                                {dept.table && (
                                    <div className="overflow-x-auto rounded-xl border border-gray-100 shadow-sm mb-12">
                                        <table className="w-full text-left border-collapse">
                                            <thead>
                                                <tr className="bg-[#307984]">
                                                    {dept.table.headers.map((h, i) => (
                                                        <th key={i} className="px-5 py-4 text-xs font-black text-white uppercase tracking-wider">
                                                            {h}
                                                        </th>
                                                    ))}
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-gray-100">
                                                {dept.table.rows.map((row, rIdx) => (
                                                    <tr key={rIdx} className="hover:bg-gray-50 transition-colors">
                                                        {row.map((cell, cIdx) => (
                                                            <td key={cIdx} className={`px-5 py-4 text-[10px] sm:text-xs ${cIdx === 0 ? 'font-black text-[#202020]' : 'text-gray-600 font-medium'}`}>
                                                                    {cell}
                                                            </td>
                                                        ))}
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                )}
                            </div>

                            {/* Image & Tests Side */}
                            <div className={`space-y-10 ${index % 2 !== 0 ? 'lg:order-1' : ''}`}>
                                <Reveal delayMs={200}>
                                    <div className="relative aspect-[4/3] w-full rounded-3xl overflow-hidden shadow-2xl group">
                                        <Image
                                            src={dept.image}
                                            alt={dept.title}
                                            fill
                                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                                    </div>
                                </Reveal>

                                <div className="bg-[#f8fafc] rounded-3xl p-6 sm:p-10 border border-gray-100">
                                    <div className="flex items-center justify-between mb-8 sm:mb-12">
                                        <h3 className="text-xl sm:text-2xl font-black text-[#202020]">
                                            Common Tests
                                        </h3>
                                        <ShieldCheckIcon className="w-8 h-8 text-[#307984] opacity-30" />
                                    </div>
                                    
                                    <div className="grid grid-cols-1 gap-8">
                                        {dept.commonTests.map((test, tIndex) => (
                                            <Reveal key={tIndex} delayMs={400 + (tIndex * 50)}>
                                                <div className="group flex items-start gap-5">
                                                    <div className="mt-1.5 flex-shrink-0 w-6 h-6 rounded-full bg-white border border-gray-200 flex items-center justify-center group-hover:bg-[#307984] group-hover:border-[#307984] transition-all shadow-sm">
                                                        <CheckCircleIcon className="w-4 h-4 text-[#307984] group-hover:text-white transition-colors" />
                                                    </div>
                                                    <div>
                                                        <h4 className="text-base font-bold text-gray-800 mb-2 group-hover:text-[#307984] transition-colors leading-tight">
                                                            {test.name}
                                                        </h4>
                                                        <p className="text-xs sm:text-sm text-gray-500 leading-relaxed font-medium max-w-lg">
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
                ))}
            </div>
        </section>
    );
}
