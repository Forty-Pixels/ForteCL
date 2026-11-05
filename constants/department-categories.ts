/** Order here = order shown top-to-bottom in the homepage test finder. */
export const DEPARTMENT_CATEGORIES = [
    { id: 'biochemistry', title: 'Clinical Chemistry', aliases: ['biochemistry', 'clinical biochemistry', 'clinical chemistry'] },
    { id: 'immunology', title: 'Immunology', aliases: ['immunology'] },
    { id: 'molecular', title: 'Molecular Biology/Genetics', aliases: ['molecular', 'molecular biology', 'molecular genetics', 'molecular diagnostics', 'genetics'] },
    { id: 'microbiology', title: 'Microbiology', aliases: ['microbiology'] },
    { id: 'pathology', title: 'Pathology', aliases: ['pathology', 'clinical pathology'] },
    { id: 'serology', title: 'Serology', aliases: ['serology'] },
    { id: 'histopathology', title: 'Histopathology', aliases: ['histopathology', 'histo pathology'] },
    { id: 'cytopathology', title: 'Cytology', aliases: ['cytology', 'cytopathology', 'histopathology cytopathology'] },
    { id: 'hematology', title: 'Hematology', aliases: ['hematology', 'haematology'] },
] as const;

export const DEPARTMENT_TITLES: string[] = DEPARTMENT_CATEGORIES.map(department => department.title);
