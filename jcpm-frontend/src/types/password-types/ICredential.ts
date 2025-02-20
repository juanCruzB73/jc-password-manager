import { IGroup } from "./IGroups";
import { Inote } from "./INote";

export interface ICredential {
    credentialId:number | null; 
    title:string;
    email:string;
    password:string;
    webSite:string;
    noteId:Inote[] | [];
    groupId:IGroup[] | []; 
}