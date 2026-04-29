'use client';

import Image from 'next/image';
import Reveal from '@/components/Animation/Reveal';
import { BeakerIcon, UserIcon, GlobeAltIcon } from '@heroicons/react/24/outline';

interface DifferenceItem {
    title: string;
    description: string;
    icon?: any;
}

interface DepartmentDifferenceProps {
    title?: string;
    image?: string;
    items?: DifferenceItem[];
}

const DEFAULT_ITEMS: DifferenceItem[] = [
    {
        title: "Unparalleled clinical expertise",
        description: "Forte Clinical Laboratories' collaborative team of experienced laboratory experts drive test development and apply their extensive knowledge to interpret complex results.",
        icon: BeakerIcon
    },
    {
        title: "Results you can rely on",
        description: "Since our founding, Forte has supplied trustworthy answers to complicated clinical questions. Our integration ensures a robust test development pipeline for innovative diagnostics.",
        icon: UserIcon
    },
    {
        title: "Empowering caregivers",
        description: "Our experts provide consultative services and on-demand educational opportunities to help strengthen your practice, advance clinical knowledge, and increase confidence in testing.",
        icon: GlobeAltIcon
    }
];

export default function DepartmentDifference({ 
    title = "OUR DIFFERENCE",
    image = "/departments/difference/orange-lab.png",
    items = DEFAULT_ITEMS
}: DepartmentDifferenceProps) {
    return (
        <section className="py-10 bg-white">
            <div className="max-w-7xl mx-auto px-6 lg:px-12">
                <div className="flex flex-col lg:flex-row gap-8 items-stretch">
                    {/* Left Side: Image Column */}
                    <div 
                        className="w-full lg:w-1/2 rounded-[1.5rem] overflow-hidden shadow-2xl h-[400px] sm:h-[500px] lg:h-auto bg-center bg-cover bg-no-repeat"
                        style={{ backgroundImage: `url("${image}")` }}
                        role="img"
                        aria-label="Forte Laboratory Excellence"
                    />

                    {/* Right Side: Gray Content Box */}
                    <div className="w-full lg:w-1/2 bg-[#e9e9e9] rounded-[1.5rem] p-10 lg:p-16 relative overflow-hidden flex flex-col justify-center">
                        <div className="space-y-10">
                            <h2 className="text-xl font-black text-[#333] uppercase tracking-tight">
                                {title}
                            </h2>

                            <div className="space-y-10">
                                {items.map((item, idx) => {
                                    const Icon = item.icon || BeakerIcon;
                                    return (
                                        <Reveal key={idx} delayMs={(idx + 1) * 100}>
                                            <div className="flex gap-6">
                                                <div className="flex-shrink-0">
                                                    <Icon className="w-8 h-8 text-black stroke-[1.5]" />
                                                </div>
                                                <div className="space-y-2">
                                                    <h3 className="text-base font-bold text-black uppercase">{item.title}</h3>
                                                    <p className="text-gray-600 leading-relaxed text-sm">
                                                        {item.description}
                                                    </p>
                                                </div>
                                            </div>
                                        </Reveal>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
