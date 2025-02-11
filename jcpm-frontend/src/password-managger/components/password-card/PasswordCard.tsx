import { RootState } from "@reduxjs/toolkit/query"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch } from "../../../store/store"
import { FC } from "react"
import { ICredential } from "../../../types"
import { onSelectCredential } from "../../../store/slices"
import "./PasswordCard.css"


export const PasswordCard:FC<{credential:ICredential}> = ({credential}) => {

  const newTitle=()=>{
    return credential.title.length>10 ? credential.title.substring(0,10)+"...":credential.title
  }
  const newEmail=()=>{
    return credential.email.length>10 ? credential.email.substring(0,10)+"...":credential.email
  }

  const dispath=useDispatch<AppDispatch>()

  const selectCredential=()=>{

  }

    return (
      <div className="card-container" onClick={()=>dispath(onSelectCredential(credential))}>
        <div className="img-container"><img  src="../../../../public/assets/user-image.png" alt="->" /></div>
        <div className="infocard-container">
          <span>{newTitle()}</span>
          <span>{newEmail()}</span>
        </div>
      </div>
    )
  
}
