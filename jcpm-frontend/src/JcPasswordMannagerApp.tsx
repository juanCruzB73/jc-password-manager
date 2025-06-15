import { RootState } from "@reduxjs/toolkit/query"
import { AppRouter } from "./router/AppRouter"
import { NavBar } from "./UI/navbar/NavBar"
import { useDispatch, useSelector } from "react-redux"
import { Title } from "./UI/title/title"
import { Create } from "./password-managger/pages/create/Create"
import { useEffect, useState } from "react"
import { AppDispatch } from "./store/store"
import { decodeJWT } from "./helpers/jwt"
import { onLogin, startGetCredentials } from "./store/slices"

export const JcPasswordMannagerApp = () => {

    const {status,user} = useSelector((state:RootState)=>state.auth);
    const {statusPopUp} = useSelector((state:RootState)=>state.popUp);

    const token=localStorage.getItem("token");

    const dispatch=useDispatch<AppDispatch>();
  
    useEffect(()=>{
      const getCredentials=async()=>{
        dispatch(await startGetCredentials(user.userId));
      }
      getCredentials();
    },[user,token,status])

    useEffect(() => {
      if (!token) return;

      const checkToken = async () => {
        const payload = await dispatch(decodeJWT(token));

        if (payload) {
          dispatch(onLogin({
            username: payload.sub,
            email: payload.email,
            userId: Number(payload.userId),
          }));
        }
      };

      checkToken();
    }, [token]);

  return (
    <>
        {status=="authenticated"?<NavBar/>:<Title/>}

        {statusPopUp===false?<AppRouter/>:<Create/>}
    </>
  )
}
