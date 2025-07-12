import { useSelector } from "react-redux"
import { CreateCredential } from "./credential/CreateCredential"
import { RootState } from "@reduxjs/toolkit/query"
import { CreateGroup } from "./group/CreateGroup"
import { CreatePassword } from "./password/CreatePassword"
import { CreateNote } from "./note/CreateNote"
import './create.css';
export const Create = () => {
    
    const {popUpType} = useSelector((state:RootState)=>state.popUp)

    return (
    <div className="create-container">
        {popUpType==="credential" && (<CreateCredential/>)}
        {popUpType==="group"&&(<CreateGroup/>)}
        {popUpType==="password"&&(<CreatePassword/>)}
        {popUpType==="note"&&(<CreateNote/>)}
    </div>
  )
}