import { useDispatch, useSelector } from "react-redux";
import { useForm } from "../../../hooks/useForm"
import { AppDispatch } from "../../../store/store";
import { startAcountSignIn } from "../../../store/slices";
import { useNavigate } from "react-router";
import "./login.css"
import { RootState } from "@reduxjs/toolkit/query";

interface ILoginForm{
  email:string;
  password:string;
}
const intialFormValue={
  email:"",
  password:"",
}
export const LogginPage = () => {

  const {email,password,onInputChange}=useForm<ILoginForm>(intialFormValue);
  const {errorMessage} = useSelector((state:RootState)=>state.auth);


  const navigate=useNavigate();

  const dispath=useDispatch<AppDispatch>()
  
  const onSubmitLogin=(event:React.FormEvent)=>{
    event.preventDefault();
    dispath(startAcountSignIn({username:email,password}));
  }

  return (
    <div className="login-container">
      <h1 className="login-title">Sing in</h1>
      {errorMessage?<div className="login-error"><h4>{errorMessage}</h4></div>:<></>}
      <form className="login-form" onSubmit={onSubmitLogin}>
          <input  name="email" value={email} onChange={onInputChange} type="text" className="login-input" placeholder="Enter your username"/>
          <input name="password" value={password} onChange={onInputChange} type="password" className="login-input"  placeholder="Password"/>
        <div className="buttons-login-container">
          <button type="submit" className="login-button" >Submit</button>
          <button type="button" className="login-button" onClick={()=>navigate("/auth/register")}>Register</button>
        </div>
      </form>
    </div>
  )
}