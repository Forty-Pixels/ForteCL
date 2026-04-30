'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Reveal from '@/components/Animation/Reveal';
import Footer from '@/components/Landing-page/Footer/Footer';
import BookActionButton from '@/components/Booking/BookActionButton';
import { 
    CheckIcon, 
    ShieldCheckIcon, 
    ClockIcon, 
    HomeIcon, 
    BeakerIcon,
    ChevronDownIcon,
    InformationCircleIcon,
    ExclamationTriangleIcon
} from '@heroicons/react/24/outline';

const faqs = [
    {
        question: "Is NIPT safe?",
        answer: "Yes, NIPT is completely safe. It is a non-invasive test that only requires a maternal blood sample and poses no risk to the baby."
    },
    {
        question: "How accurate is NIPT?",
        answer: "NIPT offers up to 99.99% accuracy for common chromosomal conditions, making it one of the most reliable prenatal screening tests available."
    },
    {
        question: "Do I need to fast before the test?",
        answer: "No, fasting is not required for NIPT."
    },
    {
        question: "Is NIPT a diagnostic test?",
        answer: "No, NIPT is a screening test. If the result shows high risk, your doctor may recommend confirmatory diagnostic tests."
    },
    {
        question: "When can I take the NIPT test?",
        answer: "NIPT can be performed as early as 10 weeks of pregnancy."
    },
    {
        question: "Can I do the NIPT test at home?",
        answer: "Yes, the test can be done at home. A licensed healthcare professional will visit you to collect the sample safely and comfortably."
    },
    {
        question: "Can NIPT determine the baby’s gender?",
        answer: "Yes, NIPT can optionally determine fetal gender, subject to local regulations."
    },
    {
        question: "Is NIPT safe for my baby?",
        answer: "Yes, NIPT is completely safe. It is a non-invasive blood test done on the mother and does not pose any risk to the baby."
    },
    {
        question: "Is NIPT suitable for twin pregnancies?",
        answer: "Yes, NIPT can be performed in twin pregnancies, but the scope of reporting may vary depending on the panel."
    }
];

const packages = [
    {
        name: "NIPT BASIC SCREEN",
        description: "The Basic panel includes screening for the most common chromosomal conditions.",
        features: [
            "Trisomy 21 (Down Syndrome)",
            "Trisomy 18 (Edwards Syndrome)",
            "Trisomy 13 (Patau Syndrome)",
            "Fetal Gender Determination"
        ],
        color: "bg-[#307984]"
    },
    {
        name: "NIPT ADVANCED SCREEN",
        description: "Expanded chromosomal analysis for comprehensive screening.",
        features: [
            "Common Trisomies (21, 18, 13)",
            "Sex Chromosome Abnormalities (Turner, Klinefelter, XXX, XYY)",
            "Rare Autosomal Trisomies (9, 16, 22)",
            "Fetal Gender Determination"
        ],
        color: "bg-[#f88c29]"
    },
    {
        name: "NIPT ADVANCED PLUS SCREEN",
        description: "Our most detailed screening including microdeletion syndromes.",
        features: [
            "Everything in Advanced Screen",
            "Microdeletion Syndromes (Optional)",
            "22q11.2 (DiGeorge Syndrome)",
            "1p36 Deletion Syndrome",
            "Angelman & Prader-Willi",
            "Cri-du-chat Syndrome"
        ],
        color: "bg-[#061414]"
    }
];

