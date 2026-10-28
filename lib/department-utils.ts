import { DEPARTMENT_CATEGORIES } from '@/constants/department-categories';

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

export const resolveDepartmentId = (departmentTitle?: string, departmentSlug?: string) => {
    const slugNorm = normalizeText(departmentSlug);
    const titleNorm = normalizeText(departmentTitle);

    const findExact = (value: string) => DEPARTMENT_CATEGORIES.find(department =>
        normalizeText(department.id) === value ||
        normalizeText(department.title) === value ||
        department.aliases.some(alias => normalizeText(alias) === value)
    );

    if (titleNorm) {
        const exactTitle = findExact(titleNorm);
        if (exactTitle) return exactTitle.id;
    }
    if (slugNorm) {
        const exactSlug = findExact(slugNorm);
        if (exactSlug) return exactSlug.id;
    }

    const match = DEPARTMENT_CATEGORIES.find(department =>
        department.aliases.some(alias =>
            (titleNorm && titleNorm.includes(normalizeText(alias))) ||
            (slugNorm && slugNorm.includes(normalizeText(alias)))
        )
    );
    return match?.id || null;
};

export const getDepartmentTitle = (departmentTitle?: string, departmentSlug?: string) => {
    const id = resolveDepartmentId(departmentTitle, departmentSlug);
    return DEPARTMENT_CATEGORIES.find(department => department.id === id)?.title || null;
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

export const getTestImage = (test: { department?: string; departmentTitle?: string; departmentSlug?: string }) => {
    const deptId = resolveDepartmentId(test.departmentTitle || test.department, test.departmentSlug);
    if (deptId) {
        const imageId = deptId === 'histopathology' ? 'pathology' : deptId;
        return `/defaults/departments/${imageId}.png`;
    }
    
    return '/lab-tests/lab-1.png'; // Global fallback
};
