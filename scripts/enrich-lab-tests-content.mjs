import { createClient } from '@sanity/client';
import dotenv from 'dotenv';
import crypto from 'node:crypto';
import fs from 'node:fs';

dotenv.config({ path: '.env.local' });

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2026-03-27';
const token = process.env.SANITY_WRITE_TOKEN;

if (!projectId || !dataset) {
  console.error('Missing NEXT_PUBLIC_SANITY_PROJECT_ID or NEXT_PUBLIC_SANITY_DATASET in .env.local');
  process.exit(1);
}

if (!token) {
  console.error('Missing SANITY_WRITE_TOKEN in .env.local');
  process.exit(1);
}

const args = new Set(process.argv.slice(2));
const apply = args.has('--apply');
const overwrite = args.has('--overwrite');
const onlyMissing = !args.has('--all');
const show = args.has('--show');
const limitArg = process.argv.find((arg) => arg.startsWith('--limit='));
const limit = limitArg ? Number(limitArg.split('=')[1]) : null;
const outArg = process.argv.find((arg) => arg.startsWith('--out='));
const outPath = outArg ? outArg.split('=')[1] : null;

const client = createClient({
  projectId,
  dataset,
  apiVersion,
  token,
  useCdn: false,
});

const query = `*[_type == "labTest" && defined(slug.current)] | order(name asc) {
  _id,
  name,
  "slug": slug.current,
  tat,
  sampleType,
  "departmentTitle": department->title,
  "departmentSlug": department->slug.current,
  content
}`;

const mkKey = () => crypto.randomBytes(5).toString('hex');

const block = (style, text) => ({
  _key: mkKey(),
  _type: 'block',
  style,
  markDefs: [],
  children: [{ _key: mkKey(), _type: 'span', text, marks: [] }],
});

const bullets = (items) => ({
  _key: mkKey(),
  _type: 'block',
  style: 'normal',
  listItem: 'bullet',
  level: 1,
  markDefs: [],
  children: [{ _key: mkKey(), _type: 'span', text: items, marks: [] }],
});

const normalize = (value = '') =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

const hasMeaningfulContent = (content) => {
  if (!Array.isArray(content) || content.length < 3) return false;
  const text = content
    .flatMap((b) => (Array.isArray(b?.children) ? b.children : []))
    .map((c) => c?.text || '')
    .join(' ')
    .trim();
  return text.length >= 220;
};

const renderPreview = (content) =>
  content
    .map((blockItem) => {
      const text = (blockItem.children || []).map((child) => child.text || '').join('');
      if (blockItem.style === 'h2') return `## ${text}`;
      if (blockItem.style === 'h3') return `### ${text}`;
      if (blockItem.listItem === 'bullet') return `- ${text}`;
      return text;
    })
    .join('\n');

