import Link from 'next/link';
import Navbar from '@/components/Navbar/Navbar';
import Footer from '@/components/Landing-page/Footer/Footer';
import { labTests } from '@/data/labTestsData';
import { STD_PANELS } from '@/data/stdPanels';
import { client } from '@/lib/sanity';
import { allLabTestsQuery } from '@/lib/queries';

export const metadata = {
    title: 'STD & STI Tests | Forte Clinical Laboratory',
    description: 'Explore STD and STI testing panels at Forte Clinical Laboratory and contact our team for booking and test details.',
};

export const revalidate = 60;

export default async function StdTestsPage() {
    const cmsTests: typeof labTests = await client.fetch(allLabTestsQuery);
    const panels = STD_PANELS.map(panel => ({
        ...panel,
        test: cmsTests.find(test => test.slug === panel.slug) || labTests.find(test => test.slug === panel.slug),
    }));
    return (
        <main className="min-h-screen bg-[#f3f8f7]">
            <Navbar />
            <section className="mx-auto max-w-7xl px-5 pb-16 pt-36 sm:px-8 lg:pt-40">
                <div className="max-w-3xl">
                    <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-[#307984]">Laboratory tests</p>
                    <h1 className="text-3xl font-bold leading-tight text-[#103b40] sm:text-5xl">STD &amp; STI Testing</h1>
                    <p className="mt-5 text-sm leading-7 text-slate-600 sm:text-base">
                        Explore our available panels below. Our team can help confirm which test is appropriate, the sample needed, and the expected reporting time before you book.
                    </p>
                </div>

                <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                    {panels.map(({ name, slug, test }) => (
                        <article id={slug} key={slug} className="flex scroll-mt-32 flex-col rounded-2xl border border-[#d7e5e8] bg-white p-6 shadow-sm">
                            <h2 className="text-lg font-bold text-[#103b40]">{test?.name || name}</h2>
                            <p className="mt-3 flex-1 text-sm leading-6 text-slate-600">
                                {test?.overview || 'Contact our team for panel details, sample requirements, and turnaround time.'}
                            </p>
                            {test && (
                                <dl className="mt-5 space-y-2 border-t border-[#d7e5e8] pt-4 text-xs text-slate-600">
                                    <div className="flex gap-2"><dt className="font-semibold text-[#103b40]">Sample:</dt><dd>{test.sampleType?.join(', ') || 'Confirm with our team'}</dd></div>
                                    <div className="flex gap-2"><dt className="font-semibold text-[#103b40]">Results in:</dt><dd>{test.tat || 'Confirm with our team'}</dd></div>
                                </dl>
                            )}
                            <div className="mt-6 flex flex-wrap gap-3">
                                {test && <Link href={`/departments/molecular/${slug}`} className="inline-flex items-center rounded-full bg-[#045d65] px-4 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-[#08717a] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#045d65]">View test</Link>}
                                <a href={`https://wa.me/971569925611?text=${encodeURIComponent(`Hi, I would like to ask about the ${test?.name || name}.`)}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center rounded-full border border-[#045d65]/25 px-4 py-2.5 text-xs font-semibold text-[#045d65] transition-colors hover:bg-[#e1eeeb] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#045d65]">Ask about this panel</a>
                            </div>
                        </article>
                    ))}
                </div>
            </section>
            <Footer />
        </main>
    );
}
