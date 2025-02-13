import { ICredential } from "./ICredential";

export interface IGroup{
    groupId:number;
    titleGroup:string;
    credentials:ICredential[];
}