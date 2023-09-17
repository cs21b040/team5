import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
function BasicExample() {
  return (
    <Navbar expand="lg"  bg="dark" data-bs-theme="dark">
      <Container>
        <Navbar.Brand href="/" className='me-auto'>IIT Hub</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <NavDropdown title="Academics" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">CSE</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">EEE</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">ME</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">CE</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">CH</NavDropdown.Item>
              <NavDropdown.Divider />
            </NavDropdown>
            <Nav.Link href="/Academic">Academic</Nav.Link>
            <Nav.Link href="/Alumni">Alumni</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default BasicExample;