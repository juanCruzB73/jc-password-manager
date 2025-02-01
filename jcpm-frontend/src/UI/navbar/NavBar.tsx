import Nav from 'react-bootstrap/Nav';
import { useSelector } from 'react-redux';
import { RootState } from '@reduxjs/toolkit/query';
import { RxHamburgerMenu } from "react-icons/rx";
import "./navbar.css"



export const NavBar = () => {
  const {status} = useSelector((state:RootState)=>state.auth)
    return (
      <Nav variant="underline" className="navbar-container">
        {
          (status == "non-authenticated" || status == "checking") ?
          (
            <>
              <h1 className="shiny-title-navbar">Jc Password Manager</h1>

            </>
          ):
          (
            <>
              <Nav.Item>
                <Nav.Link href="/home"><RxHamburgerMenu style={{color:"white"}}/></Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <input type="text" />
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="link-1" style={{color:"white"}}>+</Nav.Link>
              </Nav.Item>
            </>
          )
        }
      </Nav>
      );
}
