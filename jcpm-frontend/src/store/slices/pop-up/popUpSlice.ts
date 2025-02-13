import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { IPopUp } from '../../../types';



const initialState: IPopUp = {
    statusPopUp:false,
    popUpType:"",
}

export const popUpSlice = createSlice({
    name: 'popUp',
    initialState,
    reducers: {
      onTogglePopUp:(state,action:PayloadAction<string>)=>{
        state.statusPopUp = true;
        state.popUpType = action.payload;
      },
      onClosePopUp:(state)=>{
        state.statusPopUp=false;
        state.popUpType="";
      }
      
    },
  })
  
  // Action creators are generated for each case reducer function
  export const { onTogglePopUp,onClosePopUp } = popUpSlice.actions
  
  export default popUpSlice.reducer
