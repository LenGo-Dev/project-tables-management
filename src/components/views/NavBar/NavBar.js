import {Navbar, Nav, Container} from 'react-bootstrap';
import {NavLink} from 'react-router-dom';

const NavBar = () => {
  return (
    <Navbar bg="primary"
            variant="dark"
            expand="lg"
            className="mt-4 mb-4 rounded px-3 justify-content-between align-items-center">
      <Navbar.Brand as={NavLink} to="/" className="fw-bold">
        Waiter.app
      </Navbar.Brand>
      <Nav>
        <Nav.Link
          as={NavLink}
          to="/"
          className="ms-3"
          style={{ color: 'white' }}
        >
          Home
        </Nav.Link>
      </Nav>

    </Navbar>
  );
};

export default NavBar;