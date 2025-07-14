import { useDispatch, useSelector } from "react-redux"
import { IoMdMail } from "react-icons/io"
import { IoShield } from "react-icons/io5"
import { FaEye, FaPencilAlt, FaTrash } from "react-icons/fa"
import { TbWorld } from "react-icons/tb"
import { RootState } from "@reduxjs/toolkit/query"
import { useState } from "react"
import { AppDispatch } from "../../../store/store"
import { onTogglePopUp, startDeleteCredential } from "../../../store/slices"
import { ConfirmCard } from "../notification.cards/confirmation-card/ConfirmCard"

export const NonEmptyContent = () => {
  const {selectedCredential} = useSelector((state:RootState)=>state.credential)
  const dispatch=useDispatch<AppDispatch>()
  const [showPasswd,setShowPasswd]=useState(false);
  const hiddenPasswd="*".repeat(selectedCredential.password.length);
  const [showConfirm,setShowConfirm]=useState(false);

  const handleHideConfirm=()=>{
    setShowConfirm(!showConfirm);
  }

  return (
    <>
      {showConfirm&&<ConfirmCard onConfirm={()=>dispatch(startDeleteCredential(selectedCredential.credentialId))} onCancel={handleHideConfirm}/>}
      <div className="top-options">
        <h2>{selectedCredential.title}</h2>
        <div className="top-options-button-container">
          <button type="button" onClick={()=>{dispatch(onTogglePopUp({popUpType:"credential",actionPopUp:"edit"}))}}><FaPencilAlt className="icons-top" /></button >
          <button type="button" onClick={()=>handleHideConfirm()}><FaTrash className="icons-top"/></button >
        </div>
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
          <span>{selectedCredential.website}</span>
        </div>
      </div>
    </>
  )
}