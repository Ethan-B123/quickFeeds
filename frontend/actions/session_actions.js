import * as APIUtil from '../util/APIUtil';

export const LOGOUT_CURRENT_USER = 'LOGOUT_CURRENT_USER';
export const RECEIVE_CURRENT_USER = 'RECEIVE_CURRENT_USER';
export const RECEIVE_SESSION_ERRORS = 'RECEIVE_SESSION_ERRORS';

export const logoutCurrentUser = () => ({
  type: LOGOUT_CURRENT_USER
})

export const receiveCurrentUser = user => ({
  type: RECEIVE_CURRENT_USER,
  currentUser: user
});

export const receiveErrors = errors => ({
  type: RECEIVE_SESSION_ERRORS,
  errors
});

export const signup = user => dispatch => (
  APIUtil.signup(user).then(responseUser => {
    dispatch(receiveCurrentUser(responseUser))
  }, error => (
    dispatch(receiveErrors(error.responseJSON))
  ))
);

export const login = user => dispatch => (
  APIUtil.login(user).then(responseUser => {
    dispatch(receiveCurrentUser(responseUser))
  }, error => (
    dispatch(receiveErrors(error.responseJSON))
  ))
);

export const loginDemo =
  (user = {"username": "demo-user", "password": "password"}) =>
  dispatch => (
  APIUtil.login(user).then(responseUser => {
    dispatch(receiveCurrentUser(responseUser))
  }, error => (
    dispatch(receiveErrors(error.responseJSON))
  ))
);

export const logout = () => dispatch => (
  APIUtil.logout().then(() => (
    dispatch(logoutCurrentUser())
  ))
);

export const clearErrors  = () => ({
  type: RECEIVE_SESSION_ERRORS,
  errors: []
});
