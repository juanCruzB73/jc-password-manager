import { FC } from "react"
import "./SideBar.css"
import { PasswordCard } from "../password-card/PasswordCard"


export const SideBar:FC = () => {
  return (
    <div className="sidebar-container">
      <PasswordCard/>
      <PasswordCard/>
      <PasswordCard/>
    </div>
  )
}
