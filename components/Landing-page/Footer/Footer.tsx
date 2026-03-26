import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="bg-[#111111] text-white pt-12 pb-6">
            <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-12 xl:px-20">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.2fr_0.8fr_1fr_1.3fr] gap-8 lg:gap-6 mb-12">

                    {/* Brand Section */}
                    <div className="flex flex-col space-y-4">
                        <div className="relative w-40 h-10 -ml-2">
                            <Image
                                src="/fortecl-logo3.png"
                                alt="Forte Clinical Laboratory"
                                fill
                                className="object-contain object-left"
                            />
                        </div>
                        <p className="text-gray-400 text-xs leading-relaxed max-w-xs">
                            A stand-alone large-scale diagnostic laboratory in Dubai routine tests to complex genomics under one roof.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-base font-semibold mb-5">Quick Links</h4>
                        <ul className="space-y-3 text-gray-400 text-xs">
                            <li><Link href="/" className="hover:text-[#f88c29] transition-colors">Home</Link></li>
                            <li><Link href="/lab-tests" className="hover:text-[#f88c29] transition-colors">Lab Tests</Link></li>
                            <li><Link href="/packages" className="hover:text-[#f88c29] transition-colors">Packages</Link></li>
                            <li><Link href="/departments" className="hover:text-[#f88c29] transition-colors">Departments</Link></li>
                            <li><Link href="/lab-test-service-dubai" className="hover:text-[#f88c29] transition-colors">Lab Test Service In Dubai</Link></li>
                            <li><Link href="/about" className="hover:text-[#f88c29] transition-colors">About</Link></li>
                            <li><Link href="/contact" className="hover:text-[#f88c29] transition-colors">Contact</Link></li>
                        </ul>
                    </div>

                    {/* Get In Touch */}
                    <div>
                        <h4 className="text-base font-semibold mb-5">Get in Touch</h4>
                        <ul className="space-y-4 text-gray-400 text-xs">
                            <li className="flex items-start space-x-3">
                                <div className="mt-0.5 flex-shrink-0">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                                    </svg>
                                </div>
                                <span>S-G09/S-G10, Al Garhoud Business Centre, Garhoud, Dubai, UAE</span>
                            </li>
                            <li className="flex items-center space-x-3">
                                <div className="flex-shrink-0">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
                                    </svg>
                                </div>
                                <span>+971 4 271 8226</span>
                            </li>
                            <li className="flex items-center space-x-3">
                                <div className="flex-shrink-0">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-4 h-4" viewBox="0 0 24 24">
                                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.414 0 .011 5.403.011 12.038c0 2.12.553 4.189 1.604 6.04l-1.705 6.226 6.37-1.67a11.803 11.803 0 005.766 1.498h.005c6.634 0 12.038-5.403 12.038-12.039a11.811 11.811 0 00-3.414-8.417" />
                                    </svg>
                                </div>
                                <span>+971 4 272 9302</span>
                            </li>
                        </ul>
                    </div>

                    {/* Newsletter Section */}
                    <div className="flex flex-col space-y-5">
                        <h4 className="text-base font-semibold">Sign Up to our Newsletter</h4>
                        <p className="text-gray-400 text-xs leading-relaxed">
                            Get health tips, test guides, and updates from Forte straight to your inbox.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-3">
                            <input
                                type="email"
                                placeholder="Enter Your Email Address"
                                className="bg-[#1a1a1a] border border-gray-800 rounded-lg px-3 py-2.5 text-xs focus:outline-none focus:border-[#307984] w-full"
                            />
                            <button className="bg-[#307984] hover:bg-[#307984]/90 text-white px-5 py-2.5 rounded-lg font-medium transition-colors text-xs whitespace-nowrap">
                                Sign Up
                            </button>
                        </div>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="pt-6 border-t border-gray-800 text-center text-gray-400 text-xs">
                    <p>© {new Date().getFullYear()} Forte Clinical Laboratory LLC · Privacy Policy</p>
                </div>
            </div>
        </footer>
    );
}
