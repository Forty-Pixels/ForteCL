'use client';

import { useState, Fragment } from 'react';
import Image from 'next/image';
import { urlFor } from '@/lib/sanity';
import Reveal from '@/components/Animation/Reveal';
import { Dialog, Transition, TransitionChild, DialogPanel, DialogTitle } from '@headlessui/react';
import { motion, AnimatePresence } from 'framer-motion';

interface PackagesListProps {
    initialPackages: any[];
}

export default function PackagesList({ initialPackages }: PackagesListProps) {
    const [selectedPackage, setSelectedPackage] = useState<any>(null);

    const packages = initialPackages || [];

    // Helper to parse price from title
    const parsePrice = (title: string) => {
        const match = title.match(/(?:—\s*)?(AED\s*\d+)/i);
        if (match) {
            return {
                cleanTitle: title.replace(match[0], '').trim(),
                price: match[1]
            };
        }
        return { cleanTitle: title, price: null };
    };

    return (
        <section className="py-20 bg-[#fcfcfc] overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <Reveal delayMs={100}>
                        <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1F2937] mb-4">
                            Premium Health Packages
                        </h2>
                    </Reveal>
                    <Reveal delayMs={200}>
                        <p className="text-gray-500 max-w-2xl mx-auto text-sm sm:text-base">
                            Comprehensive diagnostic screens designed for your peace of mind, 
                            tailored to different health needs and age groups.
                        </p>
                    </Reveal>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                    {packages.map((pkg, index) => {
                        const { cleanTitle, price } = parsePrice(pkg.title);

                        return (
                            <Reveal key={pkg.id} delayMs={index * 100} className="h-full">
                                <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-500 flex flex-col h-full group">
                                    {/* Image Section */}
                                    <div className="relative h-44 sm:h-52 overflow-hidden">
                                        {pkg.image ? (
                                            <Image
                                                src={urlFor(pkg.image).url()}
                                                alt={pkg.title}
                                                fill
                                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                                            />
                                        ) : (
                                            <div className="w-full h-full bg-gray-50 flex items-center justify-center text-gray-300">
                                                No Image Available
                                            </div>
                                        )}
                                        {/* Gradient Overlay for soft transition */}
                                        <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-white via-white/40 to-transparent shadow-[inset_0_-30px_30px_-30px_rgba(255,255,255,1)]"></div>
                                    </div>

                                    {/* Content Section */}
                                    <div className="px-6 pb-6 flex-grow flex flex-col items-center text-center -mt-6 relative z-10">
                                        <h3 className="text-lg sm:text-xl font-bold text-[#1F2937] mb-1.5 leading-tight">
                                            {cleanTitle}
                                        </h3>
                                        
                                        {price && (
                                            <div className="mb-3">
                                                <span className="text-[#307984] text-xl font-black tracking-tight">{price}</span>
                                            </div>
                                        )}

                                        <p className="text-gray-500 text-xs sm:text-sm mb-5 leading-relaxed italic opacity-85 line-clamp-3">
                                            {pkg.description}
                                        </p>

                                        <div className="mt-auto w-full flex flex-col items-center gap-4">
                                            {/* WhatsApp CTA */}
                                            <a
                                                href={`https://wa.me/97142729302?text=Hi, I would like to book the ${cleanTitle}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="bg-[#307984] hover:bg-[#1f5a63] text-white px-8 py-3 rounded-full text-sm font-bold transition-all shadow-md hover:shadow-lg hover:-translate-y-1 block w-full sm:w-auto min-w-[180px]"
                                            >
                                                Book Now
                                            </a>

                                            {/* Tests Included Toggle - NOW OPENS MODAL */}
                                            <button
                                                onClick={() => setSelectedPackage(pkg)}
                                                className="text-[#307984] group/btn font-bold text-sm flex items-center gap-2 hover:opacity-80 transition-all"
                                            >
                                                <span className="text-lg transition-transform group-hover/btn:scale-125">+</span>
                                                <span className="border-b border-transparent group-hover/btn:border-[#307984]">Tests Included ({pkg.testsTotal || pkg.subTests?.length || 0})</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </Reveal>
                        );
                    })}
                </div>
            </div>

            {/* TEST DETAILS MODAL */}
            <AnimatePresence>
                {selectedPackage && (
                <Transition show={!!selectedPackage} as={Fragment}>
                    <Dialog as="div" className="relative z-[200]" onClose={() => setSelectedPackage(null)}>
                        <TransitionChild
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" />
                        </TransitionChild>

                        <div className="fixed inset-0 overflow-y-auto">
                            <div className="flex min-h-full items-center justify-center p-4 text-center">
                                <TransitionChild
                                    as={Fragment}
                                    enter="ease-out duration-300"
                                    enterFrom="opacity-0 scale-95 translate-y-4"
                                    enterTo="opacity-100 scale-100 translate-y-0"
                                    leave="ease-in duration-200"
                                    leaveFrom="opacity-100 scale-100 translate-y-0"
                                    leaveTo="opacity-0 scale-95 translate-y-4"
                                >
                                    <DialogPanel className="w-full max-w-2xl transform overflow-hidden rounded-[2.5rem] bg-white p-8 text-left align-middle shadow-2xl transition-all">
                                        <div className="flex items-center justify-between mb-8">
                                            <div>
                                                <DialogTitle as="h3" className="text-2xl font-bold text-[#1F2937]">
                                                    {parsePrice(selectedPackage.title).cleanTitle}
                                                </DialogTitle>
                                                <div className="text-[#307984] font-bold mt-1">Included Tests ({selectedPackage.testsTotal || selectedPackage.subTests?.length || 0})</div>
                                            </div>
                                            <button
                                                onClick={() => setSelectedPackage(null)}
                                                className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:text-gray-600 transition-colors"
                                            >
                                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                                            </button>
                                        </div>

                                        <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
                                            {(selectedPackage.subTests || []).map((test: any, i: number) => (
                                                <motion.div 
                                                    initial={{ opacity: 0, x: -10 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{ delay: i * 0.05 }}
                                                    key={i} 
                                                    className="p-5 rounded-2xl bg-[#307984]/5 border border-[#307984]/10 group hover:bg-[#307984]/10 transition-colors"
                                                >
                                                    <div className="font-bold text-[#307984] mb-2">{test.title}</div>
                                                    {test.explanation && (
                                                        <p className="text-gray-500 text-sm leading-relaxed italic">
                                                            {test.explanation}
                                                        </p>
                                                    )}
                                                </motion.div>
                                            ))}
                                        </div>

                                        <div className="mt-10">
                                            <button
                                                onClick={() => setSelectedPackage(null)}
                                                className="w-full bg-[#307984] text-white py-4 rounded-full font-bold hover:bg-[#1f5a63] transition-colors"
                                            >
                                                Back to Packages
                                            </button>
                                        </div>
                                    </DialogPanel>
                                </TransitionChild>
                            </div>
                        </div>
                    </Dialog>
                </Transition>
                )}
            </AnimatePresence>

            <style dangerouslySetInnerHTML={{ __html: `
                .custom-scrollbar::-webkit-scrollbar {
                    width: 4px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: #30798440;
                    border-radius: 10px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: #30798480;
                }
            `}} />
        </section>
    );
}
