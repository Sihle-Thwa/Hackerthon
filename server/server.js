const talent = require("@google-cloud/talent").v4;

/**
 * List Companies
 *
 * @param projectId {string} Your Google Cloud Project ID
 * @param tenantId {string} Identifier of the Tenant
 */
function sampleListCompanies(projectId, tenantId) {
  const client = new talent.CompanyServiceClient();
  // Iterate over all elements.
  // const projectId = 'Your Google Cloud Project ID';
  // const tenantId = 'Your Tenant ID (using tenancy is optional)';
  const formattedParent = client.tenantPath(projectId, tenantId);

  client
    .listCompanies({ parent: formattedParent })
    .then((responses) => {
      const resources = responses[0];
      for (const resource of resources) {
        console.log(`Company Name: ${resource.name}`);
        console.log(`Display Name: ${resource.displayName}`);
        console.log(`External ID: ${resource.externalId}`);
      }
    })
    .catch((err) => {
      console.error(err);
    });
}
