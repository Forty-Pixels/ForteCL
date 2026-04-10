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
        <section className="py-8 bg-[#fcfcfc] overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-8">
                    <Reveal delayMs={100}>
                        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1F2937] mb-2">
                            Premium Health Packages
                        </h2>
                    </Reveal>
                    <Reveal delayMs={200}>
                        <p className="text-gray-500 max-w-2xl mx-auto text-[11px] sm:text-xs">
                            Tailored diagnostic screens for your complete peace of mind.
                        </p>
                    </Reveal>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-5">
                    {packages.map((pkg, index) => {
                        const { cleanTitle, price } = parsePrice(pkg.title);

                        return (
                            <Reveal key={pkg.id} delayMs={index * 100} className="h-full">
                                <div className="group bg-white rounded-[1.8rem] overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.02)] border border-gray-100 hover:shadow-[0_15px_45px_rgba(48,121,132,0.08)] transition-all duration-500 flex flex-col h-full">
                                    {/* Image Section */}
                                    <div className="relative h-32 overflow-hidden">
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
                                        {/* Fade Effect */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-white via-white/10 to-transparent"></div>
                                    </div>

                                    {/* Content Section */}
                                    <div className="px-3 pb-3.5 flex-grow flex flex-col items-center text-center -mt-2 relative z-10">
                                        <h3 className="text-[13px] sm:text-[14px] font-bold text-[#1F2937] leading-tight line-clamp-1 group-hover:text-[#307984] transition-colors mb-0.5">
                                            {cleanTitle}
                                        </h3>
                                        
                                        {price && (
                                            <div className="mb-1">
                                                <span className="text-[#307984] text-sm font-black tracking-tight">{price}</span>
                                            </div>
                                        )}

                                        <p className="text-gray-400 text-[10px] mb-2.5 leading-tight line-clamp-1 px-1">
                                            {pkg.description}
                                        </p>

                                        <div className="mt-auto w-full space-y-2">
                                            {/* WhatsApp CTA */}
                                            <a
                                                href={`https://wa.me/97142729302?text=Hi, I would like to book the ${cleanTitle}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="bg-[#307984] hover:bg-[#256069] text-white py-2 rounded-full text-[10px] font-bold transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 flex items-center justify-center w-full"
                                            >
                                                Book Now
                                            </a>

                                            {/* Tests Included Toggle */}
                                            <button
                                                onClick={() => setSelectedPackage(pkg)}
                                                className="text-[#307984] group/btn font-bold text-[9px] flex items-center justify-center gap-1 hover:opacity-80 transition-all w-full"
                                            >
                                                <span className="text-xs transition-transform group-hover/btn:rotate-90">+</span>
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
                                    <DialogPanel className="w-full max-w-3xl transform overflow-hidden rounded-[2rem] bg-white p-6 sm:p-8 text-left align-middle shadow-[0_25px_70px_rgba(0,0,0,0.15)] transition-all border border-gray-100">
                                        <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-50">
                                            <div>
                                                <DialogTitle as="h3" className="text-xl sm:text-2xl font-black text-[#1F2937] tracking-tight">
                                                    {parsePrice(selectedPackage.title).cleanTitle}
                                                </DialogTitle>
                                                <div className="flex items-center gap-2 mt-1">
                                                    <span className="px-2.5 py-0.5 rounded-full bg-[#307984]/10 text-[#307984] text-[10px] font-bold uppercase tracking-wider">
                                                        {selectedPackage.testsTotal || selectedPackage.subTests?.length || 0} Included Tests
                                                    </span>
                                                </div>
                                            </div>
                                            <button
                                                onClick={() => setSelectedPackage(null)}
                                                className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:text-[#f88c29] hover:bg-[#f88c29]/5 transition-all"
                                            >
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" /></svg>
                                            </button>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto pr-2 custom-scrollbar">
                                            {(selectedPackage.subTests || []).map((test: any, i: number) => (
                                                <motion.div 
                                                    initial={{ opacity: 0, y: 10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    transition={{ delay: i * 0.03 }}
                                                    key={i} 
                                                    className="p-3.5 rounded-xl bg-gray-50/50 border-l-4 border-[#307984]/20 hover:border-[#307984] hover:bg-white hover:shadow-sm transition-all group/item"
                                                >
                                                    <div className="font-bold text-[#307984] text-[13px] group-hover/item:text-[#307984] mb-1 transition-colors">{test.title}</div>
                                                    {test.explanation && (
                                                        <p className="text-gray-400 text-[11px] leading-snug line-clamp-2">
                                                            {test.explanation}
                                                        </p>
                                                    )}
                                                </motion.div>
                                            ))}
                                        </div>

                                        <div className="mt-8 flex gap-3">
                                            <a
                                                href={`https://wa.me/97142729302?text=Hi, I would like to book the ${parsePrice(selectedPackage.title).cleanTitle}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex-1 bg-[#307984] text-white py-3.5 rounded-full text-sm font-bold hover:bg-[#256069] transition-all text-center shadow-lg shadow-[#307984]/10"
                                            >
                                                Book This Package
                                            </a>
                                            <button
                                                onClick={() => setSelectedPackage(null)}
                                                className="px-8 bg-gray-100 text-[#1F2937] py-3.5 rounded-full text-sm font-bold hover:bg-gray-200 transition-all"
                                            >
                                                Close
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
