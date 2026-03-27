import { createClient } from '@sanity/client';
import dotenv from 'dotenv';
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

const imageMap: Record<string, string> = {
    'diabetes': 'diabetes.png',
    'liver': 'liver.png',
    'kidney': 'kidney.png',
    'thyroid': 'thyroid.png',
    'lipid': 'lipid.png',
    'fertility': 'fertility.png',
    'cbc': 'cbc.png',
    'electrolytes': 'electrolytes.png',
    'minerals': 'minerals.png',
    'hiv': 'hiv_screen.png',
    'hormonemen': 'hormone.png',
    'vitaminb12': 'vitaminb12.png',
    'alcohol': 'alcohol.png',
    'pcos': 'hormonal.png',
    'foodhandler': 'biochemistry.png',
};

async function migrateImages() {
    console.log('🖼️ Starting Image Migration...');

    const baseDir = path.join(process.cwd(), 'public', 'Packages', 'list');

    for (const [pkgId, fileName] of Object.entries(imageMap)) {
        const filePath = path.join(baseDir, fileName);
        
        if (!fs.existsSync(filePath)) {
            console.log(`⚠️ Skip: ${fileName} not found for ${pkgId}`);
            continue;
        }

        process.stdout.write(`Uploading ${fileName} for ${pkgId}... `);

        try {
            // 1. Upload the image asset
            const asset = await client.assets.upload('image', fs.createReadStream(filePath), {
                filename: fileName,
            });

            // 2. Patch the package document with the asset reference
            await client
                .patch(`package-${pkgId}`)
                .set({
                    image: {
                        _type: 'image',
                        asset: {
                            _type: 'reference',
                            _ref: asset._id,
                        },
                    },
                })
                .commit();

            console.log('✅');
        } catch (err: any) {
            console.log(`❌ Fail: ${err.message}`);
        }
    }

    console.log('\n✨ Image Migration Complete!');
}

migrateImages();
