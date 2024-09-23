import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = React.createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const authServerUrl = process.env.REACT_APP_AUTH_SERVER_URL;
  useEffect(() => {
    axios.get(authServerUrl + 'auth/user', { withCredentials: true })
      .then((res) => setUser(res.data))
      .catch(() => setUser(null));
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
