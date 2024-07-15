import { pgTable, serial, varchar } from 'drizzle-orm/pg-core';

const mediaType = pgTable('media_type', {
  id: serial('id').primaryKey().notNull(),
  name: varchar('name').notNull(),
});

export default mediaType;
