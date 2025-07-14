import { RootState } from "@reduxjs/toolkit/query"
import { AppRouter } from "./router/AppRouter"
import { NavBar } from "./UI/navbar/NavBar"
import { useDispatch, useSelector } from "react-redux"
import { Title } from "./UI/title/Title"
import { useEffect, useState } from "react"
import { AppDispatch } from "./store/store"
import { decodeJWT } from "./helpers/jwt"
import { onLogin, startGetCredentials, startGetCredentialsByGroup, startGetGroupsByUser } from "./store/slices"

export const JcPasswordMannagerApp = () => {

  const {status,user} = useSelector((state:RootState)=>state.auth);
  const {selectedGroup} = useSelector((state:RootState)=>state.group);

  const [token,setToken]=useState(localStorage.getItem("token"));
  const dispatch=useDispatch<AppDispatch>();
  
  //update token
  useEffect(()=>{
    const autoLogIn=async()=>{
      const payload = await dispatch(decodeJWT(token!));
      if (payload) {
        dispatch(onLogin({
          username: payload.sub,
          email: payload.email,
          userId: Number(payload.userId),
        })); 
      } 
    }
    autoLogIn()
    setToken(localStorage.getItem("token"));
  },[])

  //get credentials
  useEffect(()=>{
    const getCredentials=async()=>{
      if(selectedGroup){
        dispatch(await startGetCredentialsByGroup(selectedGroup.groupId))
      }else{
        dispatch(await startGetCredentials(user.userId));
      }
    }
    getCredentials();
  },[user,selectedGroup]);
  
  //get Groups
  useEffect(()=>{
      dispatch(startGetGroupsByUser(user.userId));
  },[user,token,status]);

  return (
    <>
      {status=="authenticated"?<NavBar/>:<Title/>}
      <AppRouter/>
    </>
  )
}
