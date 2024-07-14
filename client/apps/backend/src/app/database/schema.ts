import { relations } from 'drizzle-orm';
import { boolean, integer, pgTable, primaryKey, serial, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';

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
  is_supported: boolean('is_supported').default(true),
});

export const fileTypeRelations = relations(fileType, ({ many }) => ({
  convertableTo: many(fileTypeConvertableTo, { relationName: 'convertableTo' }),
}));

export const fileTypeConvertableTo = pgTable(
  'file_type_convertable_to',
  {
    fileTypeId: serial('file_type_id')
      .notNull()
      .references(() => fileType.id),
    convertableToId: serial('convertable_to_id')
      .notNull()
      .references(() => fileType.id),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.fileTypeId, t.convertableToId] }),
  })
);

export const fileTypeOnFileTypeRelations = relations(fileTypeConvertableTo, ({ one }) => ({
  fileTypeId: one(fileType, {
    fields: [fileTypeConvertableTo.fileTypeId],
    references: [fileType.id],
    relationName: 'fileType',
  }),

  convertableToId: one(fileType, {
    fields: [fileTypeConvertableTo.convertableToId],
    references: [fileType.id],
    relationName: 'convertableTo',
  }),
}));

export const uploadInfo = pgTable('upload_info', {
  id: uuid('id').defaultRandom().notNull(),
  fileName: varchar('file_name').notNull(),
  dirName: varchar('dir_name').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});
