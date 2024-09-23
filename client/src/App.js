import './App.css';
import { BrowserRouter } from "react-router-dom";
import RouterFile from './routes/route';
import { useEffect, useState } from "react";

const App = () => {

  const authServerUrl = process.env.REACT_APP_AUTH_SERVER_URL + "auth/login/success";

  const [user, setUser] = useState(null);

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
