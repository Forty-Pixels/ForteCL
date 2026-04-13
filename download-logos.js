const https = require('https');
const fs = require('fs');
const path = require('path');

const insurancePartners = [

    { name: 'NGI', url: 'https://genexlab.ae/wp-content/uploads/2025/03/Insurance-Partner-3.webp' },



    { name: 'ALMADALLAH', url: 'https://genexlab.ae/wp-content/uploads/2025/03/Insurance-Partner-9.webp' },

    { name: 'NAS', url: 'https://genexlab.ae/wp-content/uploads/2025/03/Insurance-Partner-11.webp' },
    { name: 'FMC NETWORK UAE', url: 'https://genexlab.ae/wp-content/uploads/2025/03/Insurance-Partner-12.webp' },
  
   
    { name: 'ecare INTERNATIONAL', url: 'https://static.wixstatic.com/media/e3cc81_bc08fcb3ecbf4b2892334531b1720fb7~mv2.jpg/v1/fill/w_1920,h_415,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/e3cc81_bc08fcb3ecbf4b2892334531b1720fb7~mv2.jpg' },


   
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
