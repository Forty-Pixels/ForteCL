import { DEPARTMENTS_DATA } from '@/constants/departments';

export type DepartmentTestRecord = {
    slug: string;
    name: string;
    departmentTitle?: string;
    departmentSlug?: string;
};

const normalizeText = (value?: string) =>
    (value || '')
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();

const DEPARTMENT_ALIASES: Record<string, string[]> = {
    hematology: ['hematology'],
    microbiology: ['microbiology'],
    immunology: ['immunology'],
    serology: ['serology'],
    biochemistry: ['biochemistry', 'clinical biochemistry', 'clinical chemistry'],
    pathology: ['pathology', 'histopathology', 'histo pathology', 'clinical pathology'],
    molecular: ['molecular', 'molecular biology', 'molecular diagnostics', 'genetics'],
    cytopathology: ['cytopathology', 'cytology', 'histopathology cytopathology'],
};

export const resolveDepartmentId = (departmentTitle?: string, departmentSlug?: string) => {
    const slugNorm = normalizeText(departmentSlug);
    const titleNorm = normalizeText(departmentTitle);

    let best: { id: string; score: number } | null = null;

    for (const [id, aliases] of Object.entries(DEPARTMENT_ALIASES)) {
        let score = 0;
        const idNorm = normalizeText(id);

        // Score based on ID matching slug
        if (slugNorm && (slugNorm === idNorm || slugNorm.includes(idNorm) || idNorm.includes(slugNorm))) {
            score += 8;
        }

        // Score based on aliases matching title or slug
        for (const alias of aliases) {
            const aliasNorm = normalizeText(alias);
            if (!aliasNorm) continue;
            
            if (titleNorm === aliasNorm) score += 6;
            else if (titleNorm.includes(aliasNorm) || aliasNorm.includes(titleNorm)) score += 4;
            
            if (slugNorm === aliasNorm || slugNorm.includes(aliasNorm)) score += 5;
        }

        if (score > 0 && (!best || score > best.score)) {
            best = { id, score };
        }
    }

    if (!best || best.score < 4) return null;
    return best.id;
};

export const getTestLink = (test: { slug: string; department?: string; departmentTitle?: string; departmentSlug?: string }) => {
    if (test.slug === 'nipt') return '/departments/molecular/nipt';
    
    const deptId = resolveDepartmentId(test.departmentTitle || test.department, test.departmentSlug);
    if (deptId) {
        return `/departments/${deptId}/${test.slug}`;
    }
    
    // Fallback if no department found
    return `/lab-tests/${test.slug}`;
};
