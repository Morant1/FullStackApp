import userService from '../../services/userService';
import { loading, doneLoading } from './systemActions';

// THUNK
export function loadUsers() {
  return async dispatch => {
    try {
      const users = await userService.getUsers();
      dispatch({ type: 'SET_USERS', users });
    } catch (err) {
      console.log('UserActions: err in loadUsers', err);
    } finally {
      dispatch(doneLoading());
    }
  };
}

// THUNK
export function removeUser(userId) {
  return async dispatch => {
    try {
      await userService.remove(userId);
      dispatch({ type: 'USER_REMOVE', userId });
    } catch (err) {
      console.log('UserActions: err in removeUser', err);
    }
  };
}
// THUNK
export function login(userCreds) {
  return async dispatch => {
    // try {
      let user = await userService.login(userCreds);
      dispatch({ type: 'SET_USER', user });
      return user;
    // } catch (err) {
      // console.log('userActions: err in login', err);
      // alert("Please sign up first")
    // }
  };
}

export function signup(userCreds) {
  return async dispatch => {
    const user = await userService.signup(userCreds);
    console.log("user signup", user)
    dispatch({ type: 'SET_USER', user });
    return user;
  };
}
export function logout() {
  return async dispatch => {
    await userService.logout();
    dispatch({ type: 'SET_USER', user: null });
  };
}

export function updateUser(user) {
  return async dispatch => {
    try {
      const updatedUser = await userService.update(user);
      console.log("updateUser", updatedUser)
      dispatch({ type: 'SET_USER', user: updatedUser });
    } catch (err) {
      console.log('userActions: err in updateUser', err);
    }
  };
}