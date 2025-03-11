import type { User, Review, Watchlist, InsertUser, InsertReview, InsertWatchlist } from "@shared/schema";

export interface IStorage {
  createUser(user: InsertUser): Promise<User>;
  getUser(id: string): Promise<User | undefined>;
  createReview(review: InsertReview): Promise<Review>;
  getReviews(userId: string): Promise<Review[]>;
  addToWatchlist(item: InsertWatchlist): Promise<Watchlist>;
  getWatchlist(userId: string): Promise<Watchlist[]>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private reviews: Map<number, Review>;
  private watchlist: Map<number, Watchlist>;
  private currentId: number;

  constructor() {
    this.users = new Map();
    this.reviews = new Map();
    this.watchlist = new Map();
    this.currentId = 1;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentId++;
    const user = { ...insertUser, id };
    this.users.set(user.firebaseId, user);
    return user;
  }

  async getUser(firebaseId: string): Promise<User | undefined> {
    return this.users.get(firebaseId);
  }

  async createReview(insertReview: InsertReview): Promise<Review> {
    const id = this.currentId++;
    const review = { ...insertReview, id };
    this.reviews.set(id, review);
    return review;
  }

  async getReviews(userId: string): Promise<Review[]> {
    return Array.from(this.reviews.values()).filter(
      (review) => review.userId === userId
    );
  }

  async addToWatchlist(insertWatchlist: InsertWatchlist): Promise<Watchlist> {
    const id = this.currentId++;
    const watchlistItem = { ...insertWatchlist, id };
    this.watchlist.set(id, watchlistItem);
    return watchlistItem;
  }

  async getWatchlist(userId: string): Promise<Watchlist[]> {
    return Array.from(this.watchlist.values()).filter(
      (item) => item.userId === userId
    );
  }
}

export const storage = new MemStorage();