const baseByDepartment = (department) => {
  const d = normalize(department);
  if (d.includes('hematology')) {
    return {
      focus: 'blood cells, hemoglobin, clotting, and inflammatory signals',
      when: [
        'Symptoms like fatigue, pallor, dizziness, or unexplained bruising',
        'Follow-up of anemia, infections, or platelet abnormalities',
        'Routine clinical checkups or pre-procedure evaluation',
      ],
      prep: ['Usually no fasting is required unless advised', 'Hydrate well before sample collection'],
      interpretation:
        'Results are interpreted with age, gender, symptoms, and current treatment. Abnormal values are correlated with other clinical findings before a diagnosis is confirmed.',
    };
  }
  if (d.includes('microbiology') || d.includes('serology')) {
    return {
      focus: 'infectious organisms, immune response markers, and targeted pathogen detection',
      when: [
        'Fever, suspected infection, or persistent inflammatory symptoms',
        'Monitoring treatment response in known infections',
        'Screening protocols for high-risk exposure or pre-procedure workup',
      ],
      prep: [
        'Provide the sample exactly as instructed to avoid contamination',
        'Inform the lab if you are currently on antibiotics or antivirals',
      ],
      interpretation:
        'Positive and negative results are interpreted with symptom duration, prior therapy, and specimen quality. Confirmation or reflex testing may be required for definitive decisions.',
    };
  }
  if (d.includes('biochemistry') || d.includes('chemistry')) {
    return {
      focus: 'metabolic status, organ function, electrolyte balance, and cardiovascular risk markers',
      when: [
        'Diabetes, liver, kidney, or lipid-risk evaluation',
        'General health screening and chronic disease monitoring',
        'Medication monitoring where biochemical trends matter',
      ],
      prep: ['Fasting may be required for selected profiles', 'Continue medicines only as advised by your doctor'],
      interpretation:
        'Single values are reviewed alongside trend data and related parameters. Clinical relevance is assessed using history, comorbidities, and treatment goals.',
    };
  }
  if (d.includes('immunology')) {
    return {
      focus: 'immune activity, autoimmune markers, inflammatory burden, and hypersensitivity patterns',
      when: [
        'Autoimmune symptom workup or persistent unexplained inflammation',
        'Allergy and immune-response assessment',
        'Follow-up of known immune-mediated conditions',
      ],
      prep: ['No special preparation for most tests', 'Share current steroid or immune-modulating therapy details'],
      interpretation:
        'Immune markers are interpreted as a panel, not in isolation. Correlation with symptoms and physician evaluation is essential for accurate diagnosis.',
    };
  }
  if (d.includes('molecular') || d.includes('genetic')) {
    return {
      focus: 'DNA/RNA-level detection for precise diagnosis, screening, and disease monitoring',
      when: [
        'High-sensitivity confirmation of infectious or genetic conditions',
        'Risk stratification and personalized treatment planning',
        'Monitoring of therapy response in selected conditions',
      ],
      prep: ['Sample requirements vary by assay type', 'Ensure complete clinical details are provided'],
      interpretation:
        'Molecular results are highly specific but still require clinical context. Variant significance or pathogen load is assessed with physician correlation.',
    };
  }
  if (d.includes('pathology') || d.includes('cyto')) {
    return {
      focus: 'cell and tissue-level morphological assessment for definitive diagnostic support',
      when: [
        'Evaluation of suspicious lesions, masses, or abnormal screening findings',
        'Cancer diagnosis, grading, or follow-up',
        'Inflammatory or infectious tissue analysis',
      ],
      prep: ['Specimen handling and transport quality are critical', 'Provide complete clinical notes with specimen'],
      interpretation:
        'Histology/cytology findings are integrated with radiology and clinical examination to guide final diagnosis and management.',
    };
  }
  return {
    focus: 'targeted diagnostic markers relevant to your physician’s clinical question',
    when: [
      'Initial diagnostic screening',
      'Monitoring ongoing treatment or disease progression',
      'Preventive or routine wellness evaluation',
    ],
    prep: ['Follow any fasting or medication instructions given by your doctor', 'Bring prior reports if available'],
    interpretation:
      'Results are interpreted by qualified clinicians in the context of symptoms, history, and related tests before treatment decisions are made.',
  };
};

const keywordTweaks = (name) => {
  const n = normalize(name);
  if (n.includes('culture')) {
    return {
      prep: [
        'Collect specimen using sterile technique to avoid contamination',
        'Preferably collect before starting antibiotics unless clinically contraindicated',
      ],
      note: 'Culture results may require additional sensitivity testing to guide targeted therapy.',
    };
  }
  if (n.includes('hba1c') || n.includes('glucose') || n.includes('diabetes')) {
    return {
      prep: ['Fasting may be required for specific glucose panels', 'Avoid unusual diet/exercise changes just before testing'],
      note: 'For diabetes management, trend values over time are often more useful than a single isolated result.',
    };
  }
  if (n.includes('lipid') || n.includes('cholesterol') || n.includes('triglyceride')) {
    return {
      prep: ['A fasting sample is commonly preferred for full lipid profiling', 'Avoid heavy meals and alcohol before sample collection'],
      note: 'Lipid interpretation should include cardiovascular risk profile, age, and comorbid conditions.',
    };
  }
  if (n.includes('thyroid') || n.includes('tsh') || n.includes('t3') || n.includes('t4')) {
    return {
      prep: ['Take thyroid medication timing as instructed by your physician', 'Report biotin supplement use before testing'],
      note: 'Thyroid tests are interpreted as a hormonal pattern rather than a single marker alone.',
    };
  }
  if (n.includes('stool')) {
    return {
      prep: ['Use a clean container and avoid contamination with urine or water', 'Deliver the sample promptly as instructed'],
      note: 'Stool test interpretation depends on sample quality, clinical history, and symptom duration.',
    };
  }
  if (n.includes('urine')) {
    return {
      prep: ['Midstream clean-catch collection is preferred for many urine tests', 'Follow timing instructions if a first-morning sample is requested'],
      note: 'Urine findings are reviewed with hydration status, medications, and clinical symptoms.',
    };
  }
  return null;
};

