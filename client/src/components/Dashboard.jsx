import { useState } from "react";
import CryptoTable from "./CryptoTable";

function Dashboard() {
  const [wishlist, setWishlist] = useState(() => {
    const savedWishlist = localStorage.getItem("wishlist");
    return savedWishlist ? JSON.parse(savedWishlist) : [];
  });
  return (
    <div className="container">
      <CryptoTable wishlist={wishlist} setWishlist={setWishlist} />
    </div>
  );
}

export default Dashboard;
