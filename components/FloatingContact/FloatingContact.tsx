'use client';

import { PhoneIcon } from '@heroicons/react/24/outline';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

const WhatsAppIcon = () => (
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.414 0 .011 5.403.011 12.038c0 2.12.553 4.189 1.604 6.04l-1.705 6.226 6.37-1.67a11.803 11.803 0 005.766 1.498h.005c6.634 0 12.038-5.403 12.038-12.039a11.811 11.811 0 00-3.414-8.417" />
    </svg>
);

export default function FloatingContact() {
    const [hovered, setHovered] = useState<string | null>(null);

    return (
        <div className="relative floating-contact-wrap">
            {/* Mobile Bottom Bar (Visible on < lg) - Premium Glassmorphism */}
            <motion.div 
                initial={{ y: 100 }}
                animate={{ y: 0 }}
                className="lg:hidden fixed bottom-0 left-0 right-0 z-[110] bg-[#307984]/85 backdrop-blur-xl border-t border-white/10 text-white p-4 shadow-[0_-10px_30px_rgba(0,0,0,0.2)] flex items-center justify-between px-6"
            >
                <div className="flex flex-col">
                    <span className="font-bold text-[0.9rem] tracking-tight leading-tight">Need a Lab Test? We're Ready 24/7</span>
                    <span className="text-[0.65rem] opacity-70 leading-tight mt-1 max-w-[200px]">Premium Home Sample Collection & Precision Results Across Dubai</span>
                </div>
                <div className="flex items-center space-x-3">
                    <a 
                        href="tel:+97142718226" 
                        className="bg-white/10 p-2.5 rounded-xl hover:bg-white/20 transition-all active:scale-95"
                        aria-label="Call Us"
                    >
                        <PhoneIcon className="w-5 h-5" />
                    </a>
                    <a 
                        href="https://wa.me/97142729302" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="bg-white/10 p-2.5 rounded-xl hover:bg-white/20 transition-all active:scale-95"
                        aria-label="WhatsApp Us"
                    >
                        <WhatsAppIcon />
                    </a>
                </div>
            </motion.div>

            {/* Desktop Side Buttons (Visible on >= lg) - Premium Floating Pill Buttons */}
            <div className="hidden lg:flex fixed right-6 top-1/2 -translate-y-1/2 z-[110] flex-col space-y-4">
                {/* Call Button */}
                <div className="relative flex items-center justify-end">
                    <AnimatePresence>
                        {hovered === 'call' && (
                            <motion.div 
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                className="mr-3 bg-white text-gray-900 px-4 py-2 rounded-full text-xs font-bold shadow-2xl border border-gray-100 whitespace-nowrap"
                            >
                                Talk to our Experts: +971 4 271 8226
                            </motion.div>
                        )}
                    </AnimatePresence>
                    <a 
                        href="tel:+97142718226"
                        onMouseEnter={() => setHovered('call')}
                        onMouseLeave={() => setHovered(null)}
                        className="bg-[#202020] text-white p-4 rounded-full hover:bg-black transition-all shadow-2xl hover:scale-110 active:scale-95 duration-300"
                        aria-label="Call Us"
                    >
                        <PhoneIcon className="w-6 h-6" />
                    </a>
                </div>
                
                {/* WhatsApp Button */}
                <div className="relative flex items-center justify-end">
                    <AnimatePresence>
                        {hovered === 'whatsapp' && (
                            <motion.div 
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                className="mr-3 bg-white text-gray-900 px-4 py-2 rounded-full text-xs font-bold shadow-2xl border border-gray-100 whitespace-nowrap"
                            >
                                Chat on WhatsApp
                            </motion.div>
                        )}
                    </AnimatePresence>
                    <a 
                        href="https://wa.me/97142729302" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        onMouseEnter={() => setHovered('whatsapp')}
                        onMouseLeave={() => setHovered(null)}
                        className="bg-[#25D366] text-white p-4 rounded-full hover:bg-[#128C7E] transition-all shadow-2xl hover:scale-110 active:scale-95 duration-300"
                        aria-label="WhatsApp Us"
                    >
                        <WhatsAppIcon />
                    </a>
                </div>
            </div>

        </div>
    );
}
