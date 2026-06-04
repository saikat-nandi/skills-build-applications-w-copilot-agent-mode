import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  profile: {
    fullName: string;
    avatar?: string;
    bio?: string;
  };
  teamId?: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUser>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    profile: {
      fullName: {
        type: String,
        required: true,
      },
      avatar: {
        type: String,
      },
      bio: {
        type: String,
      },
    },
    teamId: {
      type: Schema.Types.ObjectId,
      ref: 'Team',
    },
  },
  { timestamps: true }
);

export const User = mongoose.model<IUser>('User', userSchema);
