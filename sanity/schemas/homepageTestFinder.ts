import { defineField, defineType } from 'sanity';
import { DEPARTMENT_CATEGORIES } from '../../constants/department-categories';

export default defineType({
    name: 'homepageTestFinder',
    title: 'Homepage test finder',
    type: 'document',
    fields: DEPARTMENT_CATEGORIES.map(category => defineField({
        name: category.id,
        title: category.title,
        type: 'array',
        description: 'Choose up to six tests. Drag to set their order on the homepage.',
        of: [{
            type: 'reference',
            to: [{ type: 'labTest' }],
            options: {
                disableNew: true,
                filter: 'department->title == $departmentTitle && slug.current != "std19"',
                filterParams: { departmentTitle: category.title },
            },
        }],
        validation: Rule => Rule.max(6).custom(value => {
            const references = (value || []) as Array<{ _ref?: string }>;
            const ids = references.map(item => item._ref).filter(Boolean);
            return new Set(ids).size === ids.length || 'Choose each test only once in this category.';
        }),
    })),
    preview: { prepare: () => ({ title: 'Homepage test finder' }) },
});
