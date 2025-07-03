import { useDispatch, useSelector } from "react-redux"
import { useForm } from "../../../../hooks/useForm"
import { onClosePopUp, startCreateGroup } from "../../../../store/slices"
import { AppDispatch } from "../../../../store/store"
import { RxCrossCircled } from "react-icons/rx"
import { ICredential, IGroup } from "../../../../types"
import { RootState } from "@reduxjs/toolkit/query"
import "./CreateGroup.css"

interface IFormGroup {
  groupName: string;
  selectedCredentialIds: string[];
}

export const CreateGroup = () => {

  const {groupName,onInputChange}=useForm<{groupName:string}>({groupName:""});
  const dispatch=useDispatch<AppDispatch>();

  const {isSavinGroup} = useSelector((state:RootState)=>state.group);
  const {credentials} = useSelector((state:RootState)=>state.credential);

  const onSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
  
  const {
    groupName,
    selectedCredentialIds,
    onInputChange,
    setFieldValue
  } = useForm<IFormGroup>({
    groupName: "",
    selectedCredentialIds: [],
  });


  const onSubmitForm=(e:React.FormEvent)=>{
        e.preventDefault();
        const data:IGroup={
          groupId: Math.random(), 
          titleGroup:groupName,
          credentials:[],
        }
        dispatch(startCreateGroup(data));
        dispatch(onClosePopUp())
      }
  return (
      <form onSubmit={onSubmitForm} className="create-group">
        <div className="create-top-buttons">
          <button type="button" onClick={()=>dispatch(onClosePopUp())}><RxCrossCircled className="create-icon" /></button>
          <button type="submit" disabled={isSavinGroup}>Save</button>
        </div>
          <input type="text" placeholder="Group name" name="groupName" value={groupName} onChange={onInputChange} className="input-group-name"/>
        <select name="groups" id="groups">
          <option value="volvo">Credenciales</option>
          {/* rest of the options using credentials */}
        </select>
      </form> 
  )
}