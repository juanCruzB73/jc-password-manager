import { useDispatch } from "react-redux";
import { useForm } from "../../../hooks/useForm"
import { AppDispatch } from "../../../store/store";
import { startAcountSignIn } from "../../../store/slices";
import { useNavigate } from "react-router";

import "./login.css"

interface ILoginForm{
  email:string;
  password:string;
}
const intialFormValue={
  email:"",
  password:"",
}
export const LogginPage = () => {

  const {email,password,onInputChange}=useForm<ILoginForm>(intialFormValue)

  const navigate=useNavigate();

  const dispath=useDispatch<AppDispatch>()

  const onSubmitLogin=(event:React.FormEvent)=>{
    event.preventDefault();
    dispath(startAcountSignIn({email,password}));
    console.log(email,password)

  }

  return (
    <div className="login-container">
      <h1 className="login-title">Sing in</h1>
      <form className="login-form" onSubmit={onSubmitLogin}>
          <input name="email" value={email} onChange={onInputChange} type="email" className="login-input" aria-describedby="emailHelp" placeholder="Enter your email"/>
          <input name="password" value={password} onChange={onInputChange} type="password" className="login-input"  placeholder="Password"/>
        <div className="buttons-login-container">
          <button type="submit" className="login-button" >Submit</button>
          <button type="button" className="login-button" onClick={()=>navigate("/auth/register")}>Register</button>
        </div>
      </form>
    </div>
  )
}