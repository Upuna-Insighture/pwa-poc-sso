import Facebook from "./img/facebook.png";

const FacebookLoginButton = () => {

  const facebook = () => {
    window.open("http://localhost:5000/auth/facebook", "_self");
  };
  
  return (
    <div className="loginButton facebook" onClick={facebook}>
      <img src={Facebook} alt="" className="icon" />
      Login with Facebook
    </div>
  );

};

export default FacebookLoginButton;
