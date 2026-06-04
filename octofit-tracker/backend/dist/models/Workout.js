import mongoose, { Schema } from 'mongoose';
const workoutSchema = new Schema({
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
}, { timestamps: true });
export const Workout = mongoose.model('Workout', workoutSchema);
