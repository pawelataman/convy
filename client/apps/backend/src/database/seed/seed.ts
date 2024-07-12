import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { fileType, mediaType } from '../schema';
import { createDbUrl } from '../utils';
import { fileTypesData } from './file-types';
import { mediaTypesData } from './media-types';

const migrationClient = postgres(createDbUrl(), { max: 1 });
const db = drizzle(migrationClient);

async function seedMediaTypes() {
  await db.delete(mediaType);
  await db.insert(mediaType).values(mediaTypesData);
}

async function seedFileTypes() {
  await db.delete(fileType);
  await db.insert(fileType).values(fileTypesData);
}

async function runSeed() {
  await seedMediaTypes();
  await seedFileTypes();
  await migrationClient.end();
}

runSeed()
  .then(() => console.log('Seed successful'))
  .catch(console.error);
