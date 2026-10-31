import { defineField, defineType } from 'sanity';

const heading = () => defineField({ name: 'heading', title: 'Heading', type: 'string' });
const image = (name: string, title: string) => defineField({ name, title, type: 'image', options: { hotspot: true } });
const copy = (name: string, title: string) => defineField({ name, title, type: 'text', rows: 5 });
const section = (name: string, title: string, fields: any[]) => defineField({
    name, title, type: 'object', options: { collapsible: true, collapsed: false }, fields,
});
const detailItems = (name: string, title: string, fields: any[], previewTitle: string) => defineField({
    name, title, type: 'array', of: [{ type: 'object', fields, preview: { select: { title: previewTitle } } }],
});

export default defineType({
    name: 'labTest', title: 'Lab Test', type: 'document',
    fields: [
        defineField({ name: 'name', title: 'Test name', type: 'string', validation: Rule => Rule.required() }),
        defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'name', maxLength: 96 }, validation: Rule => Rule.required() }),
        defineField({ name: 'diseaseFilter', title: 'Disease category', type: 'reference', to: [{ type: 'diseaseCategory' }] }),
        defineField({ name: 'department', title: 'Department', type: 'reference', to: [{ type: 'department' }] }),
        section('heroSection', '1. Hero', [
            image('image', 'Hero and listing image'),
            defineField({ name: 'highlights', title: 'Hero highlights', type: 'array', of: [{ type: 'string' }] }),
        ]),
        section('resultSection', '2. Result and sample details', [
            defineField({ name: 'tat', title: 'Turnaround time (TAT)', type: 'string' }),
            defineField({ name: 'sampleType', title: 'Sample type', type: 'array', of: [{ type: 'string' }] }),
        ]),
        section('introSection', '3. Introduction', [
            heading(), copy('overview', 'Content'),
            defineField({ name: 'overviewSource', title: 'Overview reference', type: 'url', description: 'Editorial reference; not displayed on the website.' }),
            image('image', 'First image'), image('secondaryImage', 'Second image'),
        ]),
        section('importanceSection', '4. Why this test matters', [
            defineField({
                name: 'richContent', title: 'Rich content', type: 'array',
                description: 'Add the section heading, paragraphs, subheadings and lists here. This takes priority over the older plain text content.',
                of: [{
                    type: 'block',
                    styles: [
                        { title: 'Paragraph', value: 'normal' },
                        { title: 'Heading', value: 'h2' },
                        { title: 'Subheading', value: 'h3' },
                        { title: 'Small subheading', value: 'h4' },
                    ],
                    lists: [
                        { title: 'Bullet list', value: 'bullet' },
                        { title: 'Numbered list', value: 'number' },
                    ],
                    marks: {
                        decorators: [
                            { title: 'Bold', value: 'strong' },
                            { title: 'Italic', value: 'em' },
                        ],
                    },
                }],
            }),
            defineField({
                name: 'content', title: 'Legacy plain text content', type: 'text', rows: 12,
                description: 'Shown until rich content is added.',
                hidden: ({ parent }) => Array.isArray(parent?.richContent) && parent.richContent.length > 0,
            }),
        ]),
        section('additionalInfoSection', '5. Additional sections', [
            detailItems('sections', 'Additional sections', [
                defineField({ name: 'title', title: 'Heading', type: 'string' }),
                copy('content', 'Content'),
                defineField({ name: 'items', title: 'Bullet items', type: 'array', of: [{ type: 'string' }] }),
                image('image', 'Image'),
            ], 'title'),
        ]),
        section('considerSection', '6. Who may consider this test', [
            heading(),
            detailItems('items', 'List items', [
                defineField({ name: 'name', title: 'Item', type: 'string', validation: Rule => Rule.required() }),
                copy('description', 'Description'),
            ], 'name'),
            image('image', 'Image'),
        ]),
        section('howSection', '7. How it works', [
            heading(),
            detailItems('items', 'Items', [
                defineField({ name: 'title', title: 'Item heading', type: 'string', validation: Rule => Rule.required() }),
                copy('description', 'Item content'),
            ], 'title'),
        ]),
        section('processSection', '8. Process', [
            heading(), copy('subtitle', 'Subtitle'),
            detailItems('steps', 'Steps', [
                defineField({ name: 'title', title: 'Step heading', type: 'string', validation: Rule => Rule.required() }),
                copy('description', 'Step content'),
                image('image', 'Step image'),
            ], 'title'),
        ]),
        section('accuracySection', '9. Accuracy and reliability', [heading(), copy('note', 'Content')]),
        section('panelsSection', '10. Screening panels', [
            heading(), copy('subtitle', 'Subtitle'),
            detailItems('items', 'Panels', [
                defineField({ name: 'name', title: 'Panel name', type: 'string', validation: Rule => Rule.required() }),
                copy('description', 'Description'),
                defineField({ name: 'features', title: 'Features', type: 'array', of: [{ type: 'string' }] }),
            ], 'name'),
        ]),
        section('faqSection', '11. Frequently asked questions', [
            heading(),
            detailItems('items', 'Questions and answers', [
                defineField({ name: 'question', title: 'Question', type: 'string', validation: Rule => Rule.required() }),
                copy('answer', 'Answer'),
            ], 'question'),
        ]),
        section('ctaSection', '12. Final call to action', [heading(), copy('description', 'Content'), image('image', 'Background image')]),
        defineField({ name: 'relatedTests', title: 'Related tests', type: 'array', of: [{ type: 'reference', to: [{ type: 'labTest' }] }] }),
    ],
    preview: { select: { title: 'name', subtitle: 'department.title', media: 'heroSection.image' } },
});
