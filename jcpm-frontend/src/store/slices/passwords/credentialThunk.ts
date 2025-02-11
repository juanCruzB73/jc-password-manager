import { ICreateCredential, ICredential } from "../../../types";
import { AppDispatch } from "../../store";
import { onSaveCredential } from "./credentialsSlice";

export const startCreateCredential=(payload:ICredential)=>{//ICreateCredential|
    return async(dispatch:AppDispatch)=>{
        console.log("starting");
        
        //post to create credential
        //data=await(post...)
        const data = payload;
        dispatch(onSaveCredential(data));
        
        //with the return dispath the credential create 
        
    }
}
