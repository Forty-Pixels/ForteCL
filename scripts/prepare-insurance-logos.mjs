import fs from 'node:fs/promises';
import sharp from 'sharp';

const root = 'public/Landing-page/insurance';
const logos = [
    ['almadallah', 'sources/almadallah.svg'],
    ['ngi', 'partner-20.webp'],
    ['ecare', 'sources/ecare.png'],
    ['nas', 'partner-12.webp'],
    ['fmc', 'sources/12-fmc.webp'],
    ['lifeline', 'sources/14-lifeline-tpa.webp'],
    ['inayah', 'sources/11-inayah.webp'],
    ['enaya', 'enaya-logo.svg'],
    ['neuron', 'sources/neuron.svg'],
    ['whealth', 'whealth-logo.png'],
    ['globemed', 'globemed-gulf-logo.svg'],
];

await fs.mkdir(`${root}/transparent`, { recursive: true });
for (const [name, source] of logos) {
    const vector = source.endsWith('.svg');
    const input = await fs.readFile(`${root}/${source}`);
    const { data, info } = await sharp(input, vector ? { density: 288 } : {})
        .ensureAlpha().raw().toBuffer({ resolveWithObject: true });
    let left = info.width, top = info.height, right = 0, bottom = 0;
    for (let y = 0; y < info.height; y++) {
        for (let x = 0; x < info.width; x++) {
            const i = (y * info.width + x) * 4;
            const min = Math.min(data[i], data[i + 1], data[i + 2]);
            const max = Math.max(data[i], data[i + 1], data[i + 2]);
            // Remove neutral white matte, retaining colored details and existing alpha.
            if (!vector && max - min < 22 && min > 215) {
                const alpha = Math.min(1, (245 - min) / 30);
                data[i + 3] = Math.round(data[i + 3] * Math.max(0, alpha));
            }
            if (data[i + 3] > 20 && min < 235) {
                left = Math.min(left, x); top = Math.min(top, y);
                right = Math.max(right, x); bottom = Math.max(bottom, y);
            }
        }
    }
    left = Math.max(0, left - 3); top = Math.max(0, top - 3);
    right = Math.min(info.width - 1, right + 3);
    bottom = Math.min(info.height - 1, bottom + 3);
    if (vector) {
        const svg = input.toString();
        const originalBox = svg.match(/viewBox="([^"]+)"/)[1].split(/[ ,]+/).map(Number);
        const scaleX = originalBox[2] / info.width, scaleY = originalBox[3] / info.height;
        const box = [originalBox[0] + left * scaleX, originalBox[1] + top * scaleY,
            (right - left + 1) * scaleX, (bottom - top + 1) * scaleY].join(' ');
        const result = svg.replace(/<svg\b[^>]*>/, tag => tag
            .replace(/\s(?:width|height|viewBox|preserveAspectRatio)="[^"]*"/g, '')
            .replace('>', ` width="600" height="240" viewBox="${box}" preserveAspectRatio="xMidYMid meet">`));
        await fs.writeFile(`${root}/transparent/${name}.svg`, result);
    } else {
        await sharp(data, { raw: { width: info.width, height: info.height, channels: 4 } })
            .extract({ left, top, width: right - left + 1, height: bottom - top + 1 })
            .resize(1800, 720, { fit: 'contain', background: '#00000000', kernel: 'lanczos3' })
            .sharpen({ sigma: 0.6, m1: 0.5, m2: 1 })
            .png().toFile(`${root}/transparent/${name}.png`);
    }
    console.log(`${name}: transparent ${vector ? 'SVG' : '1800 x 720 PNG'}`);
}
