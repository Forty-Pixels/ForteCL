export interface Department {
    id: string;
    title: string;
    description: string;
    image: string;
    commonTests: { name: string; description: string }[];
    keyServices: string[];
    subSections?: { title: string; content: string[] | string }[];
    table?: { headers: string[]; rows: string[][] };
}

export const DEPARTMENTS_DATA: Department[] = [
    {
        id: 'hematology',
        title: 'Hematology Department',
        description: 'The Hematology Department at Forte Clinical Laboratory is dedicated to the in-depth analysis, diagnosis, and monitoring of blood-related disorders. Our laboratory is equipped with advanced automated analyzers and supported by highly skilled professionals to ensure precise, reliable, and timely results. Hematology plays a critical role in evaluating overall health, detecting diseases at an early stage, and monitoring ongoing treatments. We support clinicians with accurate data for conditions such as anemia, infections, clotting disorders, hematological malignancies, and bone marrow abnormalities.',
        image: '/Departments/details/hematology.png',
        commonTests: [
            { name: 'Complete Blood Count (CBC)', description: 'Provides a detailed analysis of red blood cells, white blood cells, and platelets, helping detect infections, anemia, and other disorders.' },
            { name: 'Peripheral Blood Smear (PBS)', description: 'Microscopic examination of blood cells to identify abnormalities in size, shape, and structure.' },
            { name: 'Erythrocyte Sedimentation Rate (ESR)', description: 'A non-specific test used to detect inflammation and monitor chronic conditions.' },
            { name: 'Hemoglobin (Hb) Testing', description: 'Measures hemoglobin levels to diagnose and monitor different types of anemia.' },
            { name: 'Reticulocyte Count', description: 'Evaluates bone marrow activity and the body’s ability to produce new red blood cells.' },
            { name: 'Packed Cell Volume (PCV/Hematocrit)', description: 'Determines the proportion of red blood cells in blood, useful in diagnosing dehydration or anemia.' }
        ],
        keyServices: [
            'Advanced Hematology Analysis',
            'Anemia Diagnosis & Monitoring',
            'Coagulation & Hemostasis Testing',
            'Hemoglobin Electrophoresis',
            'Infection & Inflammation Markers',
            'Routine & Specialized Testing',
            'Fast & Reliable Reporting'
        ]
    },
    {
        id: 'microbiology',
        title: 'Microbiology',
        description: 'Microbiology is the branch of science that studies microorganisms such as bacteria, viruses, fungi, and parasites. In clinical laboratories, microbiology plays a critical role in detecting infections, identifying pathogens, and guiding treatment decisions, especially antibiotic therapy. It helps physicians determine what organism is causing an infection, which antibiotics or antifungal drugs will work, and whether an infection is spreading or resolving.',
        image: '/Departments/details/microbiology.png',
        subSections: [
            {
                title: 'Major Branches of Medical Microbiology',
                content: ['Bacteriology: Study of bacteria', 'Virology: Study of viruses', 'Mycology: Study of fungi', 'Parasitology: Study of parasites', 'Immunology: Host response to infections']
            }
        ],
        commonTests: [
            { name: 'Culture and Sensitivity (C&S)', description: 'The most important microbiology test. Detects and grows microorganisms from samples like blood, urine, sputum, and wound swabs.' },
            { name: 'Blood Culture', description: 'Detects bacteria or fungi in the bloodstream. Used in cases of sepsis, fever of unknown origin, and severe infections.' },
            { name: 'Urine Culture', description: 'Detects urinary tract infections (UTIs) and identifies the causative organism and antibiotic sensitivity.' },
            { name: 'Sputum Culture', description: 'Used for respiratory infections, detecting pneumonia-causing bacteria and tuberculosis.' },
            { name: 'Throat / Nasal Swab Culture', description: 'Detects infections like Streptococcus (strep throat) and viral respiratory infections.' },
            { name: 'Stool Culture', description: 'Identified intestinal pathogens such as Salmonella, Shigella, E. coli, and Vibrio cholerae.' },
            { name: 'Antibiotic Sensitivity Testing (AST)', description: 'Determines which antibiotics will effectively treat the infection and helps prevent resistance.' },
            { name: 'Gram Staining', description: 'Rapid staining technique to classify bacteria as Gram-positive or Gram-negative for early guidance.' },
            { name: 'AFB (Acid-Fast Bacilli) Testing', description: 'Detects Mycobacterium tuberculosis (TB) using smear microscopy, culture, and molecular tests.' },
            { name: 'Fungal Culture & Microscopy', description: 'Detects fungal infections such as Candida, Aspergillus, and Dermatophytes.' },
            { name: 'Parasite Examination', description: 'Microscopic examination of stool or blood to detect malaria parasites and intestinal worms.' },
            { name: 'Molecular Microbiology Tests (Advanced)', description: 'PCR-based tests for rapid detection of COVID-19, TB, and STI panels.' }
        ],
        keyServices: [
            'Infection Diagnosis & Accurate Pathogen Detection',
            'Antibiotic Susceptibility Testing',
            'Sterility Testing for Medical Equipment & Pharmaceuticals',
            'Infection Control & Surveillance',
            'Rapid Diagnostic Testing (PCR, Antigen tests)',
            'Food & Water Microbiology',
            'Mycobacteriology (TB Testing)'
        ]
    },
    {
        id: 'immunology',
        title: 'Immunology Department',
        description: 'The Immunology Department at Forte Clinical Laboratory focuses on the evaluation and diagnosis of disorders related to the immune system. Our expert team utilizes advanced technologies and precise methodologies to assess immune function, detect autoimmune diseases, allergies, and immunodeficiencies. We play a vital role in helping clinicians understand how the body responds to infections, allergens, and internal imbalances.',
        image: '/Departments/details/immunology.png',
        commonTests: [
            { name: 'C-Reactive Protein (CRP)', description: 'Detects inflammation and helps monitor infections and chronic diseases.' },
            { name: 'Immunoglobulin Levels (IgG, IgA, IgM, IgE)', description: 'Evaluates immune system strength and detects deficiencies or abnormalities.' },
            { name: 'Allergy Testing (Specific IgE Tests)', description: 'Identifies allergens causing allergic reactions such as food, dust, or pollen.' },
            { name: 'Antinuclear Antibody (ANA) Test', description: 'Screens for autoimmune disorders like lupus.' },
            { name: 'Rheumatoid Factor (RF)', description: 'Helps diagnose rheumatoid arthritis and other autoimmune conditions.' },
            { name: 'Complement System Testing (C3, C4)', description: 'Assesses immune response and autoimmune activity.' }
        ],
        keyServices: [
            'Comprehensive Immune System Assessment',
            'Allergy Screening & Management Support',
            'Autoimmune Disease Testing',
            'Infection & Inflammation Markers',
            'Immunodeficiency Screening'
        ]
    },
    {
        id: 'serology',
        title: 'Serology Department',
        description: 'The Serology Department at Forte Clinical Laboratory specializes in the detection of antibodies and antigens in blood to diagnose and monitor infectious diseases and immune responses. Serology plays a crucial role in identifying current and past infections, evaluating immunity status, and supporting disease surveillance.',
        image: '/Departments/details/serology.png',
        commonTests: [
            { name: 'Hepatitis Screening (HBsAg, Anti-HCV)', description: 'Detection of Hepatitis B and C infections.' },
            { name: 'HIV Testing (HIV 1 & 2)', description: 'Screening and monitoring of HIV infection.' },
            { name: 'Dengue Serology (NS1, IgG, IgM)', description: 'Early detection and confirmation of dengue infection.' },
            { name: 'COVID-19 Antibody Testing', description: 'Assessment of past infection and immune response.' },
            { name: 'VDRL / RPR Test', description: 'Screening for syphilis infection.' },
            { name: 'Widal Test', description: 'Detection of typhoid fever.' }
        ],
        keyServices: [
            'Infectious Disease Screening',
            'Antibody & Antigen Detection',
            'Immunity Status Evaluation'
        ]
    },
    {
        id: 'biochemistry',
        title: 'Clinical Biochemistry Department',
        description: 'The Clinical Biochemistry Department at Forte Clinical Laboratory focuses on the analysis of blood and body fluids to evaluate organ function, detect metabolic disorders, and monitor overall health. Equipped with advanced automated analyzers, our laboratory ensures accurate, reliable, and timely diagnostic results for diabetes, kidney disease, liver disorders, and cardiovascular risks.',
        image: '/Departments/details/biochemistry.png',
        commonTests: [
            { name: 'Blood Glucose (Fasting/Random/HbA1c)', description: 'Assessment and monitoring of diabetes.' },
            { name: 'Lipid Profile', description: 'Measures cholesterol and triglycerides to evaluate heart health.' },
            { name: 'Liver Function Tests (LFT)', description: 'Evaluates liver enzymes and overall liver health.' },
            { name: 'Kidney Function Tests (KFT)', description: 'Assesses kidney performance through urea, creatinine, and electrolytes.' },
            { name: 'Electrolyte Panel (Sodium, Potassium, Chloride)', description: 'Maintains fluid balance and detects imbalances.' },
            { name: 'Thyroid Function Tests (TSH, T3, T4)', description: 'Evaluates thyroid gland function.' }
        ],
        keyServices: [
            'Comprehensive Metabolic Testing',
            'Diabetes Screening & Monitoring',
            'Cardiac Risk Assessment',
            'Hormonal Analysis',
            'Organ Function Testing',
            'Routine & Specialized Diagnostic care'
        ]
    },
    {
        id: 'pathology',
        title: 'Pathology / Histopathology Department',
        description: 'The Pathology / Histopathology Department at Forte Clinical Laboratory specializes in the microscopic examination of tissues and cells to diagnose diseases at a cellular level. Our опытные pathologists and skilled technicians utilize advanced technologies to detect cancers, inflammatory conditions, infections, and tissue abnormalities.',
        image: '/Departments/details/pathology.png',
        commonTests: [
            { name: 'Biopsy Examination', description: 'Microscopic analysis of tissue samples to detect cancer and other diseases.' },
            { name: 'Histopathology (Tissue Analysis)', description: 'Detailed study of tissue structure and abnormalities.' },
            { name: 'Cytology (FNAC / Pap Smear)', description: 'Examination of individual cells for early detection of cancer and infections.' },
            { name: 'Special Stains', description: 'Identification of specific microorganisms, tissue elements, or disease patterns.' },
            { name: 'Immunohistochemistry (IHC)', description: 'Advanced testing to detect specific markers for cancer diagnosis and classification.' }
        ],
        keyServices: [
            'Comprehensive Tissue Diagnosis',
            'Cancer Detection & Classification',
            'Cytology Services (FNAC, Pap smear)'
        ]
    },
    {
        id: 'molecular',
        title: 'Molecular Biology / Genetics',
        description: 'Molecular Biology / Genetics focuses on understanding how biological molecules—mainly DNA, RNA, and proteins—control living organisms. In a clinical laboratory setting, it plays a critical role in diagnosis, prognosis, disease monitoring, and personalized medicine, enabling detection at the molecular level.',
        image: '/Departments/details/molecular.png',
        subSections: [
            {
                title: 'Core Concepts',
                content: ['DNA (Deoxyribonucleic Acid): Carries genetic information', 'RNA (Ribonucleic Acid): Transfers genetic instructions for protein synthesis', 'Genes: Segments of DNA that code for proteins', 'Mutation: Changes in DNA that may lead to disease', 'Gene Expression: Process by which genes are activated to produce proteins', 'Protein Synthesis: Final functional products of gene expression']
            },
            {
                title: 'Key Technologies',
                content: ['Polymerase Chain Reaction (PCR)', 'Real-Time PCR (qPCR)', 'Reverse Transcription PCR (RT-PCR)', 'DNA Sequencing (Sanger & NGS)', 'FISH (Fluorescence In Situ Hybridization)', 'Microarray Technology']
            }
        ],
        commonTests: [
            { name: 'Infectious Disease Panels', description: 'Respiratory Panel, Gastrointestinal Panel, STI Panel, MTB PCR, Viral load tests (HIV, Hep B/C).' },
            { name: 'Genetic & Hereditary Testing', description: 'Carrier Screening, Prenatal Testing, Newborn Screening, Pharmacogenomics.' },
            { name: 'Oncology Molecular Testing', description: 'Tumor mutation profiling, Liquid biopsy, Biomarker testing (EGFR, KRAS, BRAF, HER2).' },
            { name: 'Hematology-Related Molecular Tests', description: 'BCR-ABL (CML), JAK2 mutation (Polycythemia Vera), Thalassemia analysis.' }
        ],
        keyServices: [
            'Advanced Diagnostic Testing (Rapid turnaround)',
            'Screening & Preventive Medicine (Genetic risk)',
            'Therapeutic Monitoring (Viral load, Cancer response)',
            'Personalized Medicine (Genetic profiling)',
            'Research & Development Support',
            'Infection Control & Epidemiology'
        ]
    },
    {
        id: 'cytopathology',
        title: 'Histopathology & Cytopathology',
        description: 'Histopathology and Cytopathology are essential branches of diagnostic pathology used to study diseases at the microscopic level. Histopathology examines tissue architecture to diagnose cancers, while Cytopathology studies individual cells to detect abnormalities, infections, and malignancies.',
        image: '/Departments/details/cytopathology.png',
        commonTests: [
            { name: 'Pap Smear (Cervical Cytology)', description: 'Screening for cervical cancer and precancerous changes.' },
            { name: 'Fine Needle Aspiration Cytology (FNAC)', description: 'Samples cells from lumps (thyroid, breast, lymph nodes).' },
            { name: 'Fluid Cytology', description: 'Examination of body fluids (Pleural, Ascitic, Urine, CSF) to detect cancer and infections.' },
            { name: 'Rapid On-Site Evaluation (ROSE)', description: 'Immediate assessment during FNAC procedures.' }
        ],
        keyServices: [
            'Cancer screening programs',
            'FNAC-based diagnosis of lumps',
            'Early detection of malignancies',
            'Fluid analysis for cancer and infections',
            'Monitoring disease progression and recurrence'
        ],
        table: {
            headers: ['Feature', 'Histopathology', 'Cytopathology'],
            rows: [
                ['Sample Type', 'Tissue (biopsy/surgery)', 'Cells (smears, fluids)'],
                ['Invasiveness', 'More invasive', 'Minimally invasive'],
                ['Detail Level', 'Tissue architecture', 'Cellular details'],
                ['Diagnosis', 'Definitive diagnosis', 'Screening & preliminary diagnosis'],
                ['Turnaround Time', 'Longer', 'Faster']
            ]
        }
    }
];
