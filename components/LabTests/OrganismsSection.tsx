interface OrganismsSectionProps {
    section?: { heading?: string; items?: string[] };
}

export default function OrganismsSection({ section }: OrganismsSectionProps) {
    const organisms = section?.items?.map(item => item.trim()).filter(Boolean) ?? [];
    if (!organisms.length) return null;

    return (
        <section aria-labelledby="organisms-tested-title" className="border-y border-[#d7e5e8] bg-[#f3f8f7] py-12 sm:py-14">
            <div className="mx-auto max-w-7xl px-6">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#307984]">Test coverage</p>
                <h2 id="organisms-tested-title" className="mt-2 text-2xl font-bold text-[#103b40] sm:text-3xl">{section?.heading?.trim() || 'Organisms Tested'}</h2>
                <ul className="mt-6 flex flex-wrap gap-3">
                    {organisms.map((organism, index) => (
                        <li key={`${organism}-${index}`} className="rounded-xl border border-[#cfe0e0] bg-white px-4 py-2.5 text-sm font-semibold text-[#103b40] shadow-sm">
                            {organism}
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
}
