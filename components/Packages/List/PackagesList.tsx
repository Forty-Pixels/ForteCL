'use client';

import { useState } from 'react';
import Image from 'next/image';
import { urlFor } from '@/lib/sanity';

interface PackagesListProps {
    initialPackages: any[];
}

export default function PackagesList({ initialPackages }: PackagesListProps) {
    const [openTests, setOpenTests] = useState<{ [key: string]: number | null }>({
        diabetes: 0,
    });

    const toggleTest = (pkgId: string, index: number) => {
        setOpenTests(prev => ({
            ...prev,
            [pkgId]: prev[pkgId] === index ? null : index
        }));
    };

    const packages = initialPackages || [];

    return (
        <section className="py-16 bg-white">
            <div className="max-w-7xl mx-auto px-4">
                <h2 className="text-2xl sm:text-3xl font-bold text-center mb-12 text-[#1F2937]">Our Health Packages</h2>

                <div className="space-y-24">
                    {packages.map((pkg, index) => (
                        <div
                            key={pkg.id}
                            className={`flex flex-col lg:flex-row items-start gap-8 lg:gap-16 ${index % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}
                        >
                            {/* Image Container */}
                            <div className="w-full lg:w-5/12 lg:sticky lg:top-32 h-fit">
                                <div className="relative aspect-[4/3] rounded-t-[18px] rounded-bl-[16px] overflow-hidden shadow-2xl">
                                    {pkg.image ? (
                                        <Image
                                            src={urlFor(pkg.image).url()}
                                            alt={pkg.title}
                                            fill
                                            className="object-cover"
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-400">
                                            No Image
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Content Container */}
                            <div className="w-full lg:w-7/12">
                                <h3 className="text-xl sm:text-2xl font-bold text-[#3B82F6] mb-3">
                                    {pkg.title}
                                </h3>
                                
                                <p className="text-gray-600 text-base mb-8 leading-relaxed">
                                    {pkg.description}
                                </p>

                                {/* Accordion List */}
                                <div className="mt-6 border-t border-gray-100 pt-6">
                                    <h4 className="text-lg font-bold text-[#1F2937] mb-6 uppercase tracking-wide text-xs opacity-60">
                                        Tests ({pkg.testsTotal || 0})
                                    </h4>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-1">
                                        {(pkg.subTests || []).map((subTest: any, testIndex: number) => (
                                            <div key={testIndex} className="border-b border-gray-100 last:border-0 md:last:border-b py-2">
                                                <button
                                                    onClick={() => toggleTest(pkg.id, testIndex)}
                                                    className="w-full flex items-center text-left transition-colors group"
                                                >
                                                    <span className={`font-medium text-lg mr-3 shrink-0 transition-colors text-[#307984]`}>
                                                        {openTests[pkg.id] === testIndex ? '−' : '+'}
                                                    </span>
                                                    <span className="text-[#307984] text-sm sm:text-base font-medium group-hover:text-[#307984]/80 transition-colors">
                                                        {subTest.title}
                                                    </span>
                                                </button>

                                                {openTests[pkg.id] === testIndex && (
                                                    <div className="mt-2 pl-8 pr-4 animate-in fade-in slide-in-from-top-2 duration-300">
                                                        <p className="text-gray-600 text-xs sm:text-sm leading-relaxed italic">
                                                            {subTest.explanation}
                                                        </p>
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>

                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
