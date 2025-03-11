import type { Express } from "express";
import { createServer } from "http";
import { storage } from "./storage";
import { auth } from "firebase-admin";
import { insertReviewSchema, insertWatchlistSchema } from "@shared/schema";

const app = auth();

async function verifyAuth(req: any) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) throw new Error("No token provided");
  return await app.verifyIdToken(token);
}

export async function registerRoutes(app: Express) {
  app.post("/api/reviews", async (req, res) => {
    try {
      const decodedToken = await verifyAuth(req);
      const data = insertReviewSchema.parse(req.body);
      const review = await storage.createReview({
        ...data,
        userId: decodedToken.uid,
      });
      res.json(review);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });

  app.post("/api/watchlist", async (req, res) => {
    try {
      const decodedToken = await verifyAuth(req);
      const data = insertWatchlistSchema.parse(req.body);
      const watchlistItem = await storage.addToWatchlist({
        ...data,
        userId: decodedToken.uid,
      });
      res.json(watchlistItem);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });

  app.get("/api/watchlist", async (req, res) => {
    try {
      const decodedToken = await verifyAuth(req);
      const watchlist = await storage.getWatchlist(decodedToken.uid);
      res.json(watchlist);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
