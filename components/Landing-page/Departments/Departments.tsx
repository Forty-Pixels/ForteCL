import Image from 'next/image';
import Link from 'next/link';
import Reveal from '@/components/Animation/Reveal';
import { 
    BeakerIcon, 
    ShieldCheckIcon, 
    FingerPrintIcon, 
    CircleStackIcon, 
    AcademicCapIcon,
    SparklesIcon,
    MagnifyingGlassCircleIcon,
    DocumentMagnifyingGlassIcon
} from '@heroicons/react/24/outline';

const departments = [
    { name: 'Clinical Biochemistry', icon: CircleStackIcon, id: 'biochemistry' },
    { name: 'Hematology', icon: BeakerIcon, id: 'hematology' },
    { name: 'Microbiology', icon: SparklesIcon, id: 'microbiology' },
    { name: 'Immunology / Serology', icon: ShieldCheckIcon, id: 'immunology' },
    { name: 'Molecular / Genetic Diagnostics', icon: FingerPrintIcon, id: 'molecular' },
    { name: 'Clinical Pathology', icon: AcademicCapIcon, id: 'pathology' },
    { name: 'Histopathology', icon: MagnifyingGlassCircleIcon, id: 'histopathology' },
    { name: 'Cytology', icon: DocumentMagnifyingGlassIcon, id: 'cytology' },
];

export default function Departments() {
    return (
        <section className="bg-white py-12 md:py-16 overflow-hidden border-b border-gray-50" id="departments">
            <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-12 xl:px-20">
                <div className="grid grid-cols-1 lg:grid-cols-[45%_55%] gap-10 lg:gap-14 items-center">
                    
                    {/* Image Column */}
                    <Reveal delayMs={170} className="relative order-2 lg:order-1">
                        <div className="relative aspect-[16/9] lg:aspect-[3/2] w-full rounded-2xl overflow-hidden shadow-lg group">
                            <Image
                                src="/Landing-page/our-specializations/left-image.png"
                                alt="Laboratory specialist conducting diagnostic tests"
                                fill
                                className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                                priority
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
                        </div>
                        {/* Compact DHA badge */}
                        <div className="absolute -bottom-4 -right-2 bg-[#f88c29] p-4 md:p-5 rounded-xl shadow-lg z-10 border-2 border-white">
                            <div className="text-white text-lg md:text-xl font-black leading-none mb-0.5">DHA</div>
                            <div className="text-white/80 text-[7px] font-bold uppercase tracking-widest leading-none">Approved</div>
                        </div>
                    </Reveal>

                    {/* Content Column */}
                    <div className="flex flex-col items-start order-1 lg:order-2">
                        <Reveal delayMs={70}>
                            <span className="text-[#f88c29] font-semibold text-[10px] sm:text-xs tracking-wider mb-2 block">
                                OUR SPECIALIZATIONS
                            </span>
                        </Reveal>
                        
                        <Reveal delayMs={140}>
                            <h2 className="text-lg sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-[#202020] mb-4 leading-tight max-w-full">
                                Dedicated Departments. <br className="hidden lg:block" />
                                Expert Care.
                            </h2>
                        </Reveal>
                        
                        <Reveal delayMs={210}>
                            <p className="text-gray-600 text-xs md:text-sm mb-6 leading-relaxed lg:max-w-[95%]">
                                From routine blood work to advanced molecular screening, our specialized departments provide full-spectrum clinical diagnosis with medical-grade precision.
                            </p>
                        </Reveal>

                        {/* Department Grid */}
                        <div className="grid grid-cols-2 gap-2.5 w-full">
                            {departments.map((dept, i) => (
                                <Reveal key={dept.name} delayMs={250 + (i * 50)}>
                                    <Link 
                                        href={`/departments/${dept.id}`}
                                        className="group flex items-center gap-2.5 bg-white p-2.5 rounded-lg border border-gray-100 hover:shadow-md hover:border-[#f88c29]/20 transition-all duration-300"
                                    >
                                        <div className="flex-shrink-0 w-8 h-8 rounded bg-white border border-gray-100 flex items-center justify-center group-hover:bg-[#f88c29] group-hover:border-[#f88c29] transition-all duration-300 shadow-sm">
                                            <dept.icon className="w-4 h-4 text-[#f88c29] group-hover:text-white transition-colors" />
                                        </div>
                                        <span className="text-[10px] md:text-xs font-bold text-gray-700 transition-colors group-hover:text-[#f88c29]">
                                            {dept.name}
                                        </span>
                                    </Link>
                                </Reveal>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
