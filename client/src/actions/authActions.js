import { returnErrors } from './errorActions';

import {
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
} from './types';

const AUTH_ENDPOINT = '/api/auth';
const USER_ENDPOINT = '/api/users';

// check token and load user
export const loadUser = () => (dispatch, getState) => {
  dispatch({ type: USER_LOADING })

  fetch(`${AUTH_ENDPOINT}/user`, {
    method: 'GET',
    headers: tokenConfig(getState),
  }).then((res) => {
      if (!res.ok) throw res;
      return res.json();
    })
    .then((json) => {
      dispatch({
      type: USER_LOADED,
      payload: json.data
    })
  }
  )
  .catch(err => {
    err.text().then(errorMessage => {
      dispatch(returnErrors(JSON.parse(errorMessage), err.status))
      dispatch({
        type: AUTH_ERROR
      })
    })
  });
};

// register user
export const register = ({name, email, password}) => dispatch => {
  fetch( USER_ENDPOINT, {
    method: 'POST',
    body: JSON.stringify({
      name,
      email,
      password
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  }).then((res) => {
      if (!res.ok) throw res;
      return res.json()
    })
    .then((json) => dispatch({
      type: REGISTER_SUCCESS,
      payload: json
    })
  )
  .catch(err => {
    err.text().then(errorMessage => {
      dispatch(returnErrors(JSON.parse(errorMessage), err.status, REGISTER_FAIL))
      dispatch({
        type: REGISTER_FAIL
      })
    })
  })
}

// login user
export const login = ({ email, password }) => dispatch => {
  fetch( AUTH_ENDPOINT, {
    method: 'POST',
    body: JSON.stringify({
      email,
      password
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  }).then((res) => {
      if (!res.ok) throw res;
      return res.json();
    })
    .then((json) => {
      dispatch({
      type: LOGIN_SUCCESS,
      payload: json
    })
  }
  )
  .catch(err => {
    err.text().then(errorMessage => {
      dispatch(returnErrors(JSON.parse(errorMessage), err.status, LOGIN_FAIL))
      dispatch({
        type: LOGIN_FAIL
      })
    })
  })
}

// logout user
export const logout = () => {
  return { type: LOGOUT_SUCCESS } 
}

// setup config/headers and token
export const tokenConfig = getState => {
  // get token from local storage
  const token = getState().auth.token;

  // headers
  const config = {
      "Content-type": "application/json"
  }

  // if token then add to headers
  if (token) {
    config['x-auth-token'] = token;
  }

  return config;
}

