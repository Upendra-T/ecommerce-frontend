
import { createContext, useReducer, useEffect } from 'react';

const UserContext = createContext();

const userReducer = (state, action) => {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, uid: action.payload.uid, token: action.payload.token, usertype: action.payload.usertype };
    case 'SIGN_OUT':
      return { ...state, uid: null, token: null, usertype: null };
    default:
      return state;
  }
};

const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, { uid: null, token: null, usertype: null });

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUid = localStorage.getItem('uid');
    const storedUsertype = localStorage.getItem('usertype');

    if (storedToken && storedUid && storedUsertype) {
      dispatch({ type: 'SET_USER', payload: { uid: storedUid, token: storedToken, usertype: storedUsertype } });
    }
  }, []);

  const signIn = (token, uid, usertype) => {
    localStorage.setItem('token', token);
    dispatch({ type: 'SET_USER', payload: { uid, token, usertype } });
  };

  const signOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('uid');
    localStorage.removeItem('usertype');

    dispatch({ type: 'SIGN_OUT' });
  };

  return (
    <UserContext.Provider value={{ uid: state.uid, token: state.token, usertype: state.usertype, signIn, signOut }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
