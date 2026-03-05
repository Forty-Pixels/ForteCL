export default function Stats() {
    return (
        <section className="bg-white py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">

                    {/* Stat Item 1 */}
                    <div className="flex flex-col items-start justify-start">
                        <h3 className="text-3xl md:text-4xl font-bold text-[#2DD4BF] mb-2 font-poppins">
                            5,000+
                        </h3>
                        <p className="text-gray-600 font-medium text-sm md:text-base leading-snug max-w-[140px]">
                            Parameters processed daily
                        </p>
                    </div>

                    {/* Stat Item 2 */}
                    <div className="flex flex-col items-start justify-start">
                        <h3 className="text-3xl md:text-4xl font-bold text-[#2DD4BF] mb-2 font-poppins">
                            4,500+
                        </h3>
                        <p className="text-gray-600 font-medium text-sm md:text-base leading-snug max-w-[140px]">
                            Tests under one roof
                        </p>
                    </div>

                    {/* Stat Item 3 */}
                    <div className="flex flex-col items-start justify-start">
                        <h3 className="text-3xl md:text-4xl font-bold text-[#2DD4BF] mb-2 font-poppins">
                            190,000+
                        </h3>
                        <p className="text-gray-600 font-medium text-sm md:text-base leading-snug max-w-[140px]">
                            Patients<br />served
                        </p>
                    </div>

                    {/* Stat Item 4 */}
                    <div className="flex flex-col items-start justify-start">
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
