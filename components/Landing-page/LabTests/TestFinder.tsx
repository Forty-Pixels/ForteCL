'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { ArrowUpRightIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { getTestLink } from '@/lib/department-utils';

interface FinderTest {
    slug: string;
    name: string;
    department?: string;
    departmentSlug?: string;
    sampleType?: string[];
    tat?: string;
}

const NAME_OVERRIDES: Record<string, string> = {
    'food-allergy-panel': 'Allergy, Food (60 Panel)',
    bhcg: 'Beta HCG',
};

export default function TestFinder({ tests }: { tests: FinderTest[] }) {
    const departments = useMemo(() => Array.from(new Set(
        tests.filter(test => test.slug && test.department).map(test => test.department as string)
    )).sort((a, b) => a.localeCompare(b)), [tests]);
    const [selectedDepartment, setSelectedDepartment] = useState('');
    const [search, setSearch] = useState('');
    const department = departments.includes(selectedDepartment) ? selectedDepartment : departments[0] || '';
    const matches = useMemo(() => tests
        .filter(test => test.slug && department && test.department === department)
        .map(test => ({ ...test, name: NAME_OVERRIDES[test.slug] || test.name }))
        .filter(test => test.name.toLowerCase().includes(search.trim().toLowerCase()))
        .sort((a, b) => a.name.localeCompare(b.name)), [tests, department, search]);
    const visibleTests = matches.slice(0, 6);
    const moreParams = new URLSearchParams({ department });
    if (search.trim()) moreParams.set('search', search.trim());

    return (
        <section aria-labelledby="test-finder-title" className="bg-[#f3f8f7] py-10 lg:py-12">
            <div className="mx-auto max-w-[1200px] px-5 sm:px-8">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                    <div className="max-w-2xl">
                        <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.22em] text-[#307984]">Find a test</p>
                        <h2 id="test-finder-title" className="text-2xl font-bold leading-tight text-[#103b40] sm:text-[30px]">The right test. <span className="text-[#307984]">A clearer next step.</span></h2>
                        <p className="mt-2 text-xs leading-5 text-slate-600">Explore our tests by department, find what you need, and connect with our team to book.</p>
                    </div>
                    <Link href="/lab-tests" className="inline-flex shrink-0 items-center gap-2 self-start rounded-full border border-[#045d65]/25 px-4 py-2 text-xs font-semibold text-[#045d65] transition-colors hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#045d65]">View all tests <ArrowUpRightIcon className="h-4 w-4" /></Link>
                </div>

                <div className="mt-5 border-y border-[#045d65]/15 py-2.5">
                    <div role="group" aria-label="Browse tests by department" className="flex gap-1.5 overflow-x-auto py-0.5">
                        {departments.map(item => (
                            <button key={item} type="button" aria-pressed={department === item} onClick={() => setSelectedDepartment(item)} className={`shrink-0 rounded-full px-3.5 py-2 text-xs font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#045d65] ${department === item ? 'bg-[#045d65] text-white' : 'bg-white text-[#366167] hover:bg-[#e1eeeb]'}`}>
                                {item}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="my-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div><h3 className="text-sm font-bold text-[#103b40]">{department || 'Browse our tests'}</h3><p aria-live="polite" className="mt-0.5 text-[11px] text-slate-500">Showing {visibleTests.length} of {matches.length} tests</p></div>
                    <div className="relative w-full sm:max-w-[280px]">
                        <label htmlFor="homepage-test-search" className="sr-only">Search tests in the selected department</label>
                        <MagnifyingGlassIcon aria-hidden="true" className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#307984]" />
                        <input id="homepage-test-search" type="search" value={search} onChange={event => setSearch(event.target.value)} placeholder="Search this department..." className="w-full rounded-xl border border-[#045d65]/15 bg-white py-2.5 pl-9 pr-3 text-xs text-slate-800 outline-none focus:border-[#045d65] focus:ring-2 focus:ring-[#045d65]/15" />
                    </div>
                </div>

                <div role="region" aria-label={`${department || 'Laboratory'} test table`} tabIndex={0} className="overflow-x-auto rounded-xl border border-[#045d65]/15 bg-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#045d65]">
                    <table className="w-full min-w-[640px] table-fixed text-left">
                        <caption className="sr-only">Up to six tests in {department || 'the selected department'}, with sample requirements, turnaround times, and WhatsApp booking.</caption>
                        <thead className="border-b border-[#045d65]/15 bg-[#e5efed] text-[10px] uppercase tracking-wider text-[#366167]">
                            <tr>
                                <th scope="col" className="w-[34%] px-4 py-2.5 font-semibold">Test name</th>
                                <th scope="col" className="w-[39%] px-4 py-2.5 font-semibold">Sample required</th>
                                <th scope="col" className="w-[13%] px-4 py-2.5 font-semibold">Results in</th>
                                <th scope="col" className="w-[14%] px-4 py-2.5 text-right font-semibold">Booking</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#045d65]/10">
                            {visibleTests.map(test => (
                                <tr key={test.slug} className="transition-colors hover:bg-[#f5f9f8]">
                                    <th scope="row" className="px-4 py-3 align-middle">
                                        <Link href={getTestLink(test)} className="rounded-sm text-xs font-semibold leading-5 text-[#103b40] hover:text-[#307984] hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#045d65]">{test.name}</Link>
                                    </th>
                                    <td className="break-words px-4 py-3 text-[11px] leading-[1.5] text-slate-600">{test.sampleType?.length ? test.sampleType.join(', ') : 'Contact lab'}</td>
                                    <td className="px-4 py-3 text-[11px] leading-5 text-slate-600">{test.tat || 'Contact lab'}</td>
                                    <td className="px-4 py-3 text-right">
                                        <a href={`https://wa.me/971569925611?text=${encodeURIComponent(`Hi, I would like to book the ${test.name} test.`)}`} target="_blank" rel="noopener noreferrer" aria-label={`Book ${test.name} on WhatsApp`} className="inline-flex items-center justify-center rounded-full border border-[#045d65]/25 px-3.5 py-2 text-[11px] font-semibold text-[#045d65] transition-colors hover:border-[#045d65] hover:bg-[#045d65] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#045d65]">Book</a>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {!matches.length && <div className="rounded-3xl border border-dashed border-[#045d65]/20 px-6 py-12 text-center"><p className="font-semibold text-[#103b40]">{departments.length ? 'No tests match your search in this department.' : 'Browse our full test list or contact our team for help.'}</p>{search && <button type="button" onClick={() => setSearch('')} className="mt-4 rounded px-3 py-2 text-sm font-semibold text-[#045d65] underline focus-visible:outline-2">Clear search</button>}</div>}
                {matches.length > 6 && <div className="mt-5 text-center"><Link href={`/lab-tests?${moreParams.toString()}`} className="inline-flex items-center gap-3 rounded-full border border-[#045d65]/25 bg-white px-5 py-2.5 text-xs font-bold text-[#045d65] transition-colors hover:bg-[#e1eeeb] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#045d65]">View more <ArrowUpRightIcon aria-hidden="true" className="h-4 w-4" /></Link></div>}
            </div>
        </section>
    );
}
