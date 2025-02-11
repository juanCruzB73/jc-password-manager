import { IGroup } from "./IGroups";
import { Inote } from "./INotes";

export interface ICredential {
    credentialId:number | null; 
    title:string;
    email:string;
    password:string;
    webSite:string;
    noteId:Inote[] | [];
    groupId:IGroup[] | []; 
}