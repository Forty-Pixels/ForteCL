import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRightIcon } from '@heroicons/react/24/outline';

interface HomepageResource {
    slug: string;
    title: string;
    category?: string;
    publishedAt: string;
    excerpt?: string;
    image?: string;
}

export default function NewsInsights({ posts }: { posts: HomepageResource[] }) {
    if (!posts.length) return null;

    return (
        <section aria-labelledby="resources-title" className="bg-[#f3f8f7] py-14 md:py-20">
            <div className="mx-auto max-w-7xl px-5 sm:px-8">
                <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
                    <div className="max-w-2xl">
                        <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-[#307984]">From our knowledge hub</p>
                        <h2 id="resources-title" className="text-3xl font-bold leading-tight text-[#103b40] md:text-4xl">Resources &amp; Insights</h2>
                        <p className="mt-3 text-sm leading-6 text-slate-600">Explore testing guides, health information, and updates from Forte Clinical Laboratory.</p>
                    </div>
                    <Link href="/resources" className="inline-flex shrink-0 items-center gap-2 self-start rounded-full border border-[#045d65]/25 bg-white px-5 py-3 text-sm font-semibold text-[#045d65] transition-colors hover:bg-[#e1eeeb] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#045d65]">
                        View all resources <ArrowUpRightIcon aria-hidden="true" className="h-4 w-4" />
                    </Link>
                </div>

                <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                    {posts.map(post => (
                        <article key={post.slug} className="overflow-hidden rounded-2xl border border-[#d7e5e8] bg-white shadow-sm transition-shadow hover:shadow-lg">
                            <Link href={`/resources/${post.slug}`} className="group flex h-full flex-col focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[#045d65]">
                                <div className="relative aspect-[16/10] overflow-hidden bg-[#dceae8]">
                                    {post.image ? (
                                        <Image src={post.image} alt="" fill sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 33vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
                                    ) : (
                                        <div className="flex h-full items-center justify-center text-sm font-bold uppercase tracking-[0.15em] text-[#307984]">Forte Clinical Laboratory</div>
                                    )}
                                </div>
                                <div className="flex flex-1 flex-col p-5 sm:p-6">
                                    <div className="mb-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] font-semibold uppercase tracking-wide text-[#307984]">
                                        {post.category && <span>{post.category}</span>}
                                        <time dateTime={post.publishedAt}>{new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</time>
                                    </div>
                                    <h3 className="text-lg font-bold leading-snug text-[#103b40] transition-colors group-hover:text-[#307984]">{post.title}</h3>
                                    {post.excerpt && <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-600">{post.excerpt}</p>}
                                    <span className="mt-auto inline-flex items-center gap-2 pt-5 text-xs font-bold uppercase tracking-wide text-[#045d65]">Read article <ArrowUpRightIcon aria-hidden="true" className="h-4 w-4" /></span>
                                </div>
                            </Link>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}
