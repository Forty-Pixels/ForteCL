import { createClient } from '@sanity/client';
import dotenv from 'dotenv';
import { resourcePosts } from '../data/resourcesData';
import fs from 'fs';
import path from 'path';

dotenv.config({ path: '.env.local' });

const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
    apiVersion: '2026-03-27',
    token: process.env.SANITY_WRITE_TOKEN,
    useCdn: false,
});

async function migrate() {
    console.log('🚀 Starting Resources Migration...');

    // 1. Create Categories
    const uniqueCategories = Array.from(new Set(resourcePosts.map(p => p.category)));
    const categoryMap: Record<string, string> = {};

    console.log(`📁 Creating ${uniqueCategories.length} categories...`);
    for (const cat of uniqueCategories) {
        const slug = cat.toLowerCase().replace(/[^a-z0-9]/g, '-');
        const id = `res-cat-${slug}`;
        
        await client.createOrReplace({
            _id: id,
            _type: 'resourceCategory',
            title: cat,
            slug: { _type: 'slug', current: slug }
        });
        categoryMap[cat] = id;
        console.log(`✅ Category: ${cat}`);
    }

    // 2. Create Posts
    console.log(`📝 Creating ${resourcePosts.length} posts...`);
    for (const post of resourcePosts) {
        const catId = categoryMap[post.category];
        
        const doc: any = {
            _type: 'post',
            _id: `res-post-${post.slug}`,
            title: post.title,
            slug: { _type: 'slug', current: post.slug },
            author: post.author,
            publishedAt: new Date(post.date).toISOString(),
            excerpt: post.excerpt,
            category: {
                _type: 'reference',
                _ref: catId
            },
            body: [
                {
                    _type: 'block',
                    children: [
                        {
                            _type: 'span',
                            text: `This is the migrated content for ${post.title}. In the ever-evolving landscape of modern medicine, staying informed is essential for proactive healthcare management. Our medical team at Forte Clinical Laboratory is dedicated to bringing you evidence-based insights and diagnostic guidance to empower your wellness journey.`
                        }
                    ],
                    style: 'normal'
                }
            ]
        };

        // Try to upload image if it exists in public
        const publicImagePath = path.join(process.cwd(), 'public', post.image);
        if (fs.existsSync(publicImagePath)) {
            try {
                process.stdout.write(`Uploading image for ${post.title}... `);
                const asset = await client.assets.upload('image', fs.createReadStream(publicImagePath), {
                    filename: path.basename(publicImagePath)
                });
                doc.mainImage = {
                    _type: 'image',
                    asset: {
                        _type: 'reference',
                        _ref: asset._id
                    }
                };
                console.log('✅');
            } catch (err) {
                console.log('❌ Image upload failed, skipping asset reference.');
            }
        }

        await client.createOrReplace(doc);
        console.log(`✅ Post: ${post.title}`);
    }

    console.log('\n✨ Resources Migration Complete!');
}

migrate();
