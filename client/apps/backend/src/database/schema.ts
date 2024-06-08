import { pgSchema, uuid, varchar } from 'drizzle-orm/pg-core';

// USER
export const UserSchema = pgSchema('user');

export const User = UserSchema.table('user', {
  id: uuid('id').primaryKey().defaultRandom().notNull(),
  email: varchar('email').notNull(),
});
