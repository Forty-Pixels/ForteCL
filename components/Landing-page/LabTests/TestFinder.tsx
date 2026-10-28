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

                <div className="mt-6 overflow-hidden rounded-3xl border border-[#d7e5e8] bg-white shadow-sm lg:grid lg:grid-cols-[250px_minmax(0,1fr)]">
                    <aside className="min-w-0 border-b border-[#d7e5e8] bg-[#f2f6f8] px-5 py-6 lg:border-b-0 lg:border-r" aria-label="Browse tests by department">
                        <h3 className="mb-4 text-[10px] font-bold uppercase tracking-[0.18em] text-[#517186]">Browse by category</h3>
                        <div role="group" aria-label="Departments" className="flex gap-2 overflow-x-auto pb-1 lg:max-h-[490px] lg:flex-col lg:gap-1 lg:overflow-y-auto lg:overflow-x-hidden lg:pr-1">
                            {departments.map(item => (
                                <button key={item} type="button" aria-pressed={department === item} onClick={() => setSelectedDepartment(item)} className={`flex shrink-0 items-center justify-between gap-2 rounded-xl px-4 py-3 text-left text-xs font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#045d65] lg:w-full ${department === item ? 'border border-[#d7e5e8] bg-white text-[#103b40] shadow-sm' : 'border border-transparent text-[#366167] hover:bg-white/70'}`}>
                                    <span>{item}</span>
                                    {department === item && <span aria-hidden="true" className="text-base font-normal text-[#047b9a]">→</span>}
                                </button>
                            ))}
                        </div>
                    </aside>

                    <div className="min-w-0 px-4 py-5 sm:px-6 sm:py-6">
                        <div className="relative mb-5 flex min-w-0 items-center rounded-xl border border-[#cfe0e8] bg-white focus-within:border-[#045d65] focus-within:ring-2 focus-within:ring-[#045d65]/15">
                            <label htmlFor="homepage-test-search" className="sr-only">Search tests in the selected department</label>
                            <MagnifyingGlassIcon aria-hidden="true" className="ml-4 h-5 w-5 shrink-0 text-[#517186]" />
                            <input id="homepage-test-search" type="search" value={search} onChange={event => setSearch(event.target.value)} placeholder="Search tests in this department..." className="min-w-0 flex-1 bg-transparent px-3 py-4 text-sm text-slate-800 outline-none placeholder:text-slate-400" />
                            <span className="mr-3 hidden max-w-[180px] truncate rounded-lg bg-[#eaf4f8] px-3 py-2 text-[11px] font-semibold text-[#047b9a] sm:block">{department}</span>
                        </div>
                        <p aria-live="polite" className="sr-only">Showing {visibleTests.length} of {matches.length} tests in {department}</p>
                        <div role="region" aria-label={`${department || 'Laboratory'} test table`} tabIndex={0} className="overflow-x-auto focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#045d65]">
                            <table className="w-full min-w-[640px] table-fixed text-left">
                                <caption className="sr-only">Up to six tests in {department || 'the selected department'}, with sample requirements, turnaround times, and WhatsApp booking.</caption>
                                <thead className="border-b border-[#d7e5e8] text-[10px] uppercase tracking-wider text-[#517186]">
                                    <tr>
                                        <th scope="col" className="w-[34%] px-3 pb-3 font-semibold">Test name</th>
                                        <th scope="col" className="w-[37%] px-3 pb-3 font-semibold">Sample required</th>
                                        <th scope="col" className="w-[14%] px-3 pb-3 font-semibold">Results in</th>
                                        <th scope="col" className="w-[15%] px-3 pb-3 text-right font-semibold">Booking</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-[#d7e5e8]">
                                    {visibleTests.map(test => (
                                        <tr key={test.slug} className="transition-colors hover:bg-[#f6fafb]">
                                            <th scope="row" className="px-3 py-5 align-middle">
                                                <Link href={getTestLink(test)} className="rounded-sm text-xs font-semibold leading-5 text-[#103b40] hover:text-[#307984] hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#045d65]">{test.name}</Link>
                                            </th>
                                            <td className="break-words px-3 py-5 text-[11px] leading-[1.5] text-slate-600">{test.sampleType?.length ? test.sampleType.join(', ') : 'Contact lab'}</td>
                                            <td className="px-3 py-5 text-[11px] leading-5 text-slate-600">{test.tat || 'Contact lab'}</td>
                                            <td className="px-3 py-5 text-right">
                                                <a href={`https://wa.me/971569925611?text=${encodeURIComponent(`Hi, I would like to book the ${test.name} test.`)}`} target="_blank" rel="noopener noreferrer" aria-label={`Book ${test.name} on WhatsApp`} className="inline-flex items-center justify-center rounded-lg border border-[#b8dce9] bg-[#eaf6fb] px-3.5 py-2 text-[11px] font-semibold text-[#047b9a] transition-colors hover:bg-[#d8eef7] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#045d65]">Book</a>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        {!matches.length && <div className="px-6 py-12 text-center"><p className="font-semibold text-[#103b40]">{departments.length ? 'No tests match your search in this department.' : 'Browse our full test list or contact our team for help.'}</p>{search && <button type="button" onClick={() => setSearch('')} className="mt-4 rounded px-3 py-2 text-sm font-semibold text-[#045d65] underline focus-visible:outline-2">Clear search</button>}</div>}
                        {matches.length > 6 && <div className="border-t border-[#d7e5e8] pt-5 text-center"><Link href={`/lab-tests?${moreParams.toString()}`} className="inline-flex items-center gap-3 rounded-full border border-[#045d65]/25 bg-white px-5 py-2.5 text-xs font-bold text-[#045d65] transition-colors hover:bg-[#e1eeeb] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#045d65]">View more <ArrowUpRightIcon aria-hidden="true" className="h-4 w-4" /></Link></div>}
                    </div>
                </div>
            </div>
        </section>
    );
}
