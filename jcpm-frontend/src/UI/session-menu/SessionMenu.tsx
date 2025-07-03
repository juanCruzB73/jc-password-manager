import { RootState } from "@reduxjs/toolkit/query"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch } from "../../store/store";
import { onLogOut } from "../../store/slices";
import { CiLogout } from "react-icons/ci";
import "./SessionMenu.css"

export const SessionMenu = () => {
  
  const {user} = useSelector((state:RootState)=>state.auth);
  const dispath=useDispatch<AppDispatch>();
  
  return (
    <div className="add-session-div">
      <span>User: {user.username}</span>
      <span>Email: {user.email}</span>
      <button type="button" onClick={()=>{dispath(onLogOut());localStorage.clear()}}><CiLogout className="add-session-icon" /></button>
    </div >
  )
}