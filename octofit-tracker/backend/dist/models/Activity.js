import mongoose, { Schema } from 'mongoose';
const activitySchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    type: {
        type: String,
        enum: ['running', 'cycling', 'swimming', 'gym', 'yoga', 'walking'],
        required: true,
    },
    duration: {
        type: Number,
        required: true,
        min: 1,
    },
    distance: {
        type: Number,
    },
    calories: {
        type: Number,
        required: true,
        min: 0,
    },
    description: {
        type: String,
    },
    timestamp: {
        type: Date,
        required: true,
        default: Date.now,
    },
}, { timestamps: true });
export const Activity = mongoose.model('Activity', activitySchema);
