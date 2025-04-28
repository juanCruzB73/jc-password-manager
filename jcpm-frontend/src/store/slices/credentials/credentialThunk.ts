import { ICredential } from "../../../types";
import { AppDispatch } from "../../store";
import { isSavingCredential, onClearCredentialMessage, onLoadCredentials, onSaveCredential } from "./credentialsSlice";

const API_URL = import.meta.env.VITE_API_URL;
const token = localStorage.getItem('token');
const headers= {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
}

export const startGetCredentials=async(userId:number)=>{
    return async(dispatch:AppDispatch)=>{
        const response=await fetch(`${API_URL}/api/v1/credentials/filter/${userId}`,{headers:headers});
        const data=await response.json();
        dispatch(onLoadCredentials(data));
    }
}

export const startCreateCredential=(payload:ICredential)=>{//ICreateCredential|
    return async(dispatch:AppDispatch)=>{
        
        dispatch(isSavingCredential());
        //post to create credential
        //data=await(post...)
        const data = payload;
        dispatch(onSaveCredential(data));
        dispatch(onClearCredentialMessage());
        
        //with the return dispath the credential create 
        
    }
}
