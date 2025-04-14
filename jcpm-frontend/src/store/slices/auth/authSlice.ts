import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { IUser } from '../../../types';
import { ILogin } from '../../../types/auth-types/ILogin';


export interface IAuthState {
    status:string;
    user:IUser
    errorMessage:null | string
}

export interface IPayloadResgister {
    username:string;
    email:string;
    password:string;
}
const initialState: IAuthState = {
    status:"non-authenticated",
    user:{
        username:"",
        email: "",
        userId:null,
    },
    errorMessage:null,
}



export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    onChecking:(state)=>{
        state.status="checking",
        state.user={
            username:"",
            email: "",
            userId:null,
        },
        state.errorMessage=null
    },
    onLogin:(state,action:PayloadAction<IUser>)=>{
        state.status="authenticated",
        state.user=action.payload,
        state.errorMessage=null
    },
    onLogOut:(state)=>{
        state.status="non-authenticated",
        state.user={
            username:"",
            email: "",
            userId:null,
        },
        state.errorMessage=null
    }
    
  },
})

// Action creators are generated for each case reducer function
export const { onChecking,onLogin,onLogOut } = authSlice.actions

export default authSlice.reducer