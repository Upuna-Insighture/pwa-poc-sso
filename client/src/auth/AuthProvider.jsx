import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = React.createContext();

const AuthProvider = ({ children }) => {
  const authServerUrl = process.env.REACT_APP_AUTH_SERVER_URL + "auth/login/success";
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  
  useEffect(() => {
    const getUser = () => {
      fetch(authServerUrl, {
        method: "GET",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
        },
      })
        .then((response) => {
          if (response.status === 200) return response.json();
          navigate("/login");
        })
        .then((resObject) => {
          setUser(resObject.user);
        })
        .catch((err) => {
          console.log(err);
          navigate("/login");
        });
    };
    getUser();
    
  }, [authServerUrl, navigate]);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
