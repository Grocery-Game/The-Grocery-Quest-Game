import React, {useState} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
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

const AppNavBar = ({auth}) => {
  const [isOpen, setIsOpen] = useState(false);

  const { isAuthenticated, user } = auth;

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

AppNavBar.propTypes = {
  auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps, null)(AppNavBar);