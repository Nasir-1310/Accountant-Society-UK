// src/lib/dbConnect.ts
import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI!;

if (!MONGODB_URI) {
  throw new Error("Please define MONGODB_URI in your .env.local");
}

// Define cache type
interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

// Extend NodeJS global to hold mongoose connection cache
declare global {
  // Avoid TS error: Cannot redeclare block-scoped variable
  // eslint-disable-next-line no-var
  var mongooseCache: MongooseCache | undefined;
}

// Initialize global cache if not present
const globalCache = global.mongooseCache ?? {
  conn: null,
  promise: null,
};

export async function dbConnect() {
  if (globalCache.conn) return globalCache.conn;

  if (!globalCache.promise) {
    globalCache.promise = mongoose.connect(MONGODB_URI, {
      dbName: "accountants_db",
      bufferCommands: false,
    });
  }

  globalCache.conn = await globalCache.promise;
  global.mongooseCache = globalCache; // Assign to global

  return globalCache.conn;
}
