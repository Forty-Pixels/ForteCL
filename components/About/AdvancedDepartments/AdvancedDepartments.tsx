import Image from 'next/image';
import Link from 'next/link';

export default function AdvancedDepartments() {
    return (
        <section className="bg-white py-16 md:py-24 lg:py-32">
            <div className="w-full pr-4 sm:pr-6 lg:pr-16 xl:pr-24 pl-0">
                <div className="grid grid-cols-1 lg:grid-cols-[45%_55%] gap-12 lg:gap-8 items-center">

                    {/* Left Image - Flushed to the left edge */}
                    <div className="relative w-full h-[400px] sm:h-[500px] lg:h-[600px] xl:h-[700px] rounded-tr-3xl rounded-br-3xl overflow-hidden shadow-2xl">
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
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-[3.2rem] font-bold text-[#202020] mb-8 leading-[1.2] lg:leading-[1.1] max-w-2xl">
                            Advanced Diagnostic <br />
                            Departments Delivering <br />
                            Precision Testing
                        </h2>

                        <p className="text-gray-600 text-sm md:text-base lg:text-lg mb-10 leading-relaxed lg:max-w-[90%]">
                            Our highly specialised departments set us apart in diagnostics across Dubai. From advanced haematology and biochemistry to microbiology, molecular diagnostics and pathology — each department is equipped with the latest technology and staffed by highly experienced professionals working collaboratively to handle everything from routine tests to the most complex diagnostic challenges.
                        </p>

                        <Link
                            href="/departments"
                            className="bg-[#2DD4BF] hover:bg-teal-300 text-white px-8 py-3.5 rounded-lg font-medium transition-colors text-center text-sm md:text-base"
                        >
                            View All Departments
                        </Link>
                    </div>

                </div>
            </div>
        </section>
    );
}
