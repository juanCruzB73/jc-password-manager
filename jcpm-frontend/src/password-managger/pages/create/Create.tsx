import { RootState } from "@reduxjs/toolkit/query"
import { useSelector } from "react-redux"

export const Create = () => {
    
    const {popUpType} = useSelector((state:RootState)=>state.popUp)
    
    console.log(popUpType)

    return (
    <div className="create-container">

        {
          popUpType==="acount" && 
          (
            <div className="create-acount-container">
                <span>create acount</span>
            </div>
          )
        }
      
    </div>
  )
}