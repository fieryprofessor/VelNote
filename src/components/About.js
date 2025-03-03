import React,{useContext, useEffect} from 'react';
import noteContext from '../context/notes/NoteContext';

export default function About() {

  const a = useContext(noteContext);

  useEffect(()=>{
    a.update();
    // eslint-disable-next-line
  },[]);

  return (
    <div>
      <p>This App belongs to {a.state.name} and he is of section {a.state.class}</p>
    </div>
  );
}
