// App.js
import { Routes, Route } from "react-router-dom";
import Auth0ProviderWithNavigate from "./auth0providerwithnavigate"; // Adjust the path as necessary
import TopNav from "./components/TopNav";
import Dashboard from "./components/Dashboard";
import Wishlist from "./pages/Wishlist";

function App() {
  return (
    <div className="app">
      <nav>
        <TopNav />
      </nav>
      <div className="container">
        <Routes>
          {/* Set LandingPage as the default route */}

          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/wishlist" element={<Wishlist />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
