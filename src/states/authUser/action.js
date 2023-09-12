import { api } from '../../api';

const ActionType = {
  SET_AUTH_USER: 'SET_AUTH_USER',
  UNSET_AUTH_USER: 'UNSET_AUTH_USER',
};

function setAuthUserActionCreator(authUser) {
  return {
    type: ActionType.SET_AUTH_USER,
    payload: {
      authUser,
    },
  };
}

function unsetAuthUserActionCreator() {
  return {
    type: ActionType.UNSET_AUTH_USER,
  };
}

function asyncSetAuthUser({ email, password, isAdmin }) {
  return async (dispatch) => {
    try {
      // GET user login
      const { data } = await api.post('/users/auth', {
        email,
        password,
        isAdmin,
      });

      localStorage.setItem('token', data.data.token);
      dispatch(setAuthUserActionCreator(data.data.user));
    } catch (error) {
      console.log(error?.response?.data?.message || error?.message);
    }
  };
}

function asyncUnsetAuthUser() {
  return (dispatch) => {
    dispatch(unsetAuthUserActionCreator());
    localStorage.removeItem('token');
  };
}

function asyncRegisterUser(formData) {
  return async (dispatch) => {
    try {
      // POST user register
      const { data } = await api.post('/users', formData);
      dispatch(asyncSetAuthUser(data.data.user));
    } catch (error) {
      console.log(error?.response?.data?.message || error?.message);
    }
  };
}

export {
  ActionType,
  setAuthUserActionCreator,
  unsetAuthUserActionCreator,
  asyncSetAuthUser,
  asyncUnsetAuthUser,
  asyncRegisterUser,
};
