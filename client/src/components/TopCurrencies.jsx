import { useEffect, useState } from "react";
import { topCurrencies as fetchTopCurrencies } from "../services/api"; // Renamed to avoid conflict

const TopCurrencies = () => {
  const [currencies, setCurrencies] = useState([]); // Renamed state for clarity
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const coins = await fetchTopCurrencies(); // Use the renamed function

        if (Array.isArray(coins)) {
          setCurrencies(coins); // Update state with fetched data
        } else {
          throw new Error("Coin data is not an array");
        }
      } catch (error) {
        console.error("Error fetching top currencies:", error); // Log the error
        setError(error.message || "Failed to load top currencies");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return <div>Loading top currencies...</div>; // More informative loading message
  }
  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="top-currencies row " style={{ background: "" }}>
      {currencies.map((currency) => (
        <div className="col-md-6 col-lg-4" key={currency.id}>
          <div className="currency-card card mb-3 widget-chart text-left">
            <div className="row">
              <div className="icon-wrapper rounded-circle">
                <img
                  src={currency.image}
                  className="rounded"
                  alt={`${currency.name} logo`}
                  style={{ height: "40px" }}
                />
              </div>

              <div className="widget-chart-content">
                <div className="widget-heading">
                  <h3>{currency.name}</h3>
                </div>
                <div className="widget-numbers">
                  <p>Price: R{currency.current_price.toFixed(2)}</p>{" "}
                </div>
                <div className="widget-description">
                  <p
                    style={{
                      color:
                        currency.price_change_percentage_24h > 0
                          ? "green"
                          : "red",
                      margin: 0, // Remove default margin
                    }}
                  >
                    {currency.price_change_percentage_24h
                      ? currency.price_change_percentage_24h.toFixed(2)
                      : "N/A"}
                    %
                  </p>
                  <p style={{ marginLeft: "0px" }}>last 24 Hours</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TopCurrencies;
