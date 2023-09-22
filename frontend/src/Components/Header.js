import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
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
          </Nav>
        </Navbar.Collapse>
    </Navbar>
  );
}

export default Header;