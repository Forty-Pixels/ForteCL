// index.ts — Schema index
// Import and export all schemas here

import labTest from './labTest';
import packageSchema from './package';
import resourceCategory from './resourceCategory';
import post from './post';
import diseaseCategory from './diseaseCategory';
import department from './department';
import homepageTestFinder from './homepageTestFinder';

export const schemaTypes = [
    labTest, 
    packageSchema, 
    resourceCategory, 
    post, 
    diseaseCategory, 
    department,
    homepageTestFinder
];
