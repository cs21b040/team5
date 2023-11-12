import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import BranchSelect from './BranchSelect';
import '../Components/Styles/header.css';
import { ChatState } from '../context/chatProvider';

function Header() {
  const Logout = () => {
    sessionStorage.removeItem('userInfo');
    window.location.href = '/';
  }
  const {
    selectedChat,
    setSelectedChat,
    user,
  } = ChatState();
  return (
    <Navbar expand="lg" className="bg-body-tertiary" style={{ fontSize: '18px' }}>
  <Navbar.Brand href="/" className='mx-3'>IIT Hub</Navbar.Brand>
  <Navbar.Toggle aria-controls="basic-navbar-nav" />
  <Navbar.Collapse id="basic-navbar-nav">
    <Nav className="ms-auto">
      <Nav.Link href="/home">Home</Nav.Link>
      <Navbar >
        <BranchSelect />
      </Navbar>
      <Nav.Link href="/Research">Research</Nav.Link>
      <Nav.Link href="/Alumni" className='me-3'>Alumni</Nav.Link>
      {
        user && user.userType==="Admin" ?<Nav.Link href="/admin" className='me-3'>Admin</Nav.Link> : null      }
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
