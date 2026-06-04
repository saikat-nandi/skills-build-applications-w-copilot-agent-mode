import mongoose, { Schema, Document } from 'mongoose';

export interface IWorkout extends Document {
  title: string;
  description: string;
  type: 'running' | 'cycling' | 'swimming' | 'gym' | 'yoga' | 'walking';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedDuration: number;
  caloriesBurned: number;
  instructions: string[];
  equipment?: string[];
  createdAt: Date;
  updatedAt: Date;
}

const workoutSchema = new Schema<IWorkout>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ['running', 'cycling', 'swimming', 'gym', 'yoga', 'walking'],
      required: true,
    },
    difficulty: {
      type: String,
      enum: ['beginner', 'intermediate', 'advanced'],
      required: true,
    },
    estimatedDuration: {
      type: Number,
      required: true,
      min: 1,
    },
    caloriesBurned: {
      type: Number,
      required: true,
      min: 0,
    },
    instructions: [
      {
        type: String,
      },
    ],
    equipment: [
      {
        type: String,
      },
    ],
  },
  { timestamps: true }
);

export const Workout = mongoose.model<IWorkout>('Workout', workoutSchema);
