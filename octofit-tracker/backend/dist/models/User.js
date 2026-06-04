import mongoose, { Schema } from 'mongoose';
const userSchema = new Schema({
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
}, { timestamps: true });
export const User = mongoose.model('User', userSchema);
