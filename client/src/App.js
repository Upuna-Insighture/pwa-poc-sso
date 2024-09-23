import './App.css';
import { BrowserRouter } from "react-router-dom";
require('dotenv').config();
import RouterFile from './routes/route';
import { useEffect, useState } from "react";

const App = () => {
  const [user, setUser] = useState(null);

  const authServerUrl = process.env.AUTH_SERVER_URL;

  useEffect(() => {
    const getUser = () => {
      fetch(authServerUrl + "auth/login/success", {
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
          throw new Error("authentication has been failed!");
        })
        .then((resObject) => {
          setUser(resObject.user);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getUser();
  }, []);

  return (
    <BrowserRouter>
      <RouterFile />
    </BrowserRouter>
  );
};

export default App;
