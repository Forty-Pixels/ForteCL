import Image from 'next/image';

export default function LeadingTheWay() {
    return (
        <section className="bg-white py-12 md:py-16 lg:py-20 overflow-hidden">
            <div className="w-full pl-4 sm:pl-6 lg:pl-8 xl:pl-[calc(50%-38rem)] pr-0">
                <div className="grid grid-cols-1 lg:grid-cols-[55%_45%] gap-8 lg:gap-6 items-center">

                    {/* Left Content */}
                    <div className="flex flex-col items-start order-2 lg:order-1 max-w-7xl mx-auto lg:mx-0 w-full pr-4 sm:pr-8">
                        <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-[#202020] mb-6 leading-[1.2] lg:leading-[1.1] max-w-xl">
                            Diagnostics That Go <br />
                            Beyond the Result
                        </h2>

                        <div className="space-y-4 text-gray-600 text-xs md:text-sm lg:text-base mb-8 leading-relaxed lg:max-w-[90%] pr-4">
                            <p>
                                Forte Clinical Laboratory was built with a clear purpose: to raise the standard
                                of diagnostic care in Dubai. Our young, dynamic team of pathologists, consultants
                                and microbiologists is dedicated to delivering precise, timely results — from the
                                most routine test to the most complex genomic workup.
                            </p>
                            <p>
                                Every report released from Forte is reviewed and authorised by a reputed
                                pathologist or consultant. Our 24/7 cloud-based system allows direct interaction
                                between patients, doctors and our clinical team — so results are not just
                                delivered, they are understood.
                            </p>
                            <p>
                                We are JCI accredited, ISO 9001-2015 certified and Bio-Rad recognised — a
                                reflection of our commitment to international quality standards in everything
                                we do.
                            </p>
                        </div>

                        {/* Logos Grid Area */}
                        <div className="relative w-full max-w-md h-32 sm:h-40 mt-2">
                            <Image
                                src="/About/leading-the-way/logos.png"
                                alt="Quality Accreditations and Partners"
                                fill
                                className="object-contain object-left"
                            />
                        </div>
                    </div>

                    {/* Right Image */}
                    <div className="relative w-full h-[300px] sm:h-[400px] lg:h-[500px] xl:h-[600px] rounded-tl-3xl rounded-bl-3xl overflow-hidden order-1 lg:order-2 shadow-2xl">
                        <Image
                            src="/About/leading-the-way/leading-the-way.png"
                            alt="Leading the Way in Diagnostic Excellence"
                            fill
                            className="object-cover object-center"
                            priority
                        />
                    </div>

                </div>
            </div>
        </section>
    );
}
