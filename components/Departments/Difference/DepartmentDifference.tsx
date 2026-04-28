'use client';

import Image from 'next/image';
import Reveal from '@/components/Animation/Reveal';
import { BeakerIcon, UserIcon, GlobeAltIcon } from '@heroicons/react/24/outline';

export default function DepartmentDifference() {
    return (
        <section className="py-10 bg-white">
            <div className="max-w-7xl mx-auto px-6 lg:px-12">
                <div className="flex flex-col lg:flex-row gap-8 items-stretch">
                    {/* Left Side: Image Column */}
                    <div 
                        className="w-full lg:w-1/2 rounded-[1.5rem] overflow-hidden shadow-2xl h-[400px] sm:h-[500px] lg:min-h-[600px] bg-center bg-cover bg-no-repeat"
                        style={{ backgroundImage: 'url("/departments/difference/orange-lab.png")' }}
                        role="img"
                        aria-label="Forte Laboratory Excellence"
                    />

                    {/* Right Side: Gray Content Box */}
                    <div className="w-full lg:w-1/2 bg-[#e9e9e9] rounded-[1.5rem] p-10 lg:p-16 relative overflow-hidden flex flex-col justify-center">
                        <div className="space-y-10">
                            <h2 className="text-xl font-black text-[#333] uppercase tracking-tight">
                                OUR DIFFERENCE
                            </h2>

                            <div className="space-y-10">
                                <Reveal delayMs={100}>
                                    <div className="flex gap-6">
                                        <div className="flex-shrink-0">
                                            <BeakerIcon className="w-8 h-8 text-black stroke-[1.5]" />
                                        </div>
                                        <div className="space-y-2">
                                            <h3 className="text-base font-bold text-black uppercase">Unparalleled clinical expertise</h3>
                                            <p className="text-gray-600 leading-relaxed text-sm">
                                                Forte Clinical Laboratories' collaborative team of experienced 
                                                laboratory experts drive test development and apply their 
                                                extensive knowledge to interpret complex results.
                                            </p>
                                        </div>
                                    </div>
                                </Reveal>

                                <Reveal delayMs={200}>
                                    <div className="flex gap-6">
                                        <div className="flex-shrink-0">
                                            <UserIcon className="w-8 h-8 text-black stroke-[1.5]" />
                                        </div>
                                        <div className="space-y-2">
                                            <h3 className="text-base font-bold text-black uppercase">Results you can rely on</h3>
                                            <p className="text-gray-600 leading-relaxed text-sm">
                                                Since our founding, Forte has supplied trustworthy answers to 
                                                complicated clinical questions. Our integration ensures a 
                                                robust test development pipeline for innovative diagnostics.
                                            </p>
                                        </div>
                                    </div>
                                </Reveal>

                                <Reveal delayMs={300}>
                                    <div className="flex gap-6">
                                        <div className="flex-shrink-0">
                                            <GlobeAltIcon className="w-8 h-8 text-black stroke-[1.5]" />
                                        </div>
                                        <div className="space-y-2">
                                            <h3 className="text-base font-bold text-black uppercase">Empowering caregivers</h3>
                                            <p className="text-gray-600 leading-relaxed text-sm">
                                                Our experts provide consultative services and on-demand 
                                                educational opportunities to help strengthen your practice, 
                                                advance clinical knowledge, and increase confidence in testing.
                                            </p>
                                        </div>
                                    </div>
                                </Reveal>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
