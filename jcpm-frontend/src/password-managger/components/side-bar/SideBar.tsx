import { FC, useEffect } from "react"
import { PasswordCard } from "../password-card/PasswordCard"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "@reduxjs/toolkit/query"
import "./SideBar.css"
import { ICredential } from "../../../types"
import { startGetCredentials } from "../../../store/slices"
import { AppDispatch } from "../../../store/store"

export const SideBar:FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {credentials} = useSelector((state:RootState)=>state.credential);
  const {user} = useSelector((state:RootState)=>state.auth);

  useEffect(()=>{
    const getCredentials=async()=>{
      dispatch(await startGetCredentials(user.userId));
    }
    getCredentials();
  },[])

  return (
    <div className="sidebar-container">
      {
        credentials.map((credential:ICredential) =>(
          <PasswordCard key={credential.credentialId} credential={credential}/>
        ))
      }
    </div>
  )
}
