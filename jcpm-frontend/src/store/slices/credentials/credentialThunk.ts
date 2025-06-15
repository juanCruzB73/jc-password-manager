import { ICreateCredential, ICredential } from "../../../types";
import { AppDispatch } from "../../store";
import { isSavingCredential, onClearCredentialMessage, onLoadCredentials, onSaveCredential, onSetCredentialMessage, onUpdateCredential } from "./credentialsSlice";

const API_URL = import.meta.env.VITE_API_URL;

const token = localStorage.getItem('token');
const headers= {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
}

export const startGetCredentials=async(userId:number)=>{
    return async(dispatch:AppDispatch)=>{
        try{
            const response=await fetch(`${API_URL}/api/v1/credentials/filter/${userId}`,{headers:headers});
            const data=await response.json();
            dispatch(onLoadCredentials(data));
            return
        }catch(error){
            console.log(error)
            dispatch(onSetCredentialMessage("error getting credential"))
            return []
        }
    }
}

export const startCreateCredential=(payload:ICreateCredential)=>{
    return async(dispatch:AppDispatch)=>{
        
        try{
            dispatch(isSavingCredential());
            const response = await fetch(`${API_URL}/api/v1/create/credential`, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(payload),
            });
            const data=await response.json()
            dispatch(onSaveCredential(data));
            dispatch(onClearCredentialMessage());
            return
        }catch(error){
            console.log(error);
            dispatch(onSetCredentialMessage("Error creating credential"));
            return
        }
    }
}

export const startUpdateCredential=(payload:ICredential)=>{
    return async(dispatch:AppDispatch)=>{
        
        try{
            dispatch(isSavingCredential());
            const response = await fetch(`${API_URL}/api/v1/edit/credential/${payload.credentialId}`, {
                method: 'PUT',
                headers: headers,
                body: JSON.stringify(payload),
            });
            const data=await response.json()
            dispatch(onUpdateCredential(data));
            dispatch(onClearCredentialMessage());
            return
        }catch(error){
            console.log(error);
            dispatch(onSetCredentialMessage("Error updating credential"));
            return
        }
    }
}