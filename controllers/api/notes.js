
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
    console.log('req.body:', req.body)
    await Note.create(req.body)
    res.json({message: 'New Note Created'})
  } catch (error) {
    console.error(error);
  }
 }