import Image from 'next/image';

const departments = [
    {
        title: "Haematology",
        description: "Full blood analysis, coagulation and cell morphology studies — supporting diagnosis of anaemia, clotting disorders and blood-based conditions.",
        image: "/Departments/grid/hematology.png"
    },
    {
        title: "Biochemistry & Endocrinology",
        description: "Metabolic panels, organ function tests and hormone assays — from liver and kidney profiles to thyroid and fertility screening.",
        image: "/Departments/grid/biochemistry.png"
    },
    {
        title: "Microbiology & Serology",
        description: "Culture, sensitivity and infectious disease testing — covering bacterial, viral and parasitic conditions with rapid turnaround.",
        image: "/Departments/grid/microbiology.png"
    },
    {
        title: "Molecular Diagnostics",
        description: "RT-PCR, HPV, STI panels and advanced pathogen identification using the latest nucleic acid testing platforms.",
        image: "/Departments/grid/molecular.png"
    },
    {
        title: "Immunology & Allergy",
        description: "Allergen panels, autoimmune markers and immune function testing across a broad range of environmental and food triggers.",
        image: "/Departments/grid/hematology.png"
    },
    {
        title: "Oncology & Tumour Markers",
        description: "Cancer screening and tumour marker panels supporting early detection and ongoing monitoring across multiple cancer types.",
        image: "/Departments/grid/molecular.png"
    },
    {
        title: "Genetic & Prenatal Screening",
        description: "NIPT, newborn screening and genetic disorder panels — delivered with clinical accuracy and handled with sensitivity.",
        image: "/Departments/grid/genetics.png"
    },
    {
        title: "Pathology",
        description: "Tissue-based diagnostics, cytology and histopathology reviewed by experienced consultant pathologists.",
        image: "/Departments/grid/histopathology.png"
    }
];

export default function DepartmentGrid() {
    return (
        <section className="bg-white py-16 md:py-24 lg:py-32">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#202020]">
                    Our Departments
                </h2>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-wrap justify-center gap-6 lg:gap-8">
                    {departments.map((dept, index) => (
                        <div
                            key={index}
                            className="flex flex-col bg-[#F3F3F3] rounded-3xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 w-full md:w-[calc(50%-1.5rem)] lg:w-[calc(25%-1.5rem)]"
                        >
                            {/* Image Container */}
                            <div className="relative w-full h-48 md:h-56">
                                <Image
                                    src={dept.image}
                                    alt={dept.title}
                                    fill
                                    className="object-cover"
                                />
                            </div>

                            {/* Content Container */}
                            <div className="p-8 flex flex-col flex-grow text-left">
                                <h3 className="text-xl font-bold text-[#202020] mb-4 min-h-[56px] flex items-center">
                                    {dept.title}
                                </h3>
                                <p className="text-gray-600 text-sm leading-relaxed">
                                    {dept.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
