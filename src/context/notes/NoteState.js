import { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props)=>{
    const S1 = {
        "name": "Om",
        "class": "G3"
    }
    const [state,setState] = useState(S1);

    const update = ()=>{
        setTimeout(()=>{
            setState({
                "name": "Abhisekh",
                "class": "G4"
            })
        },2000);
    };
    return(
        <NoteContext.Provider value={{state,update}}>
            {props.children}
        </NoteContext.Provider>
    )
};

export default NoteState;