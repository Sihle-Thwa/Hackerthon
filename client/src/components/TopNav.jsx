import "../styles/topnav.css";

function TopNav() {
  return (
    <nav className="navbar" role="navigation">
      <div className="navbar-left">
        <a href="#" className="navbar-brand">
          Jobs4You
        </a>
      </div>
      <div className="navbar-center">
        <ul className="nav-links">
          <li>
            <a href="#" className="nav-link">
              Home
            </a>
          </li>
          <li>
            <a href="#" className="nav-link">
              Available Jobs
            </a>
          </li>
          <li>
            <a href="#" className="nav-link">
              Applied
            </a>
          </li>
        </ul>
      </div>
      <div className="navbar-right">
        <div className="btn btn-light "></div>
      </div>
    </nav>
  );
}

export default TopNav;
