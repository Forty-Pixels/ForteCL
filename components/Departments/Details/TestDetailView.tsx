'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    CheckIcon, 
    ChevronDownIcon, 
    ChevronUpIcon,
    ChatBubbleLeftRightIcon,
    PhoneIcon,
    DocumentTextIcon,
    BeakerIcon,
    ShieldCheckIcon,
    CheckCircleIcon
} from '@heroicons/react/24/outline';

import Navbar from '@/components/Navbar/Navbar';
import Reveal from '@/components/Animation/Reveal';
import BookActionButton from '@/components/Booking/BookActionButton';
import { Department } from '@/constants/departments';

const WhatsAppIcon = ({ className }: { className?: string }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.414 0 .011 5.403.011 12.038c0 2.12.553 4.189 1.604 6.04l-1.705 6.226 6.37-1.67a11.803 11.803 0 005.766 1.498h.005c6.634 0 12.038-5.403 12.038-12.039a11.811 11.811 0 00-3.414-8.417" />
    </svg>
);

interface DepartmentDetailViewProps {
    department: Department;
}

const FAQItem = ({ question, answer }: { question: string; answer: string }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="border-b border-gray-100 last:border-0">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full py-4 flex items-center justify-between text-left group"
            >
                <span className={`text-base font-bold transition-colors ${isOpen ? 'text-[#f88c29]' : 'text-gray-900'}`}>
                    {question}
                </span>
                <div className={`p-1.5 rounded-lg transition-all ${isOpen ? 'bg-[#f88c29] text-white' : 'bg-gray-50 text-gray-400 group-hover:bg-gray-100'}`}>
                    {isOpen ? <ChevronUpIcon className="w-4 h-4" /> : <ChevronDownIcon className="w-4 h-4" />}
                </div>
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                    >
                        <p className="pb-4 text-sm text-gray-600 leading-relaxed">
                            {answer}
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

interface TestDetailViewProps {
    test: {
        title: string;
        description: string;
        image: string;
        process?: Array<{ title: string; description: string; image: string }>;
        faqs?: Array<{ question: string; answer: string }>;
        keyServices?: string[];
        commonTests?: Array<{ name: string; description: string }>;
        subSections?: Array<{ title: string; content: string | string[]; image?: string }>;
        startingPrice?: string;
        packages?: Array<{ name: string; description: string; features: string[]; color?: string }>;
        accuracyNote?: string;
    };
}

export default function TestDetailView({ test }: TestDetailViewProps) {
    // Fallback process if not provided
    const processSteps = test.process || [
        { title: 'Book Online', description: 'Schedule your test through our website or via WhatsApp.', image: '/p_book.png' },
        { title: 'Sample Collection', description: 'Our certified nurse will visit your location for home sample collection.', image: '/p_sample.png' },
        { title: 'Lab Processing', description: 'Your sample is processed in our state-of-the-art lab with precision.', image: '/p_lab.png' },
        { title: 'Get Reports', description: 'Receive your digital reports via email and WhatsApp within 24 hours.', image: '/p_report.png' }
    ];
    return (
        <main className="bg-white min-h-screen relative">
            <div className="absolute top-0 left-0 w-full z-50">
                <Navbar currentPage="Departments" />
            </div>

            {/* 1. Hero Section */}
            <section className="relative min-h-screen flex items-center pt-24 pb-16 overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <Image
                        src={test.image}
                        alt={test.title}
                        fill
                        className="object-cover object-right scale-105"
                        priority
                    />
                    {/* Orange Side Fade Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-r from-[#f88c29] via-[#f88c29]/95 to-transparent lg:w-[70%] w-full" />
                </div>

                <div className="container mx-auto px-6 relative z-10">
                    <Reveal>
                        <div className="max-w-3xl text-white">
                            <h1 className="text-3xl lg:text-5xl font-black mb-4 leading-tight">
                                {test.title} <br className="hidden lg:block" /> at Home
                            </h1>
                            
                            {test.startingPrice && (
                                <p className="text-xl lg:text-2xl font-bold mb-6">
                                    Price starting from <span className="text-yellow-400">{test.startingPrice}</span>
                                </p>
                            )}

                            <ul className="space-y-3 mb-8">
                                {(test.keyServices || []).slice(0, 4).map((service, idx) => (
                                    <li key={idx} className="flex items-center gap-3 text-sm font-medium text-white/90">
                                        <div className="w-5 h-5 rounded-full border border-white/40 flex items-center justify-center shrink-0">
                                            <CheckIcon className="w-3 h-3 text-white stroke-[3]" />
                                        </div>
                                        {service}
                                    </li>
                                ))}
                            </ul>

                            <div className="flex flex-wrap gap-4">
                                <Link 
                                    href="/contact"
                                    className="px-8 py-3.5 rounded-xl bg-white text-[#f88c29] font-black text-xs uppercase tracking-wider shadow-xl hover:bg-gray-100 transition-all hover:-translate-y-1"
                                >
                                    Book Appointment
                                </Link>
                                <a 
                                    href="https://wa.me/97142729302" 
                                    target="_blank"
                                    className="px-8 py-3.5 rounded-xl bg-white text-gray-900 font-black text-xs uppercase tracking-wider hover:bg-gray-100 transition-all flex items-center gap-2 shadow-xl"
                                >
                                    <WhatsAppIcon className="w-4 h-4 text-[#25D366]" />
                                    WhatsApp for Details
                                </a>
                            </div>
                        </div>
                    </Reveal>
                </div>
            </section>

            {/* 2. "What is" Section */}
            <section className="py-16 bg-white overflow-hidden">
                <div className="container mx-auto px-6 max-w-7xl">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <Reveal>
                            <div className="flex gap-4">
                                <div className="flex-1 mt-8">
                                    <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-xl">
                                        <Image src={test.image} alt="Clinical Care" fill className="object-cover" />
                                    </div>
                                </div>
                                <div className="flex-1 mb-8">
                                    <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-xl">
                                        <Image src={test.subSections?.[0]?.image || test.image} alt="Lab Work" fill className="object-cover" />
                                    </div>
                                </div>
                            </div>
                        </Reveal>
                        <Reveal delayMs={200}>
                            <div>
                                <h2 className="text-3xl lg:text-4xl font-black text-gray-900 mb-6 leading-tight">
                                    What is {test.title}?
                                </h2>
                                <p className="text-base text-gray-600 leading-relaxed mb-8">
                                    {test.description}
                                </p>
                                <Link 
                                    href="/contact"
                                    className="inline-block px-8 py-3 rounded-lg bg-[#f88c29] text-white font-black text-xs uppercase tracking-wider hover:bg-[#e67b1d] transition-all shadow-md"
                                >
                                    Talk to an Expert
                                </Link>
                            </div>
                        </Reveal>
                    </div>
                </div>
            </section>

            {/* 3. "Who May Consider" Section */}
            <section className="py-16 bg-gray-50 overflow-hidden">
                <div className="container mx-auto px-6 max-w-7xl">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <Reveal>
                            <div>
                                <h2 className="text-3xl lg:text-4xl font-black text-gray-900 mb-8 leading-tight">
                                    Who May Consider <br /> {test.title}
                                </h2>
                                <div className="space-y-4">
                                    {(test.commonTests || []).slice(0, 5).map((item, idx) => (
                                        <div key={idx} className="flex gap-3">
                                            <div className="w-8 h-8 rounded-full bg-[#f88c29] flex items-center justify-center shrink-0 text-white font-black text-xs">
                                                {idx + 1}
                                            </div>
                                            <p className="text-base text-gray-700 font-bold py-1">
                                                {item.name}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </Reveal>
                        <Reveal delayMs={300}>
                            <div className="relative aspect-[4/3] rounded-[2rem] overflow-hidden shadow-xl">
                                <Image src={test.subSections?.[1]?.image || test.subSections?.[0]?.image || test.image} alt="Clinical Context" fill className="object-cover" />
                            </div>
                        </Reveal>
                    </div>
                </div>
            </section>

            {/* 4. "How it Works" (Gradient Section) */}
            <section className="py-12">
                <div className="container mx-auto px-6 max-w-7xl">
                    <div className="relative rounded-[2rem] bg-gradient-to-br from-[#f88c29] to-[#d46a0a] p-8 lg:p-12 overflow-hidden shadow-xl">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                        
                        <div className="relative z-10 text-center mb-10">
                            <h2 className="text-2xl lg:text-3xl font-black text-white mb-3">
                                How {test.title} Works
                            </h2>
                            <div className="h-1 w-12 bg-white/30 mx-auto rounded-full" />
                        </div>

                        <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            {(test.keyServices || []).slice(0, 4).map((service, idx) => (
                                <div key={idx} className="bg-white/10 backdrop-blur-md border border-white/20 p-5 rounded-2xl hover:bg-white/20 transition-all group">
                                    <div className="w-8 h-8 rounded-lg bg-white text-[#f88c29] flex items-center justify-center mb-3 font-black text-sm group-hover:scale-110 transition-transform">
                                        {idx + 1}
                                    </div>
                                    <h4 className="text-base font-black text-white mb-2 leading-tight">{service}</h4>
                                    <p className="text-white/80 text-[10px] font-medium leading-relaxed">
                                        Professional diagnostic services tailored to your specific clinical needs.
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* 5. "Our Simple 4 Step Process" */}
            {test.process && (
                <section className="py-16 bg-white">
                    <div className="container mx-auto px-6 max-w-7xl">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl lg:text-4xl font-black text-gray-900 mb-3">
                                Our Simple 4 Step Process
                            </h2>
                            <p className="text-gray-400 font-bold uppercase tracking-widest text-[10px]">Efficient • Reliable • Professional</p>
                        </div>

                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                            {processSteps.map((step, idx) => (
                                <Reveal key={idx} delayMs={idx * 150}>
                                    <div className="text-center group">
                                        <div className="relative w-28 h-28 lg:w-36 lg:h-36 mx-auto mb-6">
                                            <div className="absolute inset-0 bg-[#f88c29]/10 rounded-full group-hover:scale-110 transition-transform duration-500" />
                                            <div className="absolute inset-3 rounded-full overflow-hidden border-2 border-white shadow-lg">
                                                <Image 
                                                    src={step.image || test.image} 
                                                    alt={step.title} 
                                                    fill 
                                                    className="object-cover group-hover:scale-110 transition-transform duration-500" 
                                                />
                                            </div>
                                            <div className="absolute top-0 right-0 w-8 h-8 bg-[#f88c29] text-white rounded-full flex items-center justify-center font-black text-xs shadow-md">
                                                {idx + 1}
                                            </div>
                                        </div>
                                        <h4 className="text-lg font-black text-gray-900 mb-1">{step.title}</h4>
                                        <p className="text-xs text-gray-500 font-medium leading-relaxed px-2">
                                            {step.description}
                                        </p>
                                    </div>
                                </Reveal>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* 6. Accuracy Note (Special for NIPT) */}
            {test.accuracyNote && (
                <section className="py-16 bg-[#f88c29] text-white">
                    <div className="container mx-auto px-6 max-w-4xl text-center">
                        <Reveal>
                            <div className="inline-block p-3 rounded-2xl bg-white/10 border border-white/20 mb-8">
                                <ShieldCheckIcon className="w-12 h-12 text-white" />
                            </div>
                            <h2 className="text-2xl lg:text-3xl font-black mb-6 uppercase tracking-tight">Accuracy and Reliability</h2>
                            <p className="text-xl lg:text-2xl font-bold text-white leading-relaxed italic">
                                "{test.accuracyNote}"
                            </p>
                        </Reveal>
                    </div>
                </section>
            )}

            {/* 7. Packages Section (Special for NIPT) */}
            {test.packages && (
                <section className="py-20 bg-gray-50 overflow-hidden">
                    <div className="container mx-auto px-6 max-w-7xl">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl lg:text-4xl font-black text-gray-900 mb-4">Choose Your Screening Panel</h2>
                            <p className="text-gray-500 font-bold uppercase tracking-widest text-[10px]">Select the right level of detailed screening</p>
                        </div>
                        <div className="grid md:grid-cols-3 gap-8">
                            {test.packages.map((pkg, idx) => (
                                <Reveal key={idx} delayMs={idx * 100}>
                                    <div className="bg-white rounded-[2.5rem] overflow-hidden border border-gray-100 shadow-xl hover:-translate-y-2 transition-all flex flex-col h-full">
                                        <div className={`p-8 ${pkg.color || 'bg-[#f88c29]'} text-white text-center`}>
                                            <h3 className="text-xl font-bold mb-2 uppercase tracking-tight">{pkg.name}</h3>
                                            <p className="text-white/70 text-[10px] font-medium leading-relaxed">{pkg.description}</p>
                                        </div>
                                        <div className="p-8 flex-1 flex flex-col">
                                            <ul className="space-y-4 mb-10">
                                                {pkg.features.map((feature, i) => (
                                                    <li key={i} className="flex gap-3 text-sm text-gray-600 font-medium">
                                                        <CheckCircleIcon className="w-5 h-5 text-[#f88c29] shrink-0" />
                                                        {feature}
                                                    </li>
                                                ))}
                                            </ul>
                                            <div className="mt-auto">
                                                <BookActionButton 
                                                    label="Enquire Now"
                                                    whatsappText={`Hi, I'm interested in the ${pkg.name}.`}
                                                    className="w-full border-2 border-gray-100 py-3 rounded-xl font-black text-xs uppercase tracking-wider text-[#307984] hover:border-[#f88c29] hover:text-[#f88c29] transition-all"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </Reveal>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* 8. Frequently Asked Questions */}
            {test.faqs && (
                <section className="py-16 bg-white">
                    <div className="container mx-auto px-6 max-w-3xl">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl lg:text-4xl font-black text-gray-900 mb-3">
                                Frequently Asked Questions
                            </h2>
                            <div className="h-1 w-16 bg-[#f88c29] mx-auto rounded-full" />
                        </div>
                        
                        <div className="bg-white rounded-[2rem] p-6 lg:p-10 shadow-lg border border-gray-100">
                            {test.faqs.map((faq, idx) => (
                                <FAQItem key={idx} question={faq.question} answer={faq.answer} />
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* 7. Final CTA */}
            <section className="py-16 container mx-auto px-6 max-w-7xl">
                <Reveal>
                    <div className="relative rounded-[2rem] bg-gradient-to-br from-gray-900 to-black p-8 lg:p-12 text-center overflow-hidden shadow-2xl">
                        <div className="absolute inset-0 opacity-20">
                            <Image src={test.image} alt="Background" fill className="object-cover grayscale" />
                        </div>
                        
                        <div className="relative z-10 max-w-2xl mx-auto">
                            <h2 className="text-2xl lg:text-3xl font-black text-white mb-4 leading-tight">
                                Book Your {test.title} Screening Today
                            </h2>
                            <p className="text-gray-300 text-xs lg:text-sm mb-8 leading-relaxed">
                                Take the first step towards precise diagnosis and better health. <br className="hidden lg:block" />
                                Our experts are ready to assist you.
                            </p>
                            <div className="flex flex-wrap justify-center gap-4">
                                <Link 
                                    href="/contact"
                                    className="px-10 py-4 rounded-xl bg-[#f88c29] text-white font-black text-xs uppercase tracking-wider hover:bg-[#e67b1d] transition-all shadow-xl"
                                >
                                    Schedule Appointment Now
                                </Link>
                                <a 
                                    href="tel:+97142718226" 
                                    className="px-10 py-4 rounded-xl bg-white text-gray-900 font-black text-xs uppercase tracking-wider hover:bg-gray-100 transition-all shadow-xl"
                                >
                                    Call Us
                                </a>
                            </div>
                        </div>
                    </div>
                </Reveal>
            </section>
        </main>
    );
}
