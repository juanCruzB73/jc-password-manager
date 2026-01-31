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
import { onLoadCredentials, onLogOut, startGetCredentials } from '../../store/slices';
import { searchCredential } from '../../helpers/searchCredential';


export const NavBar = () => {
  
  const dispath=useDispatch<AppDispatch>();
    const {statusPopUp} = useSelector((state:RootState)=>state.popUp);
    const {credentials} = useSelector((state:RootState)=>state.credential);
    const {user} = useSelector((state:RootState)=>state.auth);
    const [showAddMenu,setShowAddMenu] = useState(false);
    const [showSesionButton,setShowSesionButton] = useState(false);
    const [searchBarInput,setSearchBarInput]=useState('');
    
    const formRef = useRef<HTMLDivElement>(null); // Reference to the form container

    //close addmenu when option clicked
    useEffect(()=>{
      if(statusPopUp ==  true){
        setShowAddMenu(false);
      }
    },[statusPopUp])
    
    const handleSessionPopUp=()=>{
      setShowSesionButton(!showSesionButton);
    };
    
    const handleAddMenu=()=>{
      setShowAddMenu(!showAddMenu);
    }
    
    const [size, setSize] = useState({
      width: window.innerWidth,
      height: window.innerHeight,
    });

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

    const handleInputSearch=(input:string)=>{
      setSearchBarInput(input);
      const setCredentials=async()=>{
        if(input==''){
          dispath(await startGetCredentials(user.userId));
          return;
        }
        const filteredCredentials=searchCredential(credentials,searchBarInput);
        dispath(onLoadCredentials(filteredCredentials));
        return;
      }
      setCredentials();
    }

    return (
      <Nav variant="underline" className="navbar-container">
        <Nav.Item style={{width:"10%", display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
           <img src="/jcpm-icon.svg" className="navbar-icon" alt="JcPasswordManager" />
        </Nav.Item>
        <Nav.Item style={{width:"10%"}}>
          <div className='nav-bar-session'>
            {size.width<762?<button type="button" onClick={()=>{dispath(onLogOut())}}><CiLogout className="add-session-icon"/></button>:<></>}
          </div >
          <Nav.Link > <RxHamburgerMenu className='hamburger-button' onClick={()=>handleSessionPopUp()}/> </Nav.Link>
        </Nav.Item>
        <Nav.Item style={{width:"50%"}}>
          <input type="text" className='navbar-search-bar' value={searchBarInput} onChange={(e)=>handleInputSearch(e.target.value)}/>
        </Nav.Item>
        <Nav.Item style={{width:"10%"}}>
          <Nav.Link onClick={()=>handleAddMenu()}><HiPlusCircle className='add-password'/></Nav.Link>
        </Nav.Item>
        {showAddMenu && (
          <div ref={formRef} className="add-menu-container">
            <AddMenu/>
          </div>
        )}
        {showSesionButton ? (
          <div ref={formRef} className="add-menu-container">
              <SessionMenu/>
          </div>
        ):(<></>)}
      </Nav>
      );
}
