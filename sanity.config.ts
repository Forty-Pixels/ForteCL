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
      ...S.documentTypeListItems().filter(item => item.getId() !== 'homepageTestFinder'),
    ]),
  })],
  document: {
    newDocumentOptions: previous => previous.filter(item => item.templateId !== 'homepageTestFinder'),
    actions: (previous, context) => context.schemaType === 'homepageTestFinder'
      ? previous.filter(action => action.action !== 'delete' && action.action !== 'duplicate')
      : previous,
  },
  schema: {
    types: schemaTypes,
  },
});
