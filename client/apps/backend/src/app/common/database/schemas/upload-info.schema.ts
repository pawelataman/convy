import { relations } from 'drizzle-orm';
import { integer, pgTable, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';
import fileType from './file-type.schema';

const storageInfo = pgTable('storage_info', {
  id: uuid('id').defaultRandom().notNull(),
  path: varchar('storage_path').notNull(),
  requestId: varchar('request_id').notNull(),
  fileTypeId: integer('file_type_id').references(() => fileType.id),
  createdAt: timestamp('created_at', { mode: 'string' }).defaultNow().notNull(),
});

export const storageInfoRelations = relations(storageInfo, ({ one }) => ({
  fileType: one(fileType, {
    fields: [storageInfo.fileTypeId],
    references: [fileType.id],
  }),
}));

export default storageInfo;
