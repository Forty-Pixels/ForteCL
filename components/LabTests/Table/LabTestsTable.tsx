'use client';
import { useState, useMemo, Fragment } from 'react';
import Link from 'next/link';
import { Listbox, Transition } from '@headlessui/react';
import { ChevronDownIcon, CheckIcon, MagnifyingGlassIcon } from '@heroicons/react/20/solid';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

const ITEMS_PER_PAGE = 15;

interface LabTestsTableProps {
    tests: any[];
    diseaseFilters: string[];
    departments: string[];
}

export default function LabTestsTable({ tests, diseaseFilters, departments }: LabTestsTableProps) {
    const [search, setSearch] = useState('');
    const [diseaseFilter, setDiseaseFilter] = useState('');
    const [departmentFilter, setDepartmentFilter] = useState('');
    const [page, setPage] = useState(1);

    const filtered = useMemo(() => {
        return (tests || []).filter(t => {
            const matchName = t.name.toLowerCase().includes(search.toLowerCase());
            const matchDisease = !diseaseFilter || t.diseaseFilter === diseaseFilter;
            const matchDept = !departmentFilter || t.department === departmentFilter;
            return matchName && matchDisease && matchDept;
        });
    }, [search, diseaseFilter, departmentFilter, tests]);

    const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
    const paginated = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

    const clearFilters = () => {
        setSearch('');
        setDiseaseFilter('');
        setDepartmentFilter('');
        setPage(1);
    };

    return (
        <section className="bg-white py-16 relative z-20">
            <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-12 xl:px-20">
                {/* Modern Search & Filter Card */}
                <div className="bg-white p-6 md:p-10 rounded-[2.5rem] shadow-[0_30px_70px_rgba(0,0,0,0.08)] mb-20 border border-gray-100">
                    <div className="grid grid-cols-1 md:grid-cols-[1.8fr_1fr_1fr_0.4fr] gap-8 items-end">
                        
                        {/* Search Database */}
                        <div className="flex flex-col space-y-3">
                            <label className="text-[11px] font-bold text-gray-400 uppercase tracking-[0.15em] pl-1">
                                Search Database
                            </label>
                            <div className="relative group">
                                <MagnifyingGlassIcon className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-[#307984] transition-colors" />
                                <input
                                    type="text"
                                    placeholder="e.g. Vitamin D, CBC, Thyroid..."
                                    value={search}
                                    onChange={e => { setSearch(e.target.value); setPage(1); }}
                                    className="w-full pl-14 pr-4 py-5 bg-[#f8fafc] border-2 border-transparent rounded-[1.5rem] text-[15px] text-gray-700 focus:outline-none focus:bg-white focus:border-[#307984]/30 focus:ring-4 focus:ring-[#307984]/5 transition-all placeholder:text-gray-400"
                                />
                            </div>
                        </div>

                        {/* Category Dropdown */}
                        <div className="flex flex-col space-y-3">
                            <label className="text-[11px] font-bold text-gray-400 uppercase tracking-[0.15em] pl-1">
                                Category
                            </label>
                            <div className="relative">
                                <Listbox
                                    value={diseaseFilter}
                                    onChange={(val) => { setDiseaseFilter(val); setPage(1); }}
                                >
                                    <div className="relative">
                                        <Listbox.Button className="relative w-full cursor-pointer rounded-[1.5rem] bg-[#f8fafc] py-5 pl-5 pr-12 text-left text-[15px] text-gray-600 focus:outline-none focus:ring-4 focus:ring-[#307984]/5 border-2 border-transparent focus:border-[#307984]/30 transition-all">
                                            <span className="block truncate">{diseaseFilter || 'All Categories'}</span>
                                            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4">
                                                <ChevronDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                            </span>
                                        </Listbox.Button>
                                        <Transition
                                            as={Fragment}
                                            leave="transition ease-in duration-100"
                                            leaveFrom="opacity-100"
                                            leaveTo="opacity-0"
                                        >
                                            <Listbox.Options className="absolute z-50 mt-2 max-h-72 w-full overflow-auto rounded-2xl bg-white py-2 text-[15px] shadow-2xl ring-1 ring-black/5 focus:outline-none scrollbar-hide">
                                                <Listbox.Option
                                                    value=""
                                                    className={({ active }) => cn("relative cursor-pointer select-none py-3 pl-10 pr-4 transition-colors", active ? "bg-[#307984]/5 text-[#307984]" : "text-gray-900")}
                                                >
                                                    {({ selected }) => (
                                                        <>
                                                            <span className={cn("block truncate", selected ? "font-bold text-[#307984]" : "font-normal")}>All Categories</span>
                                                            {selected && <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-[#307984]"><CheckIcon className="h-5 w-5" aria-hidden="true" /></span>}
                                                        </>
                                                    )}
                                                </Listbox.Option>
                                                {(diseaseFilters || []).sort().map((disease) => (
                                                    <Listbox.Option
                                                        key={disease}
                                                        value={disease}
                                                        className={({ active }) => cn("relative cursor-pointer select-none py-3 pl-10 pr-4 transition-colors", active ? "bg-[#307984]/5 text-[#307984]" : "text-gray-900")}
                                                    >
                                                        {({ selected }) => (
                                                            <>
                                                                <span className={cn("block truncate", selected ? "font-bold text-[#307984]" : "font-normal")}>{disease}</span>
                                                                {selected && <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-[#307984]"><CheckIcon className="h-5 w-5" aria-hidden="true" /></span>}
                                                            </>
                                                        )}
                                                    </Listbox.Option>
                                                ))}
                                            </Listbox.Options>
                                        </Transition>
                                    </div>
                                </Listbox>
                            </div>
                        </div>

                        {/* Department Dropdown */}
                        <div className="flex flex-col space-y-3">
                            <label className="text-[11px] font-bold text-gray-400 uppercase tracking-[0.15em] pl-1">
                                Department
                            </label>
                            <div className="relative">
                                <Listbox
                                    value={departmentFilter}
                                    onChange={(val) => { setDepartmentFilter(val); setPage(1); }}
                                >
                                    <div className="relative">
                                        <Listbox.Button className="relative w-full cursor-pointer rounded-[1.5rem] bg-[#f8fafc] py-5 pl-5 pr-12 text-left text-[15px] text-gray-600 focus:outline-none focus:ring-4 focus:ring-[#307984]/5 border-2 border-transparent focus:border-[#307984]/30 transition-all">
                                            <span className="block truncate">{departmentFilter || 'All Departments'}</span>
                                            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4">
                                                <ChevronDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                            </span>
                                        </Listbox.Button>
                                        <Transition
                                            as={Fragment}
                                            leave="transition ease-in duration-100"
                                            leaveFrom="opacity-100"
                                            leaveTo="opacity-0"
                                        >
                                            <Listbox.Options className="absolute z-50 mt-2 max-h-72 w-full overflow-auto rounded-2xl bg-white py-2 text-[15px] shadow-2xl ring-1 ring-black/5 focus:outline-none scrollbar-hide">
                                                <Listbox.Option
                                                    value=""
                                                    className={({ active }) => cn("relative cursor-pointer select-none py-3 pl-10 pr-4 transition-colors", active ? "bg-[#307984]/5 text-[#307984]" : "text-gray-900")}
                                                >
                                                    {({ selected }) => (
                                                        <>
                                                            <span className={cn("block truncate", selected ? "font-bold text-[#307984]" : "font-normal")}>All Departments</span>
                                                            {selected && <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-[#307984]"><CheckIcon className="h-5 w-5" aria-hidden="true" /></span>}
                                                        </>
                                                    )}
                                                </Listbox.Option>
                                                {(departments || []).sort().map((dept) => (
                                                    <Listbox.Option
                                                        key={dept}
                                                        value={dept}
                                                        className={({ active }) => cn("relative cursor-pointer select-none py-3 pl-10 pr-4 transition-colors", active ? "bg-[#307984]/5 text-[#307984]" : "text-gray-900")}
                                                    >
                                                        {({ selected }) => (
                                                            <>
                                                                <span className={cn("block truncate", selected ? "font-bold text-[#307984]" : "font-normal")}>{dept}</span>
                                                                {selected && <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-[#307984]"><CheckIcon className="h-5 w-5" aria-hidden="true" /></span>}
                                                            </>
                                                        )}
                                                    </Listbox.Option>
                                                ))}
                                            </Listbox.Options>
                                        </Transition>
                                    </div>
                                </Listbox>
                            </div>
                        </div>

                        {/* Reset Button */}
                        <div className="flex">
                            <button
                                onClick={clearFilters}
                                className="w-full py-5 bg-[#0f172a] hover:bg-[#1e293b] text-white rounded-[1.5rem] text-[15px] font-bold transition-all shadow-[0_15px_30px_rgba(15,23,42,0.15)] flex items-center justify-center gap-2"
                            >
                                Reset
                            </button>
                        </div>
                    </div>
                </div>

                {/* Table Title Block */}
                <div className="flex flex-col md:flex-row items-center justify-between mb-10 gap-4">
                    <div className="text-center md:text-left">
                        <h2 className="text-3xl font-bold text-gray-900 mb-1">
                            Diagnostics Database
                        </h2>
                        <p className="text-sm text-gray-500 font-medium">
                            Premium diagnostic testing with DHA approved results.
                        </p>
                    </div>
                    <div className="bg-gray-50 px-5 py-2.5 rounded-full border border-gray-100">
                        <p className="text-sm text-gray-600">
                            Showing <span className="text-[#307984] font-bold">{filtered.length} entries</span> in total
                        </p>
                    </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto rounded-xl border border-gray-100 shadow-sm">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-[#111111] text-white">
                                <th className="px-4 py-4 text-xs font-semibold uppercase tracking-wider w-16">S. No</th>
                                <th className="px-4 py-4 text-xs font-semibold uppercase tracking-wider">Test Name</th>
                                <th className="px-4 py-4 text-xs font-semibold uppercase tracking-wider hidden md:table-cell">Disease Filter</th>
                                <th className="px-4 py-4 text-xs font-semibold uppercase tracking-wider hidden lg:table-cell">Department</th>
                                <th className="px-4 py-4 text-xs font-semibold uppercase tracking-wider hidden lg:table-cell w-24">TAT</th>
                                <th className="px-4 py-4 text-xs font-semibold uppercase tracking-wider hidden xl:table-cell">Sample Type</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paginated.map((test, i) => (
                                <tr key={test.slug} className={`border-b border-gray-50 hover:bg-gray-50/80 transition-colors ${i % 2 === 0 ? 'bg-white' : 'bg-gray-50/40'}`}>
                                    <td className="px-4 py-4 text-sm text-gray-500">{(page - 1) * ITEMS_PER_PAGE + i + 1}</td>
                                    <td className="px-4 py-4">
                                        <div className="flex items-center gap-3">
                                            <Link href={`/lab-tests/${test.slug}`} className="text-sm font-medium text-[#307984] hover:text-[#245d65] transition-colors hover:underline">
                                                {test.name}
                                            </Link>
                                            <Link href={`/lab-tests/${test.slug}`} className="px-3 py-1 bg-[#307984] text-white text-xs rounded-md font-medium hover:bg-[#245d65] transition-colors flex-shrink-0">
                                                View
                                            </Link>
                                        </div>
                                    </td>
                                    <td className="px-4 py-4 text-sm text-gray-600 hidden md:table-cell">{test.diseaseFilter}</td>
                                    <td className="px-4 py-4 text-sm text-gray-600 hidden lg:table-cell">{test.department}</td>
                                    <td className="px-4 py-4 text-sm text-gray-600 hidden lg:table-cell">{test.tat}</td>
                                    <td className="px-4 py-4 hidden xl:table-cell">
                                        <ul className="text-xs text-gray-500 space-y-1">
                                            {(test.sampleType || []).map((s: string, j: number) => (
                                                <li key={j} className="flex items-start gap-1.5">
                                                    <span className="text-[#307984] mt-0.5">•</span>{s}
                                                </li>
                                            ))}
                                        </ul>
                                    </td>
                                </tr>
                            ))}
                            {paginated.length === 0 && (
                                <tr>
                                    <td colSpan={6} className="px-4 py-12 text-center text-gray-400 text-sm">
                                        No tests found matching your criteria.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="flex items-center justify-center gap-2 mt-8">
                        <button
                            onClick={() => setPage(p => Math.max(1, p - 1))}
                            disabled={page === 1}
                            className="px-3 py-2 rounded-lg border border-gray-200 text-sm text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                        >
                            ‹
                        </button>
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                            <button
                                key={p}
                                onClick={() => setPage(p)}
                                className={`w-10 h-10 rounded-lg text-sm font-medium transition-colors ${
                                    p === page
                                        ? 'bg-[#307984] text-white'
                                        : 'border border-gray-200 text-gray-600 hover:bg-gray-50'
                                }`}
                            >
                                {p}
                            </button>
                        ))}
                        <button
                            onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                            disabled={page === totalPages}
                            className="px-3 py-2 rounded-lg border border-gray-200 text-sm text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                        >
                            ›
                        </button>
                    </div>
                )}

                {/* Results count */}
                <p className="text-center text-xs text-gray-400 mt-4">
                    Showing {paginated.length} of {filtered.length} tests
                </p>
            </div>
        </section>
    );
}
