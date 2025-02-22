import {passwordWords} from "./passwordWords";

export const createPasswordCharacterBased = (length:number) => {
    let password="";
    password="";
    const char ="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_-+=";
    
    for(let i=0;i<length;i++){
        const random=Math.floor(Math.random()*char.length);
        password+=char[random];
    };
    return password;
};
export const createPasswordWordBased=(length:number)=>{
    let password="";
    const wordList=passwordWords;
    password="";
    for(let i=0;i<length;i++){
        const random = Math.floor(Math.random()*wordList.length);
        password+=wordList[random];
    };
    return password;
};
    

