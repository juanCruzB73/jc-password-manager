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
        onLoadGroups:(state,action:PayloadAction<IGroup[]>)=>{
          state.groups=action.payload;
        },
        onSelectGroup:(state,action:PayloadAction<IGroup|null>)=>{
          state.selectedGroup=action.payload;
          state.groupMessage=null;
          state.isSavinGroup=false;
        },
        onSaveGroup:(state,action:PayloadAction<IGroup>)=>{//ICreateGroup
          state.groups.push(action.payload);
          state.isSavinGroup=false;
          state.groupMessage="Group saved!"
        },
        onEditGroup:(state,action:PayloadAction<IGroup>)=>{
          state.groups=state.groups.map((group:IGroup)=>{
          if(group.groupId === action.payload.groupId){
            return action.payload;
          }
          return group;
        })
        state.isSavinGroup=false;
        state.groupMessage=null;
        },
        onDeleteGroup:(state,action:PayloadAction<number>)=>{
          state.groups=state.groups.filter((group:IGroup)=>action.payload!=group.groupId);
          state.isSavinGroup=false;
          state.groupMessage=null;
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
  export const { onSetGroupMessage,onLoadGroups,onEditGroup,onDeleteGroup,isSavingGroup,onSelectGroup,onSaveGroup,onClearGroupMessage } = groupSlice.actions
  
  export default groupSlice.reducer
