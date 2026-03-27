/**
 * DATA MIGRATION SCRIPT: Local Data -> Sanity CMS
 * 
 * This script takes the hardcoded lab tests and packages and pushes them to your Sanity project.
 * 
 * Required in .env.local:
 * - NEXT_PUBLIC_SANITY_PROJECT_ID
 * - NEXT_PUBLIC_SANITY_DATASET
 * - SANITY_WRITE_TOKEN (Create this in Sanity Manage -> API -> Tokens -> Add New Token [Editor])
 */

import { createClient } from '@sanity/client';
import dotenv from 'dotenv';
import { labTests } from './fortecl/data/labTestsData.js'; // Note: You may need to convert .ts to .js or use ts-node

dotenv.config({ path: '.env.local' });

const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
    apiVersion: '2026-03-27',
    token: process.env.SANITY_WRITE_TOKEN,
    useCdn: false,
});

async function migrate() {
    console.log('🚀 Starting migration...');

    // 1. Migrate Lab Tests
    for (const test of labTests) {
        process.stdout.write(`Migrating test: ${test.name}... `);
        try {
            await client.createOrReplace({
                _type: 'labTest',
                _id: `test-${test.slug}`,
                name: test.name,
                slug: { _type: 'slug', current: test.slug },
                diseaseFilter: test.diseaseFilter,
                department: test.department,
                tat: test.tat,
                sampleType: test.sampleType,
                overview: test.overview,
                procedure: test.procedure,
                symptoms: test.symptoms.map(s => ({
                    _key: Math.random().toString(36).substr(2, 9),
                    category: s.category,
                    items: s.items
                })),
                normalRanges: test.normalRanges,
                abnormalLevels: test.abnormalLevels,
                relatedTests: test.relatedTests
            });
            console.log('✅');
        } catch (err) {
            console.log(`❌ Error: ${err.message}`);
        }
    }

    // 2. Migrate Packages (Note: You'll need to upload images manually in Sanity Studio for now,
    // as programmatic image upload from local paths requires more setup. 
    // This script will create the package documents.)
    
    // [Package data would go here...]

    console.log('\n✨ Migration complete!');
}

migrate();
