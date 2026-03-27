import Image from 'next/image';

export default function Facilities() {
    const appFeatures = [
        {
            title: "Forte Scheduling",
            subtitle: "Mobile Sample Pickup",
            icon: (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
            )
        },
        {
            title: "Report Access",
            subtitle: "View Results Online",
            icon: (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
            )
        },
        {
            title: "Test Reminders",
            subtitle: "Collection Guidelines",
            icon: (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
            )
        },
        {
            title: "Digital Support",
            subtitle: "Billing & TAT Info",
            icon: (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                </svg>
            )
        }
    ];

    return (
        <section className="bg-white py-10 md:py-14 overflow-hidden">
            <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
                <div className="grid grid-cols-1 lg:grid-cols-[45%_55%] gap-8 lg:gap-14 items-center mb-16">
                    
                    {/* Left Image - SMALLER ASPECT */}
                    <div className="relative w-full h-[280px] sm:h-[350px] lg:h-[420px] rounded-[1.5rem] overflow-hidden shadow-xl group">
                        <Image
                            src="/About/facilities/lab-facility.png"
                            alt="Forte Clinical Laboratory Facilities"
                            fill
                            className="object-cover object-center group-hover:scale-110 transition-transform duration-1000"
                            priority
                        />
                    </div>

                    {/* Right Content */}
                    <div className="flex flex-col items-start px-2 lg:px-0">
                        {/* Simplified Orange Tag - SMALLER */}
                        <span className="text-[#f88c29] font-semibold text-[9px] sm:text-[10px] tracking-[0.15em] mb-2 block uppercase">
                            Our Infrastructure
                        </span>

                        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#202020] mb-6 leading-tight">
                            Sophisticated <br />
                            Diagnostic Facilities
                        </h2>

                        <div className="space-y-4 text-gray-600 text-[13px] sm:text-[14px] lg:text-[15px] leading-relaxed">
                            <p>
                                At Forte Clinical Laboratory, our sophisticated and spacious laboratory in Al Garhoud, Dubai, 
                                spans over 5,000 sq.ft. With a team of dedicated professionals, we specialize in handling 
                                a diverse range of tests, boasting the capacity to process over 5,000 parameters per day.
                            </p>
                            <p>
                                Redefining the industry, we take pride in our high-end diagnostic center, capable of 
                                conducting 1000+ special tests under one roof, featuring an unparalleled Turnaround Time (TAT).
                            </p>
                        </div>
                    </div>
                </div>

                {/* Redesigned Mobile/Web App Section - SMALLER PADDING */}
                <div className="relative mt-20">
                    <div className="absolute -top-10 -left-10 w-48 h-48 bg-[#307984]/5 rounded-full blur-3xl"></div>
                    
                    <div className="relative bg-[#f8fafb] rounded-[2.5rem] p-8 md:p-12 border border-gray-100 shadow-md overflow-hidden">
                        <div className="grid grid-cols-1 lg:grid-cols-[55%_45%] gap-8 items-center">
                            <div>
                                <h3 className="text-2xl font-bold text-[#202020] mb-3">Mobile & Web Application</h3>
                                <p className="text-gray-500 mb-8 max-w-lg text-[13px] sm:text-[14px] leading-relaxed">
                                    Seamlessly integrated digital solutions for a convenient diagnostic journey, allowing you 
                                    to manage your health from anywhere.
                                </p>
                                
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    {appFeatures.map((feature, idx) => (
                                        <div key={idx} className="flex gap-3.5 p-4 bg-white rounded-xl shadow-sm border border-gray-50 hover:border-[#307984]/20 hover:shadow-md transition-all group">
                                            <div className="w-10 h-10 rounded-lg bg-[#307984]/5 text-[#307984] flex items-center justify-center flex-shrink-0 group-hover:bg-[#307984] group-hover:text-white transition-colors">
                                                {feature.icon}
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-[#202020] text-[13px] group-hover:text-[#307984] transition-colors">{feature.title}</h4>
                                                <p className="text-[11px] text-gray-500 mt-0.5">{feature.subtitle}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            
                            <div className="relative h-full flex flex-col justify-center">
                                <div className="bg-[#307984] p-8 lg:p-10 rounded-[2rem] shadow-xl relative overflow-hidden group">
                                    <p className="relative z-10 text-white font-bold text-md md:text-lg lg:text-xl leading-snug">
                                        Forte Clinical Laboratory in Al Garhoud is your ultimate destination for 
                                        reliable results, revolutionizing diagnostics with state-of-the-art facilities.
                                    </p>
                                    <div className="mt-6 flex items-center gap-4 text-white/50">
                                        <div className="h-0.5 w-10 bg-white/30"></div>
                                        <span className="text-[9px] font-black uppercase tracking-widest">Innovation First</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
}
