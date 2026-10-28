export const DEPARTMENT_CATEGORIES = [
    { id: 'biochemistry', title: 'Clinical Chemistry', aliases: ['biochemistry', 'clinical biochemistry', 'clinical chemistry'] },
    { id: 'hematology', title: 'Hematology', aliases: ['hematology', 'haematology'] },
    { id: 'pathology', title: 'Pathology', aliases: ['pathology', 'clinical pathology'] },
    { id: 'microbiology', title: 'Microbiology', aliases: ['microbiology'] },
    { id: 'serology', title: 'Serology', aliases: ['serology'] },
    { id: 'cytopathology', title: 'Cytology', aliases: ['cytology', 'cytopathology', 'histopathology cytopathology'] },
    { id: 'histopathology', title: 'Histopathology', aliases: ['histopathology', 'histo pathology'] },
    { id: 'immunology', title: 'Immunology', aliases: ['immunology'] },
    { id: 'molecular', title: 'Molecular Biology/Genetics', aliases: ['molecular', 'molecular biology', 'molecular genetics', 'molecular diagnostics', 'genetics'] },
] as const;

export const DEPARTMENT_TITLES: string[] = DEPARTMENT_CATEGORIES.map(department => department.title);
