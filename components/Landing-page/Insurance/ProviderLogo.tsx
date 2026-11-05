import Image from 'next/image';

/** Provider logo on a white tile; falls back to a monogram when no logo exists (e.g. Nextcare). */
export default function ProviderLogo({ name, logo, className = 'h-10 w-[4.5rem]' }: { name: string; logo?: string; className?: string }) {
    return (
        <span className={`flex shrink-0 items-center justify-center overflow-hidden rounded-lg border border-[#e3efee] bg-white p-1 ${className}`}>
            {logo ? (
                <Image src={logo} alt="" unoptimized width={240} height={96} className="h-full w-full object-contain" />
            ) : (
                <span aria-hidden="true" className="text-sm font-black text-[#307984]">{name.charAt(0)}</span>
            )}
        </span>
    );
}
