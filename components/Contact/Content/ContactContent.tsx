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
        <section className="bg-white py-12 md:py-16 lg:py-20">
            <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">

                    {/* Left Column: Contact Info & Logos */}
                    <div className="flex flex-col space-y-10">
                        <div>
                            <h2 className="text-2xl md:text-3xl font-bold text-[#202020] mb-5">
                                Get in Touch
                            </h2>
                            <p className="text-gray-600 text-sm md:text-base mb-8 leading-relaxed max-w-md">
                                We're available 24/7. Walk in or book a home sample collection — our team will guide you to the right test
                            </p>

                            <ul className="space-y-5">
                                {/* Address */}
                                <li className="flex items-start space-x-3">
                                    <div className="mt-0.5 flex-shrink-0">
                                        <svg className="w-5 h-5 text-[#f88c29]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                    </div>
                                    <a 
                                        href="https://www.google.com/maps/search/?api=1&query=Forte+Clinical+Laboratory+Dubai" 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="text-gray-700 font-medium text-sm hover:text-[#f88c29] transition-colors"
                                    >
                                        S-G09 / S-G10, Al Garhoud Business Centre, Garhoud, Dubai, UAE
                                    </a>
                                </li>

                                {/* Phone */}
                                <li className="flex items-center space-x-3">
                                    <div className="flex-shrink-0">
                                        <svg className="w-5 h-5 text-[#f88c29]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M14.05 2A9 9 0 0122 9.95M14.05 6a5 5 0 014 4" />
                                        </svg>
                                    </div>
                                    <a 
                                        href="tel:+97142718226" 
                                        className="text-gray-700 font-medium text-sm hover:text-[#f88c29] transition-colors"
                                    >
                                        +971 4 271 8226
                                    </a>
                                </li>

                                {/* WhatsApp */}
                                <li className="flex items-center space-x-3">
                                    <div className="flex-shrink-0">
                                        <svg className="w-5 h-5 text-[#f88c29]" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.414 0 .011 5.403.011 12.038c0 2.12.553 4.189 1.604 6.04l-1.705 6.226 6.37-1.67a11.803 11.803 0 005.766 1.498h.005c6.634 0 12.038-5.403 12.038-12.039a11.811 11.811 0 00-3.414-8.417" />
                                        </svg>
                                    </div>
                                    <a 
                                        href="https://wa.me/97142729302" 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="text-gray-700 font-medium text-sm hover:text-[#f88c29] transition-colors"
                                    >
                                        +971 4 272 9302
                                    </a>
                                </li>
                            </ul>
                        </div>

                        {/* Logo Grid */}
                        <div className="grid grid-cols-2 gap-4 w-full max-w-[360px]">
                            {logos.map((logo, index) => (
                                <div key={index} className="bg-white border border-black rounded-[24px] p-4 flex items-center justify-center h-16 shadow-sm hover:shadow-md transition-shadow">
                                    <div className="relative w-full h-full">
                                        <Image src={logo.src} alt={logo.alt} fill className="object-contain" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right Column: Contact Form */}
                    <div
                        className="rounded-[24px] p-6 md:p-8 shadow-xl"
                        style={{ background: 'linear-gradient(135deg, #307984 0%, #42AFBF 100%)' }}
                    >
                        <h2 className="text-xl md:text-2xl font-bold text-white mb-3">
                            Get in Touch
                        </h2>
                        <p className="text-white/80 text-xs md:text-sm mb-6 leading-relaxed">
                            Fill out the form below with your contact details and queries and our team will get back to you as soon as possible.
                        </p>

                        <form className="space-y-3">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                <input
                                    type="text"
                                    placeholder="First Name"
                                    className="w-full px-3 py-2.5 text-sm rounded-lg bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/20"
                                />
                                <input
                                    type="text"
                                    placeholder="Last Name"
                                    className="w-full px-3 py-2.5 text-sm rounded-lg bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/20"
                                />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                <input
                                    type="text"
                                    placeholder="Contact No"
                                    className="w-full px-3 py-2.5 text-sm rounded-lg bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/20"
                                />
                                <input
                                    type="email"
                                    placeholder="Email"
                                    className="w-full px-3 py-2.5 text-sm rounded-lg bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/20"
                                />
                            </div>
                            <textarea
                                placeholder="Message"
                                rows={4}
                                className="w-full px-3 py-2.5 text-sm rounded-lg bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/20"
                            ></textarea>

                            <button
                                type="submit"
                                className="w-full md:w-auto bg-[#f88c29] hover:bg-[#e67b1d] text-white font-bold py-3 px-10 rounded-lg transition-all text-sm cursor-pointer active:scale-95"
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
