import { useSelector } from "react-redux"
import { CreateCredential } from "./credential/CreateCredential"
import { RootState } from "@reduxjs/toolkit/query"
import { CreateGroup } from "./group/CreateGroup"

export const Create = () => {
    
    const {popUpType} = useSelector((state:RootState)=>state.popUp)

    return (
    <div className="create-container">

        {popUpType==="credential" && (<CreateCredential/>)}
        {popUpType==="group"&&(<CreateGroup/>)}
    </div>
  )
}