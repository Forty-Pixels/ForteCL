import type { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/Navbar/Navbar';
import Footer from '@/components/Landing-page/Footer/Footer';
import ProviderLogo from '@/components/Landing-page/Insurance/ProviderLogo';
import Reveal from '@/components/Animation/Reveal';
import { APPROVAL_INFO, INSURANCE_PROVIDERS, type ApprovalKind } from '@/data/insuranceNetworks';

export const metadata: Metadata = {
    title: 'Accepted Insurance & Networks | Forte Clinical Laboratory',
    description: 'Insurance providers and networks accepted at Forte Clinical Laboratory Dubai, with approval and claim requirements for each.',
};

const STYLE: Record<ApprovalKind, string> = {
    direct: 'bg-[#e6f4ec] text-[#1d7a46]',
    eligibility: 'bg-[#e6f4ec] text-[#1d7a46]',
    preapproval: 'bg-[#fff3df] text-[#a2640a]',
    clinic: 'bg-[#fff3df] text-[#a2640a]',
    contact: 'bg-[#eaf4f8] text-[#047b9a]',
};

const slugify = (name: string) => name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

export default function InsurancePage() {
    return (
        <main className="min-h-screen bg-[#f3f8f7]">
            <Navbar />

            <section className="bg-white pb-12 pt-36">
                <div className="mx-auto max-w-[1100px] px-5 sm:px-8">
                    <Reveal>
                        <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#307984]">Insurance Coverage</p>
                        <h1 className="mt-2 max-w-3xl text-3xl font-bold leading-tight text-[#103b40] sm:text-4xl">Accepted insurance providers <span className="text-[#307984]">and networks</span></h1>
                        <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600">
                            Forte Clinical Laboratory now accepts the providers below. Each one has its own approval process, so check yours before you visit or book a home collection.
                        </p>
                    </Reveal>
                    <Reveal delayMs={80}>
                        <ul className="mt-6 flex flex-wrap gap-2" aria-label="Jump to a provider">
                            {INSURANCE_PROVIDERS.map(provider => (
                                <li key={provider.name}>
                                    <a href={`#${slugify(provider.name)}`} className="inline-block rounded-full border border-[#d7e5e8] bg-[#f6fafb] px-4 py-2 text-xs font-semibold text-[#366167] transition-colors hover:border-[#045d65] hover:text-[#045d65]">{provider.name}</a>
                                </li>
                            ))}
                        </ul>
                    </Reveal>
                    <Reveal delayMs={140}>
                        <dl className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                            {(['direct', 'eligibility', 'preapproval', 'clinic'] as ApprovalKind[]).map(kind => (
                                <div key={kind} className="rounded-2xl border border-[#d7e5e8] p-4">
                                    <dt><span className={`inline-block rounded-full px-3 py-1 text-[11px] font-bold ${STYLE[kind]}`}>{APPROVAL_INFO[kind].label}</span></dt>
                                    <dd className="mt-2 text-[11px] leading-5 text-slate-600">{APPROVAL_INFO[kind].detail}</dd>
                                </div>
                            ))}
                        </dl>
                    </Reveal>
                </div>
            </section>

            <section className="py-12">
                <div className="mx-auto max-w-[1100px] space-y-6 px-5 sm:px-8">
                    {INSURANCE_PROVIDERS.map((provider, index) => {
                        const whatsapp = `https://wa.me/971569925611?text=${encodeURIComponent(`Hi, I would like to confirm my ${provider.name} insurance coverage for a lab test.`)}`;
                        const isCode = provider.networks.some(n => n.name.startsWith('Network code'));
                        return (
                            <Reveal key={provider.name} delayMs={(index % 3) * 60}>
                                <article id={slugify(provider.name)} className="scroll-mt-28 overflow-hidden rounded-3xl border border-[#d7e5e8] bg-white shadow-sm">
                                    <header className="flex flex-col gap-3 border-b border-[#d7e5e8] bg-[#f2f6f8] px-6 py-5 sm:flex-row sm:items-start sm:justify-between">
                                        <div className="flex max-w-2xl items-start gap-4">
                                            <ProviderLogo name={provider.name} logo={provider.logo} className="h-16 w-28" />
                                            <div>
                                            <h2 className="text-lg font-bold text-[#103b40]">{provider.name}</h2>
                                            <span className={`mt-2 inline-block rounded-full px-3 py-1 text-[11px] font-bold ${STYLE[provider.approval]}`}>{APPROVAL_INFO[provider.approval].label}</span>
                                            <p className="mt-2 text-xs leading-5 text-slate-600">{provider.process}</p>
                                            </div>
                                        </div>
                                        <a href={whatsapp} target="_blank" rel="noopener noreferrer" className="inline-flex shrink-0 items-center justify-center rounded-lg border border-[#b8dce9] bg-[#eaf6fb] px-4 py-2.5 text-[11px] font-semibold text-[#047b9a] transition-colors hover:bg-[#d8eef7]">Confirm on WhatsApp</a>
                                    </header>
                                    {provider.networks.length > 0 ? (
                                        <div className="overflow-x-auto px-6 py-4">
                                            <table className="w-full min-w-[420px] table-fixed text-left">
                                                <caption className="sr-only">Accepted {provider.name} networks</caption>
                                                <thead className="border-b border-[#d7e5e8] text-[10px] uppercase tracking-wider text-[#517186]">
                                                    <tr>
                                                        <th scope="col" className="w-[10%] px-3 pb-3 font-semibold">#</th>
                                                        <th scope="col" className="w-[50%] px-3 pb-3 font-semibold">{isCode ? 'Network code' : 'Network'}</th>
                                                        <th scope="col" className="w-[40%] px-3 pb-3 text-right font-semibold">Access</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="divide-y divide-[#d7e5e8]">
                                                    {provider.networks.map((network, i) => (
                                                        <tr key={network.name}>
                                                            <td className="px-3 py-3 text-[11px] text-slate-400">{i + 1}</td>
                                                            <th scope="row" className="px-3 py-3 text-xs font-semibold text-[#103b40]">{network.name.replace('Network code ', '')}</th>
                                                            <td className="px-3 py-3 text-right"><span className={`inline-block rounded-full px-2.5 py-1 text-[10px] font-semibold ${network.note ? 'bg-[#fff3df] text-[#a2640a]' : 'bg-[#e6f4ec] text-[#1d7a46]'}`}>{network.note || 'Accepted'}</span></td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    ) : (
                                        <p className="px-6 py-6 text-xs text-slate-600">Network details for {provider.name} are confirmed by our team. Message us with your policy details.</p>
                                    )}
                                </article>
                            </Reveal>
                        );
                    })}

                    <Reveal>
                        <div className="rounded-3xl bg-gradient-to-br from-[#045d65] to-[#023f45] px-8 py-10 text-center text-white">
                            <h2 className="text-2xl font-bold">Not sure about your plan?</h2>
                            <p className="mx-auto mt-2 max-w-md text-sm text-white/80">Send us your insurance card or eligibility screenshot and we will confirm your cover before you book.</p>
                            <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
                                <a href="https://wa.me/971569925611?text=Hi%2C%20I%20would%20like%20to%20check%20my%20insurance%20coverage." target="_blank" rel="noopener noreferrer" className="w-full rounded-full bg-[#25D366] px-7 py-3 text-xs font-bold text-white hover:bg-[#1ebe5b] sm:w-auto">WhatsApp Us</a>
                                <a href="tel:+971569925611" className="w-full rounded-full bg-white px-7 py-3 text-xs font-bold text-[#045d65] hover:bg-gray-100 sm:w-auto">Call +971 56 992 5611</a>
                                <Link href="/contact" className="w-full rounded-full border border-white/40 px-7 py-3 text-xs font-bold text-white hover:bg-white/10 sm:w-auto">Contact Page</Link>
                            </div>
                        </div>
                    </Reveal>
                </div>
            </section>
            <Footer />
        </main>
    );
}
