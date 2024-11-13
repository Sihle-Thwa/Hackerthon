import { useNavigate } from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";

const Auth0ProviderWithNavigate = () => {
  const navigate = useNavigate();

  const domain = import.meta.env.REACT_APP_AUTH0_DOMAIN;
  const clientId = import.meta.env.REACT_APP_AUTH0_CLIENT_ID;
  const redirectUri = import.meta.env.REACT_APP_AUTH0_CALLBACK_URL;

  const onRedirectCallback = (appState) => {
    navigate(appState?.returnTo || window.location.pathname);
  };

  if (!(domain && clientId && redirectUri)) {
    console.error("Missing Auth0 configuration values.");
    return null; // Handle this more gracefully in production
  }

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        redirect_uri: redirectUri,
      }}
      onRedirectCallback={onRedirectCallback}
    >
      {/* Render children components here */}
    </Auth0Provider>
  );
};

export default Auth0ProviderWithNavigate;
