export default function MissionVision() {
    return (
        <section
            className="py-16 md:py-20 text-white relative overflow-hidden"
            style={{
                background: 'linear-gradient(135deg, #307984 0%, #42AFBF 100%)'
            }}
        >
            <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
                {/* Header Content */}
                <div className="text-center max-w-4xl mx-auto mb-12 md:mb-16">
                    <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-6 leading-tight">
                        What Drives Us
                    </h2>
                    <p className="text-white/90 text-xs md:text-sm lg:text-base leading-relaxed max-w-4xl mx-auto">
                        We operate on three core principles — Promptness, Accuracy and Reliability. They shape
                        how we collect samples, how we process tests and how we report results.
                    </p>
                </div>

                {/* Grid Content */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
                    {/* Mission */}
                    <div className="flex flex-col items-start space-y-3">
                        <div className="mb-2">
                            <svg className="w-10 h-10 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="12" cy="12" r="10" />
                                <circle cx="12" cy="12" r="6" />
                                <circle cx="12" cy="12" r="2" />
                            </svg>
                        </div>
                        <h3 className="text-lg font-bold uppercase tracking-wider">Mission</h3>
                        <p className="text-white/80 text-xs md:text-sm leading-relaxed">
                            To deliver precise, reliable and timely diagnostic services that empower patients
                            and healthcare providers to make better, faster health decisions.
                        </p>
                    </div>

                    {/* Vision */}
                    <div className="flex flex-col items-start space-y-3">
                        <div className="mb-2">
                            <svg className="w-10 h-10 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                <rect x="4" y="4" width="16" height="16" rx="2" />
                                <path d="M9 9h6" />
                                <path d="M9 13h6" />
                                <path d="M9 17h3" />
                            </svg>
                        </div>
                        <h3 className="text-lg font-bold uppercase tracking-wider">Vision</h3>
                        <p className="text-white/80 text-xs md:text-sm leading-relaxed">
                            To be Dubai&apos;s most trusted diagnostic facility — setting the benchmark for
                            laboratory excellence and patient-first care.
                        </p>
                    </div>

                    {/* Values */}
                    <div className="flex flex-col items-start space-y-3">
                        <div className="mb-2">
                            <svg className="w-10 h-10 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M4 14l8-4 8 4-8 4-8-4z" />
                                <path d="M4 10l8-4 8 4" />
                                <path d="M4 18l8-4 8 4" />
                            </svg>
                        </div>
                        <h3 className="text-lg font-bold uppercase tracking-wider">Values</h3>
                        <p className="text-white/80 text-xs md:text-sm leading-relaxed">
                            Accuracy in every result. Integrity in every interaction. Innovation in every process.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
