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

const inititalState = {
  isAuthenticated: false,

  currentUser: null,
  isLoading: false,

  user: {},
  error: null,
};
// action.payload là tham số mà action creator truyền lên
// object hoặc là array thì phải run ra mảng mới (tham chiếu) mới sửa dc
// number thì sửa trực tiếp

// reducer làm nhiệm vụ thay đổi state trong store
const userReducer = (state = inititalState, action) => {
  switch (action.type) {
    case SHOW_CURRENT_USER_REQUEST:
      return state;
    case SHOW_CURRENT_USER_SUCCESS:
      return {
        ...state,
        currentUser: action.payload,
      };
    case AUTH_INFO_SUCCESS:
      return {
        ...state,
        isAuthenticated: !!action.payload,
        currentUser: action.payload,
      };
    case LOGIN_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        error: null,
        user: action.payload,
        currentUser: action.payload,
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    case SIGNUP_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case SIGNUP_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      };
    case SIGNUP_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    case LOGOUT_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case LOGOUT_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        isAuthenticated: false,
      };
    }
    case LOGOUT_FAILURE: {
      return {
        ...state,
        isLoading: false,
        error: null,
      };
    }
    case UPDATE_USERNAME_REQUEST: {
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    }
    case UPDATE_USERNAME_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        error: null,
      };
    }
    case UPDATE_USERNAME_FAILURE: {
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    }
    default:
      return state;
  }
};
export default userReducer;
