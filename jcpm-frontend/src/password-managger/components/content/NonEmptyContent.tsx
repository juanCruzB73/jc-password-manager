import { useDispatch, useSelector } from "react-redux"
import { IoMdMail } from "react-icons/io"
import { IoShield } from "react-icons/io5"
import { FaEye, FaPencilAlt, FaTrash } from "react-icons/fa"
import { TbWorld } from "react-icons/tb"
import { RootState } from "@reduxjs/toolkit/query"
import { useState } from "react"
import { AppDispatch } from "../../../store/store"
import { onTogglePopUp } from "../../../store/slices"

export const NonEmptyContent = () => {
  const {selectedCredential} = useSelector((state:RootState)=>state.credential)
  const dispatch=useDispatch<AppDispatch>()
  const [showPasswd,setShowPasswd]=useState(false);
  const hiddenPasswd="*".repeat(selectedCredential.password.length);

  return (
    <>
      <div className="top-options">
        <h2>{selectedCredential.title}</h2>
          <button type="button" onClick={()=>dispatch(onTogglePopUp({popUpType:"credential",actionPopUp:"edit"}))}><FaPencilAlt className="icons-top" /></button >
          <button type="button"><FaTrash className="icons-top"/></button >
      </div>
      <div className="data-slots">
        <div className="email-content-container">
          <h3> <IoMdMail className="icons" /> email</h3>
          <span>{selectedCredential.email}</span>
        </div>
        <div className="password-content-container">
          <h3><IoShield className="icons"/></h3>
          <span style={{display:"flex",alignItems:"center"}}>{showPasswd?selectedCredential.password:hiddenPasswd} <button type="button" onClick={()=>setShowPasswd(!showPasswd)}><FaEye style={{color:"white",fontSize:"1.4rem"}} /></button></span>
        </div>
        <div className="website-content-container">
          <h3><TbWorld className="icons"/> site</h3>
          <span>{selectedCredential.webSite}</span>
        </div>
      </div>
    </>
  )
}