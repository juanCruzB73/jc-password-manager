import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface IUser{
    email: string,
    password: string,
}

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
        email: "",
        password:"",
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
            email: "",
            password:"",
        },
        state.errorMessage=null
    },
    onLogin:(state,action:PayloadAction<IUser>)=>{
        state.status="authenticated",
        state.user=action.payload,
        state.errorMessage=null
    },
    
  },
})

// Action creators are generated for each case reducer function
export const { onChecking,onLogin } = authSlice.actions

export default authSlice.reducer