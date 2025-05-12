import { pgTable, text, serial, integer, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Game history schema
export const games = pgTable("games", {
  id: serial("id").primaryKey(),
  date: text("date").notNull(),
  teams: text("teams").notNull(),
  result: text("result").notNull(),
  time: text("time").notNull(),
  winner: text("winner").notNull(),
});

export const insertGameSchema = createInsertSchema(games).omit({
  id: true,
});

export type InsertGame = z.infer<typeof insertGameSchema>;
export type Game = typeof games.$inferSelect;
