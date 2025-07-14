import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../store/store';
import { RootState } from '@reduxjs/toolkit/query';
import { IOntogglePopUpInterface, onLogOut, onSelectGroup, onTogglePopUp, startDeleteGroup } from '../../store/slices';
import { CiLogout } from 'react-icons/ci';
import { useState } from 'react';
import { IGroup } from '../../types';
import { FaPencilAlt, FaTrash } from 'react-icons/fa';
import './SideBarLogOut.css';
import { AiOutlineClear } from 'react-icons/ai';
import { ConfirmCard } from '../../password-managger/components/notification.cards/confirmation-card/ConfirmCard';

export const SideBarLogOut = () => {

  const {user} = useSelector((state:RootState)=>state.auth);
  const dispath=useDispatch<AppDispatch>();
  const {groups,selectedGroup} = useSelector((state:RootState)=>state.group);
  
  const [showGroups,setShowGroups]=useState(false);
    
  const onClickOption=(popUpType:IOntogglePopUpInterface)=>{
    dispath(onTogglePopUp(popUpType))
  }

  const onHandleSelectGroup=(groupIn:IGroup|null)=>{
    dispath(onSelectGroup(groupIn));
  };

  const onHandleDeleteGroup=async(groupId:number)=>{
    dispath(startDeleteGroup(groupId));
    handleHideConfirm();
  };
  const [showConfirm,setShowConfirm]=useState(false);

  const handleHideConfirm=()=>{
    setShowConfirm(!showConfirm);
  };

  return (
    <div className="side-bar-log-out">
      
      <div className="filter-buttons">
        <div className='side-bar-log-out-group-button'>
            <button style={{padding:".3rem",marginBottom:"10px",}} onClick={()=>setShowGroups(!showGroups)}>Groups</button>{selectedGroup!==null?<button>{selectedGroup.titleGroup}</button>:<></>}
        </div>
        {
          showGroups?(
            <div className="group-diplay">
              <span style={{display:"flex",alignItems:"center",justifyContent:"space-between",width:"90%",marginLeft:"10px"}} onClick={()=>onHandleSelectGroup(null)}>Clear Group <AiOutlineClear/></span>
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
      </div>
      <div className='side-bar-log-out-user-info'>
        <span>User: {user.username}</span>
        <span>{user.email}</span>
        <button style={{backgroundColor:"transparent",color:"white",padding:".4rem",border:"none",alignSelf:"baseline"}} type="button" onClick={()=>{dispath(onLogOut());localStorage.clear()}}><CiLogout style={{fontSize:"1.5rem"}} /></button>
      </div>
    </div>
  )
};