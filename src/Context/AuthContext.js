import { createContext, useEffect, useReducer } from "react";
import Cookies from "js-cookie";

const INITIAL_STATE = {
  token: Cookies.get("tokena") || null,
  loading: false,
  error: null,
};

export const AuthContext = createContext(INITIAL_STATE);

const AuthReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_START":
      return {
        token: null,
        loading: true,
        error: null,
      };
    case "LOGIN_SUCCESS":
      return {
        token: action.payload,
        loading: false,
        error: null,
      };
    case "LOGIN_FAILURE":
      return {
        token: null,
        loading: false,
        error: action.payload,
      };
    case "LOGOUT":
      return {
        token: null, // Xóa token khi logout
        loading: false,
        error: null,
      };
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

  useEffect(() => {
    if (state.token) {
      // Lưu token vào cookie khi có token
      Cookies.set("tokena", state.token, {
        path: "/",
        domain: "localhost",
        secure: true,
        sameSite: "None",
        expires: 7,
      });
    } else {
      // Xóa token khỏi cookie khi logout
      Cookies.remove("tokena");
    }
  }, [state.token]);

  return (
    <AuthContext.Provider
      value={{
        token: state.token, // Truyền token thay vì user
        loading: state.loading,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
