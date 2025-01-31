import { Navigate, Route, Routes } from "react-router";
import { LogginPage } from "../auth/pages/login/LogginPage";
import { HomePage } from "../HomePage";
import { RegisterPage } from "../auth/pages/register/RegisterPage";

export const AppRouter = () => {

    const status = "non-authenticated";

  return (
    <Routes>
        {
            (status === "non-authenticated") ?
            (<>
                <Route path="/*" element={<Navigate to={"/auth/login"}/>}/>
                <Route path="/auth/login" element={<LogginPage/>}/>
                <Route path="/auth/register" element={<RegisterPage/>}/>
            </>):
            (<>
                <Route path="/" element={<HomePage/>}/>
            </>)
        }
    </Routes>
  )
}
