import Github from "./img/github.png";

const GithubLoginButton = () => {

  const github = () => {
    window.open("http://localhost:5000/auth/github", "_self");
  };
  
  return (
    <div className="loginButton github" onClick={github}>
      <img src={Github} alt="" className="icon" />
      Login with Github
    </div>
  );

};

export default GithubLoginButton;
