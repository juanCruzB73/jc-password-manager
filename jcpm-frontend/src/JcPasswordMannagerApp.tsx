import { RootState } from "@reduxjs/toolkit/query"
import { AppRouter } from "./router/AppRouter"
import { NavBar } from "./UI/navbar/NavBar"
import { useDispatch, useSelector } from "react-redux"
import { Title } from "./UI/title/title"
import { Create } from "./password-managger/pages/create/Create"
import { useEffect, useState } from "react"
import { AppDispatch } from "./store/store"
import { decodeJWT } from "./helpers/jwt"
import { onLogin, startGetCredentials, startGetCredentialsByGroup, startGetGroupsByUser } from "./store/slices"

export const JcPasswordMannagerApp = () => {

    const {status,user} = useSelector((state:RootState)=>state.auth);
    const {statusPopUp} = useSelector((state:RootState)=>state.popUp);
    const {selectedGroup} = useSelector((state:RootState)=>state.group);

    const token=localStorage.getItem("token");

    const dispatch=useDispatch<AppDispatch>();

    //persistant login useEffect
    useEffect(() => {
      const checkToken = async () => {
        const payload = await dispatch(decodeJWT(token!));
        if (payload) {
          dispatch(onLogin({
            username: payload.sub,
            email: payload.email,
            userId: Number(payload.userId),
          }));
          dispatch(await startGetCredentials(user.userId));
        }
      };
      checkToken();
    },[token]);

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
    },[user,token,status,selectedGroup])

    //get Groups
    useEffect(()=>{
        dispatch(startGetGroupsByUser(user.userId));
    },[user,token,status])

  return (
    <>
        {status=="authenticated"?<NavBar/>:<Title/>}
        {statusPopUp===false?<AppRouter/>:<Create/>}
    </>
  )
}
