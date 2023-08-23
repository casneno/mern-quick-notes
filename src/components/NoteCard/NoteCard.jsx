
export default function NoteCard({note}){
  return(
    <div>
      <span>{note.text}</span>
      <span>{note.updatedAt}</span>
    </div>
  )
}