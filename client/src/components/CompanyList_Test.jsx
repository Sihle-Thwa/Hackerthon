import { useState } from "react";

function CompanyList_Test() {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchCompanies = async () => {
    setLoading(true);
    setError(null);

    const projectId =
      "1040204649238-kc42guplp1jmcgb0sbg9nbvajusak4lt.apps.googleusercontent.com"; // Replace with your project ID
    const tenantId = "Sihle-Thwa-7naui"; // Replace with your tenant ID

    try {
      const response = await fetch(
        `/api/companies?projectId=${projectId}&tenantId=${tenantId}`
      );

      console.log("Response Status:", response.status); // Log the response status
      console.log("Response Headers:", response.headers.get("Content-Type")); // Log the content type

      if (!response.ok) {
        const errorData = await response.json(); // Get error response if not OK
        throw new Error(errorData.error || "Network response was not ok");
      }

      const data = await response.json(); // Read the body as JSON
      setCompanies(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Company List</h1>
      <button onClick={fetchCompanies} disabled={loading}>
        {loading ? "Loading..." : "Load Companies"}
      </button>
      {error && <p style={{ color: "red" }}>Error: {error}</p>}
      {companies.length === 0 && !loading && <p>No companies found.</p>}
      <div id="companyList">
        {companies.map((company) => (
          <div key={company.externalId}>
            {" "}
            {/* Use externalId as the key */}
            <strong>Company Name:</strong> {company.name}
            <br />
            <strong>Display Name:</strong> {company.displayName}
            <br />
            <strong>External ID:</strong> {company.externalId}
            <br />
            <br />
          </div>
        ))}
      </div>
    </div>
  );
}

export default CompanyList_Test;
