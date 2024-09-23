import Facebook from "./img/facebook.png";

const FacebookLoginButton = () => {
  const authServerUrl = process.env.REACT_APP_AUTH_SERVER_URL;
  const facebook = () => {
    window.open(authServerUrl + "auth/facebook", "_self");
  };
  
  return (
    <div className="loginButton facebook" onClick={facebook}>
      <img src={Facebook} alt="" className="icon" />
      Login with Facebook
    </div>
  );

};

export default FacebookLoginButton;
