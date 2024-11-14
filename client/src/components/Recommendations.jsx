import { useState } from "react";
import { fetchAIResponse } from "../services/genai";
import "bootstrap/dist/css/bootstrap.min.css";
import PropTypes from "prop-types";

const Recommendations = ({ wishlist }) => {
  const [inputValue, setInputValue] = useState("");
  const [response, setResponse] = useState("");
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState([]);

  const filters = [
    `Predictions: Provide your predictions regarding the future performance of ${selectedItems.join(", ")} based on current market trends and data.`,
    `Evaluation: Evaluate the strengths and weaknesses of ${selectedItems.join(", ")} in comparison to other similar items in the market.`,
    `Comparison: Compare ${selectedItems.join(", ")} with two other currencies from the wishlist: ${wishlist[0]} and ${wishlist[1]}. Highlight key differences and similarities in terms of performance, risk, and potential.`,
  ];

  const handleSelectionChange = (e) => {
    const options = e.target.options;
    const selectedValues = [];
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        selectedValues.push(options[i].value);
      }
    }
    setSelectedItems(selectedValues);
  };

  const handleFilterChange = (e) => {
    const value = e.target.value;
    setSelectedFilters((prev) => {
      if (prev.includes(value)) {
        return prev.filter((filter) => filter !== value); // Remove filter if already selected
      } else if (prev.length < 3) {
        return [...prev, value]; // Add filter if less than 3 selected
      }
      return prev; // Do nothing if already 3 selected
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Constructing a detailed multilevel prompt
    const prompt = `
      Generate a detailed analysis for the selected items: ${selectedItems.join(", ")}. 
      ${selectedFilters.join("\n")}
      
      Additional info: ${inputValue}
    `;

    // Fetching the AI response using the constructed prompt
    const aiResponse = await fetchAIResponse(prompt);
    setResponse(aiResponse);
  };

  return (
    <div className="container mt-5">
      <h1>Generative AI with React Vite</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="wishlistSelect" className="form-label">
            Select the crypto from Wishlist
          </label>
          <select
            id="wishlistSelect"
            className="form-select"
            multiple
            value={selectedItems}
            onChange={handleSelectionChange}
          >
            {wishlist.map((id) => (
              <option key={id} value={id}>
                Currency ID: {id}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <h5>Select Filters (Choose up to 3):</h5>
          {filters.map((filter, index) => (
            <div key={index} className="form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id={`filter${index}`}
                value={filter}
                checked={selectedFilters.includes(filter)}
                onChange={handleFilterChange}
                disabled={selectedFilters.length >= 3 && !selectedFilters.includes(filter)} // Disable if already 3 selected
              />
              <label className="form-check-label" htmlFor={`filter${index}`}>
                {filter}
              </label>
            </div>
          ))}
        </div>

        <div className="mb-3">
          <label htmlFor="additionalInfo" className="form-label">
            Additional Information
          </label>
          <textarea
            id="additionalInfo"
            className="form-control"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Enter any additional information"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Generate
        </button>
      </form>
      {response && (
        <div className="mt-4">
 <h2>AI Response:</h2> <pre>{response}</pre>
        </div>
      )}
    </div>
  );
};

Recommendations.propTypes = {
  wishlist: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Recommendations;