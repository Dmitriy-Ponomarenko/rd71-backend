// src/db/initMongoDB.ts

import mongoose from 'mongoose';
import { env } from '../utils/env.js';

export const initMongoDB = async (): Promise<void> => {
  try {
    const user = env('MONGODB_USER');
    const pwd = env('MONGODB_PASSWORD');
    const url = env('MONGODB_URL');

    if (!user || !pwd || !url) {
      throw new Error('Missing MongoDB configuration');
    }

    const connectioString = `mongodb+srv://${user}:${pwd}@${url}`;
    await mongoose.connect(connectioString);

    console.log('MongoDB connection es successfully established');
  } catch (err) {
    console.error('Error while setting up mongoDB connection', err);
    throw err;
  }
};
