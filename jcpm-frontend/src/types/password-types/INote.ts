import { ICredential } from "./ICredential";

export interface INote{
    noteId:number;
    titleNote:string;
    content:string;
    credential:ICredential|null;
}