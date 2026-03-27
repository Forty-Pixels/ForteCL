// labTest.ts — Sanity Studio Schema
import { defineType, defineField } from 'sanity';

export default defineType({
    name: 'labTest',
    title: 'Lab Test',
    type: 'document',
    fields: [
        defineField({
            name: 'name',
            title: 'Test Name',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: { source: 'name', maxLength: 96 },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'diseaseFilter',
            title: 'Disease Category',
            type: 'reference',
            to: [{ type: 'diseaseCategory' }],
            description: 'Link this test to a Disease Category.',
        }),
        defineField({
            name: 'department',
            title: 'Department',
            type: 'reference',
            to: [{ type: 'department' }],
            description: 'Link this test to a Department.',
        }),
        defineField({
            name: 'tat',
            title: 'Turnaround Time (TAT)',
            type: 'string',
            description: 'e.g. "1 Day", "Same Day", "3-5 Days"',
        }),
        defineField({
            name: 'sampleType',
            title: 'Sample Type',
            type: 'array',
            of: [{ type: 'string' }],
            description: 'e.g. "5 mL serum", "EDTA blood"',
        }),
        defineField({
            name: 'content',
            title: 'Test Content',
            type: 'array',
            description: 'Use this field to write the test overview, procedure, symptoms, etc. with full formatting control.',
            of: [
                {
                    type: 'block',
                    styles: [
                        {title: 'Normal', value: 'normal'},
                        {title: 'H1', value: 'h1'},
                        {title: 'H2', value: 'h2'},
                        {title: 'H3', value: 'h3'},
                        {title: 'H4', value: 'h4'},
                        {title: 'Quote', value: 'blockquote'}
                    ],
                    lists: [
                        {title: 'Bullet', value: 'bullet'},
                        {title: 'Numbered', value: 'number'}
                    ],
                    marks: {
                        decorators: [
                            {title: 'Strong', value: 'strong'},
                            {title: 'Emphasis', value: 'em'}
                        ],
                    }
                }
            ]
        }),
        defineField({
            name: 'relatedTests',
            title: 'Related Tests',
            type: 'array',
            of: [{ 
                type: 'reference',
                to: [{ type: 'labTest' }]
            }],
            description: 'Choose related tests from the database.',
        }),
    ],
    preview: {
        select: {
            title: 'name',
            subtitle: 'department.title',
        },
    },
});
