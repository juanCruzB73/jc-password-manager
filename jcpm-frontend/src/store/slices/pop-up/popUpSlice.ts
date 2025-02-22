import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { IPopUp } from '../../../types';



const initialState: IPopUp = {
    statusPopUp:false,
    popUpType:"",
    actionPopUp:"",
}

export interface IOntogglePopUpInterface{
    popUpType:string,
    actionPopUp:string,
}

export const popUpSlice = createSlice({
    name: 'popUp',
    initialState,
    reducers: {
      onTogglePopUp:(state,action:PayloadAction<IOntogglePopUpInterface>)=>{
        state.statusPopUp = true;
        state.popUpType = action.payload.popUpType;
        state.actionPopUp=action.payload.actionPopUp
      },
      onClosePopUp:(state)=>{
        state.statusPopUp=false;
        state.popUpType="";
        state.actionPopUp=""
      },
      
    },
  })
  
  // Action creators are generated for each case reducer function
  export const { onTogglePopUp,onClosePopUp } = popUpSlice.actions
  
  export default popUpSlice.reducer
