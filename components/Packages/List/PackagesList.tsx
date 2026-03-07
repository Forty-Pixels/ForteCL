'use client';

import { useState } from 'react';
import Image from 'next/image';

const packages = [
    {
        id: 'diabetes',
        title: "Diabetes Care Package — AED 89",
        description: "The Diabetes Care Package is designed to give you a complete picture of your blood sugar health — monitoring key markers to support early detection, ongoing management and long-term wellbeing.",
        image: "/Packages/list/diabetes.png",
        testsTotal: 13,
        subTests: [
            { title: "LDL", explanation: "Low-density lipoprotein cholesterol" },
            { title: "HbA1c", explanation: "3-month average blood glucose level" },
            { title: "FBS", explanation: "Fasting Blood Sugar" },
            { title: "HDL", explanation: "High-density lipoprotein cholesterol" },
            { title: "Triglycerides", explanation: "Blood fat levels" },
            { title: "TC", explanation: "Total Cholesterol" },
            { title: "Remaining Parameters", explanation: "7 additional parameters to be confirmed from Forte's LIS" }
        ]
    },
    {
        id: 'thyroid',
        title: "Thyroid Tests — AED 49",
        description: "A targeted panel to assess the health and function of your thyroid gland — one of the body's key regulators of metabolism, energy and hormone balance.",
        image: "/Packages/list/thyroid.png",
        testsTotal: 5,
        subTests: [
            { title: "TSH", explanation: "Thyroid Stimulating Hormone" },
            { title: "TT3", explanation: "Total Triiodothyronine" },
            { title: "TT4", explanation: "Total Thyroxine" },
            { title: "Remaining Parameters", explanation: "2 additional parameters to be confirmed from Forte's LIS" }
        ]
    },
    {
        id: 'cbc',
        title: "Complete Blood Count (CBC) — AED 88",
        description: "A comprehensive blood panel that measures the key components of your blood — giving a broad overview of your general health and helping flag conditions from anaemia to infection.",
        image: "/Packages/list/cbc.png",
        testsTotal: 20,
        subTests: [
            { title: "Full CBC Panel", explanation: "20 total parameters — full list to be confirmed from Forte's LIS" }
        ]
    },
    {
        id: 'lipid',
        title: "Lipid Profile — AED [TBC]",
        description: "A focused cardiovascular panel measuring cholesterol and fat levels in the blood to assess your risk of heart disease and related conditions.",
        image: "/Packages/list/lipid.png",
        testsTotal: 5,
        subTests: [
            { title: "Lipid Markers", explanation: "5 total parameters — full list to be confirmed from Forte's LIS" }
        ]
    },
    {
        id: 'liver',
        title: "Liver Tests — AED [TBC]",
        description: "A detailed panel evaluating liver function and health — essential for monitoring conditions such as hepatitis, fatty liver and cirrhosis.",
        image: "/Packages/list/liver.png",
        testsTotal: 9,
        subTests: [
            { title: "Liver Function Profile", explanation: "9 total parameters — full list to be confirmed from Forte's LIS" }
        ]
    },
    {
        id: 'kidney',
        title: "Kidney Tests — AED [TBC]",
        description: "A thorough renal panel assessing kidney performance and detecting early signs of damage or dysfunction before symptoms arise.",
        image: "/Packages/list/kidney.png",
        testsTotal: 11,
        subTests: [
            { title: "Renal Markers", explanation: "11 total parameters — full list to be confirmed from Forte's LIS" }
        ]
    },
    {
        id: 'fertility',
        title: "Fertility Female Package — AED [TBC]",
        description: "A hormonal screening panel designed to assess female reproductive health and fertility markers with precision and care.",
        image: "/Packages/list/fertility.png",
        testsTotal: 5,
        subTests: [
            { title: "Female Hormonal Profile", explanation: "5 total parameters — full list to be confirmed from Forte's LIS" }
        ]
    },
    {
        id: 'hormone',
        title: "Hormone Panel (Men) — AED [TBC]",
        description: "A targeted assessment of key male hormones to evaluate hormonal health, energy, and reproductive function.",
        image: "/Packages/list/hormone.png",
        subTests: [
            { title: "Male Hormonal Assay", explanation: "Full list to be confirmed from Forte's LIS" }
        ]
    },
    {
        id: 'electrolytes',
        title: "Electrolytes Panel — AED [TBC]",
        description: "Measures the essential minerals that regulate fluid balance, nerve function and muscle activity in the body.",
        image: "/Packages/list/electrolytes.png",
        testsTotal: 3,
        subTests: [
            { title: "Electrolyte Balance", explanation: "3 total parameters — full list to be confirmed from Forte's LIS" }
        ]
    },
    {
        id: 'mineral',
        title: "Mineral Panel — AED 120",
        description: "A comprehensive assessment of key minerals critical to bone health, immune function and metabolic processes.",
        image: "/Packages/list/minerals.png",
        testsTotal: 5,
        subTests: [
            { title: "Essential Mineral Screen", explanation: "5 total parameters — full list to be confirmed from Forte's LIS" }
        ]
    },
    {
        id: 'hiv',
        title: "HIV Test — AED [TBC]",
        description: "Confidential, accurate HIV screening conducted with the latest generation testing technology.",
        image: "/Packages/list/hiv_screen.png",
        testsTotal: 3,
        subTests: [
            { title: "HIV Screening", explanation: "3 total tests — full list to be confirmed from Forte's LIS" }
        ]
    },
    {
        id: 'vitaminb12',
        title: "Vitamin B12 — AED [TBC]",
        description: "Measures your Vitamin B12 levels to identify deficiency — a common cause of fatigue, nerve issues and anaemia.",
        image: "/Packages/list/vitaminb12.png",
        subTests: [
            { title: "Vitamin B12 Analysis", explanation: "Full list to be confirmed from Forte's LIS" }
        ]
    }
];

