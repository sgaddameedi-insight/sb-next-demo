module.exports = {
    HOST : process.env.HOST || 'localhost',
    PORT : process.env.PORT || 3000,
    
    dpStudioApiEndPoint : 'https://localhost:7127',
    jwtGeneratorConfig : {
        vaultUrl : process.env.VAULT_URL,
        jwtCertificateName : 'dp-studio-jwt-cert',
        jwtAppName : 'ds',
    },
    jwtSigningDetails : ''

}
