import { Routes, Route } from "react-router-dom";
import Auth0ProviderWithNavigate from "./auth0providerwithnavigate"; // Work on fixing the logging in
import TopNav from "./components/TopNav";
import Dashboard from "./components/Dashboard";
import Wishlist from "./pages/Wishlist";
import { useState } from "react";
import "./App.css";

function App() {
  const [wishlist, setWishlist] = useState(() => {
    const savedWishlist = localStorage.getItem("wishlist");
    return savedWishlist ? JSON.parse(savedWishlist) : [];
  });
  return (
    <div className="app">
      <nav>
        <TopNav />
      </nav>
      <div className="container">
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route
            path="/wishlist"
            element={<Wishlist wishlist={wishlist} setWishlist={setWishlist} />}
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
