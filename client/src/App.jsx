// App.js
import { Routes, Route } from "react-router-dom";
import Auth0ProviderWithNavigate from "./auth0providerwithnavigate"; // Adjust the path as necessary
import TopNav from "./components/TopNav";
import Dashboard from "./components/Dashboard";
import Wishlist from "./pages/Wishlist";
import { useState } from "react";

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
