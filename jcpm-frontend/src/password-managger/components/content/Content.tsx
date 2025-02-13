import { useSelector } from "react-redux"
import { RootState } from "@reduxjs/toolkit/query"
import { EmptyContent } from "./emptyContent"
import "./content.css"
import { NonEmptyContent } from "./NonEmptyContent"

export const Content = () => {
  const {selectedCredential} = useSelector((state:RootState)=>state.credential)
  return (
    <div className="content-container">
      {
        
          selectedCredential!==null ? (
            <NonEmptyContent/>
          ):
          <EmptyContent/>
    
        
      }
    </div>
  )
}
