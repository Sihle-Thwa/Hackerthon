// LandingPage.js
import { useAuth0 } from "@auth0/auth0-react";

const LandingPage = () => {
  const { loginWithRedirect } = useAuth0();

  const handleLogin = () => {
    loginWithRedirect();
  };

  const handleSignUp = () => {
    loginWithRedirect({ screen_hint: "signup" }); // This will prompt the signup screen
  };

  return (
    <div className="landing-page">
      <h1>Welcome to Jobs4You</h1>
      <p>Your one-stop solution for job searching and resume building.</p>
      <button onClick={handleLogin} className="button__login">
        Log In
      </button>
      <button onClick={handleSignUp} className="button__signup">
        Sign Up
      </button>
    </div>
  );
};

export default LandingPage;
