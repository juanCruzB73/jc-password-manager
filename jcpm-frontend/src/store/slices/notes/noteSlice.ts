import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { INote } from '../../../types'

interface INoteSlice{
    notes:INote[],
    selectedNote:INote|null,
    isSavingNote:boolean,
    noteMessage:string|null,
}

const initialState:INoteSlice = {
    notes:[],
    selectedNote:null,
    isSavingNote:false,
    noteMessage:null,
}

export const noteSlice = createSlice({
    name: 'note',
    initialState,
    reducers: {
        isSavingNote:(state)=>{
            state.isSavingNote=true;
        },
        onSelectNote:(state,action:PayloadAction<INote>)=>{
            state.selectedNote=action.payload;
            state.noteMessage=null;
        },
        onSaveNote:(state,action:PayloadAction<INote>)=>{//ICreateGroup
            state.notes.push(action.payload);
            state.isSavingNote=false;
            state.noteMessage="Group saved!";
        },
        onClearnoteMessage:(state)=>{
            state.noteMessage=null;
        }
    },
  })
  
  // Action creators are generated for each case reducer function
  export const { isSavingNote,onSelectNote,onSaveNote,onClearnoteMessage } = noteSlice.actions
  
  export default noteSlice.reducer
