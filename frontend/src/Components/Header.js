import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import BranchSelect from './BranchSelect';
import '../Components/Styles/header.css';
function Header() {
  const Logout = () => {
    sessionStorage.removeItem('userInfo');
    window.location.href = '/';
  }

  return (
    <Navbar expand="lg" className="bg-body-tertiary" style={{ fontSize: '18px' }}>
  <Navbar.Brand href="/" className='mx-3'>IIT Hub</Navbar.Brand>
  <Navbar.Toggle aria-controls="basic-navbar-nav" />
  <Navbar.Collapse id="basic-navbar-nav">
    <Nav className="ms-auto">
      <Nav.Link href="/">Home</Nav.Link>
      <Navbar >
        <BranchSelect />
      </Navbar>
      <Nav.Link href="/Research">Research</Nav.Link>
      <Nav.Link href="/Alumni" className='me-3'>Alumni</Nav.Link>
    </Nav>
    <NavDropdown title={<span style={{ color: '#000000a6', margin: '0'}}>User</span>} align={{ lg: 'end' }} id="dropdown-menu-align-responsive-1" variant='secondary' >
      <NavDropdown.Item href="/Profile">Profile</NavDropdown.Item>
      <NavDropdown.Divider />
      <NavDropdown.Item onClick={Logout}>Logout</NavDropdown.Item>
    </NavDropdown>
  </Navbar.Collapse>
</Navbar>
  );
}

export default Header;
