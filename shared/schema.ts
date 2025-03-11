import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  firebaseId: text("firebase_id").notNull().unique(),
  username: text("username").notNull(),
  email: text("email").notNull(),
});

export const reviews = pgTable("reviews", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  movieId: text("movie_id").notNull(),
  rating: integer("rating").notNull(),
  content: text("content").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const watchlist = pgTable("watchlist", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  movieId: text("movie_id").notNull(),
  addedAt: timestamp("added_at").defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).omit({ id: true });
export const insertReviewSchema = createInsertSchema(reviews).omit({ id: true, createdAt: true });
export const insertWatchlistSchema = createInsertSchema(watchlist).omit({ id: true, addedAt: true });

export type InsertUser = z.infer<typeof insertUserSchema>;
export type InsertReview = z.infer<typeof insertReviewSchema>;
export type InsertWatchlist = z.infer<typeof insertWatchlistSchema>;
export type User = typeof users.$inferSelect;
export type Review = typeof reviews.$inferSelect;
export type Watchlist = typeof watchlist.$inferSelect;
