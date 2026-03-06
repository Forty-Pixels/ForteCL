'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface NavbarProps {
    currentPage?: 'Home' | 'Lab Tests' | 'Packages' | 'Departments' | 'About' | 'Contact';
}

export default function Navbar({ currentPage }: NavbarProps) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // Lock scroll when menu is open
    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [isMenuOpen]);

    const navLinks = [
        { name: 'Home', href: '/' },
        { name: 'Lab Tests', href: '/lab-tests' },
        { name: 'Packages', href: '/packages' },
        { name: 'Departments', href: '/departments' },
        { name: 'About', href: '/about' },
        { name: 'Contact', href: '/contact' },
    ];

    // Helper to check if link is active
    const isActive = (name: string) => {
        return name === currentPage;
    };

    return (
        <nav className="relative z-50 flex items-center justify-between px-4 sm:px-8 py-6 max-w-7xl mx-auto w-full">
            {/* Left: Logo */}
            <div className="flex-shrink-0 z-50">
                <Link href="/">
                    <Image
                        src="/fortecl-logo1.png"
                        alt="Forte Clinical Laboratory"
                        width={160}
                        height={50}
                        className="object-contain cursor-pointer sm:w-[180px] sm:h-[60px]"
                        priority
                    />
                </Link>
            </div>

            {/* Center: Nav Links (Desktop Only) */}
            <div className="hidden lg:flex items-center space-x-8">
                {navLinks.slice(0, 5).map((link) => (
                    <Link
                        key={link.name}
                        href={link.href}
                        className={`${isActive(link.name) ? 'text-[#2DD4BF]' : 'text-white hover:text-[#2DD4BF]'} font-medium transition-colors`}
                    >
                        {link.name}
                    </Link>
                ))}
            </div>

            {/* Right: Contact Button & Mobile Menu Toggle */}
            <div className="flex items-center gap-4 z-50">
                <Link href="/contact" className="hidden sm:inline-flex items-center justify-center bg-[#2DD4BF] text-white px-6 py-2.5 rounded-full font-medium transition-transform hover:scale-105">
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
                    className="lg:hidden text-white p-2 focus:outline-none transition-colors hover:text-[#2DD4BF]"
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

            {/* Mobile Menu Overlay */}
            <div
                className={`fixed inset-0 z-[60] lg:hidden transition-all duration-500 ease-in-out ${isMenuOpen
                    ? 'opacity-100 pointer-events-auto'
                    : 'opacity-0 pointer-events-none'
                    }`}
            >
                {/* Dark Backdrop */}
                <div className="absolute inset-0 bg-[#061414]/98 backdrop-blur-2xl"></div>

                {/* Close Button & Logo Area */}
                <div className="absolute top-0 left-0 right-0 flex items-center justify-between px-4 sm:px-8 py-6 z-50">
                    <Link href="/" onClick={() => setIsMenuOpen(false)}>
                        <Image
                            src="/fortecl-logo1.png"
                            alt="Logo"
                            width={160}
                            height={50}
                            className="object-contain"
                        />
                    </Link>
                    <button
                        onClick={() => setIsMenuOpen(false)}
                        className="text-white p-2 hover:text-[#2DD4BF] transition-colors"
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
                                <Link
                                    href={link.href}
                                    onClick={() => setIsMenuOpen(false)}
                                    className={`text-4xl sm:text-5xl font-bold tracking-tight ${isActive(link.name) ? 'text-[#2DD4BF]' : 'text-white'
                                        } hover:text-[#2DD4BF] transition-colors flex items-center group`}
                                >
                                    {link.name}
                                    <span className="ml-4 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-2xl">→</span>
                                </Link>
                            </div>
                        ))}
                    </div>

                    <div className={`mt-12 transform transition-all duration-700 delay-[600ms] ${isMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                        }`}>
                        <Link
                            href="/contact"
                            onClick={() => setIsMenuOpen(false)}
                            className="inline-flex items-center text-white/60 text-lg hover:text-[#2DD4BF] transition-colors"
                        >
                            <span className="w-12 h-[1px] bg-[#2DD4BF] mr-4"></span>
                            Need assistance? Contact our team
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
}
