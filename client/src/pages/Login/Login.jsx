import FacebookLoginButton from "../../auth/FacebookLoginButton";
import GithubLoginButton from "../../auth/GithubLoginButton";
import GoogleLoginButton from "../../auth/GoogleLoginButton";

const Login = () => {
  return (
    <div className="login">
      <div className="wrapper">
        <div className="center">
          <GoogleLoginButton />
          <FacebookLoginButton />
          <GithubLoginButton />
        </div>
      </div>
    </div>
  );
};

export default Login;