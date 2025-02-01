import { Navigate, Route, Routes } from "react-router";
import { LogginPage,RegisterPage } from "../auth";
import { HomePage } from "../password-managger";
import { useSelector } from "react-redux";
import { RootState } from "@reduxjs/toolkit/query";



export const AppRouter = () => {
    const {status} = useSelector((state:RootState)=>state.auth)
    
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
