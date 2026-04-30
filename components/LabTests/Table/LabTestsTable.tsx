'use client';
import { useState, useMemo, Fragment } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Listbox, Transition } from '@headlessui/react';
import { ChevronDownIcon, CheckIcon, MagnifyingGlassIcon, ClockIcon, BeakerIcon, BuildingOfficeIcon } from '@heroicons/react/20/solid';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { urlFor } from '@/lib/sanity';
import BookActionButton from '@/components/Booking/BookActionButton';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

const ITEMS_PER_PAGE = 40; // 10 rows of 4

const PLACEHOLDER_IMAGES = [
    '/lab-tests/lab-1.png',
    '/lab-tests/lab-2.png',
    '/lab-tests/lab-3.png',
    '/lab-tests/lab-4.png',
    '/lab-tests/lab-5.png',
    '/lab-tests/lab-6.png',
    '/lab-tests/lab-7.png',
    '/lab-tests/lab-8.png',
    '/lab-tests/lab-9.png',
];

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
                                <MagnifyingGlassIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-[#f88c29] transition-colors" />
                                <input
                                    type="text"
                                    placeholder="Search tests..."
                                    value={search}
                                    onChange={e => { setSearch(e.target.value); setPage(1); }}
                                    className="w-full pl-11 pr-4 py-4 bg-[#f8fafc] border-2 border-transparent rounded-[1.2rem] text-[14px] text-gray-700 focus:outline-none focus:bg-white focus:border-[#f88c29]/30 focus:ring-4 focus:ring-[#f88c29]/5 transition-all"
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
                                        <Listbox.Button className="relative w-full cursor-pointer rounded-[1.2rem] bg-[#f8fafc] py-4 pl-4 pr-10 text-left text-[14px] text-gray-600 focus:outline-none ring-offset-2 border-2 border-transparent focus:border-[#f88c29]/30 transition-all">
                                            <span className="block truncate">{diseaseFilter || 'All Categories'}</span>
                                            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                                                <ChevronDownIcon className="h-4 w-4 text-gray-400" aria-hidden="true" />
                                            </span>
                                        </Listbox.Button>
                                        <Transition as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
                                            <Listbox.Options className="absolute z-50 mt-2 max-h-60 w-full overflow-auto rounded-xl bg-white py-1 text-[14px] shadow-2xl ring-1 ring-black/5 focus:outline-none">
                                                <Listbox.Option value="" className={({ active }) => cn("relative cursor-pointer select-none py-2.5 pl-10 pr-4", active ? "bg-[#f88c29]/5 text-[#f88c29]" : "text-gray-900")}>
                                                    {({ selected }) => <span className={cn("block truncate", selected ? "font-bold" : "font-normal")}>All Categories</span>}
                                                </Listbox.Option>
                                                {diseaseFilters.map((disease) => (
                                                    <Listbox.Option key={disease} value={disease} className={({ active }) => cn("relative cursor-pointer select-none py-2.5 pl-10 pr-4", active ? "bg-[#f88c29]/5 text-[#f88c29]" : "text-gray-900")}>
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
                                        <Listbox.Button className="relative w-full cursor-pointer rounded-[1.2rem] bg-[#f8fafc] py-4 pl-4 pr-10 text-left text-[14px] text-gray-600 focus:outline-none border-2 border-transparent focus:border-[#f88c29]/30 transition-all">
                                            <span className="block truncate">{departmentFilter || 'All Departments'}</span>
                                            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                                                <ChevronDownIcon className="h-4 w-4 text-gray-400" aria-hidden="true" />
                                            </span>
                                        </Listbox.Button>
                                        <Transition as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
                                            <Listbox.Options className="absolute z-50 mt-2 max-h-60 w-full overflow-auto rounded-xl bg-white py-1 text-[14px] shadow-2xl ring-1 ring-black/5 focus:outline-none">
                                                <Listbox.Option value="" className={({ active }) => cn("relative cursor-pointer select-none py-2.5 pl-10 pr-4", active ? "bg-[#f88c29]/5 text-[#f88c29]" : "text-gray-900")}>
                                                    {({ selected }) => <span className={cn("block truncate", selected ? "font-bold" : "font-normal")}>All Departments</span>}
                                                </Listbox.Option>
                                                {departments.map((dept) => (
                                                    <Listbox.Option key={dept} value={dept} className={({ active }) => cn("relative cursor-pointer select-none py-2.5 pl-10 pr-4", active ? "bg-[#f88c29]/5 text-[#f88c29]" : "text-gray-900")}>
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

                {/* Dense Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mb-12">
                    {paginated.map((test, i) => (
                        <div key={test.slug} className="group bg-white rounded-[1.8rem] border border-gray-100 shadow-[0_8px_30px_rgba(0,0,0,0.03)] hover:shadow-[0_15px_45px_rgba(248,140,41,0.1)] transition-all duration-300 flex overflow-hidden min-h-[180px] max-h-[220px]">
                            {/* Horizontal Image Section */}
                            <Link href={test.slug === 'nipt' ? `/departments/molecular/nipt` : `/lab-tests/${test.slug}`} className="relative w-40 flex-shrink-0 overflow-hidden border-r border-gray-100 block">
                                <Image
                                    src={test.image ? urlFor(test.image).url() : PLACEHOLDER_IMAGES[i % PLACEHOLDER_IMAGES.length]}
                                    alt={test.name}
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/10" />
                            </Link>

                            {/* Horizontal Content Area */}
                            <div className="p-4 flex flex-col justify-between flex-grow overflow-hidden">
                                <div className="overflow-hidden">
                                    <div className="flex items-center justify-between mb-1.5 min-h-[1.2rem]">
                                        <span className="text-[9px] font-bold text-[#307984] uppercase tracking-wider bg-[#307984]/5 px-2 py-0.5 rounded-full truncate max-w-[120px]">
                                            {test.diseaseFilter || 'General'}
                                        </span>
                                    </div>
                                    <Link href={test.slug === 'nipt' ? `/departments/molecular/nipt` : `/lab-tests/${test.slug}`}>
                                        <h3 className="text-[14px] font-bold text-gray-900 group-hover:text-[#f88c29] transition-colors leading-tight line-clamp-2 mb-2">
                                            {test.name}
                                        </h3>
                                    </Link>
                                    
                                    <div className="grid grid-cols-1 gap-1">
                                        <div className="flex items-center gap-2 text-gray-500">
                                            <ClockIcon className="w-3.5 h-3.5 text-[#f88c29]/40" />
                                            <span className="text-[10px] font-medium truncate">{test.tat || 'Contact Lab'}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-gray-500">
                                            <BeakerIcon className="w-3.5 h-3.5 text-[#f88c29]/40" />
                                            <span className="text-[10px] font-medium truncate">
                                                {test.sampleType && test.sampleType.length > 0 ? test.sampleType.join(', ') : 'Check Sample'}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Compact Actions */}
                                <div className="flex items-center gap-2 mt-3 pt-3 border-t border-gray-50">
                                    <BookActionButton
                                        label="Book Now"
                                        whatsappText={`Hi, I would like to book the ${test.name} test.`}
                                        className="flex-1 py-2 bg-[#f88c29] hover:bg-[#e67b1d] text-white text-[11px] font-bold rounded-lg text-center transition-all shadow-md"
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                    
                    {paginated.length === 0 && (
                        <div className="col-span-full py-16 text-center">
                            <h3 className="text-lg font-bold text-gray-900">No tests found</h3>
                            <button onClick={clearFilters} className="mt-4 text-[#f88c29] font-bold text-sm hover:underline">
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
                                    p === page ? 'bg-[#f88c29] text-white shadow-md' : 'bg-white border border-gray-100 text-gray-500 hover:bg-gray-50'
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
