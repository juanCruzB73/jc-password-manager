import { ICreateCredential, ICredential } from "../../../types";
import { AppDispatch } from "../../store";
import { isSavingCredential, onClearCredentialMessage, onSaveCredential } from "./credentialsSlice";

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
