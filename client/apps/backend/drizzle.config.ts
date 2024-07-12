import { defineConfig } from 'drizzle-kit';
import { createDbUrl } from './src/database/utils';

export default defineConfig({
  schema: './apps/backend/src/database/schema.ts',
  out: './apps/backend/src/database/migrations',
  dialect: 'postgresql',
  dbCredentials: {
    url: createDbUrl(),
  },

  verbose: true,
  strict: true,
});
