import { useState } from "react";
import { fetchAIResponse } from "../services/genai";
import "bootstrap/dist/css/bootstrap.min.css";
function App() {
  const [inputValue, setInputValue] = useState("");
  const [response, setResponse] = useState("");
  const [selectedItem, setSelectedItem] = useState(""); // Sample wishlist items const
 const wishlistItems = [
    "Item 1: A beautiful painting",
    "Item 2: A new laptop",
    "Item 3: A cozy blanket",
    "Item 4: A stylish watch",
    "Item 5: A set of books",
  ];
  const handleSubmit = async (e) => {
    e.preventDefault();
    const prompt = `Generate a description for: ${selectedItem}. Additional info: ${inputValue}`;
    const aiResponse = await fetchAIResponse(prompt);
    setResponse(aiResponse);
  };
  return (
    <div className="container mt-5">
      {" "}
      <h1>Generative AI with React Vite</h1>{" "}
      <form onSubmit={handleSubmit}>
        {" "}
        <div className="mb-3">
          {" "}
          <label htmlFor="wishlistSelect" className="form-label">
            Select an Item from Wishlist
          </label>{" "}
          <select
            id="wishlistSelect"
            className="form-select"
            value={selectedItem}
            onChange={(e) => setSelectedItem(e.target.value)}
          >
            {" "}
            <option value="">Choose an item...</option>{" "}
            {wishlistItems.map((item, index) => (
              <option key={index} value={item}>
                {item}
              </option>
            ))}{" "}
          </select>{" "}
        </div>{" "}
        <div className="mb-3">
          {" "}
          <label htmlFor="additionalInfo" className="form-label">
            Additional Information
          </label>{" "}
          <textarea
            id="additionalInfo"
            className="form-control"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Enter any additional information"
          />{" "}
        </div>{" "}
        <button type="submit" className="btn btn-primary">
          Generate
        </button>{" "}
      </form>{" "}
      {response && (
        <div className="mt-4">
          {" "}
          <h2>AI Response:</h2> <p>{response}</p>{" "}
        </div>
      )}{" "}
    </div>
  );
}
export default App;
