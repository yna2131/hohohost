import { integer, pgTable, text, decimal, uuid } from "drizzle-orm/pg-core";

export const userTable = pgTable("User", {
  id: uuid().primaryKey(),
  firstName: text().notNull(),
  lastName: text().notNull(),
  email: text().notNull(),
  password: text().notNull(),
});

export const groupTable = pgTable("Group", {
  id: uuid().primaryKey().defaultRandom(),
  groupName: text(),
  priceLimit: integer(),
});

export const userGroupTable = pgTable("UserGroup", {
  id: uuid().primaryKey().defaultRandom(),
  userId: integer()
    .notNull()
    .references(() => userTable.id),
  groupId: integer()
    .notNull()
    .references(() => groupTable.id),
});

export const santaTable = pgTable("SecretSanta", {
  id: uuid().primaryKey().defaultRandom(),
  groupId: integer()
    .notNull()
    .references(() => groupTable.id),
  giverId: integer()
    .notNull()
    .references(() => userTable.id),
  receiverId: integer()
    .notNull()
    .references(() => userTable.id),
});

export const wishTable = pgTable("Wish", {
  id: uuid().primaryKey().defaultRandom(),
  userId: integer()
    .notNull()
    .references(() => userTable.id),
  giftName: text().notNull(),
  price: decimal().notNull(),
  url: text(),
});
