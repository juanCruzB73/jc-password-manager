import { RootState } from "@reduxjs/toolkit/query"
import { useDispatch, useSelector } from "react-redux"
import { RxCrossCircled } from "react-icons/rx"
import "./create.css"
import { AppDispatch } from "../../../store/store"
import { onClosePopUp } from "../../../store/slices"

export const Create = () => {
    
    const {popUpType} = useSelector((state:RootState)=>state.popUp)
    const dispatch=useDispatch<AppDispatch>()

    return (
    <div className="create-container">

        {
          popUpType==="acount" && 
          (
            <div className="create-acount-container">

                <div className="create-top-buttons">
                  <button type="button" onClick={()=>dispatch(onClosePopUp())}><RxCrossCircled className="create-icon" /></button>
                  <button type="button">Save</button>
                </div>

                <div className="input-container-create">
                    
                  <input type="text" placeholder="Enter the name of the site" className="input-field-create"/>

                  <div className="input-credentials-create">                    
                      <input type="email"  placeholder="Email"/>
                      <input type="password"  placeholder="Password"/>
                  </div>

                  <div className="input-credentials-create">                    
                      <input type="text"  placeholder="Website link"/>
                  </div>

                </div>
            </div>
          )
        }
      
    </div>
  )
}