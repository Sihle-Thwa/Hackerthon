import { useEffect, useState, useCallback, useMemo } from "react";
import PropTypes from "prop-types";
import { fetchCoins } from "../services/api";

const CurrencyRow = ({ currency, isInWishlist, toggleWishlist }) => (
  <tr key={currency.id}>
    <td>{currency.market_cap_rank}</td>
    <td>{currency.name}</td>
    <td>R{currency.current_price.toFixed(2)}</td>
    <td
      style={{
        color: currency.price_change_percentage_24h >= 0 ? "green" : "red",
      }}
    >
      {currency.price_change_percentage_24h
        ? currency.price_change_percentage_24h.toFixed(2)
        : "N/A"}
      %
    </td>
    <td>R{currency.high_24h ? currency.high_24h.toFixed(2) : "N/A"}</td>
    <td>R{currency.market_cap.toLocaleString()}</td>
    <td>
      <span>
        <i
          className={`bi bi-star ${
            isInWishlist ? "text-danger" : "text-white"
          }`}
          onClick={toggleWishlist}
          style={{ cursor: "pointer" }}
        ></i>
      </span>
    </td>
  </tr>
);

CurrencyRow.propTypes = {
  currency: PropTypes.shape({
    id: PropTypes.string.isRequired,
    market_cap_rank: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    current_price: PropTypes.number.isRequired,
    price_change_percentage_24h: PropTypes.number,
    high_24h: PropTypes.number,
    market_cap: PropTypes.number.isRequired,
  }).isRequired,
  isInWishlist: PropTypes.bool.isRequired,
  toggleWishlist: PropTypes.func.isRequired,
};

const Pagination = ({ currentPage, totalPages, onPageChange }) => (
  <div className="pagination pagination-sm justify-content-end">
    <button
      className="btn btn-outline-primary"
      onClick={() => onPageChange(currentPage - 1)}
      disabled={currentPage === 0}
    >
      <i className="bi bi-arrow-left"></i>
    </button>

    {[...Array(totalPages)].map((_, index) => (
      <button
        key={index}
        className="btn btn-outline-light"
        onClick={() => onPageChange(index)}
      >
        {index + 1}
      </button>
    ))}

    <button
      className="btn btn-outline-primary"
      onClick={() => onPageChange(currentPage + 1)}
      disabled={currentPage === totalPages - 1}
    >
      <i className="bi bi-arrow-right"></i>
    </button>
  </div>
);

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

const CryptoTable = ({ wishlist, setWishlist }) => {
  const [currencies, setCurrencies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const coinsPerPage = 10;

  const fetchCurrencyData = useCallback(async () => {
    setLoading(true);
    try {
      const coins = await fetchCoins();
      if (!Array.isArray(coins)) {
        throw new Error("Coins data is not an array");
      }
      setCurrencies(coins);
    } catch (error) {
      setError(error.message || "Failed to load coins");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCurrencyData();
  }, [fetchCurrencyData]);

  const totalPages = Math.ceil(currencies.length / coinsPerPage);
  const selectedCurrencies = useMemo(() => {
    const startIndex = currentPage * coinsPerPage;
    return currencies.slice(startIndex, startIndex + coinsPerPage);
  }, [currencies, currentPage, coinsPerPage]);

  const toggleWishlist = (currencyId) => {
    setWishlist((prev) => {
      const updatedWishlist = prev.includes(currencyId)
        ? prev.filter((id) => id !== currencyId)
        : [...prev, currencyId];
      localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
      return updatedWishlist;
    });
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 0 && newPage < totalPages) {
      setCurrentPage(newPage);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

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
            {selectedCurrencies.map((currency) => (
              <CurrencyRow
                key={currency.id}
                currency={currency}
                isInWishlist={wishlist.includes(currency.id)}
                toggleWishlist={() => toggleWishlist(currency.id)}
              />
            ))}
          </tbody>
        </table>
      </div>
      <div className="card-footer">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

CryptoTable.propTypes = {
  wishlist: PropTypes.arrayOf(PropTypes.string).isRequired,
  setWishlist: PropTypes.func.isRequired,
};

export default CryptoTable;
