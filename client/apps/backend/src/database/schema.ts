import { integer, pgTable, serial, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';

export const mediaType = pgTable('media_type', {
  id: serial('id').primaryKey().notNull(),
  name: varchar('name').notNull(),
});

export const fileType = pgTable('file_type', {
  id: serial('id').primaryKey().notNull(),
  name: varchar('name').notNull(),
  media_type_id: integer('media_type_id')
    .references(() => mediaType.id)
    .notNull(),
});

export const uploadInfo = pgTable('upload_info', {
  id: uuid('id').defaultRandom().notNull(),
  fileName: varchar('file_name').notNull(),
  dirName: varchar('dir_name').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});
