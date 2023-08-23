const express = require('express');
const router = express.Router();
const notesCtrl = require('../../controllers/api/notes'); //does not exist yet!
const ensureLoggedIn = require('../../config/ensureLoggedIn')

//GET api/users/get-notes
router.get('/get-notes', ensureLoggedIn, notesCtrl.getNotes);

//POST api/users/add-note
router.post('/add-note', ensureLoggedIn, notesCtrl.addNote);

module.exports = router