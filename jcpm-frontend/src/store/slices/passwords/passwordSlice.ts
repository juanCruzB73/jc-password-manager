import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface Inote{
    noteId:number;
    titleNote:string;
    content:string;
}

export interface IPassword {
    passwordId:number
    title:string;
    email?:string;
    password?:string
    nodeId:number[];
    groupId:number[];
    
}

export interface IGroup{
    titleGroup:string;
    passwords:IPassword[];
}

const initialState:IPassword={

}

export const passwordSlice = createSlice({
    name: 'popUp',
    initialState,
    reducers: {
      onTogglePopUp:(state,action:PayloadAction<string>)=>{
        state.statusPopUp = !state.statusPopUp;
        state.popUpType = action.payload;
      },
      onClosePopUp:(state)=>{
        state.statusPopUp=false;
        state.popUpType="";
      }
      
    },
  })
  
  // Action creators are generated for each case reducer function
  export const { onTogglePopUp,onClosePopUp } = passwordSlice.actions
  
  export default passwordSlice.reducer