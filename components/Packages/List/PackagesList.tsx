'use client';

import { useState } from 'react';
import Image from 'next/image';

const packages = [
    {
        id: 'diabetes',
        title: "Diabetes Care Package — AED 89",
        description: "The Diabetes Care Package offers a comprehensive range of tests to help monitor and manage your blood sugar levels, ensuring early detection and effective management of diabetes. Stay in control of your health with accurate and reliable results tailored for your well-being. At Forte Clinical Laboratory in Dubai, UAE, our staff and advanced technology ensure the most accurate and comprehensive diabetes care tests.",
        image: "/Packages/list/diabetes.png",
        testsTotal: 6,
        subTests: [
            { title: "LDL", explanation: "Low-density lipoprotein cholesterol" },
            { title: "HbA1C", explanation: "3-month average blood glucose level" },
            { title: "FBS", explanation: "Fasting Blood Sugar" },
            { title: "HDL", explanation: "High-density lipoprotein cholesterol" },
            { title: "Triglycerides", explanation: "Blood fat levels" },
            { title: "TC", explanation: "Total Cholesterol" }
        ]
    },
    {
        id: 'liver',
        title: "Liver Profile — AED 99",
        description: "From assessing liver function test to imaging studies, these tests offer valuable insights into the health and functionality of your liver. Check for signs of inflammation or damage, ensuring optimal liver function for your overall well-being. Experience the gold standard in liver health assessments with our range of tests, including liver function tests and advanced imaging studies with Forte Clinical Laboratory, Dubai. Sample Type: Blood sample",
        image: "/Packages/list/liver.png",
        testsTotal: 9,
        subTests: [
            { title: "Alanine transaminase (ALT) SGPT", explanation: "Enzyme found mostly in the liver; markers of liver damage." },
            { title: "Aspartate transaminase (AST) SGOT", explanation: "Enzyme found in liver and other organs; used to detect liver injury." },
            { title: "Alkaline phosphatase (ALP)", explanation: "Enzyme related to the bile ducts and bone health." },
            { title: "Albumin (ALB)", explanation: "Main protein made by the liver." },
            { title: "Total Protein (TP)", explanation: "Measures the total amount of protein in your blood." },
            { title: "Direct Bilirubin", explanation: "Processed bilirubin ready to be excreted." },
            { title: "Globulin", explanation: "Proteins that help fight infection and transport nutrients." },
            { title: "Gamma-glutamyltransferase (GGT)", explanation: "Sensitive marker for bile duct issues or liver inflammation." },
            { title: "Total Bilirubin", explanation: "Total count of bilirubin in blood, checking liver excretion." }
        ]
    },
    {
        id: 'kidney',
        title: "Kidney Care Profile — AED 69",
        description: "Elevate your proactive approach to kidney health with our comprehensive lab tests. Designed to detect potential issues early on, these tests empower you to make informed decisions about hydration, diet, and overall well-being. At Forte Clinical Laboratory in Dubai, UAE, our state-of-the-art technology and expert staff stand as a testament to our commitment to providing the best in kidney diagnostics.",
        image: "/Packages/list/kidney.png",
        testsTotal: 11,
        subTests: [
            { title: "eGFR", explanation: "Estimated Glomerular Filtration Rate; gold standard for kidney health." },
            { title: "Phosphorus", explanation: "Essential mineral for bone and cell health." },
            { title: "Bicarbonate", explanation: "Checks for acid-base balance in the blood." },
            { title: "Urea", explanation: "Waste product from protein breakdown." },
            { title: "Creatinine", explanation: "Key marker for renal function." },
            { title: "Uric Acid", explanation: "Detection for gout and kidney stone risk." },
            { title: "Urine Analysis", explanation: "Full examination for infection and renal markers." },
            { title: "Sodium", explanation: "Essential electrolyte for fluid balance." },
            { title: "Potassium", explanation: "Critical for heart and muscle function." },
            { title: "Chloride", explanation: "Helps maintain fluid balance and pH." },
            { title: "Calcium", explanation: "Vital for bones, heart, and nerves." }
        ]
    },
    {
        id: 'thyroid',
        title: "Healthy Thyriod with Accurate Thyriod Tests — AED 49",
        description: "Ensure the vitality of your thyroid gland with our specialized lab tests tailored to assess and support its optimal function. At Forte Clinical Laboratory in Dubai, UAE, our advanced technology and expert staff contribute to providing the most precise and comprehensive thyroid diagnostics, prioritising your overall well-being.",
        image: "/Packages/list/thyroid.png",
        testsTotal: 3,
        subTests: [
            { title: "Thyroid Stimulating Hormone (TSH)", explanation: "Measures overall thyroid function." },
            { title: "TT3", explanation: "Total Triiodothyronine assessment." },
            { title: "TT4", explanation: "Total Thyroxine assessment." }
        ]
    },
    {
        id: 'lipid',
        title: "Lipid Profile — AED 49",
        description: "Discover the significance of a Lipid Profile at Forte Clinical Laboratory, the leading lab in Dubai, UAE. This essential test helps assess your cholesterol and triglyceride levels, crucial for maintaining heart health and preventing cardiovascular issues. Take control of your well-being with accurate results powered by cutting-edge technology and a team of experts at Forte Clinical Laboratory.",
        image: "/Packages/list/lipid.png",
        testsTotal: 5,
        subTests: [
            { title: "LDL", explanation: "Low-density lipoprotein (bad cholesterol)" },
            { title: "HDL", explanation: "High-density lipoprotein (good cholesterol)" },
            { title: "Cholesterol", explanation: "Total cholesterol assessment" },
            { title: "Triglycerides", explanation: "Blood fat levels" },
            { title: "Non HDL", explanation: "Total cholesterol minus HDL" }
        ]
    },
    {
        id: 'fertility',
        title: "Female Fertility Test Package — AED 119",
        description: "The Female Fertility Test Package provides a comprehensive assessment of key hormones and factors that influence fertility. Designed to help women understand their reproductive health, this package includes essential tests like hormone levels, ovarian function, and more. Take a proactive step towards understanding your fertility with our expert care and advanced testing.",
        image: "/Packages/list/fertility.png",
        testsTotal: 5,
        subTests: [
            { title: "FSH", explanation: "Follicle Stimulating Hormone" },
            { title: "LH", explanation: "Luteinizing Hormone" },
            { title: "E2", explanation: "Estradiol (Estrogen)" },
            { title: "PRL", explanation: "Prolactin" },
            { title: "TSH", explanation: "Thyroid Stimulating Hormone" }
        ]
    },
    {
        id: 'cbc',
        title: "Complete Blood Count (CBC) — AED 88",
        description: "Unlock vital insights into your health with a CBC test at Forte Clinical Laboratory, Dubai. This fundamental test provides crucial information about your blood cells, helping to detect conditions such as infections, anemia, and more. Stay ahead of your health with precise results, powered by state-of-the-art technology.",
        image: "/Packages/list/cbc.png",
        testsTotal: 20,
        subTests: [
            { title: "Red blood cells count", explanation: "Measurement of red blood cells" },
            { title: "Hemoglobin (Hb)", explanation: "Protein in red blood cells that carries oxygen" },
            { title: "Hematocrit", explanation: "Proportion of red blood cells in blood" },
            { title: "MCV", explanation: "Mean corpuscular volume" },
            { title: "MCH", explanation: "Mean corpuscular hemoglobin" },
            { title: "MCHC", explanation: "Mean corpuscular hemoglobin concentration" },
            { title: "MPV", explanation: "Mean platelet volume" },
            { title: "RDW", explanation: "Red cell distribution width" },
            { title: "Platelet count", explanation: "Measurement of platelets for clotting" },
            { title: "White blood cells count", explanation: "Measurement of white blood cells for immunity" },
            { title: "Neutrophils", explanation: "Type of white blood cell" },
            { title: "Lymphocytes", explanation: "Type of white blood cell" },
            { title: "Eosinophils", explanation: "Type of white blood cell" },
            { title: "Monocytes", explanation: "Type of white blood cell" },
            { title: "Basophils", explanation: "Type of white blood cell" },
            { title: "Absolute neutrophil count", explanation: "Absolute count of neutrophils" },
            { title: "Absolute lymphocyte count", explanation: "Absolute count of lymphocytes" },
            { title: "Absolute monocyte count", explanation: "Absolute count of monocytes" },
            { title: "Absolute eosinophil count", explanation: "Absolute count of eosinophils" },
            { title: "Absolute basophil count", explanation: "Absolute count of basophils" }
        ]
    },
    {
        id: 'electrolytes',
        title: "Electrolytes Panel — AED 49",
        description: "Stay balanced and healthy with an Electrolytes Panel test at Forte Clinical Laboratory, Dubai. This essential test measures key electrolytes crucial for maintaining proper fluid balance, muscle function, and overall body health. Forte Clinical Laboratory ensures accurate and reliable results.",
        image: "/Packages/list/electrolytes.png",
        testsTotal: 3,
        subTests: [
            { title: "Chloride", explanation: "Helps maintain fluid balance" },
            { title: "Potassium", explanation: "Vital for heart and muscle health" },
            { title: "Sodium", explanation: "Maintains fluid and acid-base balance" }
        ]
    },
    {
        id: 'mineral',
        title: "Mineral Panel — AED 120",
        description: "Monitor your vital minerals with the Mineral Panel test at Forte Clinical Laboratory, Dubai. This comprehensive test measures essential minerals like Iron, Calcium, Zinc, Magnesium, and Phosphorus. These play a crucial role in bone health, immune function, and energy levels.",
        image: "/Packages/list/minerals.png",
        testsTotal: 5,
        subTests: [
            { title: "Iron", explanation: "Ensures healthy blood and energy levels" },
            { title: "Calcium", explanation: "Vital for bone density and nerve function" },
            { title: "Zinc", explanation: "Supports immune system and cell repair" },
            { title: "Magnesium", explanation: "Involved in muscle and nerve processes" },
            { title: "Phosphorus", explanation: "Works with calcium for bone strength" }
        ]
    },
    {
        id: 'hiv',
        title: "HIV Test — AED 80",
        description: "Take charge of your health with an HIV Test at Forte Clinical Laboratory, Dubai. This essential test screens for HIV 1, HIV 2, and the HIV P24 antigen, providing comprehensive results. Our expert team ensures confidentiality and support throughout the process.",
        image: "/Packages/list/hiv_screen.png",
        testsTotal: 3,
        subTests: [
            { title: "HIV 1", explanation: "Screening for HIV-1 strain" },
            { title: "HIV 2", explanation: "Screening for HIV-2 strain" },
            { title: "HIV P24 Antigen", explanation: "Early detection marker for virus" }
        ]
    },
    {
        id: 'hormonemen',
        title: "Hormone (Men) — AED 169",
        description: "Optimize your hormonal health with the Hormone Panel for Men at Forte Clinical Laboratory, Dubai. This comprehensive test measures key markers aiding in the early detection of potential health issues. Gain valuable insights into your hormonal balance with results in 1-2 days.",
        image: "/Packages/list/hormone.png",
        testsTotal: 6,
        subTests: [
            { title: "Total Testosterone", explanation: "Measures overall male sex hormone" },
            { title: "Free Testosterone", explanation: "The biologically active hormone level" },
            { title: "Total PSA", explanation: "Prostate health marker" },
            { title: "Free PSA", explanation: "Aids in evaluating prostate health" },
            { title: "FSH", explanation: "Follicle Stimulating Hormone in men" },
            { title: "LH", explanation: "Luteinising Hormone assessment" }
        ]
    },
    {
        id: 'vitaminb12',
        title: "Vitamin B12 — AED 136",
        description: "Ensure your energy and overall health with a Vitamin B12 test at Forte Clinical Laboratory, Dubai. This vital test measures levels critical for red blood cell formation and neurological function. Trust our expertise for reliable testing and guidance.",
        image: "/Packages/list/vitaminb12.png",
        testsTotal: 1,
        subTests: [
            { title: "Vitamin B12", explanation: "Essential for energy and nerve health" }
        ]
    },
    {
        id: 'alcohol',
        title: "Alcohol Tests",
        description: "Trust Forte Clinical Laboratory in Dubai, UAE, with our top-notch medical staff and advanced technology for Alcohol and Drug Abuse Lab Testing. Our tests are designed to provide dependable results for your peace of mind and accurate diagnosis.",
        image: "/Packages/list/alcohol.png",
        testsTotal: 2,
        subTests: [
            { title: "Drug Abuse Test", explanation: "Screening for common substances" },
            { title: "Alcohol Screening", explanation: "Accurate detection for medical assessment" }
        ]
    },
    {
        id: 'allergy',
        title: "Allery Tests",
        description: "Forte Clinical Laboratory in Dubai stands out with specialized tests aiding in precise allergy diagnosis. Suspect an allergy? Our state-of-the-art technology and expert staff deliver dependable results for your well-being.",
        image: "/Packages/list/biochemistry.png", // Reuse biochemistry temporarily if needed, but I'll generate new one if quota allows later
        testsTotal: 6,
        subTests: [
            { title: "Allergy Test Pannel – Food", explanation: "Screening for standard food allergens" },
            { title: "Allergy Test Pannel – Inhalation", explanation: "Screening for environmental allergens" },
            { title: "Folate", explanation: "Folate level assessment" },
            { title: "IgE", explanation: "Immunoglobulin E test for allergic reactions" },
            { title: "Food Intolerance Test with 220 Parametes", explanation: "Comprehensive 220 parameter test" },
            { title: "Food Print", explanation: "Tailored food profile analysis" }
        ]
    },
    {
        id: 'anemia',
        title: "Anemia Tests",
        description: "Experience excellence at Forte Clinical Laboratory, recognized as the leading lab in Dubai, UAE. If you’re concerned about anemia, our specialized tests support accurate diagnosis with top-tier technology.",
        image: "/Packages/list/cbc.png", // CBC is very related to anemia
        testsTotal: 3,
        subTests: [
            { title: "Complete Blood Count (CBC)", explanation: "Overall screening for blood cells" },
            { title: "Hemoglobin Test (Hb)", explanation: "Direct measurement of oxygen-carrying protein" },
            { title: "Serum Iron Test", explanation: "Checking for iron deficiency markers" }
        ]
    },
    {
        id: 'cancer',
        title: "Cancer Tests",
        description: "At Forte Clinical Laboratory, we elevate your cancer testing experience with exceptional staff and cutting-edge technology in oncology tests. Specialized tests are designed to aid in precise diagnosis.",
        image: "/Packages/list/biochemistry.png",
        testsTotal: 6,
        subTests: [
            { title: "Carcinoembryonic Antigen (CEA) Testing", explanation: "Common tumor marker for screening" },
            { title: "AFP (Alpha-Fetoprotein) Testing", explanation: "Specific marker used in cancer screening" },
            { title: "Cancer Antigen 19-9 (CA 19-9)", explanation: "Specialized oncology marker" },
            { title: "Prostate Specific Antigen (PSA) Testing", explanation: "Marker for prostate health screening" },
            { title: "Cancer Antigen 125 (CA-125) Testing", explanation: "Specialized marker for specific organ screening" },
            { title: "Chromaganin A Test (CgA)", explanation: "Additional oncology marker for comprehensive check" }
        ]
    },
    {
        id: 'arthritis',
        title: "Arthritis Tests",
        description: "Experiencing bone pain, knee pain, or joint stiffness? Forte Clinical Laboratory offers comprehensive arthritis diagnosis services with experienced rheumatologists and state-of-the-art technology.",
        image: "/Packages/list/biochemistry.png",
        testsTotal: 3,
        subTests: [
            { title: "C – Reactive Protein (CRP)", explanation: "Sensitive marker of systemic inflammation" },
            { title: "Rheumatoid Factor (RF)", explanation: "Key marker for autoimmune arthritis" },
            { title: "ESR", explanation: "Erythrocyte Sedimentation Rate indicating inflammation" }
        ]
    },
    {
        id: 'pcos',
        title: "Polycystic Ovary Syndrome (PCOS) — AED 490",
        description: "Take control of your hormonal health with the PCOS Panel at Forte Clinical Laboratory, Dubai. This comprehensive test analyzes vital markers to receive an accurate assessment of your hormonal balance for overall well-being. Results available in 1-2 days.",
        image: "/Packages/list/hormonal.png",
        testsTotal: 12,
        subTests: [
            { title: "Lipid Profile", explanation: "Checks cholesterol and triglycerides" },
            { title: "Thyroid Stimulating Hormone (TSH)", explanation: "Checks thyroid gland function" },
            { title: "Free Triiodothyronine (FT3)", explanation: "Measurement of free T3 hormone level" },
            { title: "Free Thyroxine (FT4)", explanation: "Measurement of free T4 hormone level" },
            { title: "Fasting Blood Sugar", explanation: "Baseline blood glucose measurement" },
            { title: "Hba1c", explanation: "Average blood sugar over past 3 months" },
            { title: "Follicle Stimulating Hormone (FSH)", explanation: "Evaluation of reproductive health" },
            { title: "Luteinising Hormone (LH)", explanation: "Hormone affecting reproductive system" },
            { title: "Prolactin", explanation: "Hormone related to reproductive health" },
            { title: "Testosterone", explanation: "Checks androgen levels in the body" },
            { title: "Estradiol (E2)", explanation: "Measures main form of estrogen" },
            { title: "Progesterone", explanation: "Hormone crucial for menstrual cycle" }
        ]
    },
    {
        id: 'foodhandler',
        title: "Food handler medical screening",
        description: "Food Handlers medical screenings are essential for food hygiene certification. Forte Clinical Laboratory makes it easy for you to get certified as a responsible service provider in Dubai, UAE.",
        image: "/Packages/list/biochemistry.png",
        testsTotal: 2,
        subTests: [
            { title: "Food Handlers Medicals 1 & 2", explanation: "Standard health checks for food safety certification" }
        ]
    }
];

