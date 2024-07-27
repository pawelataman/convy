import { defineConfig } from 'drizzle-kit';
import { createDbUrl } from './src/app/common/utils/db';

export default defineConfig({
  schema: './apps/backend/src/app/common/database/schemas/index.ts',
  out: './apps/backend/src/app/common/database/migrations',
  dialect: 'postgresql',
  dbCredentials: {
    url: createDbUrl(),
  },

  verbose: true,
  strict: true,
});
