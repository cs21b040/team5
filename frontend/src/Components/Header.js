import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import BranchSelect from './BranchSelect';
function Header() {
  return (
    <Navbar expand="lg"  bg="dark" data-bs-theme="dark">
        <Navbar.Brand href="/" className='mx-3'>IIT Hub</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Navbar>
              <BranchSelect/>
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