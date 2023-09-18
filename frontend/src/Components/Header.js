import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
function Header() {
  return (
    <Navbar expand="lg"  bg="dark" data-bs-theme="dark">
        <Navbar.Brand href="/" className='mx-3'>IIT Hub</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <NavDropdown title="Academics" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Computer Science and Engineering</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Electrical Engineering</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Mechanical Engineering</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Civil Engineering</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Chemical Engineering</NavDropdown.Item>
              <NavDropdown.Divider />
            </NavDropdown>
            <Nav.Link href="/Research">Research</Nav.Link>
            <Nav.Link href="/Alumni" className='mx-3'>Alumni</Nav.Link>
            <Nav.Link href="/Profile" className='mx-3'>Profile</Nav.Link>
          </Nav>
        </Navbar.Collapse>
    </Navbar>
  );
}

export default Header;