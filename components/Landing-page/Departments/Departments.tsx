import Image from 'next/image';
import Reveal from '@/components/Animation/Reveal';
import { 
    BeakerIcon, 
    ShieldCheckIcon, 
    CpuChipIcon, 
    CircleStackIcon, 
    VariableIcon, 
    ChartBarIcon, 
    AcademicCapIcon,
    SparklesIcon
} from '@heroicons/react/24/outline';

const departments = [
    { name: 'Haematology', icon: BeakerIcon },
    { name: 'Biochemistry & Endocrinology', icon: CircleStackIcon },
    { name: 'Microbiology & Serology', icon: SparklesIcon },
    { name: 'Molecular Diagnostics', icon: CpuChipIcon },
    { name: 'Immunology & Allergy', icon: ShieldCheckIcon },
    { name: 'Oncology & Tumour Markers', icon: ChartBarIcon },
    { name: 'Genetic & Prenatal Screening', icon: VariableIcon },
    { name: 'Pathology', icon: AcademicCapIcon },
];

export default function Departments() {
    return (
        <section className="bg-white py-12 md:py-16 overflow-hidden border-b border-gray-50">
            <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-12 xl:px-20">
                <div className="grid grid-cols-1 lg:grid-cols-[45%_55%] gap-10 lg:gap-14 items-center">
                    
                    {/* Image Column - Wider/Shorter */}
                    <Reveal delayMs={170} className="relative order-2 lg:order-1">
                        <div className="relative aspect-[16/9] lg:aspect-[3/2] w-full rounded-2xl overflow-hidden shadow-lg group">
                            <Image
                                src="/Landing-page/departments/lab_specialist_high_res1.png"
                                alt="Laboratory specialist conducting diagnostic tests"
                                fill
                                className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                                priority
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
                        </div>
                        {/* More Compact DHA badge */}
                        <div className="absolute -bottom-4 -right-2 bg-[#307984] p-4 md:p-5 rounded-xl shadow-lg z-10 border-2 border-white">
                            <div className="text-white text-lg md:text-xl font-black leading-none mb-0.5">DHA</div>
                            <div className="text-white/80 text-[7px] font-bold uppercase tracking-widest leading-none">Approved</div>
                        </div>
                    </Reveal>

                    {/* Content Column */}
                    <div className="flex flex-col items-start order-1 lg:order-2">
                        <Reveal delayMs={70}>
                            <span className="text-[#f88c29] font-semibold text-[10px] sm:text-xs tracking-wider mb-2 block">
                                Departments
                            </span>
                        </Reveal>
                        
                        <Reveal delayMs={140}>
                            <h2 className="text-lg sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-[#202020] mb-4 leading-tight max-w-full">
                                Every Discipline. <br className="hidden lg:block" />
                                Under One Roof.
                            </h2>
                        </Reveal>
                        
                        <Reveal delayMs={210}>
                            <p className="text-gray-600 text-xs md:text-sm mb-6 leading-relaxed lg:max-w-[95%]">
                                From routine blood work to advanced molecular screening, our specialized departments provide full-spectrum clinical diagnosis with medical-grade precision.
                            </p>
                        </Reveal>

                        {/* Department Grid - Very Compact */}
                        <div className="grid grid-cols-2 gap-2.5 w-full">
                            {departments.map((dept, i) => (
                                <Reveal key={dept.name} delayMs={250 + (i * 50)}>
                                    <div className="group flex items-center gap-2.5 bg-[#f8fafc] p-2.5 rounded-lg border border-gray-100 hover:bg-white hover:shadow-md hover:border-[#307984]/20 transition-all duration-300 cursor-default">
                                        <div className="flex-shrink-0 w-8 h-8 rounded bg-white border border-gray-100 flex items-center justify-center group-hover:bg-[#307984] group-hover:border-[#307984] transition-all duration-300 shadow-sm">
                                            <dept.icon className="w-4 h-4 text-[#307984] group-hover:text-white transition-colors" />
                                        </div>
                                        <span className="text-[10px] md:text-xs font-bold text-gray-700 transition-colors group-hover:text-[#307984]">
                                            {dept.name}
                                        </span>
                                    </div>
                                </Reveal>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
