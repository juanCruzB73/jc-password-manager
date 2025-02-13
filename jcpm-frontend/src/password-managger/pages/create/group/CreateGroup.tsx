import { useDispatch } from "react-redux"
import { useForm } from "../../../../hooks/useForm"
import { onClosePopUp } from "../../../../store/slices"
import { AppDispatch } from "../../../../store/store"
import { RxCrossCircled } from "react-icons/rx"
import { IGroup } from "../../../../types"

export const CreateGroup = () => {

  const {groupName,onInputChange}=useForm<{groupName:string}>({groupName:""})
  const dispatch=useDispatch<AppDispatch>()
  const onSubmitForm=(e:React.FormEvent)=>{
        e.preventDefault();
        const data:IGroup={//ICreateGroup|
          groupId: Math.random(), 
          titleGroup:groupName,
          credentials:[]
        }
        //dispatch groups
      }
  return (
    <div className="create-group">
      <form action="">
        <div className="create-top-buttons">
          <button type="button" onClick={()=>dispatch(onClosePopUp())}><RxCrossCircled className="create-icon" /></button>
          <button type="submit">Save</button>
        </div>
        <div>
          <input type="text" placeholder="Group name" name="groupName" value={groupName} onChange={onInputChange}/>
        </div>
        <select name="groups" id="groups">
          <option value="volvo">Volvo</option>
          <option value="saab">Saab</option>
          <option value="mercedes">Mercedes</option>
          <option value="audi">Audi</option>
        </select>
      </form> 
    </div>
  )
}