import {  IGroup } from "../../../types";
import { AppDispatch } from "../../store";
import { isSavingGroup, onClearGroupMessage, onSaveGroup } from "./groupSlice";

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
