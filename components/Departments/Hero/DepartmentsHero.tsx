'use client';

import Navbar from '@/components/Navbar/Navbar';

export default function DepartmentsHero() {
    return (
        <section
            className="relative h-screen min-h-[600px] w-full bg-black bg-cover bg-center"
            style={{ backgroundImage: 'url("/Departments/hero/bg-hero.png")' }}
        >
            <Navbar currentPage="Departments" />

            {/* Hero Content */}
            <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 -mt-20 sm:-mt-24 w-full mx-auto max-w-7xl">
                <h1 className="text-white font-bold tracking-tight text-3xl sm:text-4xl lg:text-6xl max-w-5xl text-center mb-8 leading-[1.2]">
                    Specialized Departments <br />
                    Delivering Precision Diagnostics
                </h1>

                <p className="text-white text-center max-w-4xl text-sm lg:text-base mb-10 leading-relaxed opacity-90 px-4">
                    Each department at Forte Clinical Laboratory is purpose-built — equipped with dedicated
                    technology and staffed by specialist professionals across every diagnostic discipline.
                </p>
            </div>
        </section>
    );
}
