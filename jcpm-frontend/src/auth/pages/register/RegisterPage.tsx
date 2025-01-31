import { useForm } from "../../../hooks/useForm";
import "./resgister.css"

interface IRegisterForm{
  username:string
  email:string;
  password:string;
  password2:string
}
const intialFormValue:IRegisterForm={
  username:"",
  email:"",
  password:"",
  password2:""
}

export const RegisterPage = () => {
  const {email,password,username,password2,onInputChange}=useForm<IRegisterForm>(intialFormValue)
  
    const onSubmitLogin=(event:React.FormEvent)=>{
      event.preventDefault();
      console.log(username,email,password,password2)
    }
  
    return (
      <div className="register-container">
        <h1 className="register-title">Register</h1>
        <form className="register-form" onSubmit={onSubmitLogin}>
        <input name="username" value={username} onChange={onInputChange} type="text" className="register-input" aria-describedby="emailHelp" placeholder="Enter your username"/>
            <input name="email" value={email} onChange={onInputChange} type="email" className="register-input" aria-describedby="emailHelp" placeholder="Enter your email"/>
            <input name="password" value={password} onChange={onInputChange} type="password" className="register-input"  placeholder="Password"/>
            <input name="password2" value={password2} onChange={onInputChange} type="password" className="register-input"  placeholder="Enter your Password again pls"/>
          <div className="buttons-register-container">
            <button type="submit" className="register-button">Submit</button>
            <button type="submit" className="register-button">Register</button>
          </div>
        </form>
      </div>
      )
}
