import Image from 'next/image';
import Link from 'next/link';

export default function AdvancedDepartments() {
    return (
        <section className="bg-white py-12 md:py-16 lg:py-20 overflow-hidden">
            <div className="w-full pr-4 sm:pr-6 lg:pr-8 xl:pr-[calc(50%-38rem)] pl-0">
                <div className="grid grid-cols-1 lg:grid-cols-[45%_55%] gap-8 lg:gap-6 items-center">

                    {/* Left Image - Flushed to the left edge */}
                    <div className="relative w-full h-[300px] sm:h-[400px] lg:h-[500px] xl:h-[600px] rounded-tr-3xl rounded-br-3xl overflow-hidden shadow-2xl">
                        <Image
                            src="/About/advanced-departments/advanced-dept-img1.png"
                            alt="Advanced Diagnostic Departments"
                            fill
                            className="object-cover object-center"
                            priority
                        />
                    </div>

                    {/* Right Content */}
                    <div className="flex flex-col items-start max-w-7xl mx-auto lg:mx-0 w-full pl-4 sm:pl-8 lg:pl-16">
                        <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-[#202020] mb-6 leading-[1.2] lg:leading-[1.1] max-w-2xl">
                            Specialised Departments. <br />
                            Collaborative Expertise.
                        </h2>

                        <p className="text-gray-600 text-xs md:text-sm lg:text-base mb-8 leading-relaxed lg:max-w-[90%]">
                            Forte&apos;s departments span the full range of modern diagnostics — Haematology,
                            Biochemistry, Microbiology, Immunology, Molecular Diagnostics, Oncology, Genetic
                            Screening, Prenatal Testing and more. Each operates with dedicated technology and
                            specialist staff, working in coordination to handle both routine and highly complex
                            cases with equal rigour.
                        </p>

                        <Link
                            href="/departments"
                            className="bg-[#307984] hover:bg-[#307984]/90 text-white px-6 py-3 rounded-lg font-medium transition-colors text-center text-xs md:text-sm"
                        >
                            View Our Departments →
                        </Link>
                    </div>

                </div>
            </div>
        </section>
    );
}
