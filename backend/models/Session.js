import mongoose from 'mongoose';
import { SessionStatus } from '../enums/sessionStatus.js';

const sessionSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    title: { type: String, required: true },
    tags: [String],
    json_file_url: String,
    status: {
      type: String,
      enum: Object.values(SessionStatus),
      default: SessionStatus.DRAFT,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Session', sessionSchema);
