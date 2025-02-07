import { FaIdCard } from "react-icons/fa"
import { BsBoxes } from "react-icons/bs"
import { MdOutlinePassword } from "react-icons/md"
import { FaNoteSticky } from "react-icons/fa6"
import "./addMenu.css"
import { useDispatch } from "react-redux"
import { AppDispatch } from "../../store/store"
import { onTogglePopUp } from "../../store/slices"
export const AddMenu = () => {

  const dispath=useDispatch<AppDispatch>()

  const onClickOption=(popUpType:string)=>{
    dispath(onTogglePopUp(popUpType))
  }
  
  return (
    <div className="add-menu-div">
        <div className="option-add-menu"><FaIdCard className="add-menu-icon"/> <button type="button" onClick={()=>onClickOption("acount")} >Add acount</button> </div>
        <div className="option-add-menu"><BsBoxes className="add-menu-icon"/> <button type="button">Add group</button></div>
        <div className="option-add-menu"><MdOutlinePassword className="add-menu-icon"/> <button type="button">Create password</button></div>
        <div className="option-add-menu"><FaNoteSticky className="add-menu-icon"/> <button type="button">Create a note</button></div>
    </div>
  )
}
