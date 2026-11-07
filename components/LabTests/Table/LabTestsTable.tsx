'use client';
import { useState, useMemo, Fragment } from 'react';
import Link from 'next/link';
import { Listbox, Transition } from '@headlessui/react';
import { ChevronDownIcon, MagnifyingGlassIcon, ClockIcon, BeakerIcon } from '@heroicons/react/20/solid';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import BookActionButton from '@/components/Booking/BookActionButton';
import { getTestLink, getDepartmentTitle } from '@/lib/department-utils';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

const ITEMS_PER_PAGE = 20;

interface LabTestsTableProps {
    tests: {
        slug: string;
        name: string;
        department?: string;
        departmentSlug?: string;
        diseaseFilter?: string;
        sampleType?: string[];
        tat?: string;
    }[];
    diseaseFilters: string[];
    departments: string[];
    initialDepartment?: string;
    initialSearch?: string;
}

export default function LabTestsTable({ tests, diseaseFilters, departments, initialDepartment = '', initialSearch = '' }: LabTestsTableProps) {
    const [search, setSearch] = useState(initialSearch);
    const [diseaseFilter, setDiseaseFilter] = useState('');
    const [departmentFilter, setDepartmentFilter] = useState(initialDepartment);
    const [page, setPage] = useState(1);

    const filtered = useMemo(() => {
        return (tests || []).filter(t => {
            const matchName = t.name.toLowerCase().includes(search.trim().toLowerCase());
            const matchDisease = !diseaseFilter || t.diseaseFilter === diseaseFilter;
            const matchDept = !departmentFilter || getDepartmentTitle(t.department, t.departmentSlug) === departmentFilter;
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
        <section className="bg-white py-12 relative z-20">
            <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-12 xl:px-20">
                {/* Compact Search & Filter Card */}
                <div className="bg-white p-6 md:p-8 rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.06)] mb-12 border border-gray-100">
                    <div className="grid grid-cols-1 md:grid-cols-[1.5fr_1fr_1fr_0.4fr] gap-6 items-end">
                        
                        {/* Search Database */}
                        <div className="flex flex-col space-y-2">
                            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.1em] pl-1">
                                Search Database
                            </label>
                            <div className="relative group">
                                <MagnifyingGlassIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-[#045d65] transition-colors" />
                                <input
                                    type="text"
                                    placeholder="Search tests..."
                                    value={search}
                                    onChange={e => { setSearch(e.target.value); setPage(1); }}
                                    className="w-full pl-11 pr-4 py-4 bg-[#f8fafc] border-2 border-transparent rounded-[1.2rem] text-[14px] text-gray-700 focus:outline-none focus:bg-white focus:border-[#045d65]/30 focus:ring-4 focus:ring-[#045d65]/5 transition-all"
                                />
                            </div>
                        </div>

                        {/* Category Dropdown */}
                        <div className="flex flex-col space-y-2">
                            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.1em] pl-1">
                                Category
                            </label>
                            <div className="relative">
                                <Listbox value={diseaseFilter} onChange={(val) => { setDiseaseFilter(val); setPage(1); }}>
                                    <div className="relative">
                                        <Listbox.Button className="relative w-full cursor-pointer rounded-[1.2rem] bg-[#f8fafc] py-4 pl-4 pr-10 text-left text-[14px] text-gray-600 focus:outline-none ring-offset-2 border-2 border-transparent focus:border-[#045d65]/30 transition-all">
                                            <span className="block truncate">{diseaseFilter || 'All Categories'}</span>
                                            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                                                <ChevronDownIcon className="h-4 w-4 text-gray-400" aria-hidden="true" />
                                            </span>
                                        </Listbox.Button>
                                        <Transition as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
                                            <Listbox.Options className="absolute z-50 mt-2 max-h-60 w-full overflow-auto rounded-xl bg-white py-1 text-[14px] shadow-2xl ring-1 ring-black/5 focus:outline-none">
                                                <Listbox.Option value="" className={({ active }) => cn("relative cursor-pointer select-none py-2.5 pl-10 pr-4", active ? "bg-[#045d65]/5 text-[#045d65]" : "text-gray-900")}>
                                                    {({ selected }) => <span className={cn("block truncate", selected ? "font-bold" : "font-normal")}>All Categories</span>}
                                                </Listbox.Option>
                                                {diseaseFilters.map((disease) => (
                                                    <Listbox.Option key={disease} value={disease} className={({ active }) => cn("relative cursor-pointer select-none py-2.5 pl-10 pr-4", active ? "bg-[#045d65]/5 text-[#045d65]" : "text-gray-900")}>
                                                        {({ selected }) => <span className={cn("block truncate", selected ? "font-bold" : "font-normal")}>{disease}</span>}
                                                    </Listbox.Option>
                                                ))}
                                            </Listbox.Options>
                                        </Transition>
                                    </div>
                                </Listbox>
                            </div>
                        </div>

                        {/* Department Dropdown */}
                        <div className="flex flex-col space-y-2">
                            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.1em] pl-1">
                                Department
                            </label>
                            <div className="relative">
                                <Listbox value={departmentFilter} onChange={(val) => { setDepartmentFilter(val); setPage(1); }}>
                                    <div className="relative">
                                        <Listbox.Button className="relative w-full cursor-pointer rounded-[1.2rem] bg-[#f8fafc] py-4 pl-4 pr-10 text-left text-[14px] text-gray-600 focus:outline-none border-2 border-transparent focus:border-[#045d65]/30 transition-all">
                                            <span className="block truncate">{departmentFilter || 'All Departments'}</span>
                                            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                                                <ChevronDownIcon className="h-4 w-4 text-gray-400" aria-hidden="true" />
                                            </span>
                                        </Listbox.Button>
                                        <Transition as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
                                            <Listbox.Options className="absolute z-50 mt-2 max-h-60 w-full overflow-auto rounded-xl bg-white py-1 text-[14px] shadow-2xl ring-1 ring-black/5 focus:outline-none">
                                                <Listbox.Option value="" className={({ active }) => cn("relative cursor-pointer select-none py-2.5 pl-10 pr-4", active ? "bg-[#045d65]/5 text-[#045d65]" : "text-gray-900")}>
                                                    {({ selected }) => <span className={cn("block truncate", selected ? "font-bold" : "font-normal")}>All Departments</span>}
                                                </Listbox.Option>
                                                {departments.map((dept) => (
                                                    <Listbox.Option key={dept} value={dept} className={({ active }) => cn("relative cursor-pointer select-none py-2.5 pl-10 pr-4", active ? "bg-[#045d65]/5 text-[#045d65]" : "text-gray-900")}>
                                                        {({ selected }) => <span className={cn("block truncate", selected ? "font-bold" : "font-normal")}>{dept}</span>}
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
                                className="w-full py-4 bg-[#0f172a] hover:bg-[#1e293b] text-white rounded-[1.2rem] text-[13px] font-bold transition-all"
                            >
                                Reset
                            </button>
                        </div>
                    </div>
                </div>

                {/* Text-only test directory */}
                <div className="mb-12 overflow-hidden rounded-2xl border border-gray-200 bg-white divide-y divide-gray-100">
                    {paginated.map((test) => (
                        <div key={test.slug} className="grid gap-4 p-5 transition-colors hover:bg-[#f5faf9] sm:p-6 lg:grid-cols-[minmax(0,2fr)_minmax(0,1.4fr)_auto] lg:items-center lg:gap-8">
                            <div className="min-w-0">
                                <span className="mb-2 inline-block rounded-full bg-[#eaf4f4] px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-[#307984]">
                                    {test.diseaseFilter || 'General'}
                                </span>
                                <Link href={getTestLink(test)} className="block text-base font-bold leading-snug text-gray-900 hover:text-[#045d65] sm:text-lg">
                                    {test.name}
                                </Link>
                                <p className="mt-1 text-xs text-gray-500">{getDepartmentTitle(test.department, test.departmentSlug) || 'Medical Test'}</p>
                            </div>
                            <div className="flex min-w-0 flex-wrap gap-x-6 gap-y-2 text-sm text-gray-600 lg:gap-x-3">
                                <span className="inline-flex items-start gap-2"><BeakerIcon className="mt-0.5 h-4 w-4 shrink-0 text-[#307984]" /><span>{test.sampleType?.length ? test.sampleType.join(', ') : 'Contact lab for sample'}</span></span>
                                <span className="inline-flex items-start gap-2"><ClockIcon className="mt-0.5 h-4 w-4 shrink-0 text-[#307984]" /><span>{test.tat || 'Contact lab for results'}</span></span>
                            </div>
                            <BookActionButton
                                label="Book Now"
                                whatsappText={`Hi, I would like to book the ${test.name} test.`}
                                className="w-full rounded-lg bg-[#045d65] px-5 py-2.5 text-center text-sm font-bold text-white transition-colors hover:bg-[#034b52] sm:w-fit lg:justify-self-end"
                            />
                        </div>
                    ))}
                    
                    {paginated.length === 0 && (
                        <div className="col-span-full py-16 text-center">
                            <h3 className="text-lg font-bold text-gray-900">No tests found</h3>
                            <button onClick={clearFilters} className="mt-4 text-[#045d65] font-bold text-sm hover:underline">
                                Clear all filters
                            </button>
                        </div>
                    )}
                </div>

                {/* pagination as small circles */}
                {totalPages > 1 && (
                    <div className="flex items-center justify-center gap-2">
                         <button
                            onClick={() => setPage(p => Math.max(1, p - 1))}
                            disabled={page === 1}
                            className="w-10 h-10 flex items-center justify-center rounded-xl border border-gray-100 text-gray-600 hover:bg-gray-50 disabled:opacity-40"
                        >
                            ‹
                        </button>
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                            <button
                                key={p}
                                onClick={() => setPage(p)}
                                className={cn(
                                    "w-10 h-10 rounded-xl text-xs font-bold transition-all",
                                    p === page ? 'bg-[#045d65] text-white shadow-md' : 'bg-white border border-gray-100 text-gray-500 hover:bg-gray-50'
                                )}
                            >
                                {p}
                            </button>
                        )).slice(Math.max(0, page - 3), Math.min(totalPages, page + 2))}
                        <button
                            onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                            disabled={page === totalPages}
                            className="w-10 h-10 flex items-center justify-center rounded-xl border border-gray-100 text-gray-600 hover:bg-gray-50 disabled:opacity-40"
                        >
                            ›
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
}
