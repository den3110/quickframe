import { createContext, useEffect, useReducer } from "react";
// CUSTOM COMPONENT
import { SplashScreen } from "components/splash-screen";
const initialAuthState = {
  user: null,
  isInitialized: false,
  isAuthenticated: false
};
const reducer = (state, action) => {
  switch (action.type) {
    case "AUTH_STATE_CHANGED":
      const {
        isAuthenticated,
        user
      } = action.payload;
      return {
        ...state,
        isAuthenticated,
        user,
        isInitialized: true
      };
    default:
      return state;
  }
};
// USER LOGOUT HANDLER
const logout = () => {
  localStorage.removeItem("accessToken")
  localStorage.removeItem("refreshToken")
  localStorage.removeItem("linkAccount")
  
};

// AUTH CONTEXT INITIALIZE
export const AuthContext = createContext({
  logout,
});
export const AuthProvider = ({
  children
}) => {
  const [state, dispatch] = useReducer(reducer, initialAuthState);

  // SHOW LOADING
  if (!state.isInitialized) return <SplashScreen />;
  return <AuthContext.Provider value={{
    ...state,
    logout,
  }}>
      {children}
    </AuthContext.Provider>;
};