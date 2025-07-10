import { useEffect, useState } from "react";
import { Content } from "../../components/content/Content"
import { SideBar } from "../../components/side-bar/SideBar"
import "./HomePage.css";
import { SideBarLogOut } from "../../../UI/side-bar-log-out/SideBarLogOut";

export const HomePage = () => {

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
  
  return (
    
    <>
      <div className="home-container">
        {size.width>768?<SideBarLogOut/>:<></>}
        <SideBar/>
        <Content/>
      </div>
      
    </>
  )
}