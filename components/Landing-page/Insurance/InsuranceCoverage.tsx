'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { ArrowUpRightIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import ProviderLogo from '@/components/Landing-page/Insurance/ProviderLogo';
import { APPROVAL_INFO, INSURANCE_PROVIDERS } from '@/data/insuranceNetworks';

const APPROVAL_STYLE = {
    direct: 'bg-[#e6f4ec] text-[#1d7a46]',
    eligibility: 'bg-[#e6f4ec] text-[#1d7a46]',
    preapproval: 'bg-[#fff3df] text-[#a2640a]',
    clinic: 'bg-[#fff3df] text-[#a2640a]',
    contact: 'bg-[#eaf4f8] text-[#047b9a]',
} as const;

export default function InsuranceCoverage() {
    const [selected, setSelected] = useState(INSURANCE_PROVIDERS[0].name);
    const [search, setSearch] = useState('');
    const provider = INSURANCE_PROVIDERS.find(item => item.name === selected) ?? INSURANCE_PROVIDERS[0];
    const info = APPROVAL_INFO[provider.approval];
    const query = search.trim().toLowerCase();
    const rows = useMemo(
        () => provider.networks.filter(network => network.name.toLowerCase().includes(query)),
        [provider, query],
    );
    const whatsapp = `https://wa.me/971569925611?text=${encodeURIComponent(`Hi, I would like to confirm my ${provider.name} insurance coverage for a lab test.`)}`;

    return (
        <section aria-labelledby="insurance-coverage-title" className="bg-[#f3f8f7] py-10 lg:py-12">
            <div className="mx-auto max-w-[1200px] px-5 sm:px-8">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                <div className="max-w-2xl">
                    <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.22em] text-[#307984]">Insurance Coverage</p>
                    <h2 id="insurance-coverage-title" className="text-2xl font-bold leading-tight text-[#103b40] sm:text-[30px]">Check your plan. <span className="text-[#307984]">Know your next step.</span></h2>
                    <p className="mt-2 text-xs leading-5 text-slate-600">Forte Clinical Laboratory accepts the insurance providers below. Select yours to see the accepted networks and whether approval is needed.</p>
                </div>
                    <Link href="/insurance" className="inline-flex shrink-0 items-center gap-2 self-start rounded-full border border-[#045d65]/25 px-4 py-2 text-xs font-semibold text-[#045d65] transition-colors hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#045d65]">View full details <ArrowUpRightIcon className="h-4 w-4" /></Link>
                </div>

                <div className="mt-6 overflow-hidden rounded-3xl border border-[#d7e5e8] bg-white shadow-sm lg:grid lg:grid-cols-[250px_minmax(0,1fr)]">
                    <aside className="min-w-0 border-b border-[#d7e5e8] bg-[#f2f6f8] px-5 py-6 lg:border-b-0 lg:border-r" aria-label="Browse by insurance provider">
                        <h3 className="mb-4 text-[10px] font-bold uppercase tracking-[0.18em] text-[#517186]">Insurance provider</h3>
                        <div role="group" aria-label="Insurance providers" className="flex gap-2 overflow-x-auto pb-1 lg:max-h-[490px] lg:flex-col lg:gap-1 lg:overflow-y-auto lg:overflow-x-hidden lg:pr-1">
                            {INSURANCE_PROVIDERS.map(item => (
                                <button key={item.name} type="button" aria-pressed={selected === item.name} onClick={() => { setSelected(item.name); setSearch(''); }} className={`flex shrink-0 items-center justify-between gap-2 rounded-xl px-4 py-3 text-left text-xs font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#045d65] lg:w-full ${selected === item.name ? 'border border-[#d7e5e8] bg-white text-[#103b40] shadow-sm' : 'border border-transparent text-[#366167] hover:bg-white/70'}`}>
                                    <span>{item.name}</span>
                                    {selected === item.name && <span aria-hidden="true" className="text-base font-normal text-[#047b9a]">→</span>}
                                </button>
                            ))}
                        </div>
                    </aside>

                    <div className="min-w-0 px-4 py-5 sm:px-6 sm:py-6">
                        <div className="mb-5 flex flex-col gap-3 rounded-2xl bg-[#f6fafb] p-4 sm:flex-row sm:items-center sm:justify-between">
                            <div className="flex items-start gap-4">
                                <ProviderLogo name={provider.name} logo={provider.logo} className="h-14 w-24" />
                                <div>
                                <span className={`inline-block rounded-full px-3 py-1 text-[11px] font-bold ${APPROVAL_STYLE[provider.approval]}`}>{info.label}</span>
                                <p className="mt-2 max-w-xl text-xs leading-5 text-slate-600">{provider.process}</p>
                                </div>
                            </div>
                            <a href={whatsapp} target="_blank" rel="noopener noreferrer" className="inline-flex shrink-0 items-center justify-center rounded-lg border border-[#b8dce9] bg-[#eaf6fb] px-4 py-2.5 text-[11px] font-semibold text-[#047b9a] transition-colors hover:bg-[#d8eef7] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#045d65]">Confirm on WhatsApp</a>
                        </div>

                        {provider.networks.length > 0 && (
                            <div className="relative mb-5 flex min-w-0 items-center rounded-xl border border-[#cfe0e8] bg-white focus-within:border-[#045d65] focus-within:ring-2 focus-within:ring-[#045d65]/15">
                                <label htmlFor="insurance-network-search" className="sr-only">Search networks for {provider.name}</label>
                                <MagnifyingGlassIcon aria-hidden="true" className="ml-4 h-5 w-5 shrink-0 text-[#517186]" />
                                <input id="insurance-network-search" type="search" value={search} onChange={event => setSearch(event.target.value)} placeholder={`Search ${provider.name} networks...`} className="min-w-0 flex-1 bg-transparent px-3 py-4 text-sm text-slate-800 outline-none placeholder:text-slate-400" />
                                <span className="mr-3 hidden max-w-[180px] truncate rounded-lg bg-[#eaf4f8] px-3 py-2 text-[11px] font-semibold text-[#047b9a] sm:block">{provider.name}</span>
                            </div>
                        )}

                        {provider.networks.length > 0 ? (
                            <div role="region" aria-label={`${provider.name} accepted networks`} tabIndex={0} className="overflow-x-auto focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#045d65]">
                                <table className="w-full min-w-[480px] table-fixed text-left">
                                    <caption className="sr-only">Accepted {provider.name} networks and approval requirements</caption>
                                    <thead className="border-b border-[#d7e5e8] text-[10px] uppercase tracking-wider text-[#517186]">
                                        <tr>
                                            <th scope="col" className="w-[10%] px-3 pb-3 font-semibold">#</th>
                                            <th scope="col" className="w-[50%] px-3 pb-3 font-semibold">Network</th>
                                            <th scope="col" className="w-[40%] px-3 pb-3 text-right font-semibold">Access</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-[#d7e5e8]">
                                        {rows.map((network, index) => (
                                            <tr key={network.name} className="transition-colors hover:bg-[#f6fafb]">
                                                <td className="px-3 py-4 text-[11px] text-slate-400">{index + 1}</td>
                                                <th scope="row" className="px-3 py-4 text-xs font-semibold leading-5 text-[#103b40]">{network.name}</th>
                                                <td className="px-3 py-4 text-right">
                                                    <span className={`inline-block rounded-full px-2.5 py-1 text-[10px] font-semibold ${network.note ? 'bg-[#fff3df] text-[#a2640a]' : 'bg-[#e6f4ec] text-[#1d7a46]'}`}>{network.note || 'Accepted'}</span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                {!rows.length && (
                                    <div className="px-6 py-10 text-center">
                                        <p className="font-semibold text-[#103b40]">No network matches your search.</p>
                                        <button type="button" onClick={() => setSearch('')} className="mt-3 rounded px-3 py-2 text-sm font-semibold text-[#045d65] underline focus-visible:outline-2">Clear search</button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="rounded-2xl border border-dashed border-[#cfe0e8] px-6 py-12 text-center">
                                <p className="font-semibold text-[#103b40]">{provider.name} is accepted at Forte.</p>
                                <p className="mt-1 text-xs text-slate-600">Message our team to confirm your plan&apos;s network and approval steps.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
