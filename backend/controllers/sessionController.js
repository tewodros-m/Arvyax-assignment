import Session from '../models/Session.js';

// Public sessions (published)
export const getPublicSessions = async (req, res) => {
  try {
    const sessions = await Session.find({ status: 'published' });
    res.json(sessions);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch sessions' });
  }
};

// My sessions (draft + published)
export const getMySessions = async (req, res) => {
  try {
    const sessions = await Session.find({ user_id: req.user.id });
    res.json(sessions);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching your sessions' });
  }
};

// Get one of my sessions by ID
export const getMySessionById = async (req, res) => {
  try {
    const session = await Session.findOne({
      _id: req.params.id,
      user_id: req.user.id,
    });
    if (!session) return res.status(404).json({ message: 'Session not found' });

    res.json(session);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching session' });
  }
};

// Save or update draft
export const saveDraft = async (req, res) => {
  const { id, title, tags, json_file_url } = req.body;

  try {
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
  } catch (err) {
    res.status(500).json({ message: 'Failed to save draft' });
  }
};

// Publish session (existing or new)
export const publishSession = async (req, res) => {
  const { id, title, tags, json_file_url } = req.body;

  try {
    let session;
    if (id) {
      session = await Session.findOneAndUpdate(
        { _id: id, user_id: req.user.id },
        {
          title,
          tags,
          json_file_url,
          status: 'published',
          updated_at: new Date(),
        },
        { new: true }
      );

      if (!session)
        return res.status(404).json({ message: 'Session not found' });
    } else {
      session = await Session.create({
        user_id: req.user.id,
        title,
        tags,
        json_file_url,
        status: 'published',
      });
    }

    res.json(session);
  } catch (err) {
    res.status(500).json({ message: 'Failed to publish session' });
  }
};
