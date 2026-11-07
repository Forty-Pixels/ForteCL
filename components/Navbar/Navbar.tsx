'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { usePackagesMenu } from '@/components/Navbar/PackagesMenuContext';
import { getPackagePricing } from '@/lib/package-details';

interface NavbarProps {
    currentPage?: 'Home' | 'Lab Tests' | 'Packages' | 'Departments' | 'Resources' | 'About' | 'Home Collection' | 'Contact';
}

type NavSubLink = {
    name: string;
    href: string;
    badge?: string | null;
    isViewAll?: boolean;
};

type NavLink = {
    name: string;
    href: string;
    submenu?: NavSubLink[];
};

function buildPackagesLink(menu: ReturnType<typeof usePackagesMenu>): NavLink {
    const base: NavLink = { name: 'Health Packages', href: '/packages' };
    const items = menu?.items ?? [];
    if (menu?.enabled === false || items.length === 0) return base;
    return {
        ...base,
        submenu: [
            ...items.map((item) => {
                const { cleanTitle } = getPackagePricing(item.title, item.amount);
                return { name: item.label || cleanTitle, href: `/packages/${item.slug}`, badge: item.badge };
            }),
            { name: menu?.viewAllLabel || 'View all packages', href: '/packages', isViewAll: true },
        ],
    };
}

