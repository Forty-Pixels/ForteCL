export default function Stats() {
    return (
        <section className="bg-white py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">

                    {/* Stat Item 1 */}
                    <div className="flex flex-col items-start justify-start">
                        <div className="text-[#2DD4BF] mb-4">
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <rect width="8" height="4" x="8" y="2" rx="1" ry="1" />
                                <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
                                <path d="M9 12h6" />
                                <path d="M9 16h6" />
                                <path d="M9 8h6" />
                            </svg>
                        </div>
                        <h3 className="text-3xl md:text-4xl font-bold text-[#2DD4BF] mb-2 font-poppins">
                            10,000+
                        </h3>
                        <p className="text-gray-600 font-medium text-sm md:text-base leading-snug max-w-[150px]">
                            Parameters processed daily
                        </p>
                    </div>

                    {/* Stat Item 2 */}
                    <div className="flex flex-col items-start justify-start">
                        <div className="text-[#2DD4BF] mb-4">
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M10 2v2" />
                                <path d="M14 2v2" />
                                <path d="M3 21h18" />
                                <path d="M6 21V6a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v15" />
                                <path d="M10 12h4" />
                                <path d="M10 16h4" />
                            </svg>
                        </div>
                        <h3 className="text-3xl md:text-4xl font-bold text-[#2DD4BF] mb-2 font-poppins">
                            4,500+
                        </h3>
                        <p className="text-gray-600 font-medium text-sm md:text-base leading-snug max-w-[150px]">
                            Special tests under one roof
                        </p>
                    </div>

                    {/* Stat Item 3 */}
                    <div className="flex flex-col items-start justify-start">
                        <div className="text-[#2DD4BF] mb-4">
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="12" cy="12" r="10" />
                                <polyline points="12 6 12 12 16 14" />
                                <path d="M16 2.1a10 10 0 0 1 5.9 5.9" />
                            </svg>
                        </div>
                        <h3 className="text-3xl md:text-4xl font-bold text-[#2DD4BF] mb-2 font-poppins">
                            24/7
                        </h3>
                        <p className="text-gray-600 font-medium text-sm md:text-base leading-snug max-w-[150px]">
                            Sample Collection
                        </p>
                    </div>

                    {/* Stat Item 4 */}
                    <div className="flex flex-col items-start justify-start">
                        <div className="text-[#2DD4BF] mb-4">
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" />
                                <path d="m9 12 2 2 4-4" />
                            </svg>
                        </div>
                        <h3 className="text-3xl md:text-4xl font-bold text-[#2DD4BF] mb-2 font-poppins">
                            JCI Certified
                        </h3>
                        <p className="text-gray-600 font-medium text-sm md:text-base leading-snug max-w-[150px]">
                            Joint Commission International
                        </p>
                    </div>

                </div>
            </div>
        </section>
    );
}
