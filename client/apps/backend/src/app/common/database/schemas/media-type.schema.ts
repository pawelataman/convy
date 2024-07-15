import { InferSelectModel } from 'drizzle-orm';
import { pgTable, serial, varchar } from 'drizzle-orm/pg-core';

const mediaType = pgTable('media_type', {
  id: serial('id').primaryKey().notNull(),
  name: varchar('name').notNull(),
});

export type MediaTypeEntity = InferSelectModel<typeof mediaType>;

export default mediaType;
