import { db } from "./firebase";
import { collection, addDoc, query, where, getDocs, deleteDoc, doc } from "firebase/firestore";
import type { InsertReview, InsertWatchlist } from "@shared/schema";

// Collection names
const REVIEWS = 'reviews';
const WATCHLIST = 'watchlist';

// Reviews
export async function addReview(review: InsertReview) {
  try {
    const docRef = await addDoc(collection(db, REVIEWS), review);
    return docRef.id;
  } catch (error) {
    console.error("Error adding review:", error);
    throw error;
  }
}

export async function getUserReviews(userId: string) {
  try {
    const q = query(collection(db, REVIEWS), where("userId", "==", userId));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error("Error getting user reviews:", error);
    throw error;
  }
}

// Watchlist
export async function addToWatchlist(item: InsertWatchlist) {
  try {
    const docRef = await addDoc(collection(db, WATCHLIST), item);
    return docRef.id;
  } catch (error) {
    console.error("Error adding to watchlist:", error);
    throw error;
  }
}

export async function removeFromWatchlist(userId: string, movieId: string) {
  try {
    const q = query(
      collection(db, WATCHLIST),
      where("userId", "==", userId),
      where("movieId", "==", movieId)
    );
    const querySnapshot = await getDocs(q);
    
    // Delete all matching documents
    const deletePromises = querySnapshot.docs.map(doc => deleteDoc(doc.ref));
    await Promise.all(deletePromises);
  } catch (error) {
    console.error("Error removing from watchlist:", error);
    throw error;
  }
}

export async function getUserWatchlist(userId: string) {
  try {
    const q = query(collection(db, WATCHLIST), where("userId", "==", userId));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error("Error getting user watchlist:", error);
    throw error;
  }
}
