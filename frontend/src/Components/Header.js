import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import NavDropdown from 'react-bootstrap/NavDropdown';

import { useState } from 'react';

function Header() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <Navbar expand="lg"  bg="dark" data-bs-theme="dark">
        <Navbar.Brand href="/" className='mx-3'>IIT Hub</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Navbar>
            <button variant="primary" onClick={handleShow} style={{backgroundColor: '#212529', margin: '0', border: '0', color:'#ffffff8c', paddingLeft:'0'}}>Academics</button>

                <Offcanvas show={show} onHide={handleClose}>
                  <Offcanvas.Header closeButton>
                    <Offcanvas.Title>ACADEMICS</Offcanvas.Title>
                  </Offcanvas.Header>
                  <Offcanvas.Body>
                      <ul style={{listStyle:'none'}}>
                          <li style={{padding:10}}><a href="/Academic" style={{textDecoration: 'none',color:'#3B4045'}}>Computer Science and Engineering</a></li>
                          <li style={{padding:10}}><a href="/Academic" style={{textDecoration: 'none',color:'#3B4045'}}>Electrical Engineering</a></li>
                          <li style={{padding:10}}><a href="/Academic" style={{textDecoration: 'none',color:'#3B4045'}}>Civil Engineering</a></li>
                          <li style={{padding:10}}><a href="/Academic" style={{textDecoration: 'none',color:'#3B4045'}}>Mechanical Engineering</a></li>
                          <li style={{padding:10}}><a href="/Academic" style={{textDecoration: 'none',color:'#3B4045'}}>Chemical Engineering</a></li>
                          <li style={{padding:10}}><a href="/Academic" style={{textDecoration: 'none',color:'#3B4045'}}>Aerospace Engineering</a></li>
                      </ul>
                  </Offcanvas.Body>
                </Offcanvas>
            </Navbar>
            <Nav.Link href="/Research">Research</Nav.Link>
            <Nav.Link href="/Alumni" className='me-3'>Alumni</Nav.Link>

            <NavDropdown title="User" id="basic-nav-dropdown">
             <NavDropdown.Item href="/Profile">Profile</NavDropdown.Item>
             <NavDropdown.Item href="/Darkmode">Dark mode</NavDropdown.Item>
             <NavDropdown.Divider />
             <NavDropdown.Item href="/Logout">Logout</NavDropdown.Item>
              
              </NavDropdown>
              
          </Nav>
        </Navbar.Collapse>
    </Navbar>
  );
}

export default Header;