export default function Navbar({ currentPage }: NavbarProps) {
    const pathname = usePathname();
    const packagesMenu = usePackagesMenu();
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

    const navLinks: NavLink[] = [
        { name: 'Home', href: '/' },
        buildPackagesLink(packagesMenu),
        { name: 'NIPT', href: '/departments/molecular/nipt' },
        { name: 'STD', href: '/std-tests' },
        { name: 'About', href: '/about' },
        { name: 'Home Collection', href: '/home-collection' },
    ];

    // Helper to check if link is active
    const isActive = (link: NavLink | NavSubLink): boolean => {
        if (pathname === link.href) return true;
        if (link.href === '/packages' && currentPage === 'Packages') return true;
        if (link.href !== '#' && link.name === currentPage) return true;
        if ('submenu' in link && link.name === 'Departments' && currentPage === 'Departments') return true;
        if ('submenu' in link && link.submenu) {
            return link.submenu.some((sub) => isActive(sub));
        }
        return false;
    };

    return (
        <>
        <header className={`fixed top-0 left-0 right-0 w-full z-[100] transition-all duration-300 bg-white border-b border-[#045d65]/10 ${isScrolled ? 'shadow-lg py-2' : 'py-3 sm:py-4'}`}>
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

            {/* Desktop Navigation & Contact Button */}
            <div className="flex items-center gap-8">
                <div className="hidden lg:flex items-center space-x-8">
                    {navLinks.map((link) => (
                        <div key={link.name} className="relative group lg:py-4">
                            {link.submenu ? (
                                <div className="flex items-center gap-1 cursor-pointer group/nav">
                                    <Link href={link.href} className={`text-sm text-[#045d65] group-hover/nav:text-[#08717a] font-bold transition-colors relative`}>
                                        {link.name}
                                        <span className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-[#045d65] transition-all duration-300 group-hover/nav:w-full ${isActive(link) ? 'w-full' : ''}`}></span>
                                    </Link>
                                    <svg 
                                        className={`w-4 h-4 transition-transform duration-200 group-hover:rotate-180 text-[#045d65]`}
                                        fill="none" 
                                        stroke="currentColor" 
                                        viewBox="0 0 24 24"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                    
                                    {/* Dropdown Menu */}
                                    <div className={`absolute top-full left-0 mt-0 ${link.name === 'Health Packages' ? 'w-80' : 'w-48'} bg-white border border-[#045d65]/10 rounded-lg shadow-xl opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto group-focus-within:opacity-100 group-focus-within:translate-y-0 group-focus-within:pointer-events-auto transition-all duration-200 z-[110]`}>
                                        <div className={`py-2 ${link.name === 'Departments' ? 'max-h-[380px] overflow-y-auto' : ''}`}>
                                            {link.submenu.map((sub) => (
                                                <Link
                                                    key={sub.name + sub.href}
                                                    href={sub.href}
                                                    className={sub.isViewAll
                                                        ? 'mt-1 flex items-center justify-between border-t border-[#045d65]/10 px-4 pt-3 pb-2 text-sm font-bold text-[#045d65] hover:bg-[#EAF4EE] transition-colors'
                                                        : 'flex items-center justify-between gap-3 px-4 py-2 text-sm text-[#045d65] hover:bg-[#EAF4EE] transition-colors'}
                                                >
                                                    <span className="flex items-center gap-2 min-w-0">
                                                        <span className="truncate">{sub.name}</span>
                                                        {sub.badge && <span className="shrink-0 rounded-full bg-[#045d65] px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide text-white">{sub.badge}</span>}
                                                    </span>
                                                    {sub.isViewAll && <span aria-hidden="true">→</span>}
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <Link
                                    href={link.href}
                                    className={`text-sm text-[#045d65] hover:text-[#08717a] font-bold transition-colors relative group/navlink`}
                                >
                                    {link.name}
                                    <span className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-[#045d65] transition-all duration-300 group-hover/navlink:w-full ${isActive(link) ? 'w-full' : ''}`}></span>
                                </Link>
                            )}
                        </div>
                    ))}
                </div>

                {/* Right: Contact and WhatsApp buttons & Mobile Menu Toggle */}
                <div className="flex items-center gap-2 sm:gap-3 z-50">
                    <Link href="/contact" className="hidden sm:inline-flex items-center justify-center bg-[#045d65] text-white px-5 py-2 rounded-full text-sm font-medium transition-all hover:bg-[#08717a] hover:shadow-lg hover:scale-105">
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

                    <a
                        href="https://wa.me/971569925611"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Chat with us on WhatsApp"
                        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-all hover:scale-110 hover:bg-[#1ebe5b] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#045d65]"
                    >
                        <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.414 0 .011 5.403.011 12.038c0 2.12.553 4.189 1.604 6.04l-1.705 6.226 6.37-1.67a11.803 11.803 0 005.766 1.498h.005c6.634 0 12.038-5.403 12.038-12.039a11.811 11.811 0 00-3.414-8.417" />
                        </svg>
                    </a>

                    {/* Hamburger Icon for Mobile */}
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="lg:hidden text-[#045d65] p-2 focus:outline-none transition-colors hover:text-[#08717a]"
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
                <div className="absolute top-0 left-0 right-0 flex items-center justify-between px-4 sm:px-8 py-6 z-50 bg-white border-b border-[#045d65]/10 shadow-sm">
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
                        className="text-[#045d65] p-2 hover:text-[#08717a] transition-colors"
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
                                            className="flex items-center justify-between w-full text-3xl sm:text-4xl font-bold tracking-tight text-white hover:text-[#A7DCC0] transition-colors group"
                                        >
                                            <span>{link.name}</span>
                                            <svg 
                                                className={`w-8 h-8 transition-transform duration-300 ${openMobileSubmenus.includes(link.name) ? 'rotate-180 text-[#A7DCC0]' : 'text-white/40'}`}
                                                fill="none" 
                                                stroke="currentColor" 
                                                viewBox="0 0 24 24"
                                            >
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </button>
                                        
                                        <div className={`grid transition-all duration-300 ease-in-out ${openMobileSubmenus.includes(link.name) ? 'grid-rows-[1fr] opacity-100 mt-6' : 'grid-rows-[0fr] opacity-0 mt-0'}`}>
                                            <div className="overflow-hidden">
                                                <div className="flex flex-col space-y-4 pl-4 border-l border-[#A7DCC0]/30">
                                                    {link.submenu.map((sub) => (
                                                        <Link
                                                            key={sub.name}
                                                            href={sub.href}
                                                            onClick={() => {
                                                                setIsMenuOpen(false);
                                                                setOpenMobileSubmenus([]);
                                                            }}
                                                            className={`text-2xl sm:text-3xl font-bold tracking-tight ${isActive({ name: sub.name, href: sub.href }) ? 'text-[#A7DCC0]' : 'text-white/70'
                                                                } hover:text-[#A7DCC0] transition-colors flex items-center group`}
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
                                        className={`text-3xl sm:text-4xl font-bold tracking-tight ${isActive(link) ? 'text-[#A7DCC0]' : 'text-white'
                                            } hover:text-[#A7DCC0] transition-colors flex items-center group`}
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
                            className="inline-flex items-center text-white/60 text-base hover:text-[#A7DCC0] transition-colors"
                        >
                            <span className="w-12 h-[1px] bg-[#A7DCC0] mr-4"></span>
                            Need assistance? Contact our team
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}
