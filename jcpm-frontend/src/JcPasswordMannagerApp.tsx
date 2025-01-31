import { BrowserRouter } from "react-router"
import { AppRouter } from "./router/AppRouter"
import { NavBar } from "./UI/navbar/NavBar"

export const JcPasswordMannagerApp = () => {
  return (
    <BrowserRouter>
        <NavBar/>
        <AppRouter/>
    </BrowserRouter>
  )
}
