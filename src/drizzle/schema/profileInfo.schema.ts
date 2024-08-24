import { integer, jsonb, pgTable, serial, text } from 'drizzle-orm/pg-core';
import { users } from './users.schema';
import { relations } from 'drizzle-orm';

export const profileInfo = pgTable('profileInfo', {
  id: serial('id').primaryKey(),
  metadata: jsonb('metadata'),
  userId: integer('userId')
    .references(() => users.id)
    .notNull(),
});

export const profileInfoRelations = relations(profileInfo, ({ one }) => ({
  user: one(users, {
    fields: [profileInfo.userId],
    references: [users.id],
  }),
}));
