import { useDispatch, useSelector } from "react-redux"
import { RxCrossCircled } from "react-icons/rx"
import { AppDispatch } from "../../../../store/store"
import { onClosePopUp, startCreateCredential } from "../../../../store/slices"
import { useForm } from "../../../../hooks/useForm"
import { ICreateCredential, ICredential } from "../../../../types"
import { RootState } from "@reduxjs/toolkit/query"
import { MdEmail } from "react-icons/md"
import { RiLockPasswordFill } from "react-icons/ri"
import { TbWorld } from "react-icons/tb"
import "./createCredential.css"

interface IFormCredential{
  title:string;
  email:string;
  password:string;
  webLink:string;
  note:string;
}
let formInitialState={
  title:"",
  email:"",
  password:"",
  webLink:"",
  note:"",
}
export const CreateCredential = () => {

    const {actionPopUp} = useSelector((state:RootState)=>state.popUp)
    const dispatch=useDispatch<AppDispatch>()
    const {title,email,password,webLink,note,onInputChange,onResetForm}=useForm<IFormCredential>(formInitialState)
    const {isSavinCredential,selectedCredential} = useSelector((state:RootState)=>state.credential)
    
    if(actionPopUp=="edit"){
      formInitialState={
        title:selectedCredential.title,
        email:selectedCredential.email,
        password:selectedCredential.password,
        webLink:selectedCredential.webSite,
        note:"",
    }
  }
    

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

        <form onSubmit={onSubmitForm} className="create-acount-container">
          <div className="create-top-buttons">
            <button type="button" onClick={()=>dispatch(onClosePopUp())}><RxCrossCircled className="create-icon" /></button>
            <button type="submit" disabled={isSavinCredential}>Save</button>
          </div>
          
          <div className="input-container-create">
              <input type="text" name="title" value={title} onChange={onInputChange}  placeholder="Enter the name of the site" className="input-field-create"/>
          
              <div className="input-credentials-create">
                <div className="input-credential-field" style={{borderBottom:"1px solid #6e6e75"}}><MdEmail className="create-icon"/><input type="email" name="email" value={email} onChange={onInputChange} placeholder="Email"/></div>            
                <div className="input-credential-field"><RiLockPasswordFill className="create-icon"/><input type="password" name="password" value={password} onChange={onInputChange}  placeholder="Password"/></div>
              </div>
              <div className="input-credentials-create">                    
                <div className="input-credential-field"><TbWorld className="create-icon"/><input type="text" name="webLink" value={webLink} onChange={onInputChange}  placeholder="Website link"/></div>
              </div>
              <select name="groups" id="groups" className="create-select">
                <option value="volvo">Volvo</option>
                <option value="saab">Saab</option>
                <option value="mercedes">Mercedes</option>
                <option value="audi">Audi</option>
              </select>
            </div>
          
          </form>
  )
}