import {  IGroup } from "../../../types";
import { AppDispatch } from "../../store";
import { isSavingGroup, onClearGroupMessage, onLoadGroups, onSaveGroup, onSetGroupMessage } from "./groupSlice";

const API_URL = import.meta.env.VITE_API_URL;

const token = localStorage.getItem('token');
const headers= {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
}

export const startGetGroupsByUser=(userId:number)=>{
    return async(dispatch:AppDispatch)=>{
        try{
            dispatch(isSavingGroup());
            const response=await fetch(`${API_URL}/api/v1/groups/filter/${userId}`,{headers:headers});
            const data=await response.json()
            dispatch(onLoadGroups(data));
            dispatch(onClearGroupMessage());
        }catch(err){
            console.log(err);
            dispatch(onSetGroupMessage("error get groups"));
        }
    }
}
export const startCreateGroup=(payload:IGroup)=>{//ICreateGroup|
    return async(dispatch:AppDispatch)=>{
        
        dispatch(isSavingGroup());
        //post to create credential
        //data=await(post...)
        const data = payload;
        dispatch(onSaveGroup(data));
        dispatch(onClearGroupMessage());
        //with the return dispath the credential create 
        
    }
}
