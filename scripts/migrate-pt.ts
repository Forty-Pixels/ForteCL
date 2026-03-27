import { createClient } from '@sanity/client';
import dotenv from 'dotenv';
import { labTests } from '../data/labTestsData.ts';

dotenv.config({ path: '.env.local' });

const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
    apiVersion: '2026-03-27',
    token: process.env.SANITY_WRITE_TOKEN,
    useCdn: false,
});

async function migrate() {
    console.log('🚀 Migrating to Portable Text...');

    for (const test of labTests) {
        process.stdout.write(`Updating test: ${test.name}... `);

        const content = [
            {
                _key: Math.random().toString(36).substring(2, 11),
                _type: 'block',
                style: 'h2',
                children: [{ _key: Math.random().toString(36).substring(2, 11), _type: 'span', text: `What is ${test.name}?`, marks: [] }],
                markDefs: []
            },
            {
                _key: Math.random().toString(36).substring(2, 11),
                _type: 'block',
                style: 'normal',
                children: [{ _key: Math.random().toString(36).substring(2, 11), _type: 'span', text: test.overview || 'Learn about this diagnostic test and its clinical significance.', marks: [] }],
                markDefs: []
            }
        ];

        if (test.procedure) {
            content.push({
                _key: Math.random().toString(36).substring(2, 11),
                _type: 'block',
                style: 'h2',
                children: [{ _key: Math.random().toString(36).substring(2, 11), _type: 'span', text: 'How is the Test Performed?', marks: [] }],
                markDefs: []
            });
            content.push({
                _key: Math.random().toString(36).substring(2, 11),
                _type: 'block',
                style: 'normal',
                children: [{ _key: Math.random().toString(36).substring(2, 11), _type: 'span', text: test.procedure, marks: [] }],
                markDefs: []
            });
        }

        try {
            await client.patch(`test-${test.slug}`)
                .set({ content })
                .unset(['overview', 'procedure', 'symptoms', 'normalRanges', 'abnormalLevels'])
                .commit();
            console.log('✅');
        } catch (err: any) {
            console.log(`❌ Fail: ${err.message}`);
        }
    }

    console.log('\n✨ Portable Text Migration Complete!');
}

migrate();
