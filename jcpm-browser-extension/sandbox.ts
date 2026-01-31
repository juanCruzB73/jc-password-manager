import { IUser } from "../../../types";
import { ILogin } from "../../../types/auth-types/ILogin";
import { AppDispatch } from "../../store";
import { onSetCredentialMessage } from "../credentials/credentialsSlice";
import { IPayloadResgister, onChecking, onClearLoginMessage, onLogin, onLogOut, onSetLoginMessage } from "./authSlice";

const API_URL = import.meta.env.VITE_API_URL;


export const startCheckingAuth = () => {
  return async (dispatch: AppDispatch) => {
    dispatch(onChecking())
  };
};

export const startAcountSignIn = (payload: ILogin) => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(onChecking());

      const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("token", data.token);
        dispatch(onLogin({ email: data.email, username: payload.username, userId: data.userId }));
        dispatch(onClearLoginMessage())
      } else {
        let errorText = "User or password incorrect";
        try {
          const errorData = await response.json();
          if (errorData?.message) errorText = errorData.message;
        } catch (err) { }
        dispatch(onSetLoginMessage(errorText));
      }

    } catch (error) {
      dispatch(onSetLoginMessage("Login failed. Please try again later."));
    }
  };
};


export const startAcountResgister = (payload: IPayloadResgister) => {
  return async (dispatch: AppDispatch) => {
    dispatch(onChecking());
    const response = await fetch(`${API_URL}/auth/register`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
    const data = await response.json();
    localStorage.setItem('token', data.token);
    dispatch(onLogin({ email: payload.email, username: payload.username, userId: data.userId }))
    dispatch(onClearLoginMessage())
  }
}

export const startAcountRenew = () => {
  return async (dispatch: AppDispatch) => {
    const token = localStorage.getItem('token');
    if (!token) {
      dispatch(onLogOut());
      return null;
    }
    const response = await fetch(`${API_URL}/auth/renew/${token}`, { headers: { 'Content-Type': 'application/json' } })
    if (!response.ok) {
      dispatch(onLogOut());
      return null;
    }
    const data = await response.json();
    localStorage.setItem('token', data.token);
    dispatch(onLogin({ email: data.email, username: data.username, userId: data.userId }))
    return data.token;
  }
}