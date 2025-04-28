import { Navigate, Route, Routes } from "react-router";
import { LogginPage,RegisterPage } from "../auth";
import { HomePage } from "../password-managger";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@reduxjs/toolkit/query";
import { useEffect } from "react";
import { AppDispatch } from "../store/store";
import { onLogOut, startAcountRenew } from "../store/slices";



export const AppRouter = () => {
    const {status} = useSelector((state:RootState)=>state.auth);
    const dispath=useDispatch<AppDispatch>();
    useEffect(()=>{
        dispath(startAcountRenew())
    },[])

  return (
    <Routes>
        {
            (status === "non-authenticated" || status === "checking") ?
            (<>
                <Route path="/*" element={<Navigate to={"/auth/login"}/>}/>
                <Route path="/auth/login" element={<LogginPage/>}/>
                <Route path="/auth/register" element={<RegisterPage/>}/>
            </>):
            (<>
                <Route path="/home" element={<HomePage/>}/>
                <Route path="/*" element={<Navigate to={"/home"}/>}/>
                
                
            </>)
        }
    </Routes>
  )
}
