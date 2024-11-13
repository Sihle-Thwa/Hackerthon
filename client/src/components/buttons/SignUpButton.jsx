import { useAuth0 } from "@auth0/auth0-react";

export const SignupButton = () => {
  const { loginWithPopup } = useAuth0();

  const handleSignUp = async () => {
    await loginWithPopup({
      appState: {
        returnTo: "/home",
      },
      authorizationParams: {
        screen_hint: "signup",
      },
    });
  };

  return (
    <button className="button__sign-up" onClick={handleSignUp}>
      Sign Up
    </button>
  );
};
