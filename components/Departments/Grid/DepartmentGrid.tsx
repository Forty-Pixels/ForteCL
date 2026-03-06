import Image from 'next/image';

const departments = [
    {
        title: "Hematology & Immunology",
        description: "Complete blood analysis, coagulation studies and immunological profiling using advanced cell counters and flow cytometry platforms.",
        image: "/Departments/grid/hematology.png"
    },
    {
        title: "Biochemistry & Endocrinology",
        description: "Comprehensive metabolic panels, hormone assays and chemistry screening on high-throughput automated analysers.",
        image: "/Departments/grid/biochemistry.png"
    },
    {
        title: "Microbiology & Serology",
        description: "Culture and sensitivity testing, viral serology and infectious disease diagnostics with rapid and confirmatory methods.",
        image: "/Departments/grid/microbiology.png"
    },
    {
        title: "Molecular Diagnostics",
        description: "PCR-based testing, genetic mutation analysis and next-generation sequencing for oncology and hereditary workups.",
        image: "/Departments/grid/molecular.png"
    },
    {
        title: "Histopathology & Cytopathology",
        description: "Biopsy analysis, fine needle aspiration cytology and tissue-based diagnostics reviewed by consultant pathologists.",
        image: "/Departments/grid/histopathology.png"
    },
    {
        title: "Genetic & Metabolic Disorders",
        description: "Newborn screening, chromosomal karyotyping and rare metabolic disorder identification for precise clinical guidance.",
        image: "/Departments/grid/genetics.png"
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
