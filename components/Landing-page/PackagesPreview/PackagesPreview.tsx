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
        <section className="bg-[#0a0a0a] py-8 md:py-12 overflow-hidden">
            <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
                <Reveal delayMs={80}>
                    <div className="flex flex-col md:flex-row items-center md:items-end justify-between gap-4 mb-6 md:mb-10 text-center md:text-left">
                        <div>
                            <span className="text-[#f88c29] font-bold text-[11px] sm:text-xs tracking-[0.3em] mb-1.5 uppercase block">
                                MAIN PACKAGES
                            </span>
                            <h2 className="text-2xl md:text-3xl lg:text-4xl font-black text-white leading-tight">
                                Popular Health <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#f88c29] to-[#d35400]">Packages</span>
                            </h2>
                        </div>
                        <Link
                            href="/packages"
                            className="inline-flex items-center rounded-full border border-white/20 px-6 py-2.5 text-[10px] font-black uppercase tracking-widest text-white hover:bg-white hover:text-black transition-all duration-300"
                        >
                            See All Packages
                        </Link>
                    </div>
                </Reveal>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2 lg:gap-3">
                    {topPackages.map((pkg, index) => {
                        const { cleanTitle, price } = parsePrice(pkg.title || '');
                        return (
                            <Reveal key={pkg.slug || index} delayMs={130 + index * 100}>
                                <article className="group relative flex flex-col items-center text-center px-4 py-8 rounded-[60px] border border-white/10 bg-gradient-to-b from-white/[0.08] to-transparent hover:border-[#f88c29]/50 transition-all duration-500 overflow-hidden min-h-[380px]">
                                    {/* Link Overlay - covers everything except what's above it */}
                                    <Link href="/packages" className="absolute inset-0 z-20" aria-label={`View ${cleanTitle} package`} />
                                    
                                    {/* Glassmorphic Background Effect */}
                                    <div className="absolute inset-0 bg-white/[0.01] backdrop-blur-3xl -z-10" />
                                   
                                    {/* Top Image Circle */}
                                    <div className="relative z-10 w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden border-2 border-white/20 group-hover:border-[#f88c29] transition-colors duration-500 mb-4">
                                        {pkg.image ? (
                                            <Image
                                                src={urlFor(pkg.image).url()}
                                                alt={cleanTitle}
                                                fill
                                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                                            />
                                        ) : (
                                            <div className="absolute inset-0 bg-gradient-to-br from-[#f88c29] to-[#d35400]" />
                                        )}
                                    </div>

                                    {/* Content */}
                                    <div className="relative z-10 flex-1 flex flex-col items-center">
                                        {price && (
                                            <div className="mb-2 text-[#f88c29] font-black text-[13px] tracking-tighter">
                                                {price}
                                            </div>
                                        )}
                                        <h3 className="text-sm md:text-base font-black text-white mb-2 leading-snug lg:h-11 line-clamp-2">
                                            {cleanTitle}
                                        </h3>
                                        <p className="text-[11px] text-gray-300 leading-relaxed line-clamp-3 mb-4 font-medium">
                                            {pkg.description}
                                        </p>
                                    </div>

                                    {/* Footer Actions */}
                                    <div className="relative z-10 mt-auto w-full flex flex-col items-center gap-2">
                                        <div className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#307984]">
                                            {pkg.testsTotal || pkg.subTests?.length || 0} Parameters
                                        </div>
                                        <div className="relative z-30 w-full">
                                            <BookActionButton
                                                label="BOOK NOW"
                                                whatsappText={`Hi, I would like to book the ${cleanTitle} package.`}
                                                className="w-full rounded-full bg-white px-4 py-2.5 text-[10px] font-bold text-black hover:bg-[#f88c29] hover:text-white transition-all duration-300"
                                            />
                                        </div>
                                    </div>

                                    {/* Hover Aurora Effect */}
                                    <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-[#f88c29]/10 rounded-full blur-[80px] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                                </article>
                            </Reveal>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