export default function PackagesList() {
    const [openTests, setOpenTests] = useState<{ [key: string]: number | null }>({
        diabetes: 0,
    });

    const toggleTest = (pkgId: string, index: number) => {
        setOpenTests(prev => ({
            ...prev,
            [pkgId]: prev[pkgId] === index ? null : index
        }));
    };

    return (
        <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4">
                <h2 className="text-3xl sm:text-4xl font-bold text-center mb-16 text-[#1F2937]">Our Packages</h2>

                <div className="space-y-32">
                    {packages.map((pkg, index) => (
                        <div
                            key={pkg.id}
                            className={`flex flex-col lg:flex-row items-start gap-12 lg:gap-20 ${index % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}
                        >
                            {/* Image Container - STICKY on Desktop */}
                            <div className="w-full lg:w-5/12 lg:sticky lg:top-32 h-fit">
                                <div className="relative aspect-[4/3] rounded-t-[18px] rounded-bl-[16px] overflow-hidden shadow-2xl">
                                    <Image
                                        src={pkg.image}
                                        alt={pkg.title}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                            </div>

                            {/* Content Container */}
                            <div className="w-full lg:w-7/12">
                                <h3 className="text-2xl sm:text-3xl font-bold text-[#3B82F6] mb-4">
                                    {pkg.title}
                                </h3>
                                <p className="text-gray-600 text-lg mb-10 leading-relaxed">
                                    {pkg.description}
                                </p>

                                {/* Accordion List */}
                                <div className="mt-8 border-t border-gray-100 pt-8">
                                    <h4 className="text-xl font-bold text-[#1F2937] mb-8 uppercase tracking-wide text-sm opacity-60">
                                        Tests — accordion ({pkg.testsTotal || ''} total)
                                    </h4>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-1">
                                        {pkg.subTests.map((subTest, testIndex) => (
                                            <div key={testIndex} className="border-b border-gray-100 last:border-0 md:last:border-b py-3">
                                                <button
                                                    onClick={() => toggleTest(pkg.id, testIndex)}
                                                    className="w-full flex items-center text-left transition-colors group"
                                                >
                                                    <span className={`font-medium text-xl mr-3 shrink-0 transition-colors text-[#2DD4BF]`}>
                                                        {openTests[pkg.id] === testIndex ? '−' : '+'}
                                                    </span>
                                                    <span className="text-[#2DD4BF] text-base sm:text-lg font-medium group-hover:text-teal-500 transition-colors">
                                                        {subTest.title}
                                                    </span>
                                                </button>

                                                {openTests[pkg.id] === testIndex && (
                                                    <div className="mt-3 pl-8 pr-4 animate-in fade-in slide-in-from-top-2 duration-300">
                                                        <p className="text-gray-600 text-sm sm:text-base leading-relaxed italic">
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
