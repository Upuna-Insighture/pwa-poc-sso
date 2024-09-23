import Github from "./img/github.png";

const GithubLoginButton = () => {
  const authServerUrl = process.env.REACT_APP_AUTH_SERVER_URL;
  const github = () => {
    window.open(authServerUrl + "auth/github", "_self");
  };
  
  return (
    <div className="loginButton github" onClick={github}>
      <img src={Github} alt="" className="icon" />
      Login with Github
    </div>
  );

};

export default GithubLoginButton;
