import React, { useState, useEffect} from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
  NavLink,
  Alert
} from 'reactstrap';
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { login } from "../../actions/authActions";
import { clearErrors } from "../../actions/errorActions";

const LoginModal = ({ error, isAuthenticated, login, clearErrors }) => {
  const [state, setState] = useState({
    modal: false,
    email: '',
    password: '',
    msg: null
  });

  useEffect(() => {
    if (error.id === 'LOGIN_FAIL') {
      setState((state) => ({ ...state, msg: error.msg.msg }));
    } else {
      setState((state) => ({ ...state, msg: null }));
    }
  }, [error]);

  useEffect(() => {
    // if authenticated close Modal
    if (state.modal) {
      if (isAuthenticated) {
        toggle();
      }
    }
  });

  const toggle = () => {
    clearErrors();
    setState({ ...state, modal: !state.modal });
  };

  const onChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const { email, password } = state;

    const user = {
      email,
      password
    }

    // attempt to login
    login(user)
  };

  return (
    <div>
      <NavLink onClick={toggle} href="#">
        Login
      </NavLink>

      <Modal isOpen={state.modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Login</ModalHeader>
        <ModalBody>
          {state.msg && <Alert color="danger">{state.msg}</Alert>}
          <Form onSubmit={onSubmit}>
            <FormGroup>
              <Label for="email">Email</Label>
              <Input
                type="text"
                name="email"
                id="email"
                placeholder="Email"
                className="mb-3"
                onChange={onChange}
              />
              <Label for="email">Password</Label>
              <Input
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                className="mb-3"
                onChange={onChange}
              />

              <Button
                color="dark"
                style={{ marginTop: '2rem' }}
                block
                type="submit"
              >
                Login
              </Button>
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  );
};

LoginModal.protoTypes = {
  isAuthenticated: PropTypes.bool,
  error: PropTypes.object.isRequired,
  login: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error
});

export default connect(mapStateToProps, {login, clearErrors})(LoginModal)