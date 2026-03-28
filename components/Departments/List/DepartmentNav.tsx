'use client';

import { useState, useEffect } from 'react';
import { DEPARTMENTS_DATA } from '@/constants/departments';

export default function DepartmentNav() {
    const [activeSection, setActiveSection] = useState(DEPARTMENTS_DATA[0].id);

    useEffect(() => {
        const handleScroll = () => {
            const sections = DEPARTMENTS_DATA.map(d => document.getElementById(d.id));
            const scrollPosition = window.scrollY + 180; // Adjusted for sticky navs

            for (const section of sections) {
                if (section && section.offsetTop <= scrollPosition && section.offsetTop + section.offsetHeight > scrollPosition) {
                    setActiveSection(section.id);
                    break;
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            const offset = 160; // Should match section top offset
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.scrollY - offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    };

    return (
        <nav className="bg-white border-b border-gray-100 shadow-sm overflow-x-auto scrollbar-hide py-1">
            <div className="max-w-7xl mx-auto px-4 flex items-center justify-start lg:justify-center gap-2 sm:gap-4 h-14 min-w-max">
                {DEPARTMENTS_DATA.map((dept) => (
                    <button
                        key={dept.id}
                        onClick={() => scrollToSection(dept.id)}
                        className={`px-3 sm:px-4 py-1.5 rounded-full text-[10px] sm:text-xs font-bold transition-all duration-300 whitespace-nowrap ${
                            activeSection === dept.id
                                ? 'bg-[#307984] text-white shadow-md'
                                : 'text-gray-500 hover:text-[#307984] hover:bg-gray-50'
                        }`}
                    >
                        {dept.title.replace(' Department', '')}
                    </button>
                ))}
            </div>
        </nav>
    );
}
