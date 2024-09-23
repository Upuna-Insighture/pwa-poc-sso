import Google from "./img/google.png";

const GoogleLoginButton = () => {
  const authServerUrl = process.env.REACT_APP_AUTH_SERVER_URL;
  const google = () => {
    window.open(authServerUrl + "auth/google", "_self");
  };
  
  return (
    <div className="loginButton google" onClick={google}>
      <img src={Google} alt="" className="icon" />
        Login with Google
    </div>
  );
};

export default GoogleLoginButton;
