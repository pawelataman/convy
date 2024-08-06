import { fileType, fileTypeConvertableTo, mediaType } from '@backend/src/app/common/database/schemas';
import { fileConvertableTo } from '@backend/src/app/common/database/seed/file-convertable-to';
import { fileTypesData } from '@backend/src/app/common/database/seed/file-types';
import { mediaTypesData } from '@backend/src/app/common/database/seed/media-types';
import { createDbUrl } from '@backend/src/app/common/utils/db';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

const migrationClient = postgres(createDbUrl(), { max: 1 });
const db = drizzle(migrationClient);

async function runSeed() {
  await db.transaction(async (tx) => {
    await tx.insert(mediaType).values(mediaTypesData);
    await tx.insert(fileType).values(fileTypesData);
    await tx.insert(fileTypeConvertableTo).values(fileConvertableTo);
  });

  await migrationClient.end();
}

runSeed()
  .then(() => console.log('Seed successful'))
  .catch(console.error);
