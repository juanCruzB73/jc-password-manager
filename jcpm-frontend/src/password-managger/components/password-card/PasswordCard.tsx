import { RootState } from "@reduxjs/toolkit/query"
import { useSelector } from "react-redux"
import "./PasswordCard.css"

export const PasswordCard = () => {

  const {user} = useSelector((state:RootState)=>state.auth)

  const newTitle=()=>{
    return user.email.length>10 ? user.email.substring(0,10)+"...":user.email
  }

    return (
      <div className="card-container">
        <div className="img-container"><img  src="../../../../public/assets/user-image.png" alt="->" /></div>
        <div className="infocard-container">
          <span>{newTitle()}</span>
          <span>{user.password}</span>
        </div>
      </div>
    )
  
}
