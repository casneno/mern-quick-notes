
const Note = require('../../models/note');

module.exports = {
  getNotes,
  addNote,
};

/* ------------ GET NOTES ---------------- */

async function getNotes(req, res) {
  try {
      const notes = await Note.find({ user: req.user._id }).exec();
      res.json(notes);
  } catch (error) {
      res.status(500).json({ error: 'Failed to fetch notes' });
  }
}

/* ------------- ADD NOTES ------------------ */

async function addNote(req, res) {
  try {
    const newNote = await Note.create(req.body)
    res.json(newNote)
  } catch (error) {
    console.error(error);
  }
}