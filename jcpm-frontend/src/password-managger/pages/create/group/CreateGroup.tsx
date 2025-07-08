import { useDispatch, useSelector } from "react-redux"
import { useForm } from "../../../../hooks/useForm"
import { onClosePopUp, startCreateGroup, startEditGroup, startGetCredentials } from "../../../../store/slices"
import { AppDispatch, RootState } from "../../../../store/store" // Corregido
import { RxCrossCircled } from "react-icons/rx"
import { ICredential, IGroup } from "../../../../types"
import { ICreateGroup } from "../../../../types/password-types/ICreateGroup"
import { useEffect, useState } from "react"
import { CredentialDropdown } from "../../../components/desplegable-check-boxes/CredentialDropdown"
import { extractIdsFromCredentials } from "../../../../helpers/extractIdsFromCredentials"
import "./CreateGroup.css"

interface IFormGroup {
  groupName: string;
  selectedCredentialIds: number[];
}

let formInitialState={groupName: "",selectedCredentialIds: []};

export const CreateGroup = () => {

  const dispatch = useDispatch<AppDispatch>();

  const { isSavinGroup,selectedGroup } = useSelector((state: RootState) => state.group);
  const { credentials} = useSelector((state: RootState) => state.credential);
  const { user } = useSelector((state: RootState) => state.auth);
  const {actionPopUp} = useSelector((state:RootState)=>state.popUp);

  const {groupName,selectedCredentialIds,onInputChange,setFieldValue,} = useForm<IFormGroup>(formInitialState);

  const getCredentials=async()=>{
    dispatch(await startGetCredentials(user.userId!));
  };

  if(actionPopUp=="edit"){
    const ids=extractIdsFromCredentials(selectedGroup?.credentials!);
    
    formInitialState={
      groupName:selectedGroup!.titleGroup,
      selectedCredentialIds:ids
    }
    }else{
      formInitialState={
      groupName:"",
      selectedCredentialIds:[],
    }
  }

  useEffect(()=>{
    if(actionPopUp=="edit"){
      getCredentials();
    }
  },[selectedGroup,actionPopUp])

  const onSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();
    const data: ICreateGroup = {
      titleGroup: groupName,
      user:user.userId!,
      credentials: selectedCredentialIds,
    };
    if(actionPopUp=="edit"){
      dispatch(startEditGroup({...data,user:user.userId!,groupId:selectedGroup?.groupId}));
    }else{
      dispatch(startCreateGroup(data));
    }
    dispatch(onClosePopUp());
  };

  return (
    <form onSubmit={onSubmitForm} className="create-group">
      <div className="create-top-buttons">
        <button type="button" onClick={() => dispatch(onClosePopUp())}>
          <RxCrossCircled className="create-icon" />
        </button>
        <button type="submit">Save</button>
      </div>

      <input
        type="text"
        placeholder="Group name"
        name="groupName"
        value={groupName}
        onChange={onInputChange}
        className="input-group-name"
      />

      <CredentialDropdown
        credentials={credentials}
        selectedCredentialIds={selectedCredentialIds}
        setFieldValue={setFieldValue}
      />


    </form>
  );
};
