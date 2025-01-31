import { useForm } from "../../../hooks/useForm"
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


  const onSubmitLogin=(event:React.FormEvent)=>{
    event.preventDefault();
    console.log(email,password)
  }

  return (
    <div className="login-container">
      <h1 className="login-title">Sing in</h1>
      <form className="login-form" onSubmit={onSubmitLogin}>
          <input name="email" value={email} onChange={onInputChange} type="email" className="login-input" aria-describedby="emailHelp" placeholder="Enter your email"/>
          <input name="password" value={password} onChange={onInputChange} type="password" className="login-input"  placeholder="Password"/>
        <div className="buttons-login-container">
          <button type="submit" className="login-button">Submit</button>
          <button type="submit" className="login-button">Register</button>
        </div>
      </form>
    </div>
  )
}