export interface Department {
    id: string;
    title: string;
    description: string;
    image: string;
    commonTests: { name: string; description: string }[];
    keyServices: string[];
    subSections?: { title: string; content: string[] | string; image?: string }[];
    table?: { headers: string[]; rows: string[][] };
    startingPrice?: string;
    faqs?: { question: string; answer: string }[];
    process?: { title: string; description: string; image?: string }[];
    quote?: { text: string; highlightedText: string };
    difference?: {
        title: string;
        image: string;
        items: { title: string; description: string; icon?: any }[];
    };
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
            'Infection & Inflammation Markers'
        ],
        subSections: [
            {
                title: 'Advanced Cell Analysis',
                content: 'Our department utilizes state-of-the-art flow cytometry and automated cell counters to provide a granular look at your blood health.',
                image: '/Departments/details/hematology_cells.png'
            }
        ],
        startingPrice: 'AED 150',
        faqs: [
            {
                question: 'What is the importance of a Hematology checkup?',
                answer: 'A hematology checkup is vital for detecting conditions like anemia, infections, and blood-clotting disorders early. It provides a comprehensive view of your overall health.'
            },
            {
                question: 'Do I need to fast before a CBC test?',
                answer: 'Generally, fasting is not required for a Complete Blood Count (CBC). However, if your test includes other parameters like blood sugar, you may need to fast for 8-12 hours.'
            },
            {
                question: 'How long does it take to get the results?',
                answer: 'Most routine hematology results, including CBC, are available within 24 hours of sample collection.'
            }
        ],
        process: [
            { title: 'Book Online', description: 'Schedule your test through our website or via WhatsApp.', image: '/p_book.png' },
            { title: 'Sample Collection', description: 'Our certified nurse will visit your location for home sample collection.', image: '/p_sample.png' },
            { title: 'Lab Processing', description: 'Your sample is processed in our state-of-the-art lab with precision.', image: '/p_lab.png' },
            { title: 'Get Reports', description: 'Receive your digital reports via email and WhatsApp within 24 hours.', image: '/p_report.png' }
        ],
        quote: {
            text: "BLOOD HEALTH IS THE WINDOW TO YOUR WELL-BEING.",
            highlightedText: " OUR HEMATOLOGY EXPERTS UTILIZE STATE-OF-THE-ART TECHNOLOGY TO UNCOVER CLINICAL INSIGHTS THAT DRIVE PRECISION MEDICINE AND BETTER PATIENT CARE."
        },
        difference: {
            title: "HEMATOLOGY EXCELLENCE",
            image: "/departments/difference/hematology-lab.png",
            items: [
                { title: "Specialized Cell Analysis", description: "Granular evaluation of blood cell morphology to detect subtle abnormalities early." },
                { title: "Clotting & Hemostasis", description: "Comprehensive coagulation studies to manage bleeding and thrombotic risks." },
                { title: "Rapid Turnaround", description: "Priority processing for critical hematology panels to support urgent clinical decisions." }
            ]
        }
    },
    {
        id: 'microbiology',
        title: 'Microbiology',
        description: 'Microbiology is the branch of science that studies microorganisms such as bacteria, viruses, fungi, and parasites. In clinical laboratories, microbiology plays a critical role in detecting infections, identifying pathogens, and guiding treatment decisions, especially antibiotic therapy. It helps physicians determine what organism is causing an infection, which antibiotics or antifungal drugs will work, and whether an infection is spreading or resolving.',
        image: '/Departments/details/microbiology.png',
        subSections: [
            {
                title: 'Major Branches of Medical Microbiology',
                content: ['Bacteriology: Study of bacteria', 'Virology: Study of viruses', 'Mycology: Study of fungi', 'Parasitology: Study of parasites', 'Immunology: Host response to infections'],
                image: '/Departments/details/microbiology_petri.png'
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
        ],
        faqs: [
            { question: 'How is a culture test performed?', answer: 'A sample is placed in a special medium to encourage growth of microorganisms for identification and sensitivity testing.' },
            { question: 'What is antibiotic resistance?', answer: 'It occurs when bacteria change in response to the use of medicines, making infections harder to treat.' },
            { question: 'Why is microbiology important in healthcare?', answer: 'It is essential for diagnosing infectious diseases and determining the most effective treatment options.' }
        ],
        quote: {
            text: "IDENTIFYING THE INVISIBLE THREATS TO PROTECT HUMAN HEALTH.",
            highlightedText: " OUR MICROBIOLOGY TEAM COMBINES TRADITIONAL CULTURE METHODS WITH MOLECULAR PRECISION TO ENSURE TARGETED TREATMENT AND INFECTION CONTROL."
        },
        difference: {
            title: "MICROBIOLOGY PRECISION",
            image: "/departments/difference/micro-lab.png",
            items: [
                { title: "Pathogen Identification", description: "Advanced culture and biochemical techniques to pinpoint infectious agents accurately." },
                { title: "Antibiotic Stewardship", description: "Providing detailed sensitivity data to guide effective and responsible antibiotic use." },
                { title: "Molecular Screening", description: "RT-PCR and nucleic acid testing for rapid detection of respiratory and enteric pathogens." }
            ]
        }
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
        ],
        subSections: [
            {
                title: 'Immune System Analysis',
                content: 'Our advanced immunology testing evaluates the body’s immune response to identify allergies, autoimmune disorders, and chronic inflammation.',
                image: '/Departments/details/immunology_detail.png'
            }
        ],
        faqs: [
            { question: 'Can immunology tests diagnose allergies?', answer: 'Yes, specific IgE tests can identify a wide range of allergens causing your symptoms.' },
            { question: 'What is an ANA test for?', answer: 'The Antinuclear Antibody test is used to screen for various autoimmune disorders.' }
        ],
        process: [
            { title: 'Book Online', description: 'Schedule your test through our website or via WhatsApp.', image: '/p_book.png' },
            { title: 'Sample Collection', description: 'Our certified nurse will visit your location for home sample collection.', image: '/p_sample.png' },
            { title: 'Lab Processing', description: 'Your sample is processed in our state-of-the-art lab with precision.', image: '/p_lab.png' },
            { title: 'Get Reports', description: 'Receive your digital reports via email and WhatsApp within 24 hours.', image: '/p_report.png' }
        ],
        quote: {
            text: "ASSESSING THE BODY'S NATURAL DEFENSE MECHANISMS.",
            highlightedText: " OUR IMMUNOLOGY SPECIALISTS EVALUATE COMPLEX IMMUNE RESPONSES TO HELP DIAGNOSE AUTOIMMUNE CONDITIONS, ALLERGIES, AND IMMUNODEFICIENCIES."
        },
        difference: {
            title: "IMMUNOLOGY EXPERTISE",
            image: "/Departments/details/immunology_detail.png",
            items: [
                { title: "Immune Response Mapping", description: "Evaluating complex cellular and humoral responses to identify underlying immunodeficiencies." },
                { title: "Autoimmune Precision", description: "Utilizing specific markers to detect and monitor chronic autoimmune conditions with accuracy." },
                { title: "Allergy Sensitivity", description: "Comprehensive IgE testing for a wide range of environmental and dietary allergens." }
            ]
        }
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
        ],
        subSections: [
            {
                title: 'Serum & Antibody Studies',
                content: 'Serological testing plays a critical role in detecting past infections and evaluating immunity status through precise antibody analysis.',
                image: '/Departments/details/serology_detail.png'
            }
        ],
        faqs: [
            { question: 'What is serology used for?', answer: 'It is used to detect the presence of antibodies or antigens in the blood, indicating infection or immunity.' },
            { question: 'How long are serology results valid?', answer: 'Validity depends on the specific condition being tested and should be discussed with your physician.' }
        ],
        process: [
            { title: 'Book Online', description: 'Schedule your test through our website or via WhatsApp.', image: '/p_book.png' },
            { title: 'Sample Collection', description: 'Our certified nurse will visit your location for home sample collection.', image: '/p_sample.png' },
            { title: 'Lab Processing', description: 'Your sample is processed in our state-of-the-art lab with precision.', image: '/p_lab.png' },
            { title: 'Get Reports', description: 'Receive your digital reports via email and WhatsApp within 24 hours.', image: '/p_report.png' }
        ],
        quote: {
            text: "DETECTING THE MARKERS OF INFECTIOUS EXPOSURE.",
            highlightedText: " OUR SEROLOGY DEPARTMENT SPECIALIZES IN ANTIBODY AND ANTIGEN DETECTION TO MONITOR DISEASE PROGRESSION AND VERIFY IMMUNITY STATUS."
        },
        difference: {
            title: "SEROLOGICAL PRECISION",
            image: "/Departments/details/serology_detail.png",
            items: [
                { title: "Infectious Disease Screening", description: "Accurate detection of viral and bacterial markers for effective disease management." },
                { title: "Antibody Status Tracking", description: "Monitoring immunity levels following infection or vaccination programs." },
                { title: "Rapid Antigen Detection", description: "Utilizing advanced kits for the quick identification of acute infectious threats." }
            ]
        }
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
        ],
        subSections: [
            {
                title: 'Metabolic & Fluid Analysis',
                content: 'Our biochemistry department utilizes high-throughput automated systems to monitor metabolic health and organ function with extreme precision.',
                image: '/Departments/details/biochemistry_detail.png'
            }
        ],
        faqs: [
            { question: 'What is Clinical Biochemistry?', answer: 'It is the area of chemistry that is generally concerned with analysis of bodily fluids for diagnostic and therapeutic purposes.' },
            { question: 'Why are liver function tests important?', answer: 'They help determine the health of your liver by measuring the levels of proteins, liver enzymes, and bilirubin in your blood.' }
        ],
        quote: {
            text: "DECODING THE BIOCHEMICAL MARKERS OF METABOLIC HEALTH.",
            highlightedText: " OUR CLINICAL BIOCHEMISTRY DEPARTMENT PROVIDES THE QUANTITATIVE DATA NEEDED TO MONITOR ORGAN FUNCTION AND DETECT METABOLIC DISORDERS WITH SUPREME PRECISION."
        },
        process: [
            { title: 'Book Online', description: 'Schedule your test through our website or via WhatsApp.', image: '/p_book.png' },
            { title: 'Sample Collection', description: 'Our certified nurse will visit your location for home sample collection.', image: '/p_sample.png' },
            { title: 'Lab Processing', description: 'Your sample is processed in our state-of-the-art lab with precision.', image: '/p_lab.png' },
            { title: 'Get Reports', description: 'Receive your digital reports via email and WhatsApp within 24 hours.', image: '/p_report.png' }
        ],
        difference: {
            title: "BIOCHEMICAL PRECISION",
            image: "/Departments/details/biochemistry_detail.png",
            items: [
                { title: "Metabolic Profiling", description: "Comprehensive assessment of chemical processes within the body to monitor organ health." },
                { title: "Automated High-Throughput", description: "Utilizing advanced analyzers to ensure rapid and accurate processing of large sample volumes." },
                { title: "Organ Function Monitoring", description: "Detailed evaluation of liver, kidney, and cardiac markers for proactive health management." }
            ]
        }
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
        ],
        subSections: [
            {
                title: 'Histological Tissue Studies',
                content: 'Our pathologists examine tissue architecture at the cellular level to provide definitive diagnoses for cancers and inflammatory conditions.',
                image: '/Departments/details/pathology_detail.png'
            }
        ],
        faqs: [
            { question: 'What is a biopsy?', answer: 'A biopsy is the removal of a small sample of tissue for microscopic examination to diagnose diseases like cancer.' },
            { question: 'How long does a histopathology report take?', answer: 'Depending on the complexity, results are typically available within 3-5 working days.' }
        ],
        process: [
            { title: 'Book Online', description: 'Schedule your test through our website or via WhatsApp.', image: '/p_book.png' },
            { title: 'Sample Collection', description: 'Our certified nurse will visit your location for home sample collection.', image: '/p_sample.png' },
            { title: 'Lab Processing', description: 'Your sample is processed in our state-of-the-art lab with precision.', image: '/p_lab.png' },
            { title: 'Get Reports', description: 'Receive your digital reports via email and WhatsApp within 24 hours.', image: '/p_report.png' }
        ],
        quote: {
            text: "THE GOLD STANDARD IN TISSUE-BASED DIAGNOSTICS.",
            highlightedText: " OUR PATHOLOGY DEPARTMENT COMBINES MICROSCOPIC EXPERTISE WITH CLINICAL INSIGHT TO PROVIDE DEFINITIVE DIAGNOSES FOR COMPLEX CLINICAL CASES."
        },
        difference: {
            title: "PATHOLOGY EXCELLENCE",
            image: "/Departments/details/pathology_detail.png",
            items: [
                { title: "Definitive Tissue Analysis", description: "In-depth microscopic evaluation by board-certified pathologists for definitive disease diagnosis." },
                { title: "Consultant Review", description: "Our expert team provides secondary reviews for complex cases to ensure diagnostic accuracy." },
                { title: "Specialized Staining", description: "Utilizing advanced IHC and special stains to pinpoint specific disease markers and origins." }
            ]
        }
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
                content: ['Polymerase Chain Reaction (PCR)', 'Real-Time PCR (qPCR)', 'Reverse Transcription PCR (RT-PCR)', 'DNA Sequencing (Sanger & NGS)', 'FISH (Fluorescence In Situ Hybridization)', 'Microarray Technology'],
                image: '/Departments/details/molecular_dna.png'
            }
        ],
        commonTests: [
            { name: 'NIPT Test (Non-Invasive Prenatal Test)', description: 'Safe, accurate, and early prenatal screening for chromosomal conditions as early as 10 weeks.' },
            { name: 'Infectious Disease Panels', description: 'Respiratory Panel, Gastrointestinal Panel, STI Panel, MTB PCR, Viral load tests (HIV, Hep B/C).' },
            { name: 'Genetic & Hereditary Testing', description: 'Carrier Screening, Prenatal Testing, Newborn Screening, Pharmacogenomics.' },
            { name: 'Oncology Molecular Testing', description: 'Tumor mutation profiling, Liquid biopsy, Biomarker testing (EGFR, KRAS, BRAF, HER2).' },
            { name: 'Hematology-Related Molecular Tests', description: 'BCR-ABL (CML), JAK2 mutation (Polycythemia Vera), Thalassemia analysis.' }
        ],
        keyServices: [
            'Non-Invasive Prenatal Testing (NIPT)',
            'Genetic Carrier Screening',
            'Infectious Disease Molecular Panels',
            'Oncology Biomarker Testing'
        ],
        startingPrice: 'AED 1,199',
        faqs: [
            {
                question: 'What is NIPT and how accurate is it?',
                answer: 'Non-Invasive Prenatal Testing (NIPT) is a highly accurate screening test that analyzes fetal DNA in the mother’s blood to detect chromosomal abnormalities with over 99% precision.'
            },
            {
                question: 'When can I take the NIPT test?',
                answer: 'The NIPT test can be taken as early as 10 weeks of pregnancy.'
            },
            {
                question: 'Is there any risk to the baby?',
                answer: 'No, NIPT is completely non-invasive and poses no risk to the mother or the baby as it only requires a simple maternal blood draw.'
            }
        ],
        process: [
            { title: 'Consultation', description: 'Schedule your test through our website or via WhatsApp.', image: '/process_book_online_1777481560799.png' },
            { title: 'Sample Collection', description: 'Our certified nurse will visit your location for home sample collection.', image: '/process_sample_collection_1777481577050.png' },
            { title: 'Lab Processing', description: 'Your sample is processed in our state-of-the-art lab with precision.', image: '/process_lab_processing_1777481594691.png' },
            { title: 'Get Reports', description: 'Receive your digital reports via email and WhatsApp within 24 hours.', image: '/process_get_reports_1777481610116.png' }
        ],
        quote: {
            text: "UNCOVERING DIAGNOSIS AT THE GENETIC LEVEL.",
            highlightedText: " MOLECULAR DIAGNOSTICS AT FORTE UTILIZES PCR AND NUCLEIC ACID TESTING TO DETECT PATHOGENS AND GENETIC MARKERS WITH UNMATCHED SENSITIVITY."
        },
        difference: {
            title: "MOLECULAR PRECISION",
            image: "/Departments/details/molecular_dna.png",
            items: [
                { title: "Genomic Accuracy", description: "Detecting genetic variants and pathogen DNA with the highest level of sensitivity and specificity." },
                { title: "Real-Time Detection", description: "Utilizing advanced qPCR platforms for the rapid identification of infectious agents." },
                { title: "Targeted Panels", description: "Comprehensive testing for hereditary conditions and oncology-related molecular markers." }
            ]
        }
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
        subSections: [
            {
                title: 'Cellular Diagnostics',
                content: 'Cytopathology studies individual cells from fluids and fine needle aspirations to detect early-stage cancers and infections.',
                image: '/Departments/details/cytopathology_detail.png'
            }
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
        },
        faqs: [
            { question: 'What is a Pap Smear?', answer: 'A Pap smear is a screening test for cervical cancer that involves collecting cells from the cervix for examination.' },
            { question: 'Is FNAC painful?', answer: 'FNAC is a minimally invasive procedure that involves a very fine needle and causes minimal discomfort.' }
        ],
        process: [
            { title: 'Book Online', description: 'Schedule your test through our website or via WhatsApp.', image: '/p_book.png' },
            { title: 'Sample Collection', description: 'Our certified nurse will visit your location for home sample collection.', image: '/p_sample.png' },
            { title: 'Lab Processing', description: 'Your sample is processed in our state-of-the-art lab with precision.', image: '/p_lab.png' },
            { title: 'Get Reports', description: 'Receive your digital reports via email and WhatsApp within 24 hours.', image: '/p_report.png' }
        ],
        quote: {
            text: "PRECISION SCREENING AT THE CELLULAR LEVEL.",
            highlightedText: " OUR CYTOLOGY EXPERTS SPECIALIZE IN THE EARLY DETECTION OF CELLULAR ABNORMALITIES, PROVIDING A CRITICAL LINE OF DEFENSE IN CANCER SCREENING AND PREVENTION."
        },
        difference: {
            title: "CYTOLOGY PRECISION",
            image: "/Departments/details/cytopathology_detail.png",
            items: [
                { title: "Early Detection", description: "Identifying precancerous changes at the cellular level before they become invasive." },
                { title: "Minimal Invasiveness", description: "Expert FNAC procedures that provide clinical answers with minimal patient discomfort." },
                { title: "Screening Excellence", description: "Comprehensive Pap smear and fluid cytology programs for broad health surveillance." }
            ]
        }
    }
];
