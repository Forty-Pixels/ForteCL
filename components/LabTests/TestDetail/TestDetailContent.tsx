import Link from 'next/link';
import { LabTest } from '@/data/labTestTypes';
import Reveal from '@/components/Animation/Reveal';
import { PortableText, PortableTextComponents } from '@portabletext/react';
import BookActionButton from '@/components/Booking/BookActionButton';

interface Props {
    test: LabTest;
    allTests: LabTest[]; // Pass all tests for fallback related tests logic
}

const ptComponents: PortableTextComponents = {
    block: {
        h1: ({ children }) => <h1 className="text-4xl font-bold text-gray-900 mb-6 mt-10">{children}</h1>,
        h2: ({ children }) => <h2 className="text-3xl font-bold text-gray-900 mb-4 mt-8">{children}</h2>,
        h3: ({ children }) => <h3 className="text-2xl font-bold text-gray-900 mb-4 mt-8">{children}</h3>,
        h4: ({ children }) => <h4 className="text-xl font-bold text-gray-900 mb-3 mt-6">{children}</h4>,
        normal: ({ children }) => <p className="text-gray-600 text-[15px] leading-relaxed mb-4">{children}</p>,
        blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-[#307984] pl-5 py-2 my-6 bg-gray-50 italic text-gray-700">
                {children}
            </blockquote>
        ),
    },
    list: {
        bullet: ({ children }) => <ul className="space-y-2 mb-6 ml-4">{children}</ul>,
        number: ({ children }) => <ol className="space-y-2 mb-6 ml-4 list-decimal">{children}</ol>,
    },
    listItem: {
        bullet: ({ children }) => (
            <li className="flex items-start gap-2.5 text-[15px] text-gray-600">
                <span className="text-[#307984] mt-0.5">•</span>
                <span>{children}</span>
            </li>
        ),
        number: ({ children }) => (
            <li className="text-[15px] text-gray-600 pl-2">
                {children}
            </li>
        ),
    },
    marks: {
        strong: ({ children }) => <strong className="font-bold text-gray-900">{children}</strong>,
        em: ({ children }) => <em className="italic text-gray-800">{children}</em>,
    },
};

export default function TestDetailContent({ test, allTests }: Props) {
    // 1. Priority: Explicitly chosen related tests from Sanity
    // 2. Fallback: Automatic category match if no explicit tests chosen
    let related = (test.relatedTests || []).filter(t => t && t.slug);
    
    if (related.length === 0) {
        related = (allTests || [])
            .filter(t => t && t.slug && t.slug !== test.slug && (t.diseaseFilter === test.diseaseFilter || t.department === test.department))
            .slice(0, 10);
    }

    return (
        <section className="bg-white py-16">
            <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-12 xl:px-20">
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-12">
                    
                    {/* Main Content Area */}
                    <div className="min-w-0">
                        {/* Quick Info Bar */}
                        <Reveal delayMs={70}>
                            <div className="bg-[#f8fafc] rounded-3xl p-8 mb-12 grid grid-cols-2 md:grid-cols-4 gap-8 border border-gray-100">
                                <div>
                                    <div className="flex items-center gap-2 mb-2">
                                        <div className="w-2 h-2 rounded-full bg-[#307984]" />
                                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Disease</span>
                                    </div>
                                    <p className="text-sm font-semibold text-gray-900">{test.diseaseFilter}</p>
                                </div>
                                <div>
                                    <div className="flex items-center gap-2 mb-2">
                                        <div className="w-2 h-2 rounded-full bg-[#307984]" />
                                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Department</span>
                                    </div>
                                    <p className="text-sm font-semibold text-gray-900">{test.department}</p>
                                </div>
                                <div>
                                    <div className="flex items-center gap-2 mb-2">
                                        <div className="w-2 h-2 rounded-full bg-[#307984]" />
                                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">TAT</span>
                                    </div>
                                    <p className="text-sm font-semibold text-gray-900">{test.tat || 'Contact Lab'}</p>
                                </div>
                                <div>
                                    <div className="flex items-center gap-2 mb-2">
                                        <div className="w-2 h-2 rounded-full bg-[#307984]" />
                                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Sample Type</span>
                                    </div>
                                    <div className="flex flex-wrap gap-1">
                                        {(test.sampleType || []).slice(0,2).map((s, i) => (
                                            <span key={i} className="text-[11px] bg-white border border-gray-200 px-2 py-0.5 rounded text-gray-600">{s}</span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </Reveal>

                        {/* Rich Text Content */}
                        <Reveal delayMs={140}>
                            <div className="prose prose-slate max-w-none">
                                {test.content && test.content.length > 0 ? (
                                    <PortableText value={test.content} components={ptComponents} />
                                ) : (
                                    <div className="py-20 text-center bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
                                        <p className="text-gray-400 font-medium">Detailed laboratory clinical information is being prepared for this test.</p>
                                        <p className="text-xs text-gray-400 mt-2">Please log in to the CMS to add content for "{test.name}".</p>
                                    </div>
                                )}
                            </div>
                        </Reveal>

                        {/* Action Buttons */}
                        <Reveal delayMs={240}>
                            <div className="flex flex-col sm:flex-row gap-4 mt-16 pt-16 border-t border-gray-100">
                                <BookActionButton
                                    label="Book An Appointment"
                                    whatsappText={`Hi, I would like to book the ${test.name} test.`}
                                    className="bg-[#307984] hover:bg-[#245d65] text-white px-10 py-4 rounded-2xl text-[15px] font-bold transition-all shadow-[0_15px_30px_rgba(48,121,132,0.15)] text-center"
                                />
                                <Link href="/lab-tests" className="bg-[#111111] hover:bg-black text-white px-10 py-4 rounded-2xl text-[15px] font-bold transition-all text-center">
                                    Back to Database
                                </Link>
                            </div>
                        </Reveal>
                    </div>

                    {/* Sidebar */}
                    <aside className="hidden lg:block">
                        <Reveal delayMs={300}>
                            <div className="bg-[#111111] rounded-[2rem] p-8 sticky top-32 shadow-2xl">
                                <h3 className="text-white text-xl font-bold mb-8 flex items-center gap-3">
                                    <span className="w-1.5 h-6 bg-[#307984] rounded-full" />
                                    Related Tests
                                </h3>
                                <ul className="space-y-4">
                                    {related.map(t => (
                                        <li key={t.slug}>
                                            <Link
                                                href={`/lab-tests/${t.slug}`}
                                                className="text-gray-400 hover:text-white text-[13px] font-medium transition-all flex items-start gap-3 group"
                                            >
                                                <span className="text-[#307984] transition-transform group-hover:scale-150 group-hover:font-bold mt-1">→</span>
                                                {t.name}
                                            </Link>
                                        </li>
                                    ))}
                                    {related.length === 0 && (
                                        <li className="text-gray-600 text-xs italic">No related tests found.</li>
                                    )}
                                </ul>
                            </div>
                        </Reveal>
                    </aside>

                </div>
            </div>
        </section>
    );
}
