import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Navbar from '@/components/Navbar/Navbar';
import Footer from '@/components/Landing-page/Footer/Footer';
import ProviderLogo from '@/components/Landing-page/Insurance/ProviderLogo';
import { APPROVAL_INFO, INSURANCE_PROVIDERS, insuranceProviderSlug } from '@/data/insuranceNetworks';

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
    return INSURANCE_PROVIDERS.map(provider => ({ slug: insuranceProviderSlug(provider.name) }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const provider = INSURANCE_PROVIDERS.find(item => insuranceProviderSlug(item.name) === slug);
    return {
        title: provider ? `${provider.name} Insurance | Forte Clinical Laboratory` : 'Insurance Provider | Forte Clinical Laboratory',
        description: provider ? `Accepted ${provider.name} networks and approval requirements at Forte Clinical Laboratory.` : undefined,
    };
}

export default async function InsuranceProviderPage({ params }: Props) {
    const { slug } = await params;
    const provider = INSURANCE_PROVIDERS.find(item => insuranceProviderSlug(item.name) === slug);
    if (!provider) notFound();

    const info = APPROVAL_INFO[provider.approval];
    const whatsapp = `https://wa.me/971569925611?text=${encodeURIComponent(`Hi, I would like to confirm my ${provider.name} insurance coverage for a lab test.`)}`;
    const isCode = provider.networks.some(network => network.name.startsWith('Network code'));

    return (
        <main className="min-h-screen bg-[#f3f8f7]">
            <Navbar />
            <section className="bg-white pb-10 pt-36">
                <div className="mx-auto max-w-[1000px] px-5 sm:px-8">
                    <Link href="/insurance" className="text-xs font-semibold text-[#307984] hover:underline">← All insurance providers</Link>
                    <p className="mt-6 text-[10px] font-bold uppercase tracking-[0.22em] text-[#307984]">Insurance Coverage</p>
                    <h1 className="mt-2 text-3xl font-bold text-[#103b40] sm:text-4xl">{provider.name}</h1>
                    <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600">Check the accepted networks and approval steps for your plan before you visit or book a home collection.</p>
                </div>
            </section>

            <section className="py-10 sm:py-12">
                <div className="mx-auto max-w-[1000px] px-5 sm:px-8">
                    <article className="overflow-hidden rounded-3xl border border-[#d7e5e8] bg-white shadow-sm">
                        <header className="flex flex-col gap-5 border-b border-[#d7e5e8] bg-[#f2f6f8] p-6 sm:flex-row sm:items-start sm:justify-between sm:p-8">
                            <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
                                <ProviderLogo name={provider.name} logo={provider.logo} className="h-16 w-28" />
                                <div>
                                    <h2 className="text-xl font-bold text-[#103b40]">{provider.name}</h2>
                                    <span className="mt-2 inline-block rounded-full bg-[#eaf4f8] px-3 py-1 text-xs font-bold text-[#047b9a]">{info.label}</span>
                                    <p className="mt-3 max-w-xl text-sm leading-6 text-slate-700">{provider.process}</p>
                                </div>
                            </div>
                            <a href={whatsapp} target="_blank" rel="noopener noreferrer" className="inline-flex shrink-0 items-center justify-center rounded-lg border border-[#b8dce9] bg-[#eaf6fb] px-4 py-2.5 text-xs font-semibold text-[#047b9a] transition-colors hover:bg-[#d8eef7]">Confirm on WhatsApp</a>
                        </header>

                        {provider.networks.length ? (
                            <div className="overflow-x-auto p-5 sm:p-8">
                                <h3 className="mb-5 text-lg font-bold text-[#103b40]">Accepted networks</h3>
                                <table className="w-full min-w-[420px] text-left">
                                    <caption className="sr-only">Accepted {provider.name} networks</caption>
                                    <thead className="border-b border-[#d7e5e8] text-xs uppercase tracking-wide text-[#517186]">
                                        <tr><th scope="col" className="pb-3 font-semibold">{isCode ? 'Network code' : 'Network'}</th><th scope="col" className="pb-3 text-right font-semibold">Access</th></tr>
                                    </thead>
                                    <tbody className="divide-y divide-[#d7e5e8]">
                                        {provider.networks.map(network => (
                                            <tr key={network.name}>
                                                <th scope="row" className="py-4 pr-4 text-sm font-semibold text-[#103b40]">{network.name.replace('Network code ', '')}</th>
                                                <td className="py-4 text-right"><span className={`inline-block rounded-full px-2.5 py-1 text-xs font-semibold ${network.note ? 'bg-[#fff3df] text-[#a2640a]' : 'bg-[#e6f4ec] text-[#1d7a46]'}`}>{network.note || 'Accepted'}</span></td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <p className="p-6 text-sm leading-6 text-slate-600 sm:p-8">Network details for {provider.name} are confirmed by our team. Contact us with your plan details before booking.</p>
                        )}
                    </article>
                </div>
            </section>
            <Footer />
        </main>
    );
}