export default function NiptPage() {
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    return (
        <main className="min-h-screen bg-white">
            {/* Hero Section */}
            <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-[#061414]">
                <div className="absolute inset-0 opacity-20">
                    <Image 
                        src="/nipt-hero-bg.png" 
                        alt="Background" 
                        fill 
                        className="object-cover"
                        priority
                    />
                </div>
                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    <Reveal delayMs={100}>
                        <span className="inline-block px-4 py-1.5 rounded-full bg-[#f88c29] text-white text-[10px] font-bold tracking-widest uppercase mb-6">
                            Advanced Prenatal Screening
                        </span>
                    </Reveal>
                    <Reveal delayMs={200}>
                        <h1 className="text-4xl lg:text-7xl font-bold text-white mb-6 leading-[1.1]">
                            NIPT TEST IN DUBAI – <br />
                            <span className="text-[#f88c29]">SAFE, ACCURATE & EARLY SCREENING</span>
                        </h1>
                    </Reveal>
                    <Reveal delayMs={300}>
                        <p className="text-xl text-white/70 max-w-2xl mb-10 leading-relaxed">
                            A smarter way to screen your baby's health. The Non-Invasive Prenatal Test (NIPT) is a cutting-edge solution that assesses genetic risks safely and accurately.
                        </p>
                    </Reveal>
                    <Reveal delayMs={400}>
                        <div className="flex flex-wrap gap-4">
                            <BookActionButton 
                                label="BOOK APPOINTMENT"
                                whatsappText="Hi, I would like to book an NIPT test."
                                className="bg-[#f88c29] hover:bg-[#e67b1d] text-white px-8 py-4 rounded-full font-bold transition-all"
                            />
                            <Link href="#packages" className="border border-white/20 hover:bg-white/10 text-white px-8 py-4 rounded-full font-bold transition-all">
                                VIEW PACKAGES
                            </Link>
                        </div>
                    </Reveal>
                </div>
            </section>

            {/* What is NIPT */}
            <section className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <Reveal delayMs={100}>
                            <div className="relative aspect-square rounded-3xl overflow-hidden shadow-2xl">
                                <Image 
                                    src="/nipt-intro.png" 
                                    alt="NIPT Screening" 
                                    fill 
                                    className="object-cover"
                                />
                            </div>
                        </Reveal>
                        <div>
                            <Reveal delayMs={200}>
                                <h2 className="text-3xl lg:text-4xl font-bold text-[#061414] mb-6">What is NIPT?</h2>
                            </Reveal>
                            <Reveal delayMs={300}>
                                <div className="space-y-6 text-gray-600 leading-relaxed text-lg">
                                    <p>
                                        NIPT is a sophisticated screening test that analyses small fragments of fetal DNA (cell-free DNA) present in the mother’s blood. By examining this DNA, the test can identify the risk of specific chromosomal abnormalities without the need for invasive procedures.
                                    </p>
                                    <p>
                                        Unlike traditional methods such as amniocentesis or chorionic villus sampling (CVS), NIPT carries no risk of miscarriage, making it a preferred choice for modern prenatal screening.
                                    </p>
                                </div>
                            </Reveal>
                            <div className="grid sm:grid-cols-2 gap-6 mt-10">
                                <Reveal delayMs={400} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                                    <ShieldCheckIcon className="w-10 h-10 text-[#f88c29] mb-4" />
                                    <h4 className="font-bold mb-2">100% Risk Free</h4>
                                    <p className="text-sm text-gray-500">No risk of miscarriage or complications for mother or baby.</p>
                                </Reveal>
                                <Reveal delayMs={500} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                                    <BeakerIcon className="w-10 h-10 text-[#307984] mb-4" />
                                    <h4 className="font-bold mb-2">99.99% Accuracy</h4>
                                    <p className="text-sm text-gray-500">Highest standard of precision for common chromosomal conditions.</p>
                                </Reveal>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* How it Works */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <Reveal delayMs={100}>
                            <h2 className="text-3xl lg:text-4xl font-bold text-[#061414] mb-6">How the Test Works</h2>
                        </Reveal>
                        <Reveal delayMs={200}>
                            <p className="text-gray-600">
                                During pregnancy, the placenta releases fetal DNA into the maternal bloodstream. Using advanced molecular techniques, this DNA is isolated and analysed.
                            </p>
                        </Reveal>
                    </div>
                    <div className="grid md:grid-cols-4 gap-8">
                        {[
                            { step: "01", title: "Blood Collection", desc: "A simple, non-invasive blood sample collection from the mother." },
                            { step: "02", title: "DNA Extraction", desc: "Extraction of cell-free fetal DNA from the maternal bloodstream." },
                            { step: "03", title: "Genomic Analysis", desc: "High-precision analysis using cutting-edge genomic technologies." },
                            { step: "04", title: "Expert Reporting", desc: "Detailed, clinically validated reporting by our specialists." }
                        ].map((item, idx) => (
                            <Reveal key={idx} delayMs={300 + idx * 100} className="relative group">
                                <div className="text-6xl font-black text-gray-100 absolute -top-10 left-0 group-hover:text-[#f88c29]/10 transition-colors">
                                    {item.step}
                                </div>
                                <div className="relative pt-10 border-t-2 border-gray-100 group-hover:border-[#f88c29] transition-colors">
                                    <h4 className="text-xl font-bold mb-3">{item.title}</h4>
                                    <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* Conditions Screened */}
            <section className="py-20 bg-[#061414] text-white">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid lg:grid-cols-2 gap-20 items-center">
                        <div>
                            <Reveal delayMs={100}>
                                <h2 className="text-3xl lg:text-4xl font-bold mb-8">Conditions Screened by NIPT</h2>
                            </Reveal>
                            <div className="space-y-12">
                                <div>
                                    <h4 className="text-[#f88c29] font-bold uppercase tracking-wider text-sm mb-6">Common Chromosomal Disorders</h4>
                                    <ul className="grid sm:grid-cols-1 gap-4">
                                        {["Trisomy 21 (Down Syndrome)", "Trisomy 18 (Edwards Syndrome)", "Trisomy 13 (Patau Syndrome)"].map((cond, i) => (
                                            <li key={i} className="flex items-center gap-3">
                                                <div className="w-6 h-6 rounded-full bg-[#f88c29]/20 flex items-center justify-center">
                                                    <CheckIcon className="w-4 h-4 text-[#f88c29]" />
                                                </div>
                                                <span className="font-medium">{cond}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div>
                                    <h4 className="text-[#307984] font-bold uppercase tracking-wider text-sm mb-6">Expanded Panels Include</h4>
                                    <ul className="grid sm:grid-cols-1 gap-4">
                                        {["Sex chromosome abnormalities (Turner, Klinefelter, etc.)", "Selected microdeletion syndromes", "Optional fetal gender determination"].map((cond, i) => (
                                            <li key={i} className="flex items-center gap-3">
                                                <div className="w-6 h-6 rounded-full bg-[#307984]/20 flex items-center justify-center">
                                                    <CheckIcon className="w-4 h-4 text-[#307984]" />
                                                </div>
                                                <span className="font-medium text-white/80">{cond}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <Reveal delayMs={300}>
                            <div className="bg-white/5 border border-white/10 p-10 rounded-[40px] backdrop-blur-sm">
                                <div className="text-[#f88c29] text-5xl font-black mb-6">99.99%</div>
                                <h3 className="text-2xl font-bold mb-6">Accuracy and Reliability</h3>
                                <p className="text-white/60 leading-relaxed mb-8">
                                    NIPT IS A HIGHLY ADVANCED SCREENING TEST WITH UP TO 99.99% ACCURACY FOR COMMON CHROMOSOMAL CONDITIONS, OFFERING RELIABLE AND EARLY REASSURANCE FOR EXPECTING PARENTS.
                                </p>
                                <div className="flex items-start gap-4 p-4 bg-orange-500/10 rounded-2xl border border-orange-500/20">
                                    <InformationCircleIcon className="w-6 h-6 text-[#f88c29] flex-shrink-0" />
                                    <p className="text-xs text-orange-200">
                                        Important: NIPT is a screening test, not a diagnostic test. Any high-risk result should be confirmed with diagnostic procedures under medical guidance.
                                    </p>
                                </div>
                            </div>
                        </Reveal>
                    </div>
                </div>
            </section>

            {/* Who Should Consider */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid lg:grid-cols-[40%_60%] gap-16 items-center">
                        <div>
                            <Reveal delayMs={100}>
                                <h2 className="text-3xl lg:text-4xl font-bold text-[#061414] mb-8">Who Should Consider NIPT?</h2>
                            </Reveal>
                            <Reveal delayMs={200}>
                                <p className="text-gray-600 mb-8 leading-relaxed">
                                    NIPT is suitable for all pregnant women but is especially recommended for specific cases where risk factors may be present.
                                </p>
                            </Reveal>
                            <Reveal delayMs={300}>
                                <div className="flex items-center gap-4 p-6 bg-[#307984]/5 rounded-3xl border border-[#307984]/10">
                                    <ClockIcon className="w-12 h-12 text-[#307984]" />
                                    <div>
                                        <h4 className="font-bold text-[#061414]">Early Detection</h4>
                                        <p className="text-sm text-gray-500">Can be performed as early as 10 weeks of gestation.</p>
                                    </div>
                                </div>
                            </Reveal>
                        </div>
                        <div className="grid sm:grid-cols-2 gap-6">
                            {[
                                "Women aged 35 years or above",
                                "Pregnancies with abnormal ultrasound findings",
                                "Family history of genetic conditions",
                                "Previous pregnancy with chromosomal abnormalities",
                                "Anyone seeking early, non-invasive reassurance"
                            ].map((item, i) => (
                                <Reveal key={i} delayMs={400 + i * 100} className="p-6 bg-gray-50 rounded-2xl hover:bg-white hover:shadow-xl transition-all border border-transparent hover:border-gray-100">
                                    <div className="w-8 h-8 rounded-full bg-[#f88c29] text-white flex items-center justify-center font-bold mb-4">
                                        {i + 1}
                                    </div>
                                    <p className="font-medium text-gray-700">{item}</p>
                                </Reveal>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Why Choose Forte */}
            <section className="py-20 bg-gray-50 overflow-hidden">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <Reveal delayMs={100}>
                            <h2 className="text-3xl lg:text-4xl font-bold text-[#061414] mb-4">Why Choose Forte Clinical Laboratory?</h2>
                        </Reveal>
                        <Reveal delayMs={200}>
                            <p className="text-gray-500">Trusted provider of advanced prenatal screening in Dubai</p>
                        </Reveal>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            { title: "Quality Accreditation", desc: "DHA licensed and meeting the highest clinical quality standards." },
                            { title: "Advanced Molecular Lab", desc: "Equipped with cutting-edge genomic technologies for precise testing." },
                            { title: "Expert Team", desc: "Experienced professionals in molecular diagnostics and genetic testing." },
                            { title: "High Accuracy Standards", desc: "Strict quality control systems and validated methodologies." },
                            { title: "Fast Turnaround Time", desc: "Efficient workflows enable timely and dependable reporting." },
                            { title: "Patient-Centric Care", desc: "Ensuring complete privacy, comfort, and dedicated support." }
                        ].map((item, idx) => (
                            <Reveal key={idx} delayMs={300 + idx * 50} className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm hover:shadow-lg transition-shadow">
                                <div className="w-12 h-12 rounded-2xl bg-[#f88c29]/10 flex items-center justify-center mb-6">
                                    <CheckIcon className="w-6 h-6 text-[#f88c29]" />
                                </div>
                                <h4 className="text-lg font-bold text-[#061414] mb-3">{item.title}</h4>
                                <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* NIPT at Home */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="bg-[#307984] rounded-[50px] p-8 lg:p-20 text-white relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-1/3 h-full opacity-10 pointer-events-none">
                            <HomeIcon className="w-full h-full transform translate-x-1/4 -translate-y-1/4" />
                        </div>
                        <div className="grid lg:grid-cols-2 gap-16 items-center relative z-10">
                            <div>
                                <Reveal delayMs={100}>
                                    <h2 className="text-3xl lg:text-5xl font-bold mb-6">NIPT Test at Home in Dubai</h2>
                                </Reveal>
                                <Reveal delayMs={200}>
                                    <p className="text-xl text-white/80 mb-10 leading-relaxed">
                                        Safe, Convenient & Confidential Prenatal Screening at Your Doorstep. Expectant mothers can undergo advanced screening without visiting a clinic.
                                    </p>
                                </Reveal>
                                <div className="space-y-6">
                                    {[
                                        { title: "Book Appointment", desc: "Choose your preferred date and time online." },
                                        { title: "Licensed Nurse Visit", desc: "A DHA-licensed nurse visits your home for collection." },
                                        { title: "Accredited Lab Analysis", desc: "Sample processed in our state-of-the-art facility." },
                                        { title: "Receive Results", desc: "Digital reports with optional doctor consultation." }
                                    ].map((step, idx) => (
                                        <Reveal key={idx} delayMs={300 + idx * 100} className="flex gap-4">
                                            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-white/20 flex items-center justify-center font-bold">
                                                {idx + 1}
                                            </div>
                                            <div>
                                                <h4 className="font-bold">{step.title}</h4>
                                                <p className="text-sm text-white/60">{step.desc}</p>
                                            </div>
                                        </Reveal>
                                    ))}
                                </div>
                            </div>
                            <div className="bg-white rounded-[40px] p-10 text-[#061414] shadow-2xl">
                                <h3 className="text-2xl font-bold mb-8">Why it's better than visiting a lab</h3>
                                <div className="space-y-8">
                                    <div className="flex gap-4">
                                        <div className="w-12 h-12 rounded-full bg-[#f88c29]/10 flex items-center justify-center flex-shrink-0">
                                            <ClockIcon className="w-6 h-6 text-[#f88c29]" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold">Convenience</h4>
                                            <p className="text-sm text-gray-500">Book anytime, at-home collection at your chosen location.</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-4">
                                        <div className="w-12 h-12 rounded-full bg-[#307984]/10 flex items-center justify-center flex-shrink-0">
                                            <ShieldCheckIcon className="w-6 h-6 text-[#307984]" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold">Privacy</h4>
                                            <p className="text-sm text-gray-500">Sample collection and results are handled confidentially.</p>
                                        </div>
                                    </div>
                                    <BookActionButton 
                                        label="BOOK HOME COLLECTION"
                                        whatsappText="Hi, I'd like to book an NIPT test at home."
                                        className="w-full bg-[#061414] text-white py-4 rounded-2xl font-bold hover:bg-[#f88c29] transition-all mt-4"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Packages Section */}
            <section id="packages" className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <Reveal delayMs={100}>
                            <h2 className="text-3xl lg:text-4xl font-bold text-[#061414] mb-4">Choose Your NIPT Panel</h2>
                        </Reveal>
                        <Reveal delayMs={200}>
                            <p className="text-gray-500">Selecting the right level of screening for your peace of mind</p>
                        </Reveal>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8">
                        {packages.map((pkg, idx) => (
                            <Reveal key={idx} delayMs={300 + idx * 100} className="bg-white rounded-[40px] overflow-hidden border border-gray-100 shadow-lg hover:-translate-y-2 transition-all flex flex-col">
                                <div className={`${pkg.color} p-8 text-white text-center`}>
                                    <h3 className="text-xl font-bold mb-2">{pkg.name}</h3>
                                    <p className="text-white/70 text-xs">{pkg.description}</p>
                                </div>
                                <div className="p-8 flex-1">
                                    <ul className="space-y-4 mb-10">
                                        {pkg.features.map((feature, i) => (
                                            <li key={i} className="flex gap-3 text-sm text-gray-600">
                                                <CheckIcon className="w-5 h-5 text-[#f88c29] flex-shrink-0" />
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>
                                    <BookActionButton 
                                        label="SELECT PANEL"
                                        whatsappText={`Hi, I'm interested in the ${pkg.name}.`}
                                        className="w-full border-2 border-gray-100 py-3 rounded-2xl font-bold hover:border-[#f88c29] hover:text-[#f88c29] transition-all"
                                    />
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-20 bg-white">
                <div className="max-w-4xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <Reveal delayMs={100}>
                            <h2 className="text-3xl lg:text-4xl font-bold text-[#061414] mb-4">Frequently Asked Questions</h2>
                        </Reveal>
                    </div>
                    <div className="space-y-4">
                        {faqs.map((faq, idx) => (
                            <Reveal key={idx} delayMs={idx * 50} className="border border-gray-100 rounded-3xl overflow-hidden">
                                <button 
                                    onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                                    className="w-full p-6 text-left flex justify-between items-center bg-white hover:bg-gray-50 transition-colors"
                                >
                                    <span className="font-bold text-[#061414]">{faq.question}</span>
                                    <ChevronDownIcon className={`w-5 h-5 text-gray-400 transition-transform ${openFaq === idx ? 'rotate-180' : ''}`} />
                                </button>
                                {openFaq === idx && (
                                    <div className="p-6 pt-0 text-gray-500 text-sm leading-relaxed bg-gray-50">
                                        {faq.answer}
                                    </div>
                                )}
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* Final Note Section */}
            <section className="py-20 bg-[#061414]">
                <div className="max-w-5xl mx-auto px-6">
                    <Reveal delayMs={100} className="bg-white/5 border border-white/10 rounded-[40px] p-8 lg:p-16 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-8 text-white/5 pointer-events-none">
                            <ExclamationTriangleIcon className="w-32 h-32" />
                        </div>
                        <div className="relative z-10">
                            <h3 className="text-2xl font-bold text-white mb-6">A NOTE FROM FORTE CLINICAL LABORATORY</h3>
                            <div className="space-y-6 text-white/60 text-sm leading-relaxed">
                                <p>
                                    NIPT is a safe and reliable screening test that helps assess the risk of certain chromosomal conditions in your baby and can also provide information about fetal gender. It is important to understand that NIPT is not a diagnostic test; it only indicates the likelihood of a condition and does not confirm it.
                                </p>
                                <p>
                                    If results show a higher risk, further diagnostic testing may be recommended. This test is completely optional, and we encourage you to discuss it with your healthcare provider to make an informed decision that is right for you.
                                </p>
                            </div>
                            <div className="mt-10 pt-10 border-t border-white/10 flex flex-wrap gap-10 items-center">
                                <div className="flex -space-x-3">
                                    {[1,2,3,4].map(i => (
                                        <div key={i} className="w-10 h-10 rounded-full border-2 border-[#061414] bg-gray-800 overflow-hidden relative">
                                            <Image src={`/avatars/user-${i}.png`} alt="User" fill className="object-cover opacity-50" />
                                        </div>
                                    ))}
                                    <div className="w-10 h-10 rounded-full border-2 border-[#061414] bg-[#f88c29] flex items-center justify-center text-[10px] font-bold text-white">
                                        +500
                                    </div>
                                </div>
                                <p className="text-white/40 text-xs">Trusted by over 500+ expectant mothers in Dubai this year.</p>
                            </div>
                        </div>
                    </Reveal>
                </div>
            </section>

            <Footer />
        </main>
    );
}
