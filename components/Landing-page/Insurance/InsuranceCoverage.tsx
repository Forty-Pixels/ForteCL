import Link from 'next/link';
import { ArrowUpRightIcon } from '@heroicons/react/24/outline';
import { INSURANCE_PROVIDERS, insuranceProviderSlug } from '@/data/insuranceNetworks';

export default function InsuranceCoverage() {
    return (
        <section aria-labelledby="insurance-coverage-title" className="bg-[#f3f8f7] py-10 lg:py-12">
            <div className="mx-auto max-w-[1200px] px-5 sm:px-8">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                    <div className="max-w-2xl">
                        <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.22em] text-[#307984]">Insurance Coverage</p>
                        <h2 id="insurance-coverage-title" className="text-2xl font-bold leading-tight text-[#103b40] sm:text-[30px]">Check your plan. <span className="text-[#307984]">Know your next step.</span></h2>
                        <p className="mt-2 text-xs leading-5 text-slate-600">Select your insurance provider to see its accepted networks and approval requirements.</p>
                    </div>
                    <Link href="/insurance" className="inline-flex shrink-0 items-center gap-2 self-start rounded-full border border-[#045d65]/25 px-4 py-2 text-xs font-semibold text-[#045d65] transition-colors hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#045d65]">View all providers <ArrowUpRightIcon className="h-4 w-4" /></Link>
                </div>

                <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    {INSURANCE_PROVIDERS.map(provider => (
                        <li key={provider.name}>
                            <Link href={`/insurance/${insuranceProviderSlug(provider.name)}`} className="group flex h-full items-center justify-between gap-4 rounded-xl border border-[#d7e5e8] bg-white px-5 py-4 text-sm font-semibold text-[#103b40] shadow-sm transition-colors hover:border-[#045d65] hover:text-[#045d65] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#045d65]">
                                <span>{provider.name}</span>
                                <ArrowUpRightIcon aria-hidden="true" className="h-4 w-4 shrink-0 text-[#307984] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
}
