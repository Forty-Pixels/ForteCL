'use client';

import Image from 'next/image';
import Link from 'next/link';
import Reveal from '@/components/Animation/Reveal';
import { Department } from '@/constants/departments';
import { 
    CheckCircleIcon, 
    BeakerIcon, 
    ShieldCheckIcon, 
    InformationCircleIcon
} from '@heroicons/react/24/outline';

import Navbar from '@/components/Navbar/Navbar';

const TEST_LIMIT = 18;

const normalizeTestName = (value: string) =>
    value
        .toLowerCase()
        .replace(/\([^)]*\)/g, ' ')
        .replace(/[^a-z0-9]+/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();

const toTokenSet = (value: string) => new Set(value.split(' ').filter(Boolean));

const abbreviationMap: Record<string, string> = {
    cbc: 'complete blood count',
    pbs: 'peripheral blood smear',
    esr: 'erythrocyte sedimentation rate',
    hb: 'hemoglobin',
    crp: 'c reactive protein',
    ana: 'antinuclear antibody',
    rf: 'rheumatoid factor',
    ast: 'antibiotic sensitivity test',
    afb: 'acid fast bacilli',
    fnac: 'fine needle aspiration cytology',
    pcr: 'polymerase chain reaction',
};

const getNameVariants = (value: string) => {
    const normalized = normalizeTestName(value);
    const variants = new Set<string>([normalized]);

    Object.entries(abbreviationMap).forEach(([short, expanded]) => {
        const shortPattern = new RegExp(`\\b${short}\\b`, 'g');
        if (shortPattern.test(normalized)) {
            variants.add(normalized.replace(shortPattern, expanded).trim());
        }
    });

    return Array.from(variants).filter(Boolean);
};

type CmsTestIndexItem = {
    slug: string;
    normalizedName: string;
    tokens: Set<string>;
};

const resolveSlugByName = (
    testName: string,
    testIndex: CmsTestIndexItem[]
) => {
    const variants = getNameVariants(testName);
    if (variants.length === 0) return null;

    for (const variant of variants) {
        const exact = testIndex.find((item) => item.normalizedName === variant);
        if (exact) return exact.slug;
    }

    for (const variant of variants) {
        const variantFlat = variant.replace(/\s+/g, '');
        const includes = testIndex.find((item) => {
            const candidateFlat = item.normalizedName.replace(/\s+/g, '');
            return (
                item.normalizedName.includes(variant) ||
                variant.includes(item.normalizedName) ||
                candidateFlat === variantFlat
            );
        });
        if (includes) return includes.slug;
    }

    let bestMatch: { slug: string; score: number } | null = null;
    for (const variant of variants) {
        const variantTokens = toTokenSet(variant);
        if (variantTokens.size === 0) continue;
        for (const candidate of testIndex) {
            let common = 0;
            for (const token of variantTokens) {
                if (candidate.tokens.has(token)) common += 1;
            }

            const score = common / Math.max(variantTokens.size, candidate.tokens.size);
            if (common >= 2 && score >= 0.5) {
                if (!bestMatch || score > bestMatch.score) {
                    bestMatch = { slug: candidate.slug, score };
                }
            }
        }
    }

    if (!bestMatch) return null;
    return bestMatch.slug;
};

interface DepartmentDetailViewProps {
    department: Department;
    cmsTests?: {
        slug: string;
        name: string;
        tat?: string;
        sampleType?: string[];
    }[];
    allCmsTests?: {
        name: string;
        slug: string;
    }[];
}

export default function DepartmentDetailView({
    department,
    cmsTests = [],
    allCmsTests = [],
}: DepartmentDetailViewProps) {
    const cmsTestIndex = allCmsTests.map((test) => ({
        slug: test.slug,
        normalizedName: normalizeTestName(test.name),
        tokens: toTokenSet(normalizeTestName(test.name)),
    }));

    const cmsDerivedTests = cmsTests.map((test) => ({
        name: test.name,
        description: [
            test.tat ? `TAT: ${test.tat}` : null,
            test.sampleType?.length ? `Sample: ${test.sampleType.join(', ')}` : null,
        ]
            .filter(Boolean)
            .join(' • ') || 'Comprehensive diagnostics performed by our department specialists.',
        slug: test.slug || resolveSlugByName(test.name, cmsTestIndex),
    }));

    const fallbackDepartmentTests = department.commonTests.map((test) => ({
        name: test.name,
        description: test.description,
        slug: resolveSlugByName(test.name, cmsTestIndex),
    }));

    const merged = [...cmsDerivedTests, ...fallbackDepartmentTests];
    const seenNames = new Set<string>();
    const standardTests = merged
        .filter((test) => {
            const key = normalizeTestName(test.name);
            if (!key || seenNames.has(key)) return false;
            seenNames.add(key);
            return true;
        })
        .slice(0, TEST_LIMIT);

    return (
        <section className="bg-white min-h-screen pb-24 pt-20 sm:pt-24 lg:pt-28">
            <Navbar currentPage="Departments" />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="py-4 lg:py-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start relative">
                        
                        {/* Content Side - STICKY (Restored Original Layout) */}
                        <div className="lg:sticky lg:top-[120px] self-start h-fit">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-11 h-11 rounded-2xl bg-[#f88c29]/10 flex items-center justify-center text-[#f88c29]">
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
                                    <h3 className="text-[13px] font-black text-[#f88c29] mb-4 flex items-center gap-3 uppercase tracking-wider">
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
                                        className="px-4 py-2 rounded-full bg-white text-[#307984] text-[10px] font-black border border-gray-100 shadow-sm transition-all hover:bg-[#f88c29] hover:text-white hover:border-[#f88c29]"
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
                                                <tr className="bg-[#f88c29]">
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
                                        Standard Procedures & Tests
                                    </h3>
                                    <ShieldCheckIcon className="w-8 h-8 text-[#f88c29] opacity-20" />
                                </div>
                                
                                <div className="grid grid-cols-1 gap-6">
                                    {standardTests.map((test, tIndex) => (
                                        <Reveal key={tIndex} delayMs={500 + (tIndex * 50)}>
                                            <div className="group flex items-start gap-4 justify-between">
                                                <div className="mt-1 flex-shrink-0 w-7 h-7 rounded-xl bg-white border border-gray-200 flex items-center justify-center group-hover:bg-[#f88c29] group-hover:border-[#f88c29] transition-all shadow-sm">
                                                    <CheckCircleIcon className="w-4 h-4 text-[#f88c29] group-hover:text-white transition-colors" />
                                                </div>
                                                <div className="flex-1">
                                                    {test.slug ? (
                                                        <Link
                                                            href={`/lab-tests/${test.slug}`}
                                                            className="text-sm font-black text-gray-800 mb-1 group-hover:text-[#f88c29] transition-colors leading-tight inline-block"
                                                        >
                                                            {test.name}
                                                        </Link>
                                                    ) : (
                                                        <h4 className="text-sm font-black text-gray-800 mb-1 group-hover:text-[#f88c29] transition-colors leading-tight">
                                                            {test.name}
                                                        </h4>
                                                    )}
                                                    <p className="text-[11px] text-gray-500 leading-relaxed font-bold max-w-lg">
                                                        {test.description}
                                                    </p>
                                                </div>
                                                {test.slug && (
                                                    <Link
                                                        href={`/lab-tests/${test.slug}`}
                                                        className="shrink-0 inline-flex items-center rounded-full border border-[#f88c29]/20 bg-white px-3 py-1.5 text-[10px] font-black uppercase tracking-wider text-[#f88c29] hover:bg-[#f88c29] hover:text-white transition-colors"
                                                    >
                                                        View Details
                                                    </Link>
                                                )}
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
