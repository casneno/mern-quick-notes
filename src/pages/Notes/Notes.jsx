import NoteCard from '../../components/NoteCard/NoteCard'
import {useEffect, useState} from "react"
import * as noteAPI from '../../utilities/notes-apis';
import {getUser} from '../../utilities/users-service'

export default function Notes ({user}){
  const[notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState({
    text: '',
    user: user._id
  })

  async function getNotes(){
    const allNotes = await noteAPI.getNotes()
    setNotes(allNotes);
  }
  
  //With HOOK
  useEffect(()=>{
    getNotes();
  }, [])
  

  //change newNote state
  function handleChange(evt){
    setNewNote({...newNote, [evt.target.name]: evt.target.value})
  }
  
  //Send to database
  async function handleAddNote(evt){
    evt.preventDefault();
    const addedNote = await noteAPI.addNote(newNote);
    setNotes([...notes, addedNote]);
    // setNotes(newNote)
    setNewNote({text:'', user: getUser()._id})
  }

  return(
    <div>
      <textarea name="text" value={newNote.text} onChange={handleChange} required cols="30" rows="10"></textarea>
      <button type='submit' onClick={handleAddNote}>Add Note</button>
      {
        notes.length 
        ? 
        notes.map((note, idx) => (<NoteCard key={idx} note={note}/>))      
        : 
        'No Notes Yet!'
      }
    </div>
  )
}