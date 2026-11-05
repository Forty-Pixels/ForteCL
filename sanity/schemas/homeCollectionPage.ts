import { defineArrayMember, defineField, defineType } from 'sanity';

/** Singleton: content of the general /home-collection page. Packages listed on it come from the Health Package documents with "Home Service Included" on. */
export default defineType({
    name: 'homeCollectionPage',
    title: 'Home Collection Page',
    type: 'document',
    fields: [
        defineField({ name: 'eyebrow', title: 'Hero eyebrow', type: 'string', description: 'Small line above the headline. Default: "DHA Licensed · Enquiries 24/7".' }),
        defineField({ name: 'headline', title: 'Hero headline', type: 'string', description: 'Default: "Home Blood Test Collection in Dubai". The last words are shown in teal.' }),
        defineField({ name: 'subheadline', title: 'Hero subheadline', type: 'text', rows: 3 }),
        defineField({ name: 'heroImage', title: 'Hero image', type: 'image', options: { hotspot: true }, description: 'Defaults to the image of the first home collection package.' }),
        defineField({ name: 'directAnswer', title: 'Direct answer box', type: 'text', rows: 3, description: 'Short summary shown in the highlighted box under the hero.' }),
        defineField({ name: 'collectionHours', title: 'Collection hours', type: 'string', description: 'e.g. "7:00 AM – 9:00 PM, 7 days a week".' }),
        defineField({ name: 'coverageAreas', title: 'Coverage areas', type: 'array', of: [{ type: 'string' }] }),
        defineField({
            name: 'steps',
            title: 'How it works',
            type: 'array',
            description: 'Numbered steps. Defaults to a standard 3-step flow when empty.',
            of: [defineArrayMember({
                type: 'object',
                fields: [
                    defineField({ name: 'title', title: 'Step title', type: 'string', validation: (Rule) => Rule.required() }),
                    defineField({ name: 'description', title: 'Step description', type: 'text', rows: 2 }),
                ],
                preview: { select: { title: 'title', subtitle: 'description' } },
            })],
        }),
        defineField({
            name: 'highlights',
            title: 'Why choose us',
            type: 'array',
            description: 'Defaults are used when empty.',
            of: [defineArrayMember({
                type: 'object',
                fields: [
                    defineField({ name: 'title', title: 'Title', type: 'string', validation: (Rule) => Rule.required() }),
                    defineField({ name: 'description', title: 'Description', type: 'text', rows: 2 }),
                ],
                preview: { select: { title: 'title', subtitle: 'description' } },
            })],
        }),
        defineField({
            name: 'faqs',
            title: 'Frequently asked questions',
            type: 'array',
            of: [defineArrayMember({
                type: 'object',
                fields: [
                    defineField({ name: 'question', title: 'Question', type: 'string', validation: (Rule) => Rule.required() }),
                    defineField({ name: 'answer', title: 'Answer', type: 'text', rows: 3 }),
                ],
                preview: { select: { title: 'question' } },
            })],
        }),
        defineField({ name: 'closingHeading', title: 'Closing banner heading', type: 'string' }),
        defineField({ name: 'closingText', title: 'Closing banner text', type: 'text', rows: 2 }),
        defineField({ name: 'whatsappMessage', title: 'WhatsApp message', type: 'string', description: 'Pre-filled message for the WhatsApp buttons.' }),
    ],
    preview: { prepare: () => ({ title: 'Home Collection Page' }) },
});
