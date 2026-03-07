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
                    Specialised Departments. <br />
                    Comprehensive Diagnostics.
                </h1>

                <p className="text-white text-center max-w-4xl text-sm lg:text-base mb-10 leading-relaxed opacity-90 px-4">
                    Every department at Forte Clinical Laboratory is purpose-built — staffed by specialists and
                    equipped with dedicated technology for its discipline. Together, they give us the range to
                    handle any diagnostic challenge, from the routine to the highly complex.
                </p>
            </div>
        </section>
    );
}
