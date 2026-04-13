import Image from 'next/image';
import Link from 'next/link';
import Reveal from '@/components/Animation/Reveal';
import { urlFor } from '@/lib/sanity';
import type { SanityImageSource } from '@sanity/image-url';
import BookActionButton from '@/components/Booking/BookActionButton';

interface PackagesPreviewProps {
    packages: PackagePreviewItem[];
}

interface PackagePreviewItem {
    slug?: string;
    title?: string;
    description?: string;
    image?: SanityImageSource;
    testsTotal?: number;
    subTests?: { title: string; explanation?: string }[];
}

function parsePrice(title: string) {
    const match = title.match(/(?:—\s*)?(AED\s*\d+)/i);
    if (match) {
        return {
            cleanTitle: title.replace(match[0], '').trim(),
            price: match[1],
        };
    }
    return { cleanTitle: title, price: null };
}

export default function PackagesPreview({ packages }: PackagesPreviewProps) {
    const topPackages = (packages || []).slice(0, 5);

    if (topPackages.length === 0) {
        return null;
    }

    return (
        <section className="bg-gradient-to-br from-[#307984] to-[#42AFBF] py-14 md:py-18 border-b border-[#ffffff33]">
            <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-12 xl:px-20">
                <Reveal delayMs={80}>
                    <div className="flex items-end justify-between gap-4 mb-8 md:mb-10">
                        <div>
                            <span className="text-white/80 font-semibold text-[10px] sm:text-xs tracking-wider mb-2 block">
                                MAIN PACKAGES
                            </span>
                            <h2 className="text-2xl md:text-3xl font-black text-white">
                                Popular Health Packages
                            </h2>
                        </div>
                        <Link
                            href="/packages"
                            className="hidden sm:inline-flex items-center rounded-full border border-white/40 px-5 py-2 text-xs font-black uppercase tracking-wider text-white hover:bg-white hover:text-[#307984] transition-colors"
                        >
                            See All Packages
                        </Link>
                    </div>
                </Reveal>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                    {topPackages.map((pkg, index) => {
                        const { cleanTitle, price } = parsePrice(pkg.title || '');
                        return (
                            <Reveal key={pkg.slug || index} delayMs={130 + index * 70}>
                                <article className="group rounded-3xl overflow-hidden border border-gray-100 shadow-[0_8px_25px_rgba(17,24,39,0.06)] bg-white">
                                    <div className="relative h-36">
                                        {pkg.image ? (
                                            <Image
                                                src={urlFor(pkg.image).url()}
                                                alt={cleanTitle}
                                                fill
                                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                                            />
                                        ) : (
                                            <div className="absolute inset-0 bg-gradient-to-br from-[#307984]/20 to-[#f88c29]/30" />
                                        )}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/45 to-transparent" />
                                        {price && (
                                            <span className="absolute top-3 right-3 rounded-full bg-white/95 px-3 py-1 text-[10px] font-black text-[#307984]">
                                                {price}
                                            </span>
                                        )}
                                    </div>
                                    <div className="p-4">
                                        <h3 className="text-sm font-black text-[#1f2937] line-clamp-2 min-h-[2.5rem]">
                                            {cleanTitle}
                                        </h3>
                                        <p className="text-[11px] text-gray-500 mt-2 line-clamp-2 min-h-[2rem]">
                                            {pkg.description}
                                        </p>
                                        <div className="mt-4 flex items-center justify-between gap-2">
                                            <span className="text-[10px] uppercase tracking-wider font-bold text-gray-400">
                                                {pkg.testsTotal || pkg.subTests?.length || 0} tests
                                            </span>
                                            <BookActionButton
                                                label="Book"
                                                whatsappText={`Hi, I would like to book the ${cleanTitle} package.`}
                                                className="rounded-full bg-[#307984] px-3 py-1.5 text-[10px] font-black text-white hover:bg-[#256069] transition-colors"
                                            />
                                        </div>
                                    </div>
                                </article>
                            </Reveal>
                        );
                    })}
                </div>

                <div className="sm:hidden mt-6">
                    <Link
                        href="/packages"
                        className="inline-flex items-center rounded-full border border-white/40 px-5 py-2 text-xs font-black uppercase tracking-wider text-white hover:bg-white hover:text-[#307984] transition-colors"
                    >
                        See All Packages
                    </Link>
                </div>
            </div>
        </section>
    );
}
