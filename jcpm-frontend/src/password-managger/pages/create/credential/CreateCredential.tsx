import { useDispatch, useSelector } from "react-redux"
import { RxCrossCircled } from "react-icons/rx"
import { AppDispatch } from "../../../../store/store"
import { onClosePopUp, onSelectCredential, startCreateCredential, startUpdateCredential } from "../../../../store/slices"
import { useForm } from "../../../../hooks/useForm"
import { ICreateCredential, ICredential } from "../../../../types"
import { RootState } from "@reduxjs/toolkit/query"
import { MdEmail } from "react-icons/md"
import { RiLockPasswordFill } from "react-icons/ri"
import { TbWorld } from "react-icons/tb"
import "./createCredential.css"
import { useEffect, useMemo, useState } from "react"
import { FaEye } from "react-icons/fa"
import { credentialSchema } from "../../../../schemas/credentialShema"

interface IFormCredential{
  title:string;
  email:string;
  password:string;
  webLink:string;
  //note:string;
}
let formInitialState={
  title:"",
  email:"",
  password:"",
  webLink:"",
  //note:"",
}
interface IformErrors{
  errorTitle:string,
  errorEmail:string,
  errorPassword:string,
  errorWebLink:string,
  //note:"",
}

export const CreateCredential = () => {
  const { actionPopUp } = useSelector((state: RootState) => state.popUp);
  const { user } = useSelector((state: RootState) => state.auth);
  const { isSavinCredential, selectedCredential } = useSelector((state: RootState) => state.credential);

  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  const [errorMessages, setErrorMessages] = useState<IformErrors>({
    errorTitle: "",
    errorEmail: "",
    errorPassword: "",
    errorWebLink: ""
  });

  const formInitialState = useMemo(() => {
  return actionPopUp === "edit"
    ? {
        title: selectedCredential.title,
        email: selectedCredential.email,
        password: selectedCredential.password,
        webLink: selectedCredential.website
      }
    : {
        title: "",
        email: "",
        password: "",
        webLink: ""
      };
  }, [actionPopUp, selectedCredential]);


  const {
  title,
  email,
  password,
  webLink,
  formState,
  onInputChange
  } = useForm<IFormCredential>(formInitialState);


  const [buttonState, setButtonState] = useState(false);

  const validate = async () => {
    try {
      await credentialSchema.validate(formState, { abortEarly: false });
      setErrorMessages({ errorTitle: "", errorEmail: "", errorPassword: "", errorWebLink: "" });
      setButtonState(true);
    } catch (err: any) {
      const newErrors: IformErrors = { errorTitle: "", errorEmail: "", errorPassword: "", errorWebLink: "" };
      setButtonState(false);
      err.errors.forEach((errorElement: string) => {
        if (errorElement === "please name your credential") newErrors.errorTitle = errorElement;
        if (errorElement === "email is requiered") newErrors.errorEmail = errorElement;
        if (errorElement === "password is required") newErrors.errorPassword = errorElement;
        if (errorElement === "the website is required") newErrors.errorWebLink = errorElement;
      });
      setErrorMessages(newErrors);
    }
  };

  useEffect(() => {
    validate();
  }, [title, email, password, webLink]);

  const onSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!buttonState) return;

    const commonData = {
      title,
      email,
      password,
      website: webLink,
      user: user.userId,
    };

    if (actionPopUp === "edit") {
      const data: ICredential = {
        ...commonData,
        credentialId: selectedCredential.credentialId,
        groupId: selectedCredential.groupId,
      };
      dispatch(startUpdateCredential(data));
      dispatch(onSelectCredential(data));
    } else {
      const data: ICreateCredential = {
        ...commonData,
        groupId: [],
      };
      dispatch(startCreateCredential(data));
    }
    dispatch(onClosePopUp());
  };

  return (
    <form onSubmit={onSubmitForm} className="create-acount-container">
      <div className="create-top-buttons">
        <button type="button" onClick={() => dispatch(onClosePopUp())}>
          <RxCrossCircled className="create-icon" />
        </button>
        <button type="submit" disabled={!buttonState || isSavinCredential}>Save</button>
      </div>

      <div className="input-container-create">
        <input
          type="text"
          name="title"
          value={title}
          onChange={onInputChange}
          placeholder="Site's name"
          className={`input-field-create ${errorMessages.errorTitle ? "input-error" : ""}`}
        />
        {errorMessages.errorTitle && <span className="error-message">{errorMessages.errorTitle}</span>}

        <div className="input-credentials-create">
          <div className={`input-credential-field ${errorMessages.errorEmail ? "input-error" : ""}`}>
            <MdEmail className="create-icon" />
            <input type="email" name="email" value={email} onChange={onInputChange} placeholder="Email" />
          </div>
          {errorMessages.errorEmail && <span className="error-message">{errorMessages.errorEmail}</span>}

          <div className={`input-credential-field ${errorMessages.errorPassword ? "input-error" : ""}`}>
            <RiLockPasswordFill className="create-icon" />
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={password}
              onChange={onInputChange}
              placeholder="Password"
            />
            <FaEye onClick={() => setShowPassword(!showPassword)} className="create-icon" />
          </div>
          {errorMessages.errorPassword && <span className="error-message">{errorMessages.errorPassword}</span>}
        </div>

        <div className="input-credentials-create">
          <div className={`input-credential-field ${errorMessages.errorWebLink ? "input-error" : ""}`}>
            <TbWorld className="create-icon" />
            <input type="text" name="webLink" value={webLink} onChange={onInputChange} placeholder="Website link" />
          </div>
          {errorMessages.errorWebLink && <span className="error-message">{errorMessages.errorWebLink}</span>}
        </div>
      </div>
    </form>
  );
};
