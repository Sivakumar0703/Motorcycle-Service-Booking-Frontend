// homepage nav bar

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import '../Navbar/Navbar.css'
import { useNavigate } from 'react-router-dom';


function CollapsibleExample() {

  const user = JSON.parse(localStorage.getItem('user'));
  const role = JSON.parse(localStorage.getItem('user'))?.role;
  const navigate = useNavigate();

  function logout() {
    localStorage.removeItem('user');
    navigate('/')
  }

  function gotoLogin() {
    navigate('/login')
  }


  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container >
        <Navbar.Brand href="#home">Moto Health Care</Navbar.Brand>

        <Navbar.Toggle aria-controls="responsive-navbar-nav" />

        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            {/*  */}
            {user ?
              <NavDropdown title={user.userName.toUpperCase()} id="collasible-nav-dropdown">
                {role === 'admin' ? <NavDropdown.Item href="admin/dashboard">Admin Panel</NavDropdown.Item> : ''
                }            <NavDropdown.Item href="/">Home</NavDropdown.Item>
                <NavDropdown.Item href="/profile">
                  Profile
                </NavDropdown.Item>
                <NavDropdown.Item href="#" onClick={logout}>Logout</NavDropdown.Item>

              </NavDropdown>
              :
              <div>
                <button className='btn btn-primary' onClick={gotoLogin}> Login  </button>
              </div>
            }
          </Nav>
        </Navbar.Collapse>

      </Container>
    </Navbar>
  );
}

export default CollapsibleExample;