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
//expand="lg" bg="dark" data-bs-theme="dark" style={{ backgroundColor: '#0D1520' }}
  return (
    <Navbar className='custom-navbar'>
      <Navbar.Brand href="/" className='mx-3' style={{ color: 'white' }}>IIT Hub</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ms-auto">
          <Nav.Link href="/" style={{ color: 'white' }}>Home</Nav.Link>
          <Navbar >
            <BranchSelect />
          </Navbar>
          <Nav.Link href="/Research" style={{ color: 'white' }}>Research</Nav.Link>
          <Nav.Link href="/Alumni" className='me-3' style={{ color: 'white' }}>Alumni</Nav.Link>

          <NavDropdown title={'User'} align={{ lg: 'end' }} id="dropdown-menu-align-responsive-1" variant='secondary' >
            <NavDropdown.Item href="/Profile" style={{ color: 'black' }}>Profile</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item onClick={Logout} style={{ color: 'black' }}>Logout</NavDropdown.Item>
          </NavDropdown>

        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Header;
