import { FC, useState } from "react";
import { PasswordCard } from "../password-card/PasswordCard";
import { RootState } from "@reduxjs/toolkit/query";
import { ICredential, IGroup } from "../../../types";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../store/store";
import {onSelectGroup} from "../../../store/slices/group/groupSlice";
import "./SideBar.css";
import { FaPencilAlt, FaTrash } from "react-icons/fa";

export const SideBar:FC = () => {

  const {credentials} = useSelector((state:RootState)=>state.credential);
  const {groups,selectedGroup} = useSelector((state:RootState)=>state.group);
  const [showGroups,setShowGroups]=useState(false);

  const dispath=useDispatch<AppDispatch>()

  const onHandleSelectGroup=(groupIn:IGroup|null)=>{
    dispath(onSelectGroup(groupIn));
  }

  return (
    <div className="sidebar-container">
      <div className="filter-buttons">
        <button onClick={()=>setShowGroups(!showGroups)}>Groups</button>{selectedGroup!==null?<button>{selectedGroup.titleGroup}</button>:<></>}
        {
          showGroups?(
            <div className="group-diplay">
              <span onClick={()=>onHandleSelectGroup(null)}>Clear Group</span>
              {
                groups.map((group:IGroup)=>(
                  <div className="groupSelectoContainer">
                    <span key={group.groupId} onClick={()=>onHandleSelectGroup(group)}>{group.titleGroup}</span>
                    <div className="groupButtons">
                      <button type="button" onClick={()=>{}}><FaPencilAlt className="icons-top" /></button >
                      <button type="button" onClick={()=>{}}><FaTrash className="icons-top"/></button >
                    </div></div>
                ))
              }
            </div>
          ):(
            <></>
          )
        }
      </div>
      {
        credentials.map((credential:ICredential) =>(
          <PasswordCard key={credential.credentialId} credential={credential}/>
        ))
      }
    </div>
  )
}
