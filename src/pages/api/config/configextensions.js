const config = require("../config/config");
const jwtService = require("../jwt/jwt-service");
const { DefaultAzureCredential } = require("@azure/identity");
const { SecretClient } = require("@azure/keyvault-secrets");

exports.loadConfig = async function () {
  //add secrets
  console.log("connecting to keyvault");

  const credential = new DefaultAzureCredential();
  const secretClient = new SecretClient(
    config.jwtGeneratorConfig.vaultUrl,
    credential
  );

  config.dpStudioApiEndPoint = (
    await secretClient.getSecret("dpStudioApiEndPoint")
  ).value;
  config.egiftApiEndPoint = (
    await secretClient.getSecret("egiftApiEndPoint")
  ).value;
  config.jwtGeneratorConfig.jwtCertificateName = (
    await secretClient.getSecret("jwtCertificateName")
  ).value;
  config.jwtSigningDetails = await jwtService.initializeJwtConfig(
    config.jwtGeneratorConfig
  );

  console.log("loaded secrets from keyvault");
};
