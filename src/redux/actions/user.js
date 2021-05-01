import { auth } from "../../firebase";
import {
  SHOW_CURRENT_USER_REQUEST,
  SHOW_CURRENT_USER_SUCCESS,
  AUTH_INFO_SUCCESS,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE,
  UPDATE_USERNAME_REQUEST,
  UPDATE_USERNAME_SUCCESS,
  UPDATE_USERNAME_FAILURE,
} from "redux/constants";

export const showCurrentUserRequest = () => {
  return {
    type: SHOW_CURRENT_USER_REQUEST,
  };
};
export const showCurrentUserSuccess = (user) => {
  return {
    type: SHOW_CURRENT_USER_SUCCESS,
    payload: user,
  };
};

export const authInfoSuccess = (user) => {
  return {
    type: AUTH_INFO_SUCCESS,
    payload: user,
  };
};
export const loginRequest = () => {
  return {
    type: LOGIN_REQUEST,
  };
};
// payload là tham số mà action truyền lên
export const loginSuccess = (user) => {
  return {
    type: LOGIN_SUCCESS,
    payload: user,
  };
};
export const loginFailure = (error) => {
  return {
    type: LOGIN_FAILURE,
    payload: error,
  };
};

export const signupRequest = () => {
  return {
    type: SIGNUP_REQUEST,
  };
};

export const signupSuccess = () => {
  return {
    type: SIGNUP_SUCCESS,
  };
};
export const signupFailure = (error) => {
  return {
    type: SIGNUP_FAILURE,
    payload: error,
  };
};

export const logoutRequest = () => {
  return {
    type: LOGOUT_REQUEST,
  };
};
export const logoutSuccess = (user) => {
  return {
    type: LOGOUT_SUCCESS,
    payload: user,
  };
};
export const logoutFailure = (error) => {
  return {
    type: LOGOUT_FAILURE,
    payload: error,
  };
};

export const updateUserRequest = () => ({
  type: UPDATE_USERNAME_REQUEST,
});
export const updateUserSuccess = (userName) => ({
  type: UPDATE_USERNAME_SUCCESS,
  payload: userName,
});
export const updateUserFailure = (error) => ({
  type: UPDATE_USERNAME_FAILURE,
  payload: error,
});

export const fetchCurrentUser = () => async (dispatch, getState, firebase) => {
  dispatch(showCurrentUserRequest());
  // lấy từ state của reducer user
  const { isAuthenticated } = getState().user;

  if (!isAuthenticated) {
    dispatch(showCurrentUserSuccess(null));
    return Promise.resolve({});
  }
  const currentUser = auth.currentUser;
  return Promise.resolve(dispatch(showCurrentUserSuccess(currentUser)));
};

export const login = (user) => async (dispatch, getState, firebase) => {
  dispatch(loginRequest());
  return auth
    .signInWithEmailAndPassword(user.email, user.password)
    .then(() => {
      dispatch(loginSuccess(user));
    })
    .catch((err) => {
      dispatch(loginFailure(err));
      throw err;
    });
};

export const signup = (params) => async (dispatch, getState, firebase) => {
  const { email, password, firstName, lastName } = params;
  const fullName = `${firstName} ${lastName}`;
  dispatch(signupRequest());
  return auth
    .createUserWithEmailAndPassword(email, password)
    .then((res) => res.user.updateProfile({ displayName: fullName }))
    .then(() => dispatch(signupSuccess()))
    .catch((e) => {
      dispatch(signupFailure(e));
      throw e;
    });
};

export const logout = () => async (dispatch, getState, firebase) => {
  dispatch(logoutRequest());
  return auth
    .signOut()
    .then(() => dispatch(logoutSuccess()))
    .then(() => dispatch(showCurrentUserSuccess(null)))
    .catch((e) => {
      dispatch(logoutFailure(e));
      throw e;
    });
};

export const updateUser = (user) => async (dispatch) => {
  const { currentUser } = auth;
  if (!currentUser) {
    return;
  }
  const { displayName, email } = currentUser;
  const params = {
    displayName: user.name,
    email: user.email,
    password: user.password,
  };
  dispatch(updateUserRequest());
  try {
    if (user.name !== displayName || user.name === displayName) {
      await currentUser.updateProfile({ displayName: user.name }).then(() => {
        var displayName = currentUser.displayName;
        params.displayName = displayName;
      });
    }
    // const credential = firebase.auth.EmailAuthProvider.credential(
    //   email,
    //   user.password
    // );
    // const res = await currentUser.reauthenticateWithCredential(credential);
    // if (res) {
    if (user.email !== email) {
      await currentUser.updateEmail(user.email);
    }
    if (user.password.length > 0) {
      await currentUser.updatePassword(user.password);
    }
    dispatch(updateUserSuccess(params));
  } catch (err) {
    dispatch(updateUserFailure(err));
    throw err;
    //bắt lỗi với finally thì finally luôn luôn chạy dù có lỗi hay không
  } finally {
    return ;
  }
};
