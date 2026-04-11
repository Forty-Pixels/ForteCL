export default function QualityPolicy() {
    const qualityCommitments = [
        {
            title: "Reliable Test Results",
            description: "Delivering reliable, accurate, and dependable test results: Our team of highly qualified professionals utilizes cutting-edge technology to ensure the highest standards in laboratory testing."
        },
        {
            title: "Highest Ethical Standards",
            description: "Upholding the highest ethical standards: We are committed to ethical practice in all our interactions, fostering trust and transparency with our patients and healthcare providers."
        },
        {
            title: "Social Responsibility",
            description: "Embracing social responsibility: We actively contribute to the improvement of public health through community engagement and outreach programs."
        },
        {
            title: "Continuous System Improvement",
            description: "Continuously improving our systems: We are dedicated to ongoing innovation and quality improvement, ensuring we remain at the forefront of medical laboratory technology and service."
        },
        {
            title: "Regulatory Compliance",
            description: "Complying with all legal and regulatory requirements: We adhere to the highest ethical and legal standards to ensure the safety and well-being of our patients and the community."
        }
    ];

    return (
        <section className="bg-gray-100 py-10 md:py-14 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-[#307984]/5 rounded-full -mr-24 -mt-24 blur-3xl"></div>

            <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-[40%_60%] gap-10 lg:gap-16 mb-16 items-start">
                    
                    {/* Quality Policy Intro - Sticky - SMALLER FONT */}
                    <div className="flex flex-col lg:sticky lg:top-24 h-fit">
                        {/* Simplified Orange Tag - SMALLER */}
                        <span className="text-[#f88c29] font-semibold text-[9px] sm:text-[10px] tracking-[0.15em] mb-2 block uppercase">
                            Quality Policy
                        </span>
                        <h2 className="text-2xl sm:text-3xl font-bold text-[#202020] mb-6 leading-tight">
                            Our Commitment to Your <br />
                            Health and Well-Being
                        </h2>
                        <div className="space-y-4">
                            <p className="text-gray-600 text-[13px] sm:text-[14px] lg:text-[15px] leading-relaxed border-l-4 border-[#307984] pl-5 py-1">
                                At Forte Clinical Laboratory, our mission is to provide high-quality medical 
                                laboratory services that improve the health status of the community.
                            </p>
                        </div>
                    </div>

                    {/* Quality Commitments Grid - COMPACT CARDS */}
                    <div className="flex flex-col">
                        <div className="grid grid-cols-1 gap-4">
                            {qualityCommitments.map((item, index) => (
                                <div key={index} className="flex gap-4 p-5 bg-white rounded-[1.5rem] shadow-sm border border-gray-100 hover:border-[#307984]/30 transition-all duration-300 group hover:shadow-md">
                                    <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-[#307984]/5 text-[#307984] flex items-center justify-center font-bold text-lg group-hover:bg-[#307984] group-hover:text-white transition-all duration-300">
                                        0{index + 1}
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-[#202020] mb-1.5 text-[15px] group-hover:text-[#307984] transition-colors">{item.title}</h4>
                                        <p className="text-gray-500 text-[13px] leading-relaxed">
                                            {item.description}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Final Commitment Block - SMALLER PADDING */}
                <div className="relative mt-12 group">
                    <div className="relative bg-[#307984] p-8 md:p-12 rounded-[2rem] text-center shadow-xl border border-white/10 overflow-hidden">
                        <p className="relative z-10 text-white font-bold text-md md:text-lg lg:text-xl leading-relaxed max-w-3xl mx-auto">
                            "Our commitment to you extends beyond accurate results. We strive to create a welcoming 
                            and compassionate environment where your health and well-being are our top priority."
                        </p>
                        
                        <div className="relative z-10 mt-8 flex items-center justify-center gap-4">
                            <div className="h-0.5 w-12 bg-white/20"></div>
                            <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-white opacity-50">Patient First Care</span>
                            <div className="h-0.5 w-12 bg-white/20"></div>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
}