const buildContent = (test) => {
  const base = baseByDepartment(test.departmentTitle || test.departmentSlug || '');
  const tweak = keywordTweaks(test.name);

  const prep = tweak?.prep?.length ? tweak.prep : base.prep;
  const clinicalNote =
    tweak?.note ||
    'Reference ranges may vary by method and laboratory platform. Always review results with your clinician for personalized guidance.';

  const tatText = test.tat ? `Turnaround Time: ${test.tat}` : 'Turnaround Time: Based on test workflow and verification requirements.';
  const sampleText =
    Array.isArray(test.sampleType) && test.sampleType.length
      ? `Sample Type: ${test.sampleType.join(', ')}`
      : 'Sample Type: As per test protocol.';

  return [
    block('h2', `What Is ${test.name}?`),
    block(
      'normal',
      `${test.name} is a focused laboratory test used to evaluate ${base.focus}. It supports screening, diagnosis, and follow-up decisions with clinically actionable data.`
    ),
    block('h3', 'When This Test Is Commonly Recommended'),
    ...base.when.map((item) => bullets(item)),
    block('h3', 'Before The Test'),
    ...prep.map((item) => bullets(item)),
    block('h3', 'How Results Are Interpreted'),
    block('normal', base.interpretation),
    block('h3', 'Turnaround And Sample Details'),
    bullets(tatText),
    bullets(sampleText),
    block('h3', 'Clinical Note'),
    block('normal', clinicalNote),
  ];
};

async function run() {
  console.log('Fetching lab tests from Sanity...');
  const tests = await client.fetch(query);
  const selected = Number.isFinite(limit) && limit > 0 ? tests.slice(0, limit) : tests;

  console.log(
    `Mode: ${apply ? 'APPLY' : 'DRY-RUN'} | onlyMissing=${onlyMissing} | overwrite=${overwrite} | tests=${selected.length}`
  );

  let updated = 0;
  let skipped = 0;
  let failed = 0;
  const previewRecords = [];

  for (const test of selected) {
    const hasContent = hasMeaningfulContent(test.content);
    const shouldSkip = (!overwrite && onlyMissing && hasContent) || (!overwrite && !onlyMissing && hasContent);

    if (shouldSkip) {
      skipped += 1;
      console.log(`SKIP  ${test.name} (${test.slug}) - already has content`);
      continue;
    }

    const content = buildContent(test);
    const previewText = renderPreview(content);

    if (!apply) {
      updated += 1;
      console.log(`PLAN  ${test.name} (${test.slug})`);
      if (show) {
        console.log('----- PREVIEW START -----');
        console.log(previewText);
        console.log('----- PREVIEW END -------');
      }
      previewRecords.push({
        mode: 'plan',
        id: test._id,
        slug: test.slug,
        name: test.name,
        content,
        previewText,
      });
      continue;
    }

    try {
      await client.patch(test._id).set({ content }).commit();
      updated += 1;
      console.log(`DONE  ${test.name} (${test.slug})`);
      previewRecords.push({
        mode: 'updated',
        id: test._id,
        slug: test.slug,
        name: test.name,
        content,
        previewText,
      });
    } catch (error) {
      failed += 1;
      console.error(`FAIL  ${test.name} (${test.slug})`, error?.message || error);
    }
  }

  console.log('\nSummary');
  console.log(`Updated/Planned: ${updated}`);
  console.log(`Skipped: ${skipped}`);
  console.log(`Failed: ${failed}`);

  if (outPath) {
    fs.writeFileSync(outPath, JSON.stringify(previewRecords, null, 2), 'utf8');
    console.log(`Preview written to: ${outPath}`);
  }
}

run().catch((error) => {
  console.error('Fatal error:', error);
  process.exit(1);
});
