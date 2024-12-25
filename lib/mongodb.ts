import mongoose from 'mongoose';

declare global {
  var mongoose: {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
  } | undefined;
}

const MONGODB_URI = process.env.MONGODB_URI!;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached && cached.conn) { // Check if cached is defined and has a connection
    return cached.conn;
  }

  if (cached && !cached.promise) {
    const opts = {
      bufferCommands: false,
    };
    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      // Assign the entire mongoose instance to cached.conn
      cached.conn = mongoose; 
      // Return the cached object, ensuring the correct type is returned.
      return cached;
    });
  }

  try {
    if (cached) { // Check if cached is defined before accessing it
      cached.conn = await cached.promise;
    } else {
      throw new Error('Cached variable is not defined.'); // Handle the case where cached is undefined
    }
  } catch (e) {
    if (cached) { // Check if cached is defined before accessing it
      cached.promise = null;
    }
    throw e;
  }

  return cached.conn;
}

export default dbConnect;