import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { RxCrossCircled } from "react-icons/rx"
import { AppDispatch } from "../../../../store/store"
import { onClosePopUp, startCreateCredential } from "../../../../store/slices"
import { useForm } from "../../../../hooks/useForm"
import { ICreateCredential, ICredential } from "../../../../types"
import "./createCredential.css"
import { RootState } from "@reduxjs/toolkit/query"

interface IFormCredential{
  title:string;
  email:string;
  password:string;
  webLink:string;
  note:string;
}
const formInitialState={
  title:"",
  email:"",
  password:"",
  webLink:"",
  note:"",
}
export const CreateCredential = () => {
    const dispatch=useDispatch<AppDispatch>()
    const {title,email,password,webLink,note,onInputChange,onResetForm}=useForm<IFormCredential>(formInitialState)
    const {isSavinCredential} = useSelector((state:RootState)=>state.credential)

    const onSubmitForm=(e:React.FormEvent)=>{
      e.preventDefault();
      const data:ICredential={//ICreateCredential|
        credentialId: Math.random(), 
        title:title,
        email:email,
        password:password,
        webSite:webLink,
        noteId:[],
        groupId:[],
      }
      dispatch(startCreateCredential(data));
      dispatch(onClosePopUp())
    }
    return (
    <div className="create-acount-container">

                <form onSubmit={onSubmitForm}>
                    <div className="create-top-buttons">
                      <button type="button" onClick={()=>dispatch(onClosePopUp())}><RxCrossCircled className="create-icon" /></button>
                      <button type="submit" disabled={isSavinCredential}>Save</button>
                    </div>

                    <div className="input-container-create">

                      <input type="text" name="title" value={title} onChange={onInputChange}  placeholder="Enter the name of the site" className="input-field-create"/>

                      <div className="input-credentials-create">                    
                          <input type="email" name="email" value={email} onChange={onInputChange} placeholder="Email"/>
                          <input type="password" name="password" value={password} onChange={onInputChange}  placeholder="Password"/>
                      </div>

                      <div className="input-credentials-create">                    
                          <input type="text" name="webLink" value={webLink} onChange={onInputChange}  placeholder="Website link"/>
                      </div>

                      <select name="groups" id="groups">
                        <option value="volvo">Volvo</option>
                        <option value="saab">Saab</option>
                        <option value="mercedes">Mercedes</option>
                        <option value="audi">Audi</option>
                      </select>

                      <div className="input-credentials-create">                    
                          <input type="text" name="note" value={note} onChange={onInputChange}  placeholder="Add note"/>
                      </div>

                  </div>
                </form>

            </div>
  )
}