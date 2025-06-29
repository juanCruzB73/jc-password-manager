import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { ICredential } from '../../../types';

interface ICredentialsSlice{
  credentials:ICredential[];
  selectedCredential:ICredential | null;
  isSavinCredential:boolean;
  credentialMessage:string|null;
}

const initialState:ICredentialsSlice={
  credentials:[],
  selectedCredential:null,
  isSavinCredential:false,
  credentialMessage:null,
}

export const credentialsSlice = createSlice({
    name: 'credential',
    initialState,
    reducers: {
      isSavingCredential:(state)=>{
        state.isSavinCredential=true;
      },
      onSelectCredential:(state,action:PayloadAction<ICredential|null>)=>{
        state.selectedCredential=action.payload;
        state.credentialMessage=null;
      },
      onSaveCredential:(state,action:PayloadAction<ICredential>)=>{
        state.credentials.push(action.payload)
        state.isSavinCredential=false
        state.credentialMessage="Credential saved!"
      },
      onUpdateCredential:(state,action:PayloadAction<ICredential>)=>{
        state.isSavinCredential=true;
        state.credentials=state.credentials.map((credential:ICredential)=>{
          if(credential.credentialId === action.payload.credentialId){
            return action.payload;
          }
          return credential;
      })
      state.isSavinCredential=false;
      },
      onSetCredentialMessage:(state,action:PayloadAction<string>)=>{
        state.credentialMessage=action.payload;
      },
      onClearCredentialMessage:(state)=>{
        state.credentialMessage=null;
      },
      onLoadCredentials:(state,action:PayloadAction<ICredential[]>)=>{
        state.credentials=action.payload;
      },
      onDeleteCredential:(state,action:PayloadAction<number>)=>{
        state.credentials=state.credentials.filter(credential=>action.payload !== credential.credentialId);
        state.isSavinCredential=false;
      }
    },
  })
  
  // Action creators are generated for each case reducer function
  export const {onSaveCredential,onSelectCredential,isSavingCredential,onClearCredentialMessage,onLoadCredentials,onSetCredentialMessage,onUpdateCredential,onDeleteCredential} = credentialsSlice.actions
  
  export default credentialsSlice.reducer