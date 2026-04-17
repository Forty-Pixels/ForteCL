import Image from 'next/image';
import Reveal from '@/components/Animation/Reveal';

export default function MissionVision() {
    return (
        <section className="bg-white py-10 md:py-14 relative overflow-hidden">
            {/* Soft decorative background circles */}
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#f88c29]/5 rounded-full -mr-48 -mt-48 blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-[#f88c29]/3 rounded-full -ml-36 -mb-36 blur-3xl"></div>

            <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
                
                {/* Header Content - SMALLER */}
                <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16">
                    {/* Simplified Orange Tag - SMALLER */}
                    <span className="text-[#307984] font-semibold text-[9px] sm:text-[10px] tracking-[0.15em] mb-2 block uppercase">
                        Our Standards
                    </span>
                    <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#202020] mb-5 leading-tight">
                        Quality Assurance (PAR)
                    </h2>
                    <p className="text-gray-500 text-[13px] sm:text-[14px] lg:text-[15px] leading-relaxed max-w-2xl">
                        Forte Clinical Laboratory operates based on the core principles of PAR – Promptness, Accuracy, and Reliability, 
                        aligning itself with international healthcare excellence.
                    </p>
                </div>

                {/* PAR Principles Section - SMALLER CARDS */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch mb-20">
                    
                    {/* Goal Card - SMALLER PADDING */}
                    <div className="relative group p-8 md:p-10 bg-white rounded-[2rem] border border-gray-100 shadow-xl overflow-hidden flex flex-col justify-center">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#f88c29] to-transparent opacity-30"></div>
                        <div className="relative z-10">
                             <div className="text-[9px] font-black uppercase tracking-[0.2em] text-[#307984]/60 mb-4">Strategic Objective</div>
                             <h3 className="text-xl md:text-2xl font-bold text-[#202020] leading-tight">
                                "Become the preferred service provider for both medical professionals and patients in Al Garhoud, Dubai."
                             </h3>
                             <div className="mt-8 flex items-center gap-4">
                                <div className="w-10 h-0.5 bg-[#307984]"></div>
                                <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Our Goal</span>
                             </div>
                        </div>
                    </div>

                    {/* PAR Cards - COMPACT */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3">
                        <div className="flex-1 flex flex-col sm:flex-row gap-3">
                            <div className="flex-1 bg-[#f88c29] p-6 rounded-[1.5rem] text-white flex flex-col justify-between group hover:-translate-y-1 transition-transform">
                                <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center mb-4">
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <span className="text-lg md:text-xl font-bold">Be Accurate</span>
                            </div>
                            <div className="flex-1 bg-gray-50 p-6 rounded-[1.5rem] border border-gray-100 flex flex-col justify-between group hover:-translate-y-1 transition-transform text-sm">
                                <div className="w-8 h-8 bg-[#307984]/5 text-[#307984] rounded-lg flex items-center justify-center mb-4">
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <span className="text-lg md:text-xl font-bold text-[#202020]">On Time</span>
                            </div>
                        </div>
                        <div className="bg-[#202020] p-6 rounded-[1.5rem] text-white flex items-center justify-between group hover:-translate-y-1 transition-transform font-bold text-lg">
                            <span className="opacity-90 group-hover:opacity-100 transition-opacity">Every Time</span>
                            <div className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center">
                                <div className="w-1.5 h-1.5 bg-[#f88c29] rounded-full animate-pulse"></div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Quality Details - SMALLER FONT */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 mb-20">
                    {/* Quality of Services */}
                    <div className="relative">
                        <h3 className="text-xl font-bold text-[#202020] mb-6 flex items-baseline gap-3">
                            <span className="text-[#307984] font-black text-3xl opacity-20">01</span>
                            Quality of Our Services
                        </h3>
                        <div className="space-y-4 text-[13px] sm:text-[14px] lg:text-[15px] text-gray-600 leading-relaxed">
                            <p>
                                At Forte Clinical Laboratory, we deliver top-notch service across the entire diagnostic journey. 
                                From meticulous specimen handling to precise analysis and prompt reporting.
                            </p>
                            <p className="text-[13px] sm:text-[14px] lg:text-[15px] text-gray-600 leading-relaxed mb-4 bg-[#f8fafb] p-5 rounded-xl border-l-4 border-[#307984]">
                                Backing our commitment is a robust system of internal quality audits, quality assurance, and 
                                quality control programs.
                            </p>
                        </div>
                    </div>

                    {/* Quality of Analytical Results */}
                    <div className="relative">
                        <h3 className="text-xl font-bold text-[#202020] mb-6 flex items-baseline gap-3">
                            <span className="text-[#307984] font-black text-3xl opacity-20">02</span>
                            Analytical Results Quality
                        </h3>
                        <p className="text-[13px] sm:text-[14px] lg:text-[15px] text-gray-600 leading-relaxed">
                            The quality and reliability of the testing process significantly influence the precision of analytical results. 
                            Our laboratories actively engage in various internal and external quality 
                            control programs to vigilantly monitor the testing procedures.
                        </p>
                    </div>
                </div>

                {/* External QA Programs - COMPACT BIO-RAD */}
                <div className="relative rounded-[2.5rem] p-8 md:p-12 bg-gradient-to-br from-[#307984] to-[#1f5a63] text-white shadow-xl overflow-hidden group">
                    <div className="relative z-10 flex flex-col md:flex-row items-center gap-8 md:gap-14">
                        <div className="w-full md:w-1/3 flex flex-col items-center">
                            <div className="bg-white p-4 rounded-[1.5rem] shadow-lg w-full max-w-[200px] aspect-[2/1] relative overflow-hidden flex items-center justify-center">
                                <Reveal delayMs={100} className="relative w-full h-full">
                                    <Image
                                        src="/About/bio-rad-logo.png"
                                        alt="Bio-Rad Official Logo"
                                        fill
                                        className="object-contain p-2"
                                        priority
                                    />
                                </Reveal>
                            </div>
                            {/* SMALLER TAG */}
                            <div className="flex items-center gap-2 mt-6">
                                <div className="h-px w-6 bg-white/30"></div>
                                <span className="text-[9px] uppercase font-bold tracking-[0.2em] text-white/70">International Scheme</span>
                            </div>
                        </div>
                        <div className="w-full md:w-2/3">
                            <h4 className="text-xl lg:text-2xl font-bold mb-4 text-white text-center md:text-left">Excellence Through Global Benchmarking</h4>
                            <p className="text-white opacity-80 text-[13px] sm:text-[14px] lg:text-[15px] leading-relaxed mb-6 text-center md:text-left">
                                Bio-Rad is the worldwide leader in quality controls for clinical laboratory. The controls 
                                are manufactured independently of the calibrators and reagents.
                            </p>
                            <div className="flex items-center justify-center md:justify-start gap-4 text-white opacity-60">
                                <div className="w-10 h-px bg-white/20"></div>
                                <span className="text-[9px] font-bold uppercase tracking-widest">Unbiased Independent Assessment</span>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
}
