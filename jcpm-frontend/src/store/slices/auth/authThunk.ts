import { IUser } from "../../../types";
import { AppDispatch } from "../../store";
import { IPayloadResgister, onChecking, onLogin } from "./authSlice";

export const startCheckingAuth=()=>{
    return async(dispatch:AppDispatch)=>{
        dispatch(onChecking())
    };
};

export const startAcountSignIn=(payload:IUser)=>{
    return async(dispatch:AppDispatch)=>{
        dispatch(onChecking());
        //const result=await loginWithEmailAndPassword({email,password});
        dispatch(onLogin(payload))
    }
}

export const startAcountResgister=(payload:IPayloadResgister)=>{
    return async(dispatch:AppDispatch)=>{
        localStorage.setItem("user",payload.username);
        localStorage.setItem("email",payload.email);
        
        dispatch(onChecking());
        //const result=await loginWithEmailAndPassword({email,password});
        const data={email:payload.email,userId:Math.random(),username:payload.username}
        dispatch(onLogin(data))
    }
}