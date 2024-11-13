// index.js or main entry file
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";

const root = ReactDOM.createRoot(document.getElementById("root"));

const domain = import.meta.env.REACT_APP_AUTH0_DOMAIN;
const clientId = import.meta.env.REACT_APP_AUTH0_CLIENT_ID;

root.render(
  <BrowserRouter>
    <Auth0Provider domain={domain} clientId={clientId}>
      <App />
    </Auth0Provider>
  </BrowserRouter>
);
