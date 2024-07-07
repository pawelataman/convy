import { integer, pgTable, serial, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';

export const mediaTypes = pgTable('media_type', {
  id: serial('id').primaryKey().notNull(),
  name: varchar('name').notNull(),
});

export const fileType = pgTable('file_type', {
  id: serial('id').primaryKey().notNull(),
  name: varchar('name').notNull(),
  media_type_id: integer('media_type_id')
    .references(() => mediaTypes.id)
    .notNull(),
});

export const uploadInfo = pgTable('upload_info', {
  id: uuid('id').defaultRandom().notNull(),
  path: varchar('upload_path').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});