export default function PackagesList() {
    const [openTests, setOpenTests] = useState<{ [key: string]: number | null }>({
        diabetes: 0,
    });

    const toggleTest = (pkgId: string, index: number) => {
        setOpenTests(prev => ({
            ...prev,
            [pkgId]: prev[pkgId] === index ? null : index
        }));
    };

    return (
        <section className="py-16 bg-white">
            <div className="max-w-7xl mx-auto px-4">
                <h2 className="text-2xl sm:text-3xl font-bold text-center mb-12 text-[#1F2937]">Our Health Packages</h2>

                <div className="space-y-24">
                    {packages.map((pkg, index) => (
                        <div
                            key={pkg.id}
                            className={`flex flex-col lg:flex-row items-start gap-8 lg:gap-16 ${index % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}
                        >
                            {/* Image Container */}
                            <div className="w-full lg:w-5/12 lg:sticky lg:top-32 h-fit">
                                <div className="relative aspect-[4/3] rounded-t-[18px] rounded-bl-[16px] overflow-hidden shadow-2xl">
                                    <Image
                                        src={pkg.image}
                                        alt={pkg.title}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                            </div>

                            {/* Content Container */}
                            <div className="w-full lg:w-7/12">
                                <h3 className="text-xl sm:text-2xl font-bold text-[#3B82F6] mb-3">
                                    {pkg.title}
                                </h3>
                                {pkg.id === 'liver' && (
                                    <div className="flex gap-4 mb-3 text-xs font-medium text-gray-500 uppercase tracking-wide">
                                        <span>Results: 24-48h</span>
                                        <span>Fasting: 8-10h</span>
                                    </div>
                                )}
                                <p className="text-gray-600 text-base mb-8 leading-relaxed">
                                    {pkg.description}
                                </p>

                                {/* Accordion List */}
                                <div className="mt-6 border-t border-gray-100 pt-6">
                                    <h4 className="text-lg font-bold text-[#1F2937] mb-6 uppercase tracking-wide text-xs opacity-60">
                                        Tests
                                    </h4>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-1">
                                        {pkg.subTests.map((subTest, testIndex) => (
                                            <div key={testIndex} className="border-b border-gray-100 last:border-0 md:last:border-b py-2">
                                                <button
                                                    onClick={() => toggleTest(pkg.id, testIndex)}
                                                    className="w-full flex items-center text-left transition-colors group"
                                                >
                                                    <span className={`font-medium text-lg mr-3 shrink-0 transition-colors text-[#307984]`}>
                                                        {openTests[pkg.id] === testIndex ? '−' : '+'}
                                                    </span>
                                                    <span className="text-[#307984] text-sm sm:text-base font-medium group-hover:text-[#307984]/80 transition-colors">
                                                        {subTest.title}
                                                    </span>
                                                </button>

                                                {openTests[pkg.id] === testIndex && (
                                                    <div className="mt-2 pl-8 pr-4 animate-in fade-in slide-in-from-top-2 duration-300">
                                                        <p className="text-gray-600 text-xs sm:text-sm leading-relaxed italic">
                                                            {subTest.explanation}
                                                        </p>
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>

                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
