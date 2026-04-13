import Image from 'next/image';
import Link from 'next/link';
import Reveal from '@/components/Animation/Reveal';
import Navbar from '@/components/Navbar/Navbar';
import Footer from '@/components/Landing-page/Footer/Footer';
import { PortableText, PortableTextComponents } from '@portabletext/react';
import BookActionButton from '@/components/Booking/BookActionButton';

interface ResourcePost {
    slug: string;
    title: string;
    author: string;
    category: string;
    publishedAt: string;
    excerpt: string;
    image: string;
    body?: any;
}

interface ResourceDetailProps {
    post: ResourcePost;
    relatedPosts: ResourcePost[];
}

const ptComponents: PortableTextComponents = {
    block: {
        h1: ({ children }) => <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 mt-12 leading-tight">{children}</h2>,
        h2: ({ children }) => <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 mt-10 leading-tight">{children}</h2>,
        h3: ({ children }) => <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 mt-8">{children}</h3>,
        normal: ({ children }) => <p className="text-gray-700 text-base md:text-lg leading-relaxed mb-6 font-light">{children}</p>,
        blockquote: ({ children }) => (
            <blockquote className="bg-[#307984]/5 p-8 md:p-10 rounded-3xl border-l-4 border-[#307984] my-10 relative overflow-hidden">
                <div className="relative z-10 text-[#204a50] font-bold text-lg md:text-xl leading-relaxed">
                    {children}
                </div>
            </blockquote>
        ),
    },
    list: {
        bullet: ({ children }) => <ul className="space-y-4 mb-8 ml-2">{children}</ul>,
        number: ({ children }) => <ol className="space-y-4 mb-8 ml-2 list-decimal">{children}</ol>,
    },
    listItem: {
        bullet: ({ children }) => (
            <li className="flex items-start gap-4 text-gray-700 text-base md:text-lg leading-relaxed">
                <div className="w-2 h-2 rounded-full bg-[#307984] mt-3 flex-shrink-0" />
                <span>{children}</span>
            </li>
        ),
        number: ({ children }) => (
            <li className="text-gray-700 text-base md:text-lg leading-relaxed pl-2 font-medium">
                {children}
            </li>
        ),
    },
    marks: {
        strong: ({ children }) => <strong className="font-bold text-gray-900">{children}</strong>,
        em: ({ children }) => <em className="italic text-gray-800">{children}</em>,
    },
    types: {
        image: ({ value }) => (
            <div className="relative w-full aspect-[16/9] my-12 rounded-2xl overflow-hidden shadow-lg">
                <Image
                    src={value.asset.url}
                    alt={value.alt || 'Article Image'}
                    fill
                    className="object-cover"
                />
            </div>
        ),
    },
};

