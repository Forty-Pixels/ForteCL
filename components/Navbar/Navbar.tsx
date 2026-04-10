'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface NavbarProps {
    currentPage?: 'Home' | 'Lab Tests' | 'Packages' | 'Departments' | 'Resources' | 'About' | 'Contact';
}

export default function Navbar({ currentPage }: NavbarProps) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [openMobileSubmenus, setOpenMobileSubmenus] = useState<string[]>([]);

    const toggleMobileSubmenu = (name: string) => {
        setOpenMobileSubmenus(prev => 
            prev.includes(name) ? prev.filter(i => i !== name) : [...prev, name]
        );
    };

    // Lock scroll when menu is open
    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = 'hidden';
            document.documentElement.style.overflow = 'hidden';
            document.documentElement.classList.add('menu-open');
        } else {
            document.body.style.overflow = '';
            document.documentElement.style.overflow = '';
            document.documentElement.classList.remove('menu-open');
        }
    }, [isMenuOpen]);

    // Handle scroll to add background to navbar
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Home', href: '/' },
        { 
            name: 'Test List', 
            href: '#',
            submenu: [
                { name: 'Find A Test', href: '/lab-tests' },
                { name: 'Packages', href: '/packages' }
            ]
        },
        { name: 'Departments', href: '/departments' },
        { name: 'Resources', href: '/resources' },
        { name: 'About', href: '/about' },
        { name: 'Contact', href: '/contact' },
    ];

    // Helper to check if link is active
    const isActive = (link: any) => {
        if (link.href !== '#' && link.name === currentPage) return true;
        if (link.submenu) {
            return link.submenu.some((sub: any) => sub.name === currentPage);
        }
        return false;
    };

    return (
        <>
        <header className={`fixed top-0 left-0 right-0 w-full z-[100] transition-all duration-300 bg-white ${isScrolled ? 'shadow-lg py-2' : 'py-3 sm:py-4'}`}>
            <nav className="relative flex items-center justify-between px-4 sm:px-8 max-w-7xl mx-auto w-full">
                {/* Left: Logo */}
                <div className="flex-shrink-0 z-50">
                    <Link href="/">
                        <Image
                            src="/fortecl-logo3.png"
                        alt="Forte Clinical Laboratory"
                        width={140}
                        height={40}
                        className="object-contain cursor-pointer sm:w-[150px] sm:h-[50px]"
                        priority
                    />
                </Link>
            </div>

            <div className="hidden lg:flex items-center space-x-8">
                {navLinks.map((link) => (
                    <div key={link.name} className="relative group lg:py-4">
                        {link.submenu ? (
                            <div className="flex items-center gap-1 cursor-pointer">
                                <span className={`text-sm ${isActive(link) ? 'text-[#f88c29]' : 'text-gray-800'} group-hover:text-[#f88c29] font-medium transition-colors`}>
                                    {link.name}
                                </span>
                                <svg 
                                    className={`w-4 h-4 transition-transform duration-200 group-hover:rotate-180 ${isActive(link) ? 'text-[#f88c29]' : 'text-gray-400'}`} 
                                    fill="none" 
                                    stroke="currentColor" 
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                                
                                {/* Dropdown Menu */}
                                <div className="absolute top-full left-0 mt-0 w-48 bg-[#307984] rounded-lg shadow-xl opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-200 z-[110]">
                                    <div className="py-2">
                                        {link.submenu.map((sub) => (
                                            <Link
                                                key={sub.name}
                                                href={sub.href}
                                                className="block px-4 py-2 text-sm text-white hover:bg-white/10 hover:text-[#f88c29] transition-colors"
                                            >
                                                {sub.name}
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <Link
                                href={link.href}
                                className={`text-sm ${isActive(link) ? 'text-[#f88c29]' : 'text-gray-800'} hover:text-[#f88c29] font-medium transition-colors`}
                            >
                                {link.name}
                            </Link>
                        )}
                    </div>
                ))}
            </div>

            {/* Right: Contact Button & Mobile Menu Toggle */}
            <div className="flex items-center gap-4 z-50">
                <Link href="/contact" className="hidden sm:inline-flex items-center justify-center bg-[#307984] text-white px-5 py-2 rounded-full text-sm font-medium transition-transform hover:scale-105">
                    <svg
                        className="w-4 h-4 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                        />
                    </svg>
                    Contact
                </Link>

                {/* Hamburger Icon for Mobile */}
                <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="lg:hidden text-gray-800 p-2 focus:outline-none transition-colors hover:text-[#f88c29]"
                    aria-label="Toggle mobile menu"
                >
                    {isMenuOpen ? (
                        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    ) : (
                        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                        </svg>
                    )}
                </button>
            </div>
        </nav>
        </header>

            {/* Mobile Menu Overlay */}
            <div
                className={`fixed inset-0 z-[200] lg:hidden transition-all duration-500 ease-in-out ${isMenuOpen
                    ? 'opacity-100 pointer-events-auto'
                    : 'opacity-0 pointer-events-none'
                    }`}
            >
                {/* Dark Backdrop */}
                <div className="absolute inset-0 bg-[#061414]/98 backdrop-blur-2xl"></div>

                {/* Close Button & Logo Area */}
                <div className="absolute top-0 left-0 right-0 flex items-center justify-between px-4 sm:px-8 py-6 z-50 bg-white shadow-sm">
                    <Link href="/" onClick={() => setIsMenuOpen(false)}>
                        <Image
                            src="/fortecl-logo3.png"
                            alt="Logo"
                            width={140}
                            height={40}
                            className="object-contain sm:w-[150px] sm:h-[50px]"
                        />
                    </Link>
                    <button
                        onClick={() => setIsMenuOpen(false)}
                        className="text-gray-800 p-2 hover:text-[#f88c29] transition-colors"
                        aria-label="Close menu"
                    >
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Menu Content */}
                <div className="relative h-full flex flex-col justify-start pt-36 px-10 pb-20 overflow-y-auto">
                    <div className="space-y-6 sm:space-y-8">
                        {navLinks.map((link, index) => (
                            <div
                                key={link.name}
                                className={`transform transition-all duration-500 delay-[${index * 100}ms] ${isMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                                    }`}
                            >
                                {link.submenu ? (
                                    <div className="flex flex-col">
                                        <button 
                                            onClick={() => toggleMobileSubmenu(link.name)}
                                            className="flex items-center justify-between w-full text-3xl sm:text-4xl font-bold tracking-tight text-white hover:text-[#f88c29] transition-colors group"
                                        >
                                            <span>{link.name}</span>
                                            <svg 
                                                className={`w-8 h-8 transition-transform duration-300 ${openMobileSubmenus.includes(link.name) ? 'rotate-180 text-[#f88c29]' : 'text-white/40'}`} 
                                                fill="none" 
                                                stroke="currentColor" 
                                                viewBox="0 0 24 24"
                                            >
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </button>
                                        
                                        <div className={`grid transition-all duration-300 ease-in-out ${openMobileSubmenus.includes(link.name) ? 'grid-rows-[1fr] opacity-100 mt-6' : 'grid-rows-[0fr] opacity-0 mt-0'}`}>
                                            <div className="overflow-hidden">
                                                <div className="flex flex-col space-y-4 pl-4 border-l border-[#307984]/30">
                                                    {link.submenu.map((sub) => (
                                                        <Link
                                                            key={sub.name}
                                                            href={sub.href}
                                                            onClick={() => setIsMenuOpen(false)}
                                                            className={`text-2xl sm:text-3xl font-bold tracking-tight ${isActive({ name: sub.name, href: sub.href }) ? 'text-[#f88c29]' : 'text-white/70'
                                                                } hover:text-[#f88c29] transition-colors flex items-center group`}
                                                        >
                                                            {sub.name}
                                                            <span className="ml-4 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-xl">→</span>
                                                        </Link>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <Link
                                        href={link.href}
                                        onClick={() => {
                                            setIsMenuOpen(false);
                                            setOpenMobileSubmenus([]);
                                        }}
                                        className={`text-3xl sm:text-4xl font-bold tracking-tight ${isActive(link) ? 'text-[#f88c29]' : 'text-white'
                                            } hover:text-[#f88c29] transition-colors flex items-center group`}
                                    >
                                        {link.name}
                                        <span className="ml-4 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-xl">→</span>
                                    </Link>
                                )}
                            </div>
                        ))}
                    </div>

                    <div className={`mt-12 transform transition-all duration-700 delay-[600ms] ${isMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                        }`}>
                        <Link
                            href="/contact"
                            onClick={() => setIsMenuOpen(false)}
                            className="inline-flex items-center text-white/60 text-base hover:text-[#f88c29] transition-colors"
                        >
                            <span className="w-12 h-[1px] bg-[#307984] mr-4"></span>
                            Need assistance? Contact our team
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}
