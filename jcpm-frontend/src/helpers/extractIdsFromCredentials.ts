import { ICredential } from "../types";

export const extractIdsFromCredentials=(credentials:ICredential[])=>{
    const result:number[]=[];
    credentials.forEach(credential => {
        result.push(credential.credentialId!);
    });
    return result;
};