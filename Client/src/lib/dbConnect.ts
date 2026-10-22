// src/lib/dbConnect.ts
import mongoose from "mongoose";

// Checked when connecting (not at import), so a build without the variable
// — e.g. a Vercel preview — still compiles; database calls then fail safely.
const MONGODB_URI = process.env.MONGODB_URI || "";

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
  if (!MONGODB_URI) {
    throw new Error("Please define MONGODB_URI in your environment variables");
  }

  if (globalCache.conn?.connection.readyState === 1) return globalCache.conn;

  // A cached Mongoose instance may have disconnected since the last request.
  globalCache.conn = null;
  if (mongoose.connection.readyState === 0) {
    globalCache.promise = null;
  }

  if (!globalCache.promise) {
    globalCache.promise = mongoose.connect(MONGODB_URI, {
      dbName: "accountants_db",
      bufferCommands: false,
    });
  }

  try {
    globalCache.conn = await globalCache.promise;
    if (globalCache.conn.connection.readyState !== 1) {
      throw new Error("MongoDB connection is not ready");
    }
  } catch (error) {
    // Allow a later request to retry after a temporary connection failure.
    globalCache.promise = null;
    globalCache.conn = null;
    throw error;
  }
  global.mongooseCache = globalCache; // Assign to global

  return globalCache.conn;
}
