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
    console.log('🔗 Decoupling Categories & Departments...');

    // 1. Extract Unique Categories & Departments
    const uniqueCategories = Array.from(new Set(labTests.map(t => t.diseaseFilter)));
    const uniqueDepartments = Array.from(new Set(labTests.map(t => t.department)));

    const categoryMap: Record<string, string> = {};
    const departmentMap: Record<string, string> = {};

    console.log(`📁 Creating ${uniqueCategories.length} categories...`);
    for (const cat of uniqueCategories) {
        const id = `cat-${cat.toLowerCase().replace(/[^a-z0-9]/g, '-')}`;
        await client.createOrReplace({
            _id: id,
            _type: 'diseaseCategory',
            title: cat,
            slug: { _type: 'slug', current: id }
        });
        categoryMap[cat] = id;
    }

    console.log(`🏢 Creating ${uniqueDepartments.length} departments...`);
    for (const dept of uniqueDepartments) {
        const id = `dept-${dept.toLowerCase().replace(/[^a-z0-9]/g, '-')}`;
        await client.createOrReplace({
            _id: id,
            _type: 'department',
            title: dept,
            slug: { _type: 'slug', current: id }
        });
        departmentMap[dept] = id;
    }

    // 2. Update Lab Tests with References
    console.log('🧪 Linking tests to categories and departments...');
    for (const test of labTests) {
        process.stdout.write(`Updating test: ${test.name}... `);
        
        const catId = categoryMap[test.diseaseFilter];
        const deptId = departmentMap[test.department];

        try {
            await client.patch(`test-${test.slug}`)
                .set({
                    diseaseFilter: {
                        _type: 'reference',
                        _ref: catId
                    },
                    department: {
                        _type: 'reference',
                        _ref: deptId
                    }
                })
                .commit();
            console.log('✅');
        } catch (err: any) {
            console.log(`❌ Fail: ${err.message}`);
        }
    }

    console.log('\n✨ Reference Migration Complete!');
}

migrate();
