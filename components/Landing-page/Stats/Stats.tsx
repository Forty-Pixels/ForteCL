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
                            5,000+
                        </h3>
                        <p className="text-gray-600 font-medium text-sm md:text-base leading-snug max-w-[140px]">
                            Parameters processed daily
                        </p>
                    </div>

                    {/* Stat Item 2 */}
                    <div className="flex flex-col items-start justify-start">
                        <div className="text-[#2DD4BF] mb-4">
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M9 2v2" />
                                <path d="M15 2v2" />
                                <path d="M22 22H2" />
                                <path d="M18 22V5a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v17" />
                                <path d="M12 11h.01" />
                                <path d="M12 16h.01" />
                                <path d="M8 11h.01" />
                                <path d="M8 16h.01" />
                                <path d="M16 11h.01" />
                                <path d="M16 16h.01" />
                            </svg>
                        </div>
                        <h3 className="text-3xl md:text-4xl font-bold text-[#2DD4BF] mb-2 font-poppins">
                            4,500+
                        </h3>
                        <p className="text-gray-600 font-medium text-sm md:text-base leading-snug max-w-[140px]">
                            Tests under one roof
                        </p>
                    </div>

                    {/* Stat Item 3 */}
                    <div className="flex flex-col items-start justify-start">
                        <div className="text-[#2DD4BF] mb-4">
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                                <circle cx="9" cy="7" r="4" />
                                <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                            </svg>
                        </div>
                        <h3 className="text-3xl md:text-4xl font-bold text-[#2DD4BF] mb-2 font-poppins">
                            190,000+
                        </h3>
                        <p className="text-gray-600 font-medium text-sm md:text-base leading-snug max-w-[140px]">
                            Patients<br />served
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
