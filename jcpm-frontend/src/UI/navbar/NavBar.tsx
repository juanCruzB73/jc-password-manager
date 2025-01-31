import Nav from 'react-bootstrap/Nav';
import "./navbar.css"

export const NavBar = () => {
  const status = "non-authenticated"
    return (
      <Nav variant="underline" style={{margin:"10px", height:"20%",width:"100%"}}>
        {
          (status == "non-authenticated") ?
          (
            <>
              <h1 className="shiny-title-navbar">Jc Password Manager</h1>

            </>
          ):
          (
            <>
              <Nav.Item>
                <Nav.Link href="/home">Active</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="link-1">Option 2</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="disabled" disabled>
                  Disabled
                </Nav.Link>
              </Nav.Item>
            </>
          )
        }
      </Nav>
      );
}
