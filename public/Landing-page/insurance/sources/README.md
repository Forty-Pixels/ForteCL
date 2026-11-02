# Insurance logo sources

The website uses `../transparent/` assets, prepared by
`node scripts/prepare-insurance-logos.mjs`. Originals are retained separately.
SVG artwork stays vector; bitmap output is transparent, lossless PNG at
1800 × 720. All display canvases have the same 5:2 ratio.

Downloaded originals:

- Almadallah: https://almadallah.ae/logo_original.svg
- NAS: https://www.nas.ae/wp-content/themes/nas/images/logo.svg
- Neuron: https://www.neuron.ae/wp-content/themes/neuron/images/logo.svg
- eCare: https://static.wixstatic.com/media/e3cc81_1c6c18fadaae48b9ac8b0215562e67b0~mv2.png
- FMC: https://lifelineuae.ae/wp-content/uploads/2026/10/12-fmc.webp
- Inayah: https://lifelineuae.ae/wp-content/uploads/2026/10/11-inayah.webp
- Lifeline: https://lifelineuae.ae/wp-content/uploads/2026/10/14-lifeline-tpa.webp

NAS, NGI, WHealth, Enaya and GlobeMed use the existing repository originals.
The downloaded `ngi.png` and `lifeline.png` were inspected but are smaller
than the selected inputs and are not used by the preparation script.

NAS uses the original blue-and-red artwork from `partner-12.webp`;
the downloaded NAS SVG is retained as an unused reference.
Neuron uses the current artwork served by its official website.
Upscaling older bitmap originals improves sampling and avoids additional
lossy compression, but cannot restore missing fine print in those originals.
