import Image from 'next/image';
import Reveal from '@/components/Animation/Reveal';

const officeImages = [
    {
        src: '/office2.png',
        alt: 'Forte laboratory workspace and team area',
        className: 'md:col-span-2 md:row-span-2',
    },
    {
        src: '/office1.png',
        alt: 'Forte office and diagnostic facility interior',
        className: '',
    },
    {
        src: '/office3.jpg',
        alt: 'Forte clinical office and patient-facing facility',
        className: '',
    },
];

export default function OfficeGallery() {
    return (
        <section className="bg-[#f6fafb] py-12 md:py-16 border-y border-gray-100">
            <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-12 xl:px-20">
                <Reveal delayMs={80}>
                    <div className="text-center mb-8">
                        <span className="text-[#f88c29] font-semibold text-[10px] sm:text-xs tracking-wider mb-2 block">
                            OUR FACILITY
                        </span>
                        <h2 className="text-2xl md:text-3xl font-black text-[#1f2937]">
                            Inside Forte Clinical Laboratory
                        </h2>
                    </div>
                </Reveal>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
                    {officeImages.map((image, index) => (
                        <Reveal key={image.src} delayMs={140 + index * 90} className={image.className}>
                            <div className={`relative h-64 md:h-full min-h-[220px] rounded-3xl overflow-hidden shadow-[0_15px_35px_rgba(0,0,0,0.12)] ${image.className}`}>
                                <Image
                                    src={image.src}
                                    alt={image.alt}
                                    fill
                                    className="object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-black/10 to-transparent" />
                            </div>
                        </Reveal>
                    ))}
                </div>
            </div>
        </section>
    );
}
