// TopNav.js
import "../styles/topnav.css";
import { useAuth0 } from "@auth0/auth0-react";
import { LoginButton } from "./buttons/LoginButton";
import { LogoutButton } from "./buttons/LogoutButton";

function TopNav() {
  const { isAuthenticated } = useAuth0(); // Access authentication state

  return (
    <nav className="navbar" role="navigation">
      <div className="navbar-left">
        <a href="/dashboard" className="navbar-brand">
          CryptoBuddy
        </a>
      </div>
      <div className="navbar-center">
        <ul className="nav-links">
          <li>
            <a href="/dashboard" className="nav-link">
              Dashboard
            </a>
          </li>

          <li>
            <a href="/wishlist" className="nav-link">
              Wishlist
            </a>
          </li>
        </ul>
      </div>
      <div className="navbar-right">
        {!isAuthenticated ? (
          <LoginButton /> // Show Login button if not authenticated
        ) : (
          <LogoutButton /> // Show Logout button if authenticated
        )}
      </div>
    </nav>
  );
}

export default TopNav;
