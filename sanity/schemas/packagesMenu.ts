import { defineArrayMember, defineField, defineType } from 'sanity';

/** Singleton controlling the "Health Packages" navbar dropdown. */
export default defineType({
    name: 'packagesMenu',
    title: 'Health Packages Menu',
    type: 'document',
    fields: [
        defineField({
            name: 'enabled',
            title: 'Show dropdown',
            type: 'boolean',
            description: 'Turn off to make "Health Packages" a plain link with no dropdown.',
            initialValue: true,
        }),
        defineField({
            name: 'items',
            title: 'Campaigns / packages',
            type: 'array',
            description: 'Packages shown in the dropdown, in this order. Drag to reorder.',
            of: [defineArrayMember({
                type: 'object',
                name: 'menuItem',
                fields: [
                    defineField({
                        name: 'package',
                        title: 'Package',
                        type: 'reference',
                        to: [{ type: 'package' }],
                        options: { disableNew: true },
                        validation: (Rule) => Rule.required(),
                    }),
                    defineField({
                        name: 'label',
                        title: 'Label override',
                        type: 'string',
                        description: 'Optional. Defaults to the package title (without the price).',
                    }),
                    defineField({
                        name: 'badge',
                        title: 'Badge',
                        type: 'string',
                        description: 'Optional short tag, e.g. "New" or "Offer".',
                    }),
                ],
                preview: {
                    select: { title: 'package.title', subtitle: 'label', badge: 'badge' },
                    prepare: ({ title, subtitle, badge }) => ({ title: subtitle || title, subtitle: badge || undefined }),
                },
            })],
        }),
        defineField({
            name: 'viewAllLabel',
            title: '"View all" label',
            type: 'string',
            initialValue: 'View all packages',
        }),
    ],
    preview: { prepare: () => ({ title: 'Health Packages Menu' }) },
});
