import mongoose, { Schema, Document } from 'mongoose';

export interface ILeaderboardEntry extends Document {
  userId: mongoose.Types.ObjectId;
  teamId?: mongoose.Types.ObjectId;
  username: string;
  points: number;
  rank: number;
  activitiesCount: number;
  totalDuration: number;
  createdAt: Date;
  updatedAt: Date;
}

const leaderboardSchema = new Schema<ILeaderboardEntry>(
  {
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
  },
  { timestamps: true }
);

export const Leaderboard = mongoose.model<ILeaderboardEntry>(
  'Leaderboard',
  leaderboardSchema
);
