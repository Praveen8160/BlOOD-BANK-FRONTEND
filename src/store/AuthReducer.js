import { LOGIN_SUCCESS, LOGOUT_SUCCESS, SET_ERROR } from "./Authaction.js";

const initialState = {
  isAuth: false,
  Role: null,
  error: null,
};

const authreducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      // console.log(action.payload)
      // console.log(action.payload.data.role)
      return {
        ...state,
        isAuth: action.payload.success,
        Role: action.payload.data.role,
        error: null,
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        isAuth: false,
        Role: null,
        error: null,
      };
    case SET_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};
export default authreducer;
