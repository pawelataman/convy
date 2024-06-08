import { drizzle } from 'drizzle-orm/postgres-js';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import postgres from 'postgres';
import { createDbUrl } from './utils';

const migrationClient = postgres(createDbUrl(), { max: 1 });
const db = drizzle(migrationClient);
async function runMigration() {
  await migrate(db, {
    migrationsFolder: './src/database/migrations',
  });

  await migrationClient.end();
}

runMigration()
  .then(() => console.log('Migration successful'))
  .catch(console.error);
