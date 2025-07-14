import { FC, useEffect, useState } from "react";
import { PasswordCard } from "../password-card/PasswordCard";
import { RootState } from "@reduxjs/toolkit/query";
import { ICredential, IGroup } from "../../../types";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../store/store";
import {onSelectGroup} from "../../../store/slices/group/groupSlice";
import { FaPencilAlt, FaTrash } from "react-icons/fa";
import { IOntogglePopUpInterface, onTogglePopUp, startDeleteGroup } from "../../../store/slices";
import { AiOutlineClear } from "react-icons/ai";
import "./SideBar.css";
import { ConfirmCard } from "../notification.cards/confirmation-card/ConfirmCard";


export const SideBar:FC = () => {

  const {credentials} = useSelector((state:RootState)=>state.credential);
  const {groups,selectedGroup} = useSelector((state:RootState)=>state.group);
  const [size, setSize] = useState({width: window.innerWidth,height: window.innerHeight});
  const dispatch=useDispatch<AppDispatch>()


  const [showGroups,setShowGroups]=useState(false);

  const dispath=useDispatch<AppDispatch>();

  const onClickOption=(popUpType:IOntogglePopUpInterface)=>{
    dispath(onTogglePopUp(popUpType))
  }

  const onHandleSelectGroup=(groupIn:IGroup|null)=>{
    dispath(onSelectGroup(groupIn));
  }
  const onHandleDeleteGroup=async(groupId:number)=>{
    dispath(startDeleteGroup(groupId));
    handleHideConfirm()
  }
  
  useEffect(() => {
    const handleResize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    window.addEventListener('resize', handleResize);
    // Cleanup on unmount
    return () => window.removeEventListener('resize', handleResize);
  },[]);
  
  const [showConfirm,setShowConfirm]=useState(false);

  const handleHideConfirm=()=>{
    setShowConfirm(!showConfirm);
  };

  return (
    <>
        <div className="sidebar-container">
          {size.width<762?(<div className="filter-buttons">
            <div className="side-bar-log-out-group-button">
              <button style={{padding:".3rem",marginBottom:"10px"}} onClick={()=>setShowGroups(!showGroups)}>Groups </button>{selectedGroup!==null?<button>{selectedGroup.titleGroup}</button>:<></>}
            </div>
            {
              showGroups?(
                <div className="group-diplay">
                  <span onClick={()=>onHandleSelectGroup(null)}>Clear Group <AiOutlineClear/></span>
                  {
                    groups.map((group:IGroup)=>(
                      <div className={group==selectedGroup?"groupSelectorContainerSelected":"groupSelectorContainer"}>
                        {showConfirm&&<ConfirmCard onConfirm={()=>{onHandleDeleteGroup(group.groupId)}} onCancel={handleHideConfirm}/>}
                        <span key={group.groupId} onClick={()=>onHandleSelectGroup(group)}>{group.titleGroup}</span>
                        <div className="groupButtons">
                          <button type="button" onClick={()=>{dispath(onSelectGroup(group));onClickOption({popUpType:"group",actionPopUp:"edit"});}}><FaPencilAlt className="icons-top" /></button >
                          <button type="button" onClick={()=>handleHideConfirm()}><FaTrash className="icons-top"/></button >
                        </div>
                      </div>
                    ))
                  }
                </div>
              ):(
                <></>
              )
            }
          </div>):<></>}
          {
            credentials.map((credential:ICredential) =>(
              <PasswordCard key={credential.credentialId} credential={credential}/>
            ))
          }
      </div>
    </>
  )
}
