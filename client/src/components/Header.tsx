import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import { Nav, Navbar, Container, NavDropdown } from 'react-bootstrap';
import { RootStore } from '../redux/store';
import { logout } from '../redux/actions/user/user';

const Header: React.FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { userDetails } = useSelector((state: RootStore) => state.user);

  const logoutHandler = (): void => {
    dispatch(logout());
    history.push('/');
  };

  const displayDropdown = () => {
    return !!userDetails ? (
      <NavDropdown id='username' title={userDetails.name}>
        <LinkContainer to='/profile'>
          <NavDropdown.Item>Profile</NavDropdown.Item>
        </LinkContainer>
        <NavDropdown.Item onClick={logoutHandler}>
          <i className='fas fa-sign-out-alt mr-2'></i>Logout
        </NavDropdown.Item>
      </NavDropdown>
    ) : (
      <>
        <LinkContainer to='/login'>
          <Nav.Link>
            <i className='fas fa-sign-in-alt mr-2'></i>
            Login
          </Nav.Link>
        </LinkContainer>
        <LinkContainer to='/register'>
          <Nav.Link>
            <i className='fas fa-user mr-2' />
            Register
          </Nav.Link>
        </LinkContainer>
      </>
    );
  };

  return (
    <header>
      <Navbar fixed='top' bg='dark' variant='dark' expand='lg' collapseOnSelect>
        <Container>
          <LinkContainer to='/'>
            <Navbar.Brand>Tzaru</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='ml-auto'>
              <LinkContainer to='/cart'>
                <Nav.Link>
                  <i className='fas fa-shopping-cart mr-2' />
                  Cart
                </Nav.Link>
              </LinkContainer>
              {displayDropdown()}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
