import axios from "axios";

export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
export const SET_ERROR = "SET_ERROR";

export const login = () => async (dispatch) => {
  try {
    const response = await axios.get(
      "http://localhost:4000/Authentication/auth",
      {
        withCredentials: true,
      }
    );
    dispatch({ type: LOGIN_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: SET_ERROR, payload: "Login failed. Please try again." });
  }
};

export const logout = () => async (dispatch) => {
  try {
    await axios.post(
      "http://localhost:4000/Authentication/logout",
      {},
      {
        withCredentials: true,
      }
    );
    dispatch({ type: LOGOUT_SUCCESS });
  } catch (error) {
    console.error("Logout failed:", error);
  }
};
