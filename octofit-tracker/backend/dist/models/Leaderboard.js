import mongoose, { Schema } from 'mongoose';
const leaderboardSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true,
    },
    teamId: {
        type: Schema.Types.ObjectId,
        ref: 'Team',
    },
    username: {
        type: String,
        required: true,
    },
    points: {
        type: Number,
        default: 0,
        min: 0,
    },
    rank: {
        type: Number,
        required: true,
    },
    activitiesCount: {
        type: Number,
        default: 0,
    },
    totalDuration: {
        type: Number,
        default: 0,
    },
}, { timestamps: true });
export const Leaderboard = mongoose.model('Leaderboard', leaderboardSchema);
