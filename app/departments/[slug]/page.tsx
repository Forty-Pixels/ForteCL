import { DEPARTMENTS_DATA } from '@/constants/departments';
import DepartmentDetailView from '@/components/Departments/Details/DepartmentDetailView';
import Footer from '@/components/Landing-page/Footer/Footer';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { client } from '@/lib/sanity';
import { allLabTestsWithDepartmentQuery } from '@/lib/queries';
import { resolveDepartmentId } from '@/lib/department-utils';
import { STD_PANELS } from '@/data/stdPanels';

interface DepartmentPageProps {
    params: Promise<{
        slug: string;
    }>;
}

export const revalidate = 60;

type DepartmentTestRecord = {
    slug: string;
    name: string;
    tat?: string;
    sampleType?: string[];
    departmentTitle?: string;
    departmentSlug?: string;
};

export async function generateMetadata({ params }: DepartmentPageProps): Promise<Metadata> {
    const { slug } = await params;
    const department = DEPARTMENTS_DATA.find(d => d.id === slug);
    
    if (!department) {
        return {
            title: 'Department Not Found | Forte Clinical Laboratory',
        };
    }

    return {
        title: `${department.title} | Forte Clinical Laboratory`,
        description: department.description.substring(0, 160),
    };
}

export async function generateStaticParams() {
    return DEPARTMENTS_DATA.map((dept) => ({
        slug: dept.id,
    }));
}

export default async function DepartmentPage({ params }: DepartmentPageProps) {
    const { slug } = await params;
    const department = DEPARTMENTS_DATA.find(d => d.id === slug);

    if (!department) {
        notFound();
    }

    const allCmsTestsWithDepartment: DepartmentTestRecord[] = await client.fetch(allLabTestsWithDepartmentQuery);

    const cmsTests = allCmsTestsWithDepartment
        .filter((test) => resolveDepartmentId(test.departmentTitle, test.departmentSlug) === slug)
        .map((test) => ({
            slug: test.slug,
            name: test.name,
            tat: test.tat,
            sampleType: test.sampleType,
        }));

    // Add Molecular & Genetics tests manually
    if (slug === 'molecular') {
        const molecularTests = [
            { name: 'Non-Invasive Prenatal Testing (NIPT)', slug: 'nipt' },
            { name: 'Factor V Leiden', slug: 'factor-v-leiden' },
            { name: 'MTHFR', slug: 'mthfr' },
            { name: 'Non-Invasive Prenatal Testing - Basic', slug: 'nipt-basic' },
            { name: 'Non-Invasive Prenatal Testing - Advance', slug: 'nipt-advance' },
            { name: 'Non-Invasive Prenatal Testing - Advance with Microdeletion', slug: 'nipt-advance-microdeletion' },
            { name: 'Non-Invasive Prenatal Testing - Advance with Microdeletion RH factor', slug: 'nipt-advance-rh-factor' },
            { name: 'Sperm DNA Fragmentation', slug: 'sperm-dna-fragmentation' },
            { name: 'Prothrombin Gene Mutation', slug: 'prothrombin-gene-mutation' },
            { name: 'HFE Gene (Hemochromatosis)', slug: 'hfe-gene-hemochromatosis' },
            { name: 'APOE Genotyping (Alzheimer Risk)', slug: 'apoe-genotyping' },
            { name: 'BRCA1 & BRCA2 Mutation', slug: 'brca1-brca2-mutation' },
            { name: 'Karyotyping', slug: 'karyotyping' },
            { name: 'FISH (Fluorescence In Situ Hybridization)', slug: 'fish' },
            { name: 'Carrier screening panel (Thalassemia, SMA, CF)', slug: 'carrier-screening-panel' },
            { name: 'BCR-ABL (Philadelphia chromosome)', slug: 'bcr-abl' },
            { name: 'JAK2 Mutation', slug: 'jak2-mutation' },
            { name: 'Amniocentesis - rapid PCR diagnosis (2 days)', slug: 'amniocentesis-pcr' },
            { name: 'Beta Thalassemia - beta-globin sequencing', slug: 'beta-thalassemia-sequencing' },
            { name: 'Coeliac Disease - HLA DQ2/DQ8 Genotype', slug: 'coeliac-disease-hla' },
            { name: 'Colorectal Cancer NGS Panel', slug: 'colorectal-cancer-ngs' },
            { name: 'BRAF Mutation', slug: 'braf-mutation' },
            { name: 'Androgen Insensitivity - AR gene sequencing', slug: 'androgen-insensitivity' },
            { name: 'Azoospermia - karyotype + Y deletions', slug: 'azoospermia-karyotype' },
            { name: 'EGFR Mutation', slug: 'egfr-mutation' },
            { name: 'Y Chromosome Microdeletion', slug: 'y-chromosome-microdeletion' },
            { name: 'Micro array (Array CGH)', slug: 'microarray-cgh' },
            { name: 'Whole Exome Sequencing (WES)', slug: 'whole-exome-sequencing' },
            { name: 'Autism Spectrum Disorder gene', slug: 'autism-spectrum-disorder' },
            ...STD_PANELS,
            { name: 'HPV 40 Genotyping', slug: 'hpv-40-genotyping' },
            { name: 'HPV Genotyping 28', slug: 'hpv-genotyping-28' },
            { name: 'Respiratory 23', slug: 'respiratory-23' },
            { name: 'Respiratory 27', slug: 'respiratory-27' },
            { name: 'GI panel - 24', slug: 'gi-panel-24' },
            { name: 'Covid', slug: 'covid' },
            { name: 'Hepatitis B Virus HBV-Quantitative', slug: 'hbv-quantitative' },
            { name: 'Hepatitis C Virus HCV-Quantitative', slug: 'hcv-quantitative' },
            { name: 'HIV - 1', slug: 'hiv-1' },
            { name: 'HIV-1/2 Quantitative', slug: 'hiv-quantitative' },
            { name: 'Urinary Tract Infection - UTI', slug: 'uti' },
            { name: 'HLA-B27', slug: 'hla-b27' }
        ];

        cmsTests.push(...molecularTests.map(t => {
            if (t.slug === 'nipt') {
                return {
                    ...t,
                    tat: '7-10 Days',
                    sampleType: ['10 mL Whole Blood (Streck Tube)']
                };
            }
            return {
                ...t,
                tat: '3-7 Days',
                sampleType: ['Blood']
            };
        }));
    }

    const allCmsTests = allCmsTestsWithDepartment.map((test) => ({
        slug: test.slug,
        name: test.name,
    }));

    return (
        <main className="min-h-screen bg-white">
            <DepartmentDetailView
                department={department}
                cmsTests={cmsTests}
                allCmsTests={allCmsTests}
            />
            <Footer />
        </main>
    );
}
