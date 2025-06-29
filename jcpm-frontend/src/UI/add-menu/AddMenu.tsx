import { FaIdCard } from "react-icons/fa"
import { BsBoxes } from "react-icons/bs"
import { MdOutlinePassword } from "react-icons/md"
import { FaNoteSticky } from "react-icons/fa6"
import { useDispatch } from "react-redux"
import { AppDispatch } from "../../store/store"
import { IOntogglePopUpInterface, onSelectCredential, onTogglePopUp } from "../../store/slices"
import "./addMenu.css"

export const AddMenu = () => {

  const dispath=useDispatch<AppDispatch>()

  const onClickOption=(popUpType:IOntogglePopUpInterface)=>{
    dispath(onTogglePopUp(popUpType))
  }
  
  return (
    <div className="add-menu-div">
        <div className="option-add-menu"><FaIdCard className="add-menu-icon"/> <button type="button" onClick={()=>{onClickOption({popUpType:"credential",actionPopUp:"create"});dispath(onSelectCredential(null))}} >Add acount</button> </div>
        <div className="option-add-menu"><BsBoxes className="add-menu-icon"/> <button type="button" onClick={()=>onClickOption({popUpType:"group",actionPopUp:"create"})}>Add group</button></div>
        <div className="option-add-menu"><MdOutlinePassword className="add-menu-icon"/> <button type="button" onClick={()=>onClickOption({popUpType:"password",actionPopUp:"create"})}>Create password</button></div>
        <div className="option-add-menu"><FaNoteSticky className="add-menu-icon"/> <button type="button"onClick={()=>onClickOption({popUpType:"note",actionPopUp:"create"})}>Create a note</button></div>
    </div>
  )
}
