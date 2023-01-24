const jwt = require('jsonwebtoken');
const { DefaultAzureCredential } = require('@azure/identity');
const { SecretClient } = require('@azure/keyvault-secrets');
const { CertificateClient } = require('@azure/keyvault-certificates');


//const jwtIssuer = 'cn=issuer,ou=ucpp,l=integration,o=starbucks';
const jwtalgorithm = 'RS256';
const jwtVersion = '1.0.0';
const jwtpTok = 'ptok';
const jwtsTag = [];
const jwtExpiresIn = '2m';
const jwtNotBefore = '0h';


exports.initializeJwtConfig = async function(jwtGeneratorConfig) {
    // DefaultAzureCredential expects the following three environment variables:
    // * AZURE_TENANT_ID: The tenant ID in Azure Active Directory
    // * AZURE_CLIENT_ID: The application (client) ID registered in the AAD tenant
    // * AZURE_CLIENT_SECRET: The client secret for the registered application
    const credential = new DefaultAzureCredential();

    // Build the URL to reach your key vault
    const url = jwtGeneratorConfig.vaultUrl;
    const certificateName = jwtGeneratorConfig.jwtCertificateName;

    // Lastly, create our secrets client and connect to the service
    const certificateClient = new CertificateClient(url, credential);
    var certificate =await certificateClient.getCertificate(certificateName);

    const secretClient = new SecretClient(url, credential);
    var privateKey = await secretClient.getSecret(certificateName);
    
    const subjectArr = certificate.policy.subject.split(',');
    let subjDict = {};
    for(subjField of subjectArr){
        subjFieldArr = subjField.split('=');
        subjDict[subjFieldArr[0].trim().toLowerCase()] = subjFieldArr[1].trim().toLowerCase();
    }

    let issuerList = ['cn' , 'ou', 'l', 'o'];
    let jwtissuer ;
    let jwtScId ;
    for(issuerDetail of issuerList){
        if(issuerDetail == 'cn'){
            jwtissuer = issuerDetail + '=' +subjDict[issuerDetail];
            jwtScId = issuerDetail + '=' + jwtGeneratorConfig.jwtAppName
        }
        else{
            jwtissuer = jwtissuer+','+ issuerDetail + '=' +subjDict[issuerDetail];
            jwtScId = jwtScId+','+issuerDetail + '=' + subjDict[issuerDetail];

        }
    }

    let jwtDetails = {
        keyId: certificate.properties.x509Thumbprint.toString('base64url'),
        privateKey: privateKey.value,
        issuer: jwtissuer,
        scId: jwtScId
    }
    return jwtDetails;
}

exports.generateJwt = async function (jwtSigningDetails, subjectId) {
    var userData = {
        's-cid': jwtSigningDetails.scId,
        'iss': jwtSigningDetails.issuer,
        'jti': subjectId,
        'ver': jwtVersion,
        's-ptok': jwtpTok,
        's-stag': jwtsTag,
    };
    
    var options = {
        subject: subjectId,
        algorithm: jwtalgorithm,
        expiresIn: jwtExpiresIn,
        notBefore: jwtNotBefore,
        keyid:  jwtSigningDetails.keyId,
        header: {'x5t': jwtSigningDetails.keyId}
    };

    let token = jwt.sign(userData, jwtSigningDetails.privateKey = '', options);
    return token;

}

