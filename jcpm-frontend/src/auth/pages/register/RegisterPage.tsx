import { useDispatch } from "react-redux";
import { useForm } from "../../../hooks/useForm";
import { AppDispatch } from "../../../store/store";
import { startAcountResgister } from "../../../store/slices";
import { useNavigate } from "react-router";
import "./resgister.css"
import { useEffect, useState } from "react";
import { registerSchema } from "../../../schemas/registerSchema";


interface IRegisterForm {
  username: string
  email: string;
  password: string;
  password2: string
}

interface IRegisterErrors {
  username?: string;
  email?: string;
  password?: string;
  password2?: string;
}
const intialFormValue: IRegisterForm = {
  username: "",
  email: "",
  password: "",
  password2: ""
}

export const RegisterPage = () => {
  const { email, password, username, password2, onInputChange } = useForm<IRegisterForm>(intialFormValue)

  const dispath = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const onSubmitLogin = (event: React.FormEvent) => {
    event.preventDefault();
    dispath(startAcountResgister({ username, email, password }))

  }
  const [errors, setErrors] = useState<IRegisterErrors>({});
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    const validate = async () => {
      try {
        await registerSchema.validate({ username, email, password, password2 }, { abortEarly: false });
        setErrors({});
        setIsValid(true);
      } catch (err: any) {
        const newErrors: IRegisterErrors = {};
        err.inner.forEach((e: any) => {
          newErrors[e.path as keyof IRegisterErrors] = e.message;
        });
        setErrors(newErrors);
        setIsValid(false);
      }
    };

    validate();
  }, [username, email, password, password2]);

  return (
    <div className="register-container">
      <form className="register-form" onSubmit={onSubmitLogin}>
        <input
          name="username"
          value={username}
          onChange={onInputChange}
          type="text"
          className={`register-input ${errors.username ? "input-error" : ""}`}
          placeholder="Enter your username"
        />
        {errors.username && <span className="error-message">{errors.username}</span>}

        <input
          name="email"
          value={email}
          onChange={onInputChange}
          type="email"
          className={`register-input ${errors.email ? "input-error" : ""}`}
          placeholder="Enter your email"
        />
        {errors.email && <span className="error-message">{errors.email}</span>}

        <input
          name="password"
          value={password}
          onChange={onInputChange}
          type="password"
          className={`register-input ${errors.password ? "input-error" : ""}`}
          placeholder="Password"
        />
        {errors.password && <span className="error-message">{errors.password}</span>}

        <input
          name="password2"
          value={password2}
          onChange={onInputChange}
          type="password"
          className={`register-input ${errors.password2 ? "input-error" : ""}`}
          placeholder="Confirm your password"
        />
        {errors.password2 && <span className="error-message">{errors.password2}</span>}

        <div className="buttons-register-container">
          <button type="submit" className="register-button" disabled={!isValid}>Submit</button>
          <button type="button" className="login-button" onClick={() => navigate("/auth/login")}>Login</button>
        </div>
      </form>
    </div>
  )
}
