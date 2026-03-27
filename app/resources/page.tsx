import ResourcesList from '@/components/Resources/ResourcesList';
import Navbar from '@/components/Navbar/Navbar';
import Footer from '@/components/Landing-page/Footer/Footer';
import Reveal from '@/components/Animation/Reveal';
import { client } from '@/lib/sanity';
import { allResourcesQuery, distinctResourceCategoriesQuery } from '@/lib/queries';

export const metadata = {
    title: 'Resources & Health Insights | Forte Clinical Laboratory',
    description: 'Explore our collection of expert health tips, diagnostic test guides, and medical research updates to help you navigate your health journey.',
};

export const revalidate = 60;

export default async function ResourcesPage() {
    const [posts, categories] = await Promise.all([
        client.fetch(allResourcesQuery),
        client.fetch(distinctResourceCategoriesQuery)
    ]);
    return (
        <main className="min-h-screen bg-white">
            <Navbar currentPage="Resources" />
            
            {/* Hero Section with AI Generated Image */}
            <section 
                className="relative h-screen min-h-[600px] w-full bg-black bg-cover bg-center flex items-center justify-center overflow-hidden"
                style={{ backgroundImage: 'url("/resources/hero-bg.png")' }}
            >
                {/* Consistent Dark Overlay */}
                <div className="absolute inset-0 bg-black/55"></div>
                
                <div className="max-w-7xl mx-auto text-center relative z-10 px-6">
                    <Reveal delayMs={100}>
                        <span className="text-[#f88c29] font-bold text-[10px] md:text-sm tracking-widest uppercase mb-4 block">
                            Our Knowledge Hub
                        </span>
                    </Reveal>
                    
                    <Reveal delayMs={200}>
                        <h1 className="text-white text-3xl md:text-5xl lg:text-6xl font-black mb-6 leading-[1.1]">
                            Resources & <br className="hidden md:block" />
                            Health Insights
                        </h1>
                    </Reveal>
                    
                    <Reveal delayMs={300}>
                        <p className="text-white/80 text-sm md:text-base lg:text-lg max-w-2xl mx-auto leading-relaxed">
                            Stay informed with the latest diagnostic breakthroughs, health management tips 
                            and quality-focused laboratory updates from our medical professionals.
                        </p>
                    </Reveal>
                </div>

                {/* Decorative background element */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-white/10 to-transparent blur-3xl opacity-30 z-0 pointer-events-none"></div>
            </section>

            <ResourcesList initialPosts={posts} initialCategories={categories} />
            
            <Footer />
        </main>
    );
}
