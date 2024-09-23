import Google from "./img/google.png";

const GoogleLoginButton = () => {

  const google = () => {
    window.open("http://localhost:5000/auth/google", "_self");
  };
  
  return (
    <div className="loginButton google" onClick={google}>
      <img src={Google} alt="" className="icon" />
        Login with Google
    </div>
  );
};

export default GoogleLoginButton;
