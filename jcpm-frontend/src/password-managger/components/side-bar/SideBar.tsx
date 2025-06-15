import { FC } from "react"
import { PasswordCard } from "../password-card/PasswordCard"
import { RootState } from "@reduxjs/toolkit/query"
import "./SideBar.css"
import { ICredential } from "../../../types"
import { useSelector } from "react-redux"

export const SideBar:FC = () => {
  
  const {credentials} = useSelector((state:RootState)=>state.credential);

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
