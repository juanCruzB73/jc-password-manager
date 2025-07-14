import {  IGroup } from "../../../types";
import { ICreateGroup } from "../../../types/password-types/ICreateGroup";
import { AppDispatch } from "../../store";
import { isSavingGroup, onClearGroupMessage, onDeleteGroup, onEditGroup, onLoadGroups, onSaveGroup, onSetGroupMessage } from "./groupSlice";

const API_URL = import.meta.env.VITE_API_URL;

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
  };
};


export const startGetGroupsByUser=(userId:number)=>{
    return async(dispatch:AppDispatch)=>{
        try{
            dispatch(isSavingGroup());
            const response=await fetch(`${API_URL}/api/v1/groups/filter/${userId}`,{headers:getAuthHeaders()});
            const data=await response.json()
            dispatch(onLoadGroups(data));
            dispatch(onClearGroupMessage());
        }catch(err){
            console.log(err);
            dispatch(onSetGroupMessage("error get groups"));
        }
    }
};

export const startCreateGroup=(payload:ICreateGroup)=>{
    return async(dispatch:AppDispatch)=>{
        
        dispatch(isSavingGroup());
        const response=await fetch(`${API_URL}/api/v1/create/group`,{
            method: 'POST',
            headers: getAuthHeaders(),
            body: JSON.stringify(payload),
        });
        const data=await response.json();
        dispatch(onSaveGroup(data));
        dispatch(onClearGroupMessage());
    }
};

export const startEditGroup=(payload:ICreateGroup)=>{
    return async(dispatch:AppDispatch)=>{
        dispatch(isSavingGroup());
        const response=await fetch(`${API_URL}/api/v1/edit/group/${payload.groupId!}`,{
            method: 'PUT',
            headers: getAuthHeaders(),
            body: JSON.stringify(payload),
        });
        const data=await response.json();
        dispatch(onEditGroup(data));
        dispatch(onClearGroupMessage());
    }
};

export const startDeleteGroup=(payload:number)=>{
    return async(dispatch:AppDispatch)=>{
        dispatch(isSavingGroup());
        await fetch(`${API_URL}/api/v1/delete/groups/${payload}`,{
            method: 'Delete',
            headers: getAuthHeaders()
        });
        dispatch(onDeleteGroup(payload));
        dispatch(onClearGroupMessage());
    }
};