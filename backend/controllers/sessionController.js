import Session from '../models/Session.js';
import { SessionStatus } from '../enums/sessionStatus.js';
import asyncHandler from '../utils/asyncHandler.js';

// Public sessions (published)
export const getPublicSessions = asyncHandler(async (req, res) => {
  const sessions = await Session.find({ status: SessionStatus.PUBLISHED });
  res.json(sessions);
});

// My sessions (draft + published)
export const getMySessions = asyncHandler(async (req, res) => {
  const sessions = await Session.find({ user_id: req.user.id });
  res.json(sessions);
});

// Get one of my sessions by ID
export const getMySessionById = asyncHandler(async (req, res) => {
  const session = await Session.findOne({
    _id: req.params.id,
    user_id: req.user.id,
  });
  if (!session) return res.status(404).json({ message: 'Session not found' });

  res.json(session);
});

// Save or update draft
export const saveDraft = asyncHandler(async (req, res) => {
  const { id, title, tags, json_file_url } = req.body;
  let session;

  if (id) {
    session = await Session.findOneAndUpdate(
      { _id: id, user_id: req.user.id },
      { title, tags, json_file_url, status: 'draft', updated_at: new Date() },
      { new: true }
    );
  } else {
    session = await Session.create({
      user_id: req.user.id,
      title,
      tags,
      json_file_url,
      status: 'draft',
    });
  }

  res.json(session);
});

// Publish session (existing or new)
export const publishSession = asyncHandler(async (req, res) => {
  const { id, title, tags, json_file_url } = req.body;
  let session;

  if (id) {
    session = await Session.findOneAndUpdate(
      { _id: id, user_id: req.user.id },
      {
        title,
        tags,
        json_file_url,
        status: SessionStatus.PUBLISHED,
        updated_at: new Date(),
      },
      { new: true }
    );

    if (!session) return res.status(404).json({ message: 'Session not found' });
  } else {
    session = await Session.create({
      user_id: req.user.id,
      title,
      tags,
      json_file_url,
      status: SessionStatus.PUBLISHED,
    });
  }

  res.json(session);
});
