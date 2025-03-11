import { pgTable, text, serial, integer, timestamp } from "drizzle-orm/pg-core";
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
  movieId: integer("movie_id").notNull(),
  rating: integer("rating").notNull(),
  content: text("content").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const watchlist = pgTable("watchlist", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  movieId: integer("movie_id").notNull(),
  addedAt: timestamp("added_at").defaultNow(),
});

export const insertUserSchema = createInsertSchema(users);
export const insertReviewSchema = createInsertSchema(reviews);
export const insertWatchlistSchema = createInsertSchema(watchlist);

export type User = typeof users.$inferSelect;
export type Review = typeof reviews.$inferSelect;
export type Watchlist = typeof watchlist.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;
export type InsertReview = z.infer<typeof insertReviewSchema>;
export type InsertWatchlist = z.infer<typeof insertWatchlistSchema>;
