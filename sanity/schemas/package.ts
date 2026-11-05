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
            description: 'e.g. "Diabetes Care Package". Set the price in Package Amount below.',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'amount',
            title: 'Package Amount (AED)',
            type: 'number',
            description: 'Price shown across the website and in the booking summary. Overrides any price in the title.',
            validation: (Rule) => Rule.min(0).precision(2),
        }),
        defineField({
            name: 'homeServiceIncluded',
            title: 'Home Service Included',
            type: 'boolean',
            description: 'Enable if home collection is included in this package. Disable if it is not included.',
            initialValue: false,
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'turnaroundTime',
            title: 'Turnaround Time (TAT)',
            type: 'string',
            description: 'e.g. "24 hours" or "2-3 working days". Shown on the package page instead of the home collection badge when home collection is NOT included.',
            hidden: ({ parent }) => parent?.homeServiceIncluded === true,
        }),
        defineField({
            name: 'homeCollection',
            title: 'Home Collection Page Content',
            type: 'object',
            description: 'Only used when Home Service Included is on. Packages with home collection get a dedicated home-visit page. Every field is optional; sensible defaults are used when left empty.',
            hidden: ({ parent }) => parent?.homeServiceIncluded !== true,
            options: { collapsible: true, collapsed: false },
            fields: [
                defineField({ name: 'eyebrow', title: 'Hero Eyebrow', type: 'string', description: 'Small line above the headline. Default: "DHA Licensed · Home Collection".' }),
                defineField({ name: 'headline', title: 'Hero Headline', type: 'string', description: 'Defaults to the package title.' }),
                defineField({ name: 'subheadline', title: 'Hero Subheadline', type: 'text', rows: 3, description: 'Defaults to the package description.' }),
                defineField({ name: 'collectionHours', title: 'Collection Hours', type: 'string', description: 'e.g. "7:00 AM – 9:00 PM, 7 days a week".' }),
                defineField({ name: 'coverageAreas', title: 'Coverage Areas', type: 'array', of: [{ type: 'string' }], description: 'Areas where the home visit is available, e.g. Downtown Dubai, Dubai Marina.' }),
                defineField({
                    name: 'steps',
                    title: 'How It Works',
                    type: 'array',
                    description: 'Numbered steps. Defaults to a standard 3-step flow when empty.',
                    of: [{
                        type: 'object',
                        fields: [
                            defineField({ name: 'title', title: 'Step Title', type: 'string', validation: (Rule) => Rule.required() }),
                            defineField({ name: 'description', title: 'Step Description', type: 'text', rows: 2 }),
                        ],
                        preview: { select: { title: 'title', subtitle: 'description' } },
                    }],
                }),
                defineField({ name: 'directAnswer', title: 'Direct Answer Box', type: 'text', rows: 3, description: 'Short summary paragraph shown in the highlighted box under the hero. Defaults to the package overview.' }),
                defineField({
                    name: 'highlights',
                    title: 'Why Choose Us',
                    type: 'array',
                    description: 'Selling points shown in the "Support for your care at home" section. Defaults are used when empty.',
                    of: [{
                        type: 'object',
                        fields: [
                            defineField({ name: 'title', title: 'Title', type: 'string', validation: (Rule) => Rule.required() }),
                            defineField({ name: 'description', title: 'Description', type: 'text', rows: 2 }),
                        ],
                        preview: { select: { title: 'title', subtitle: 'description' } },
                    }],
                }),
                defineField({ name: 'whatsappMessage', title: 'WhatsApp Message', type: 'string', description: 'Pre-filled message for the WhatsApp button.' }),
            ],
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
        defineField({
            name: 'overview',
            title: 'Package Overview',
            type: 'text',
            rows: 4,
            description: 'A detailed introduction to what this package covers.',
        }),
        defineField({
            name: 'benefits',
            title: 'Key Benefits',
            type: 'array',
            of: [{ type: 'string' }],
            description: 'List the main advantages of this package.',
        }),
        defineField({
            name: 'preparation',
            title: 'Preparation Instructions',
            type: 'text',
            rows: 3,
            description: 'e.g. "Fasting for 10-12 hours required."',
        }),
        defineField({
            name: 'faqs',
            title: 'Frequently Asked Questions',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        { name: 'question', type: 'string' },
                        { name: 'answer', type: 'text', rows: 3 },
                    ],
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
