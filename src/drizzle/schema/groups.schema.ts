import {
  index,
  integer,
  pgTable,
  primaryKey,
  PrimaryKey,
  serial,
  text,
} from 'drizzle-orm/pg-core';
import { users } from './users.schema';
import { table } from 'console';
import { relations } from 'drizzle-orm';

export const groups = pgTable('groups', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
});

// This The Joint Table
export const usersToGroups = pgTable(
  'usersToGroups',
  {
    userId: integer('userId').references(() => users.id),
    groupId: integer('groupId').references(() => groups.id),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.groupId, table.userId] }),
    userIdIndex: index('userIdIndex').on(table.userId),
  }),
);

export const groupRelations = relations(groups, ({ many }) => ({
  userToGroups: many(usersToGroups),
}));

export const usersToGroupsRelations = relations(usersToGroups, ({ one }) => ({
  user: one(users, {
    fields: [usersToGroups.userId],
    references: [users.id],
  }),
  group: one(groups, {
    fields: [usersToGroups.groupId],
    references: [groups.id],
  }),
}));
