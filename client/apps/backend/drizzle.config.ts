import { defineConfig } from 'drizzle-kit'
import { createDbUrl } from './src/database/utils'


export default defineConfig({
    schema: './src/drizzle/schema.ts',
    out: './src/drizzle/migrations',
    dialect: 'postgresql',
    dbCredentials: {
        url: createDbUrl()
    },

    verbose: true,
    strict: true
})
