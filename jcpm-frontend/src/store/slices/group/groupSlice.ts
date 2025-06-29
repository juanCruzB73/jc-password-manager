import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { IGroup } from '../../../types'

export interface IGroupSlice{
    groups:IGroup[],
    selectedGroup:null|IGroup,
    isSavinGroup:boolean,
    groupMessage:string|null,
}

const initialState:IGroupSlice = {
    groups:[],
    selectedGroup:null,
    isSavinGroup:false,
    groupMessage:null,
}

export const groupSlice = createSlice({
    name: 'group',
    initialState,
    reducers: {
        isSavingGroup:(state)=>{
            state.isSavinGroup=true;
        },
        onSelectGroup:(state,action:PayloadAction<IGroup>)=>{
          state.selectedGroup=action.payload;
          state.groupMessage=null;
        },
        onSaveGroup:(state,action:PayloadAction<IGroup>)=>{//ICreateGroup
          state.groups.push(action.payload);
          state.isSavinGroup=false;
          state.groupMessage="Group saved!"
        },
        onSetGroupMessage:(state,action:PayloadAction<string>)=>{
          state.groupMessage=action.payload;
        },
        onClearGroupMessage:(state)=>{
          state.groupMessage=null;
        }
    },
  })
  
  // Action creators are generated for each case reducer function
  export const { isSavingGroup,onSelectGroup,onSaveGroup,onClearGroupMessage } = groupSlice.actions
  
  export default groupSlice.reducer
