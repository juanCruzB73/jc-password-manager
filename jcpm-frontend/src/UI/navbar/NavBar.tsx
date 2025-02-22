import Nav from 'react-bootstrap/Nav';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@reduxjs/toolkit/query';
import { RxHamburgerMenu } from "react-icons/rx";
import { HiPlusCircle } from 'react-icons/hi';
import { useEffect, useRef, useState } from 'react';
import { AddMenu } from '../add-menu/AddMenu';
import "./navbar.css"
import { SessionMenu } from '../session-menu/SessionMenu';
import { AppDispatch } from '../../store/store';
import { CiLogout } from 'react-icons/ci';
import { onLogOut } from '../../store/slices';


export const NavBar = () => {
  
  const dispath=useDispatch<AppDispatch>();
    const {statusPopUp} = useSelector((state:RootState)=>state.popUp);
    const {user} = useSelector((state:RootState)=>state.auth);
    const [showAddMenu,setShowAddMenu] = useState(false);
    const [showSesionButton,setShowSesionButton] = useState(false);
    
    const formRef = useRef<HTMLDivElement>(null); // Reference to the form container
    
    // Close the pop-up when clicking outside
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (formRef.current && !formRef.current.contains(event.target as Node)) {
          setShowAddMenu(false);
        }
      };

      if (showAddMenu) {
        document.addEventListener("mousedown", handleClickOutside);
      }

      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [showAddMenu]);

    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (formRef.current && !formRef.current.contains(event.target as Node)) {
          setShowSesionButton(false);
        }
      };

      if (showSesionButton) {
        document.addEventListener("mousedown", handleClickOutside);
      }

      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [showSesionButton]);

    //close addmenu when option clicked
    useEffect(()=>{
      if(statusPopUp ==  true){
        setShowAddMenu(false);
      }
    },[statusPopUp])

    return (
      <Nav variant="underline" className="navbar-container">
              <Nav.Item style={{width:"10%"}}>
                <div className='nav-bar-session'>
                  <button type="button" onClick={()=>{dispath(onLogOut())}}><CiLogout className="add-session-icon"/></button>
                </div >
                <Nav.Link ><RxHamburgerMenu className='hamburger-button' onClick={()=>setShowSesionButton(true)}/></Nav.Link>
              </Nav.Item>
              <Nav.Item style={{width:"50%"}}>
                <input type="text" className='navbar-search-bar'/>
              </Nav.Item>
              <Nav.Item style={{width:"10%"}}>
                <Nav.Link onClick={()=>setShowAddMenu(true)}><HiPlusCircle className='add-password'/></Nav.Link>
              </Nav.Item>
              {showAddMenu && (
                <div ref={formRef} className="add-menu-container">
                    <AddMenu/>
                </div>
              )}
              {showSesionButton && (
                <div ref={formRef} className="add-menu-container">
                    <SessionMenu/>
                </div>
              )}
      </Nav>
      );
}
