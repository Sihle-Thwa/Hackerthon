import { useEffect, useState } from "react";
import { fetchCoins } from "../services/api"; // Ensure this function is defined and returns the expected data structure

const CryptoTable = ({ wishlist, setWishlist }) => {
  const [currencies, setCurrencies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const coinsPerPage = 10; // Limit to 10 coins per page
  const [iconClicked, setIconClicked] = useState([]);

  useEffect(() => {
    const getCoins = async () => {
      try {
        const coins = await fetchCoins();

        // Check if the coins data is an array
        if (Array.isArray(coins)) {
          setCurrencies(coins);
          setIconClicked(new Array(coins.length).fill(false)); // Initialize iconClicked based on currencies length
        } else {
          throw new Error("Coins data is not an array");
        }
      } catch (error) {
        setError(error.message || "Failed to load coins");
      } finally {
        setLoading(false);
      }
    };

    getCoins();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>{error}</div>;
  }

  // Calculate the current coins to display based on the current page
  const startIndex = currentPage * coinsPerPage;
  const selectedCurrencies = currencies.slice(
    startIndex,
    startIndex + coinsPerPage
  );
  const totalPages = Math.ceil(currencies.length / coinsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handlePageClick = (page) => {
    if (page >= 0 && page < totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="card shadow">
      <div className="card-title">
        <div className="row">
          <div className="col-sm-12 col-md-6">
            <h3>Cryptocurrencies</h3>
          </div>
          <div className="col-sm-12 col-md-6">
            <form>
              <input
                className="form-control me-2 mt-2"
                type="search"
                placeholder="Search cryptocurrency"
                aria-label="tableSearch"
              />
            </form>
          </div>
        </div>
      </div>
      <div className="card-body">
        <table className="table table-hover table-dark table-striped">
          <thead>
            <tr>
              <th className="col-1">Rank</th>
              <th>Name</th>
              <th>Price</th>
              <th>24H %</th>
              <th>24H High</th>
              <th>Market Cap</th>
              <th>More</th>
            </tr>
          </thead>
          <tbody>
            {selectedCurrencies.map((currency, index) => (
              <tr key={currency.id}>
                <td>{currency.market_cap_rank}</td>
                <td>{currency.name}</td>
                <td>R{currency.current_price.toFixed(2)}</td>
                <td
                  style={{
                    color:
                      currency.price_change_percentage_24h >= 0
                        ? "green"
                        : "red",
                  }}
                >
                  {currency.price_change_percentage_24h
                    ? currency.price_change_percentage_24h.toFixed(2)
                    : "N/A"}
                  %
                </td>
                <td>
                  R{currency.high_24h ? currency.high_24h.toFixed(2) : "N/A"}
                </td>
                <td>R{currency.market_cap.toLocaleString()}</td>
                <td>
                  <span>
                    <i
                      className="bi bi-star"
                      onClick={() => {
                        const isInWishlist = wishlist.includes(currency.id);
                        if (isInWishlist) {
                          setWishlist((prev) => {
                            const updatedWishlist = prev.filter(
                              (id) => id !== currency.id
                            );
                            localStorage.setItem(
                              "wishlist",
                              JSON.stringify(updatedWishlist)
                            );
                            return updatedWishlist;
                          });
                        } else {
                          setWishlist((prev) => {
                            const updatedWishlist = [...prev, currency.id];
                            localStorage.setItem(
                              "wishlist",
                              JSON.stringify(updatedWishlist)
                            );
                            return updatedWishlist;
                          });
                        }
                      }}
                      style={{
                        color: wishlist.includes(currency.id) ? "red" : "white",
                        cursor: "pointer",
                      }}
                    ></i>
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="card-footer">
        <div className="pagination pagination-sm justify-content-end">
          <button
            className="btn btn-outline-primary"
            onClick={handlePreviousPage}
            disabled={currentPage === 0}
          >
            <i
              className="bi bi-arrow-left"
              style={{ color: "white", outlineColor: "invert" }}
            ></i>
          </button>

          {/* Render page buttons */}
          {[0, 1, 2].map((offset) => {
            const page = currentPage + offset;
            return (
              page < totalPages && (
                <button
                  key={page}
                  className="btn btn-outline-light"
                  onClick={() => handlePageClick(page)}
                >
                  {page + 1}
                </button>
              )
            );
          })}

          <button
            className="btn btn-outline-primary"
            onClick={handleNextPage}
            disabled={currentPage === totalPages - 1}
          >
            <i
              className="bi bi-arrow-right"
              style={{ color: "white", outlineColor: "invert" }}
            ></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CryptoTable;
