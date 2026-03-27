const https = require('https');
const fs = require('fs');
const path = require('path');

const insurancePartners = [
    { name: 'Emarat Takaful', url: 'https://genexlab.ae/wp-content/uploads/2025/03/Insurance-Partner-1.webp' },
    { name: 'SALAMA', url: 'https://genexlab.ae/wp-content/uploads/2025/03/Insurance-Partner-2.webp' },
    { name: 'NGI', url: 'https://genexlab.ae/wp-content/uploads/2025/03/Insurance-Partner-3.webp' },
    { name: 'NLG', url: 'https://genexlab.ae/wp-content/uploads/2025/03/Insurance-Partner-4.webp' },
    { name: 'MetLife', url: 'https://genexlab.ae/wp-content/uploads/2025/03/Insurance-Partner-5.webp' },
    { name: 'Life Line', url: 'https://genexlab.ae/wp-content/uploads/2025/03/Insurance-Partner-6.webp' },
    { name: 'Orient Insurance', url: 'https://genexlab.ae/wp-content/uploads/2025/03/Insurance-Partner-7.webp' },
    { name: 'AMAN', url: 'https://genexlab.ae/wp-content/uploads/2025/03/Insurance-Partner-8.webp' },
    { name: 'ALMADALLAH', url: 'https://genexlab.ae/wp-content/uploads/2025/03/Insurance-Partner-9.webp' },
    { name: 'Nextcare', url: 'https://genexlab.ae/wp-content/uploads/2025/03/Insurance-Partner-10.webp' },
    { name: 'NAS', url: 'https://genexlab.ae/wp-content/uploads/2025/03/Insurance-Partner-11.webp' },
    { name: 'FMC NETWORK UAE', url: 'https://genexlab.ae/wp-content/uploads/2025/03/Insurance-Partner-12.webp' },
    { name: 'SAICO', url: 'https://genexlab.ae/wp-content/uploads/2025/03/Insurance-Partner-13.webp' },
    { name: 'NOOR TAKAFUL', url: 'https://genexlab.ae/wp-content/uploads/2025/03/Insurance-Partner-14.webp' },
    { name: 'ecare INTERNATIONAL', url: 'https://genexlab.ae/wp-content/uploads/2025/03/Insurance-Partner-15.webp' },
    { name: 'DUBAI INSURANCE', url: 'https://genexlab.ae/wp-content/uploads/2025/03/Insurance-Partner-16.webp' },
    { name: 'DNI', url: 'https://genexlab.ae/wp-content/uploads/2025/03/Insurance-Partner-17.webp' },
    { name: 'Daman', url: 'https://genexlab.ae/wp-content/uploads/2025/03/Insurance-Partner-18.webp' },
    { name: 'Al-Buhaira', url: 'https://genexlab.ae/wp-content/uploads/2025/03/Insurance-Partner-19.webp' },
    { name: 'AFNIC', url: 'https://genexlab.ae/wp-content/uploads/2025/03/Insurance-Partner-20.webp' },
    { name: 'ADNIC', url: 'https://genexlab.ae/wp-content/uploads/2025/03/Insurance-Partner-21.webp' },
    { name: 'Aafiya', url: 'https://genexlab.ae/wp-content/uploads/2025/03/Insurance-Partner-22.webp' },
    { name: 'Watania Takaful', url: 'https://genexlab.ae/wp-content/uploads/2025/03/Insurance-Partner-23.webp' },
    { name: 'MSH International', url: 'https://genexlab.ae/wp-content/uploads/2025/03/Insurance-Partner-24.webp' },
];

const download = (url, dest) => {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, (response) => {
      response.pipe(file);
      file.on('finish', () => {
        file.close(resolve);
      });
    }).on('error', (err) => {
      fs.unlink(dest);
      reject(err.message);
    });
  });
};

async function downloadAll() {
    const outputDir = path.join(__dirname, 'public/Landing-page/insurance');
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    for (let i = 0; i < insurancePartners.length; i++) {
        const partner = insurancePartners[i];
        const dest = path.join(outputDir, `partner-${i + 1}.webp`);
        console.log(`Downloading ${partner.name}...`);
        try {
            await download(partner.url, dest);
        } catch (error) {
            console.error(`Failed to download ${partner.name}: ${error}`);
        }
    }
    console.log('All downloads complete!');
}

downloadAll();
