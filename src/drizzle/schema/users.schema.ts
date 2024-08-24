import { relations } from 'drizzle-orm';
import { index, pgTable, serial, text } from 'drizzle-orm/pg-core';
import { posts } from './posts.schema';
import { comments } from './comments.schema';
import { profileInfo } from './profileInfo.schema';
import { usersToGroups } from './groups.schema';

export const users = pgTable(
  'users',
  {
    id: serial('id').primaryKey(),
    name: text('name').notNull(),
    email: text('email').notNull(),
    password: text('password').notNull(),
  },
  (t) => ({
    idIndex: index('idIndex').on(t.id),
  }),
);

export const usersRelations = relations(users, ({ one, many }) => ({
  commenst: many(comments),
  posts: many(posts),
  profile: one(profileInfo),
  usersToGroups: many(usersToGroups),
}));
