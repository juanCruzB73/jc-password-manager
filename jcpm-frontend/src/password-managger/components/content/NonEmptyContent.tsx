import { useSelector } from "react-redux"
import { IoMdMail } from "react-icons/io"
import { IoShield } from "react-icons/io5"
import { FaEye, FaPencilAlt, FaTrash } from "react-icons/fa"
import { TbWorld } from "react-icons/tb"
import { RootState } from "@reduxjs/toolkit/query"

export const NonEmptyContent = () => {
  const {selectedCredential} = useSelector((state:RootState)=>state.credential)
  //const {user} = useSelector((state:RootState)=>state.auth)

  const newTitle=()=>{
    return selectedCredential.email.length>20 ? selectedCredential.email.substring(0,20)+"...":selectedCredential.email
  }
  return (
    <>
      <div className="top-options">
        <h2>{selectedCredential.title}</h2>
          <button type="button"><FaPencilAlt className="icons-top" /></button >
          <button type="button"><FaTrash className="icons-top"/></button >
      </div>
      <div className="data-slots">
        <div className="email-content-container">
          <h3> <IoMdMail className="icons" /> email</h3>
          <span>{newTitle()}</span>
        </div>
        <div className="password-content-container">
          <h3><IoShield className="icons"/> password</h3>
          <span>{selectedCredential.password} <button><FaEye style={{color:"white",fontSize:"1.4rem"}} /></button></span>
        </div>
        <div className="website-content-container">
          <h3><TbWorld className="icons"/> site</h3>
          <span>{selectedCredential.webSite}</span>
        </div>
      </div>
    </>
  )
}