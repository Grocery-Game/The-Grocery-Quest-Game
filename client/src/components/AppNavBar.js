import React, {useState} from 'react';
import { useSelector } from 'react-redux';
import RegisterModule from './auth/RegisterModal';
import LoginModal from './auth/LoginModal';
import Logout from './auth/Logout';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  Container,
} from 'reactstrap';

const AppNavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { user } = useSelector(state => state.auth);
  const { isAuthenticated } = useSelector(state => state.auth);

  const authLinks = (
    <>
      <NavItem>
        <span className="navbar-text mr-3">{user && `Welcome ${user.name}`}</span>
      </NavItem>
      <NavItem>
        <Logout />
      </NavItem>
    </>
  )

  const guestLinks = (
    <>
      <NavItem>
        <RegisterModule />
      </NavItem>
      <NavItem>
        <LoginModal />
      </NavItem>
    </>
  )

  return (
    <div>
      <Navbar color="dark" dark expand="sm" className="mb-5">
        <Container>
          <NavbarBrand href="/">Shopping List</NavbarBrand>
          <NavbarToggler onClick={() => setIsOpen(!isOpen)} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="ml-auto" navbar>
              {isAuthenticated? authLinks: guestLinks}
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default AppNavBar;