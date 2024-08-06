import { fileType, fileTypeConvertableTo, mediaType } from '@backend/src/app/common/database/schemas';
import { createDbUrl } from '@backend/src/app/common/utils/db';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

const migrationClient = postgres(createDbUrl(), { max: 1 });
const db = drizzle(migrationClient);

async function runUnseed() {
  await db.transaction(async (tx) => {
    await tx.delete(fileTypeConvertableTo);
    await tx.delete(fileType);
    await tx.delete(mediaType);
  });

  await migrationClient.end();
}

runUnseed()
  .then(() => console.log('Truncate successful'))
  .catch(console.error);
