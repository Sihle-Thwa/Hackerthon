const express = require("express");
const talent = require("@google-cloud/talent").v4;
const app = express();
const PORT = process.env.PORT || 3000;

// Initialize the Talent client
const client = new talent.CompanyServiceClient();

// Endpoint to list companies
app.get("/api/companies", async (req, res) => {
  const projectId = req.query.projectId;
  const tenantId = req.query.tenantId;

  if (!projectId || !tenantId) {
    return res
      .status(400)
      .json({ error: "Project ID and Tenant ID are required." });
  }

  const formattedParent = client.tenantPath(projectId, tenantId);

  try {
    const [companies] = await client.listCompanies({ parent: formattedParent });
    const companyData = companies.map((resource) => ({
      name: resource.name,
      displayName: resource.displayName,
      externalId: resource.externalId,
    }));

    console.log("Company Data:", companyData);
    res.setHeader("Content-Type", "application/json");
    res.json(companyData);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error retrieving companies" }); // Return JSON error
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
