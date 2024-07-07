import { defineConfig } from 'drizzle-kit';
import { createDbUrl } from './src/database/utils';

export default defineConfig({
  schema: './src/database/schema.ts',
  out: './src/database/migrations',
  dialect: 'postgresql',
  dbCredentials: {
    url: createDbUrl(),
  },

  verbose: true,
  strict: true,
});
