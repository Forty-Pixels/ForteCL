'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Reveal from '@/components/Animation/Reveal';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

interface ResourcePost {
    slug: string;
    title: string;
    author: string;
    category: string;
    publishedAt: string;
    excerpt: string;
    image: string;
}

interface ResourcesListProps {
    initialPosts: ResourcePost[];
    initialCategories: string[];
}

export default function ResourcesList({ initialPosts, initialCategories }: ResourcesListProps) {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');

    const categories = ['All', ...initialCategories];

    const filteredPosts = initialPosts.filter(post => {
        const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                             post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    return (
        <section className="py-12 md:py-20 bg-white">
            <div className="max-w-7xl mx-auto px-6">
                
                {/* Refined Search and Filter Section */}
                <div className="flex flex-col items-center gap-10 mb-20">
                    {/* Search Bar - Center and Large */}
                    <Reveal delayMs={100} className="w-full max-w-2xl">
                        <div className="relative group">
                            <MagnifyingGlassIcon className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400 group-focus-within:text-[#f88c29] transition-colors" />
                            <input
                                type="text"
                                placeholder="Search our expertise (e.g., 'Genomics', 'Testing')..."
                                className="w-full pl-16 pr-8 py-5 rounded-3xl border border-gray-100 bg-white shadow-xl shadow-gray-100/50 focus:outline-none focus:border-[#f88c29]/30 focus:ring-4 focus:ring-[#f88c29]/5 text-lg placeholder:text-gray-300 transition-all font-light"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                    </Reveal>

                    {/* Filter Categories - Neat Row Below */}
                    <Reveal delayMs={200} className="w-full">
                        <div className="flex flex-wrap gap-3 justify-center">
                            {categories.map(category => (
                                <button
                                    key={category}
                                    onClick={() => setSelectedCategory(category)}
                                    className={`px-6 py-2.5 rounded-full text-xs font-bold tracking-wide uppercase transition-all duration-300 border ${
                                        selectedCategory === category 
                                        ? 'bg-[#f88c29] text-white border-[#f88c29] shadow-lg shadow-orange-500/20 scale-105' 
                                        : 'bg-white text-gray-500 border-gray-100 hover:border-[#f88c29]/20 hover:bg-gray-50/50'
                                    }`}
                                >
                                    {category}
                                </button>
                            ))}
                        </div>
                    </Reveal>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredPosts.length > 0 ? (
                        filteredPosts.map((post, index) => (
                            <Reveal key={post.slug} delayMs={index * 50}>
                                <Link 
                                    href={`/resources/${post.slug}`}
                                    className="group flex flex-col h-full bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                                >
                                    <div className="relative aspect-[16/10] overflow-hidden">
                                        <Image
                                            src={post.image}
                                            alt={post.title}
                                            fill
                                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                                        />
                                        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full shadow-sm">
                                            <span className="text-[10px] font-bold text-[#f88c29] uppercase tracking-wider">
                                                {post.category}
                                            </span>
                                        </div>
                                    </div>
                                    
                                    <div className="p-6 flex flex-col flex-grow">
                                        <div className="flex items-center gap-3 text-[10px] text-gray-400 mb-3 font-medium uppercase tracking-wide">
                                            <span>{new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                                            <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                                            <span>By {post.author}</span>
                                        </div>
                                        
                                        <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-[#f88c29] transition-colors line-clamp-2">
                                            {post.title}
                                        </h3>
                                        
                                        <p className="text-gray-500 text-sm mb-6 line-clamp-3 leading-relaxed">
                                            {post.excerpt}
                                        </p>
                                        
                                        <div className="mt-auto flex items-center text-[#f88c29] text-xs font-bold uppercase tracking-wider group-hover:gap-2 transition-all">
                                            Read Full Article <span className="ml-1">→</span>
                                        </div>
                                    </div>
                                </Link>
                            </Reveal>
                        ))
                    ) : (
                        <div className="col-span-full py-20 text-center">
                            <p className="text-gray-500 italic">No articles found matching your criteria.</p>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
