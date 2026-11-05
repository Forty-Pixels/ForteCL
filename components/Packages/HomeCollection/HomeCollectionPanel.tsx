import Image from 'next/image';
import Link from 'next/link';
import type { SanityImageSource } from '@sanity/image-url';
import { urlFor } from '@/lib/sanity';
import { getPackagePricing } from '@/lib/package-details';
import Reveal from '@/components/Animation/Reveal';
import BookActionButton from '@/components/Booking/BookActionButton';

export interface HomeCollectionListItem {
    title: string;
    slug: string;
    amount?: number | null;
    image?: SanityImageSource;
}

const Arrow = ({ className = 'h-4 w-4' }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m-6-6l6 6-6 6" />
    </svg>
);

const chips = [
    { label: 'Slots confirmed', d: 'M12 6v6l4 2m6-2a10 10 0 11-20 0 10 10 0 0120 0z' },
    { label: 'Digital results', d: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' },
    { label: 'Confirm payment', d: 'M3 10h18M5 5h14a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2z' },
];

/** General "collected at home" panel. The right-hand list is every package with home collection enabled in Sanity. */
export default function HomeCollectionPanel({ packages, currentSlug, allPackagesHref = '/packages' }: { packages: HomeCollectionListItem[]; currentSlug?: string; allPackagesHref?: string }) {
    if (!packages.length) return null;

    const prices = packages.map(p => p.amount).filter((n): n is number => typeof n === 'number' && n > 0);
    const minPrice = prices.length ? Math.min(...prices) : null;
    const withImage = packages.find(p => p.image);
    const imageUrl = withImage?.image ? urlFor(withImage.image).width(800).url() : null;

    return (
        <section aria-labelledby="home-collection-panel-title" className="mx-auto max-w-6xl">
            <Reveal>
                <span className="inline-block rounded-full bg-[#e3f1f0] px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-[#045d65]">Packages at Home</span>
                <h2 id="home-collection-panel-title" className="mt-4 text-3xl font-black tracking-tight text-[#0f172a] sm:text-4xl">
                    Health Packages, <span className="text-[#045d65]">Collected at Home</span>
                </h2>
                <p className="mt-4 max-w-xl text-sm leading-7 text-gray-500">
                    Arrange selected health packages without a clinic visit. Our team confirms the tests, preparation instructions and expected report time before collection.
                </p>
            </Reveal>

            <div className="mt-8 grid items-stretch gap-8 lg:grid-cols-[minmax(0,300px)_minmax(0,1fr)_minmax(0,340px)] lg:gap-10">
                {/* Image */}
                <Reveal>
                    <div className="relative mx-auto aspect-[3/4] w-full max-w-[340px] overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#045d65] to-[#023f45] lg:max-w-none">
                        {imageUrl && <Image src={imageUrl} alt="Home sample collection" fill sizes="(min-width:1024px) 300px, 340px" className="object-cover" />}
                        <div className="absolute left-4 right-4 top-4 flex items-center gap-3 rounded-2xl border border-white/30 bg-white/15 px-4 py-3 text-white backdrop-blur-md">
                            <svg className="h-6 w-6 shrink-0" fill="none" stroke="currentColor" strokeWidth={1.6} viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M12 3l8 3v6c0 4.5-3.2 8-8 9-4.8-1-8-4.5-8-9V6l8-3z" /></svg>
                            <div className="leading-tight">
                                <p className="text-sm font-bold">DHA Licensed</p>
                                <p className="text-[10px] font-medium uppercase tracking-wide text-white/80">Home sample collection</p>
                            </div>
                        </div>
                        {minPrice !== null && (
                            <span className="absolute bottom-4 left-4 rounded-full bg-white px-4 py-2.5 text-xs font-bold text-[#045d65] shadow-lg">
                                Packages from AED {minPrice.toLocaleString('en-AE')}
                            </span>
                        )}
                    </div>
                </Reveal>

                {/* Copy */}
                <Reveal delayMs={80}>
                    <div className="max-w-md self-center">
                        <h3 className="text-3xl font-black leading-[1.1] tracking-tight text-[#0f172a] sm:text-[2.1rem]">
                            Blood Sample Collection <span className="text-[#045d65]">at Your Doorstep</span>
                        </h3>
                        <p className="mt-5 text-sm leading-7 text-gray-500">
                            From routine panels to selected screening packages, a licensed professional collects your sample using sterile, single-use equipment. Ask about available slots and when your digital report is expected.
                        </p>
                        <BookActionButton
                            label="Book a Home Blood Test →"
                            whatsappText="Hi, I would like to book a home blood test."
                            className="mt-6 rounded-full bg-[#045d65] px-7 py-3.5 text-sm font-bold text-white shadow-md transition-colors hover:bg-[#034b52]"
                        />
                        <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-[11px] font-semibold text-gray-500">
                            {chips.map(chip => (
                                <li key={chip.label} className="flex items-center gap-1.5">
                                    <svg className="h-3.5 w-3.5 text-[#045d65]" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d={chip.d} /></svg>
                                    {chip.label}
                                </li>
                            ))}
                        </ul>
                    </div>
                </Reveal>

                {/* Dark list: packages with home collection */}
                <Reveal delayMs={160} className="h-full">
                    <div className="relative h-full overflow-hidden rounded-[2rem] bg-[#062f33] p-7 text-white">
                        <div className="pointer-events-none absolute -right-16 -top-10 h-56 w-56 rounded-full bg-[#307984]/40 blur-3xl" aria-hidden="true" />
                        <div className="pointer-events-none absolute -bottom-20 -left-10 h-64 w-64 rounded-full bg-[#045d65]/60 blur-3xl" aria-hidden="true" />
                        <div className="relative flex h-full flex-col">
                            <span className="inline-flex w-fit items-center gap-2 rounded-full bg-[#045d65] px-3.5 py-2 text-[10px] font-bold uppercase tracking-wider">
                                <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth={2.2} viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M3 17l6-6 4 4 8-8M15 7h6v6" /></svg>
                                Explore Packages
                            </span>
                            <ul className="mt-5 flex-1">
                                {packages.map(pkg => {
                                    const { cleanTitle, price } = getPackagePricing(pkg.title, pkg.amount);
                                    const active = pkg.slug === currentSlug;
                                    return (
                                        <li key={pkg.slug} className="border-b border-white/10 last:border-0">
                                            <Link href={`/home-collection/${pkg.slug}`} aria-current={active ? 'page' : undefined} className={`group flex items-center justify-between gap-3 py-3.5 text-sm font-semibold transition-colors hover:text-[#A7DCC0] ${active ? 'text-[#A7DCC0]' : ''}`}>
                                                <span>{cleanTitle}{price && <span className="ml-2 text-[11px] font-medium text-white/50">{price}</span>}</span>
                                                <Arrow className="h-4 w-4 shrink-0 text-white/60 transition-transform group-hover:translate-x-1" />
                                            </Link>
                                        </li>
                                    );
                                })}
                            </ul>
                            <Link href={allPackagesHref} className="mt-5 inline-flex w-fit items-center gap-2 rounded-full border border-white/25 bg-white/5 px-5 py-2.5 text-xs font-semibold transition-colors hover:bg-white/15">
                                All Packages <Arrow className="h-3.5 w-3.5" />
                            </Link>
                        </div>
                    </div>
                </Reveal>
            </div>
        </section>
    );
}
