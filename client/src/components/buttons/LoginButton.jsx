import { useAuth0 } from "@auth0/auth0-react";

export const LoginButton = () => {
  const { loginWithPopup } = useAuth0();

  const handleLogin = async () => {
    console.log("Login button clicked"); // Debug log
    await loginWithPopup({
      appState: {
        returnTo: "/home",
      },
    });
  };

  return (
    <button className="button__login" onClick={handleLogin}>
      Log In
    </button>
  );
};
