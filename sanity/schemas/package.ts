// package.ts — Sanity Studio Schema
// Add this file to your Sanity Studio's schemas folder

import { defineType, defineField } from 'sanity';

export default defineType({
    name: 'package',
    title: 'Health Package',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Package Title',
            type: 'string',
            description: 'e.g. "Diabetes Care Package — AED 89"',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: { source: 'title', maxLength: 96 },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'description',
            title: 'Description',
            type: 'text',
            rows: 5,
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'image',
            title: 'Package Image',
            type: 'image',
            options: { hotspot: true },
            description: 'Upload a high-quality image for this package.',
        }),
        defineField({
            name: 'testsTotal',
            title: 'Total Number of Tests',
            type: 'number',
        }),
        defineField({
            name: 'subTests',
            title: 'Included Tests',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        defineField({
                            name: 'title',
                            title: 'Test Name',
                            type: 'string',
                            validation: (Rule) => Rule.required(),
                        }),
                        defineField({
                            name: 'explanation',
                            title: 'Explanation',
                            type: 'string',
                            description: 'Brief description of what this test measures.',
                        }),
                    ],
                    preview: {
                        select: { title: 'title', subtitle: 'explanation' },
                    },
                },
            ],
        }),
    ],
    preview: {
        select: {
            title: 'title',
            media: 'image',
        },
    },
});
