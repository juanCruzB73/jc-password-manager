import { ICredential } from "../types";

//implement for nav bar input
export const searchCredential=(credentials:ICredential[],keyword:string)=>{
    
    const resutl:ICredential[]=[];

    credentials.forEach((credential:ICredential)=>{
        credential.title.includes(keyword)&&resutl.push(credential);
    });

    return resutl;
}