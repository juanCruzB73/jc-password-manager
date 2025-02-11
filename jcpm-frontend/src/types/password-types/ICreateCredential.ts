export interface ICreateCredential {
        credentialId:number; 
        title:string;
        email:string;
        password:string;
        webSite:string;
        noteId:number[] | [];
        groupId:number[] | []; 
    }
