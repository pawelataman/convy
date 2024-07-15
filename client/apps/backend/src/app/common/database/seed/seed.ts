import { fileType, mediaType } from '@backend/common/database/schemas';
import { fileTypeConvertableTo } from '@backend/common/database/schemas/file-type.schema';
import { createDbUrl } from '@backend/common/utils/db';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { fileConvertableTo } from './file-convertable-to';
import { fileTypesData } from './file-types';
import { mediaTypesData } from './media-types';

const migrationClient = postgres(createDbUrl(), { max: 1 });
const db = drizzle(migrationClient);

async function seedMediaTypes() {
  await db.insert(mediaType).values(mediaTypesData);
}

async function seedFileTypes() {
  await db.insert(fileType).values(fileTypesData);
}

async function seedConvertableToFileTypes() {
  await db.insert(fileTypeConvertableTo).values(fileConvertableTo);
}

async function runSeed() {
  // await seedMediaTypes();
  // await seedFileTypes();
  await seedConvertableToFileTypes();
  await migrationClient.end();
}

runSeed()
  .then(() => console.log('Seed successful'))
  .catch(console.error);
