import mongoose, { Schema } from 'mongoose';

const leaderboardSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    team: { type: Schema.Types.ObjectId, ref: 'Team' },
    points: { type: Number, required: true, min: 0, default: 0 },
    rank: { type: Number, min: 1 },
    period: { type: String, enum: ['weekly', 'monthly', 'all-time'], default: 'weekly' },
  },
  { timestamps: true },
);

export default mongoose.models.Leaderboard || mongoose.model('Leaderboard', leaderboardSchema);