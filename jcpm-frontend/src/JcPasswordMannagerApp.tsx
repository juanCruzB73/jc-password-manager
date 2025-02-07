import { RootState } from "@reduxjs/toolkit/query"
import { AppRouter } from "./router/AppRouter"
import { NavBar } from "./UI/navbar/NavBar"
import { useSelector } from "react-redux"
import { Title } from "./UI/title/title"
import { Create } from "./password-managger/pages/create/Create"

export const JcPasswordMannagerApp = () => {
  const {status} = useSelector((state:RootState)=>state.auth)
  const {statusPopUp} = useSelector((state:RootState)=>state.popUp)

  return (
    <>
        {status=="authenticated"?<NavBar/>:<Title/>}

        {statusPopUp===false?<AppRouter/>:<Create/>}
    </>
  )
}
