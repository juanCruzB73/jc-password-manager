import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'


export interface IPopUp {
    statusPopUp:boolean;
    popUpType:string;
}


const initialState: IPopUp = {
    statusPopUp:false,
    popUpType:"",
}

export const PopUpSlice = createSlice({
    name: 'popUp',
    initialState,
    reducers: {
      onTogglePopUp:(state,action:PayloadAction<string>)=>{
        state.statusPopUp = !state.statusPopUp;
        state.popUpType = action.payload;
      }
      
    },
  })
  
  // Action creators are generated for each case reducer function
  export const { onTogglePopUp } = PopUpSlice.actions
  
  export default PopUpSlice.reducer
