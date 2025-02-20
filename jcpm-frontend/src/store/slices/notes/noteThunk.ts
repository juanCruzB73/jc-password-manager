import { INote } from "../../../types";
import { AppDispatch } from "../../store";
import { isSavingNote, onClearnoteMessage, onSaveNote } from "./noteSlice";

export const startCreateNote=(payload:INote)=>{//ICreateNote
    return async(dispatch:AppDispatch)=>{
        
        dispatch(isSavingNote());
        //post to create credential
        //data=await(post...)
        const data = payload;
        dispatch(onSaveNote(data));
        dispatch(onClearnoteMessage());
        
        //with the return dispath the credential create 
        
    }
}
