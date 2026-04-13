'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

interface BookActionButtonProps {
    label: string;
    className: string;
    whatsappText?: string;
    modalTitle?: string;
    phoneNumber?: string;
    whatsappNumber?: string;
}

export default function BookActionButton({
    label,
    className,
    whatsappText = 'Hi, I would like to book a test.',
    modalTitle = 'Choose Booking Method',
    phoneNumber = '+97142718226',
    whatsappNumber = '97142729302',
}: BookActionButtonProps) {
    const [open, setOpen] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (!open) return;
        const onKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') setOpen(false);
        };
        document.addEventListener('keydown', onKeyDown);
        const originalOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        return () => {
            document.removeEventListener('keydown', onKeyDown);
            document.body.style.overflow = originalOverflow;
        };
    }, [open]);

    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappText)}`;
    const telUrl = `tel:${phoneNumber}`;

    const modalNode = open ? (
        <div className="fixed inset-0 z-[400] flex items-center justify-center p-4">
            <button
                type="button"
                className="absolute inset-0 bg-black/60 backdrop-blur-[2px]"
                onClick={() => setOpen(false)}
                aria-label="Close booking options"
            />

            <div className="relative w-[min(760px,94vw)] rounded-2xl bg-white p-6 sm:p-7 shadow-[0_24px_70px_rgba(15,23,42,0.35)] border border-gray-100">
                <div className="flex items-center justify-between gap-3 mb-5">
                    <h3 className="text-lg font-bold text-[#1f2937]">{modalTitle}</h3>
                    <button
                        type="button"
                        onClick={() => setOpen(false)}
                        className="w-8 h-8 rounded-full bg-gray-100 text-gray-500 hover:text-[#f88c29] hover:bg-[#fff4ea] transition-colors"
                        aria-label="Close"
                    >
                        ×
                    </button>
                </div>

                <p className="text-sm text-gray-600 mb-5">
                    Continue by calling us directly or starting a WhatsApp chat.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <a
                        href={telUrl}
                        className="inline-flex items-center justify-center rounded-xl bg-[#307984] hover:bg-[#256069] text-white font-semibold py-3 px-4 transition-colors"
                    >
                        Call Now
                    </a>
                    <a
                        href={whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center rounded-xl border border-[#307984]/25 text-[#307984] hover:bg-[#307984] hover:text-white font-semibold py-3 px-4 transition-colors"
                    >
                        WhatsApp
                    </a>
                </div>
            </div>
        </div>
    ) : null;

    return (
        <>
            <button type="button" onClick={() => setOpen(true)} className={className}>
                {label}
            </button>

            {mounted && createPortal(modalNode, document.body)}
        </>
    );
}
