import mongoose from 'mongoose';

/**
 * MongoDB database connection configuration for octofit_db
 */

const MONGO_URI = process.env.MONGO_URI ?? 'mongodb://localhost:27017/octofit_db';

export async function connectDatabase(): Promise<void> {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('✓ Connected to MongoDB (octofit_db)');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    throw error;
  }
}

export async function disconnectDatabase(): Promise<void> {
  try {
    await mongoose.disconnect();
    console.log('✓ Disconnected from MongoDB');
  } catch (error) {
    console.error('❌ MongoDB disconnection error:', error);
    throw error;
  }
}

export default mongoose;
