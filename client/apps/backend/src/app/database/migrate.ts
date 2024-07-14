import { createDbUrl } from '@backend/common/utils/db';
import { drizzle } from 'drizzle-orm/postgres-js';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import postgres from 'postgres';

const migrationClient = postgres(createDbUrl(), { max: 1 });
const db = drizzle(migrationClient);

async function runMigration() {
  await migrate(db, {
    migrationsFolder: './apps/backend/src/app/database/migrations/',
  });

  await migrationClient.end();
}

runMigration()
  .then(() => console.log('Migration successful'))
  .catch(console.error);
