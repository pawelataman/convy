import { InferSelectModel } from 'drizzle-orm';
import { pgTable, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';

const uploadInfo = pgTable('upload_info', {
  id: uuid('id').defaultRandom().notNull(),
  fileName: varchar('file_name').notNull(),
  dirName: varchar('dir_name').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export default uploadInfo;

export type UploadInfoEntity = InferSelectModel<typeof uploadInfo>;
