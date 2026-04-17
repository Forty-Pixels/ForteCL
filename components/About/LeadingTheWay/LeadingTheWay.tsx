import Image from 'next/image';

export default function LeadingTheWay() {
    const services = [
        {
            title: "Easy To Interpret Test Report",
            description: "A Comprehensive Test Report, including Result Trend Analysis and personalized interpretations and comments from our doctors for specific tests and conditions."
        },
        {
            title: "Sample Collection From Doorstep",
            description: "Our Logistic Services now extend to offer Prompt Mobile Specimen Collection services throughout Dubai."
        },
        {
            title: "Conclusive Diagnostics",
            description: "We are committed to providing our patients with Conclusive Diagnosis, even if it means incurring additional costs for us. This involves thorough Re-Checks and Reflex testing using alternative technologies."
        },
        {
            title: "Digital Access",
            description: "We have developed a Mobile/ Web Application with Forte scheduling mobile sample pickup, accessing test reports, receiving test reminders / specimen collection guidelines and online assistance for billing / TAT information."
        }
    ];

    const uniquePoints = [
        "5,000 sq.ft space in Al Garhoud",
        "10,000+ parameters can be processed per day",
        "4,500+ special tests under one roof",
        "In-house doctors",
        "Prompt Mobile Specimen Collection services",
        "Mobile / Web Application",
        "Fastest Turn-around Time (TAT) in the industry",
        "24/7 dedicated Cloud-based Computer System",
        "Accurate, reliable results",
        "Routine tests to complex genomics under one roof",
        "Reputed Pathologists, Consultants and Microbiologists authorize every released report"
    ];

    const specialties = [
        "Allergens", "Molecular diagnostics (RT-PCR, HPV, STI panels)", "Cardiology", "Drug Testing",
        "Fertility", "Endocrinology", "Therapeutics", "Gastroenterology", "Hematology",
        "Oncology", "Newborn Screening", "Pathology", "Prenatal", "Renal", "NIPT / Genetic Screening", "Respiratory Panels"
    ];

    return (
        <section className="bg-white py-10 md:py-14 overflow-hidden">
            <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
                
                {/* Intro Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 items-start mb-16">
                    <div className="flex flex-col items-start">
                        {/* Simplified Orange Tag - SMALLER */}
                        <span className="text-[#f88c29] font-semibold text-[9px] sm:text-[10px] tracking-[0.15em] mb-2 block uppercase">
                            Who Are We?
                        </span>
                        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#202020] mb-6 leading-tight">
                            Leading The Way In <br />
                            Modern Diagnostics
                        </h2>
                        <div className="space-y-4 text-gray-600 text-[13px] sm:text-[14px] lg:text-[15px] leading-relaxed">
                            <p>
                                Forte Clinical Laboratory LLC is a state-of-the-art 5,000 sq. ft. diagnostic facility 
                                founded with a deep commitment to delivering high-quality healthcare services. 
                                Our team, composed of young and dynamic professionals, is dedicated to providing 
                                precise, reliable, and timely diagnostic solutions.
                            </p>
                            <p>
                                Centrally located in the heart of Dubai, Forte Clinical Laboratory is strategically 
                                positioned to serve communities across the city, ensuring accessibility and 
                                convenience for all patients.
                            </p>
                        </div>
                    </div>
                    <div className="space-y-4 text-gray-600 text-[13px] sm:text-[14px] lg:text-[15px] leading-relaxed pt-0 lg:pt-14">
                        <p>
                            At Forte, we firmly believe in the principles of preventive medicine and strive to lead 
                            the way in modern diagnostics. By integrating cutting-edge automated technology, 
                            evidence-based practices, and expert technical knowledge, we aim to provide healthcare 
                            solutions that are both innovative and patient-centric.
                        </p>
                        <p>
                            Our mission is simple: to enhance health outcomes through accurate diagnostics and 
                            exceptional service, while continuously pushing the boundaries of laboratory excellence.
                        </p>
                        
                        {/* JCI Accreditation - SMALLER PADDING */}
                        <div className="mt-6 p-5 bg-[#f8fafb] rounded-xl border border-gray-100 flex items-center gap-5 group hover:border-[#307984]/20 transition-all duration-300">
                            <div className="w-12 h-12 flex-shrink-0 bg-[#307984]/10 rounded-lg flex items-center justify-center text-[#307984] group-hover:scale-110 transition-transform">
                                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                </svg>
                            </div>
                            <div>
                                <p className="text-[#307984] font-bold text-md mb-0.5">JCI Accredited</p>
                                <p className="text-[12px] text-gray-600 leading-snug">
                                    Forte Clinical Laboratory is proud to be certified by Joint Commission International (JCI)! 
                                    This prestigious accreditation reflects our steadfast commitment to high standards.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Services Provided */}
                <div className="mb-16">
                    <h3 className="text-xl font-bold text-[#202020] mb-6 border-l-4 border-[#307984] pl-4">
                        In everything we do we provide
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {services.map((service, idx) => (
                            <div key={idx} className="p-5 bg-gray-50 rounded-xl border border-gray-100 hover:border-[#307984]/30 transition-all group">
                                <h4 className="text-[#307984] font-bold text-sm mb-2 group-hover:translate-x-1 transition-transform">{service.title}</h4>
                                <p className="text-[12px] text-gray-600 leading-relaxed">{service.description}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Uniqueness & Specialties */}
                <div className="grid grid-cols-1 lg:grid-cols-[40%_60%] gap-10 lg:gap-14">
                    
                    {/* Makes us Unique */}
                    <div>
                        <h3 className="text-xl font-bold text-[#202020] mb-6">What makes us unique</h3>
                        <div className="space-y-3">
                            {uniquePoints.map((point, idx) => (
                                <div key={idx} className="flex items-start gap-3">
                                    <div className="w-1.5 h-1.5 rounded-full bg-[#f88c29] mt-1.5 flex-shrink-0"></div>
                                    <p className="text-[13px] text-gray-600">{point}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Specialties */}
                    <div>
                        <h3 className="text-xl font-bold text-[#202020] mb-6">Our Testing Specialities</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
                            {specialties.map((spec, idx) => (
                                <div key={idx} className="flex items-center gap-2.5 py-1.5 border-b border-gray-100">
                                    <svg className="w-3.5 h-3.5 text-[#f88c29] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    <span className="text-[13px] text-gray-700">{spec}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Final Commitment */}
                <div className="mt-20 p-8 md:p-12 bg-[#307984] rounded-[2rem] text-center text-white relative overflow-hidden shadow-xl">
                    <div className="relative z-10 max-w-3xl mx-auto">
                        <p className="text-sm md:text-md mb-6 leading-relaxed">
                            At Forte Clinical Laboratory, we are committed to providing you with the most accurate and 
                            reliable laboratory results possible. Our team of highly qualified and experienced pathologists, 
                            consultants, and microbiologists utilizes the latest technology to ensure the highest standards 
                            of quality and accuracy.
                        </p>
                        <p className="text-sm md:text-md leading-relaxed opacity-90">
                            We offer a wide range of convenient testing services in Al Garhoud, Dubai and with our 
                            Mobile/Web App we are making Diagnostics convenient.
                        </p>
                    </div>
                </div>

            </div>
        </section>
    );
}