export default function ResourceDetail({ post, relatedPosts }: ResourceDetailProps) {
    return (
        <main className="min-h-screen bg-white">
            <Navbar currentPage="Resources" />
            
            <article className="pt-32 pb-24 md:pt-40 lg:pt-48">
                <div className="max-w-4xl mx-auto px-6">
                    
                    {/* Breadcrumbs */}
                    <Reveal delayMs={100} className="mb-8">
                        <div className="flex items-center gap-2 text-[10px] md:text-sm text-gray-400 font-medium">
                            <Link href="/resources" className="hover:text-[#307984] transition-colors">Resources</Link>
                            <span>/</span>
                            <span className="text-[#307984]">{post.category}</span>
                        </div>
                    </Reveal>

                    <Reveal delayMs={200}>
                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 mb-8 leading-[1.1]">
                            {post.title}
                        </h1>
                    </Reveal>
                    
                    <Reveal delayMs={300}>
                        <div className="flex items-center gap-4 mb-10 pb-10 border-b border-gray-100">
                            <div className="flex items-center gap-2 text-xs md:text-sm text-gray-500">
                                <span className="font-bold text-[#307984] px-3 py-1 bg-[#307984]/5 rounded-full uppercase tracking-wider text-[10px]">
                                    {post.category}
                                </span>
                                <span className="w-1 h-1 rounded-full bg-gray-300 mx-1"></span>
                                <span>{new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                            </div>
                        </div>
                    </Reveal>

                    <Reveal delayMs={400} className="relative w-full aspect-[16/9] rounded-3xl overflow-hidden shadow-2xl mb-12">
                        <Image
                            src={post.image}
                            alt={post.title}
                            fill
                            className="object-cover"
                            priority
                        />
                    </Reveal>

                    <div className="flex flex-col lg:flex-row gap-12 relative mb-20">
                        {/* Article Content */}
                        <div className="w-full lg:w-2/3">
                            <Reveal delayMs={500}>
                                <div className="text-gray-700 mb-8">
                                    <p className="text-xl md:text-2xl font-medium text-gray-900 border-l-4 border-[#307984] pl-6 py-2 leading-relaxed">
                                        {post.excerpt}
                                    </p>
                                </div>

                                <div className="prose prose-slate max-w-none">
                                    {post.body ? (
                                        <PortableText value={post.body} components={ptComponents} />
                                    ) : (
                                        <p className="text-gray-400 italic">Article content is being prepared.</p>
                                    )}
                                </div>
                            </Reveal>
                        </div>

                        {/* Sidebar */}
                        <aside className="w-full lg:w-1/3">
                            <Reveal delayMs={600} className="sticky top-40 bg-[#f8fafc] p-8 rounded-3xl border border-gray-100 shadow-sm">
                                <h4 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#307984]"></span>
                                    Article Insight
                                </h4>
                                <div className="space-y-6">
                                    <div className="flex flex-col gap-1">
                                        <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Medical Reviewer</span>
                                        <span className="text-sm font-bold text-gray-800">{post.author}</span>
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Last Updated</span>
                                        <span className="text-sm font-bold text-gray-800">{new Date(post.publishedAt).toLocaleDateString()}</span>
                                    </div>
                                    <div className="flex flex-col gap-1 pb-6 border-b border-gray-200">
                                        <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Reading Experience</span>
                                        <span className="text-sm font-bold text-gray-800">Approx. 5 Min</span>
                                    </div>
                                    
                                    <div className="pt-2">
                                        <BookActionButton
                                            label="Book a Test"
                                            whatsappText={`Hi, I would like to book a test after reading \"${post.title}\".`}
                                            className="block w-full text-center bg-[#307984] hover:bg-[#307984]/90 text-white rounded-xl py-4 font-bold text-sm transition-all shadow-md active:scale-95"
                                        />
                                    </div>
                                </div>
                            </Reveal>
                        </aside>
                    </div>

                    {/* Related Articles */}
                    {relatedPosts.length > 0 && (
                        <Reveal delayMs={700}>
                            <div className="pt-20 border-t border-gray-100">
                                <div className="flex items-center justify-between mb-10">
                                    <h3 className="text-2xl font-bold text-gray-900">Explore Further</h3>
                                    <Link href="/resources" className="text-[#307984] text-sm font-bold hover:underline">View All Articles →</Link>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    {relatedPosts.map((relatedPost) => (
                                        <Link 
                                            key={relatedPost.slug}
                                            href={`/resources/${relatedPost.slug}`}
                                            className="group bg-[#f8fafc] rounded-2xl p-6 border border-gray-100 hover:bg-white hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                                        >
                                            <div className="flex items-center gap-2 text-[10px] text-[#307984] font-bold uppercase tracking-wider mb-3">
                                                <span>{relatedPost.category}</span>
                                            </div>
                                            <h4 className="text-lg font-bold text-gray-900 group-hover:text-[#307984] transition-colors mb-4 line-clamp-2">
                                                {relatedPost.title}
                                            </h4>
                                            <span className="text-xs font-bold text-gray-400 group-hover:text-[#307984] transition-colors">Read More →</span>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </Reveal>
                    )}
                </div>
            </article>
            
            <Footer />
        </main>
    );
}
