import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { schemaTypes } from './sanity/schemas';

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET!;

export default defineConfig({
  basePath: '/studio',
  name: 'ForteCL_Studio',
  title: 'ForteCL Content Manager',
  projectId,
  dataset,
  plugins: [structureTool({
    structure: S => S.list().title('Content').items([
      S.listItem()
        .id('homepage-test-finder')
        .title('Homepage test finder')
        .child(S.document().schemaType('homepageTestFinder').documentId('homepage-test-finder')),
      S.listItem()
        .id('packages-menu')
        .title('Health Packages Menu (navbar)')
        .child(S.document().schemaType('packagesMenu').documentId('packages-menu')),
      S.listItem()
        .id('home-collection-page')
        .title('Home Collection Page')
        .child(S.document().schemaType('homeCollectionPage').documentId('home-collection-page')),
      ...S.documentTypeListItems().filter(item => !['homepageTestFinder', 'packagesMenu', 'homeCollectionPage'].includes(item.getId() || '')),
    ]),
  })],
  document: {
    newDocumentOptions: previous => previous.filter(item => !['homepageTestFinder', 'packagesMenu', 'homeCollectionPage'].includes(item.templateId)),
    actions: (previous, context) => ['homepageTestFinder', 'packagesMenu', 'homeCollectionPage'].includes(context.schemaType)
      ? previous.filter(action => action.action !== 'delete' && action.action !== 'duplicate')
      : previous,
  },
  schema: {
    types: schemaTypes,
  },
});
