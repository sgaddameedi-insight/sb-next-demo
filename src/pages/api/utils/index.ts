const { Guid } = require('guid-typescript');
const jwtService = require('../jwt/jwt-service');
const config = require('../config/config');

export async function getDpStudioHttpOption(subjectId = Guid.EMPTY) {
  let correlationId = Guid.create().toString();
  let jwtToken = await jwtService.generateJwt(
    config.jwtSigningDetails,
    subjectId
  );
  let httpOptions = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + jwtToken,
      'x-correlation-id': correlationId,
    },
  };
  return httpOptions;
}
