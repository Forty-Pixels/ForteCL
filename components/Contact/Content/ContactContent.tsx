'use client';

import Image from 'next/image';

const logos = [
    { src: '/contact/logos/bio-rad.png', alt: 'Bio-Rad EQAS' },
    { src: '/contact/logos/siemens.png', alt: 'Siemens' },
    { src: '/contact/logos/tech-med.png', alt: 'TechMed' },
    { src: '/contact/logos/jci.png', alt: 'Joint Commission International' },
];

export default function ContactContent() {
    return (
        <section className="bg-white py-16 md:py-24 lg:py-32">
            <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">

                    {/* Left Column: Contact Info & Logos */}
                    <div className="flex flex-col space-y-12">
                        <div>
                            <h2 className="text-3xl md:text-4xl font-bold text-[#202020] mb-6">
                                Get in Touch
                            </h2>
                            <p className="text-gray-600 text-base md:text-lg mb-10 leading-relaxed max-w-md">
                                We're available 24/7. Walk in or book a home sample collection — our team will guide you to the right test
                            </p>

                            <ul className="space-y-6">
                                {/* Address */}
                                <li className="flex items-start space-x-4">
                                    <div className="mt-1 flex-shrink-0">
                                        <svg className="w-6 h-6 text-[#307984]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                    </div>
                                    <span className="text-gray-700 font-medium">S-G09 / S-G10, Al Garhoud Business Centre, Garhoud, Dubai, UAE</span>
                                </li>

                                {/* Phone - Refined with Waves */}
                                <li className="flex items-center space-x-4">
                                    <div className="flex-shrink-0">
                                        <svg className="w-6 h-6 text-[#307984]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                            {/* Phone Receiver */}
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
                                            {/* Arcs/Waves */}
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M14.05 2A9 9 0 0122 9.95M14.05 6a5 5 0 014 4" />
                                        </svg>
                                    </div>
                                    <span className="text-gray-700 font-medium">+971 4 272 9302</span>
                                </li>

                                {/* Hours */}
                                <li className="flex items-center space-x-4">
                                    <div className="flex-shrink-0">
                                        <svg className="w-6 h-6 text-[#307984]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                    <span className="text-gray-700 font-medium">Open 24 hours, 7 days a week</span>
                                </li>
                            </ul>
                        </div>

                        {/* Logo Grid */}
                        <div className="grid grid-cols-2 gap-4 w-full max-w-[420px]">
                            {logos.map((logo, index) => (
                                <div key={index} className="bg-white border border-black rounded-[24px] p-4 flex items-center justify-center h-20 shadow-sm hover:shadow-md transition-shadow">
                                    <div className="relative w-full h-full">
                                        <Image src={logo.src} alt={logo.alt} fill className="object-contain" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right Column: Contact Form */}
                    <div
                        className="rounded-[24px] p-8 md:p-10 shadow-xl"
                        style={{ background: 'linear-gradient(135deg, #307984 0%, #42AFBF 100%)' }}
                    >
                        <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                            Get in Touch
                        </h2>
                        <p className="text-white/80 text-sm md:text-base mb-8 leading-relaxed">
                            Fill out the form below with your contact details and queries and our team will get back to you as soon as possible.
                        </p>

                        <form className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <input
                                    type="text"
                                    placeholder="First Name"
                                    className="w-full px-4 py-3 rounded-lg bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/20"
                                />
                                <input
                                    type="text"
                                    placeholder="Last Name"
                                    className="w-full px-4 py-3 rounded-lg bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/20"
                                />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <input
                                    type="text"
                                    placeholder="Contact No"
                                    className="w-full px-4 py-3 rounded-lg bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/20"
                                />
                                <input
                                    type="email"
                                    placeholder="Email"
                                    className="w-full px-4 py-3 rounded-lg bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/20"
                                />
                            </div>
                            <textarea
                                placeholder="Message"
                                rows={4}
                                className="w-full px-4 py-3 rounded-lg bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/20"
                            ></textarea>

                            <button
                                type="submit"
                                className="w-full md:w-auto bg-[#307984] hover:bg-[#307984]/90 text-white font-semibold py-3 px-10 rounded-lg transition-colors"
                            >
                                Submit Inquiry
                            </button>
                        </form>
                    </div>

                </div>
            </div>
        </section>
    );
}
