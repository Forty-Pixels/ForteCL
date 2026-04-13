export default function ContactCTA() {
    return (
        <section className="pt-14 pb-20 md:pt-16 md:pb-24 bg-white border-t border-gray-100">
            <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
                <div className="text-center mb-8 md:mb-10">
                    <h2 className="text-2xl md:text-3xl font-black text-[#1f2937] mb-2">
                        Looking For Trusted Diagnostics In Dubai?
                    </h2>
                    <p className="text-gray-600 text-sm md:text-base">
                        Fill the contact form and our team will get back to you shortly.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-[0.95fr_1.25fr] gap-6 md:gap-8 items-stretch">
                    <div className="rounded-[24px] p-6 md:p-7 bg-gradient-to-br from-[#307984] to-[#42AFBF] border border-[#307984]/20 text-white">
                        <h3 className="text-lg font-bold mb-4">Contact / Booking</h3>
                        <ul className="space-y-3 text-sm text-white/90">
                            <li>+971 4 271 8226</li>
                            <li>+971 4 272 9302</li>
                            <li>info@fortecl.ae</li>
                        </ul>

                        <div className="mt-6 pt-5 border-t border-white/25">
                            <h4 className="text-xs font-black tracking-[0.18em] uppercase mb-2 text-white/80">Location</h4>
                            <p className="text-sm text-white/90 leading-relaxed">
                                S-G09 / S-G10, Al Garhoud Business Centre, Garhoud, Dubai, UAE
                            </p>
                        </div>
                    </div>

                    <form className="rounded-[24px] p-6 md:p-7 bg-white shadow-[0_10px_24px_rgba(10,40,52,0.16)] border border-gray-100 space-y-3">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <input
                                type="text"
                                placeholder="First Name"
                                className="w-full px-3 py-2.5 text-sm rounded-md bg-[#f8fafb] border border-gray-200 text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#307984]"
                            />
                            <input
                                type="text"
                                placeholder="Last Name"
                                className="w-full px-3 py-2.5 text-sm rounded-md bg-[#f8fafb] border border-gray-200 text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#307984]"
                            />
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <input
                                type="text"
                                placeholder="Phone"
                                className="w-full px-3 py-2.5 text-sm rounded-md bg-[#f8fafb] border border-gray-200 text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#307984]"
                            />
                            <input
                                type="email"
                                placeholder="Email"
                                className="w-full px-3 py-2.5 text-sm rounded-md bg-[#f8fafb] border border-gray-200 text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#307984]"
                            />
                        </div>
                        <textarea
                            placeholder="Message"
                            rows={4}
                            className="w-full px-3 py-2.5 text-sm rounded-md bg-[#f8fafb] border border-gray-200 text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#307984]"
                        />
                        <button
                            type="submit"
                            className="inline-flex w-full sm:w-auto justify-center bg-[#307984] hover:bg-[#26656f] text-white font-semibold py-2.5 px-8 rounded-md transition-colors text-sm"
                        >
                            Submit Inquiry
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
}
