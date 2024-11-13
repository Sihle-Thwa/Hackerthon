const Wishlist = ({ wishlist, setWishlist }) => {
  const handleRemoveFromWishlist = (currencyId) => {
    const updatedWishlist = wishlist.filter((id) => id !== currencyId);
    setWishlist(updatedWishlist);
    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist)); // Update localStorage
  };

  return (
    <div className="container">
      <div className="card">
        <div className="card-title">
          <h3>Your Wishlist</h3>
        </div>

        <div className="card-body">
          {wishlist.length === 0 ? (
            <p>No currencies in your wishlist.</p>
          ) : (
            <ul>
              {wishlist.map((currencyId) => (
                <li key={currencyId}>
                  Currency ID: {currencyId}
                  <button
                    className="btn btn-danger btn-sm ms-2"
                    onClick={() => handleRemoveFromWishlist(currencyId)}
                  >
                    <i className="bi bi-trash3"></i>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
