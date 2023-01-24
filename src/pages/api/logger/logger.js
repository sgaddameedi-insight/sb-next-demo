const { createLogger, format, transports } = require('winston');
const maskDeep      = require('mask-deep');

const maskProperties = [
  'Authorization', 
  'authorization', 
  'x-api-sig', 
  'x-api-key', 
  'access_token', 
  'id_token',
  'ssoToken'
];


const maskData = format((info, opts) => {
  info.meta = maskDeep(info.meta, maskProperties);
  return info;
});

const logger = createLogger({
  level: 'info',
  exitOnError: false,
  format: format.combine(
    maskData(),
    format.json()
  ), 
  transports: [
    new transports.Console()
  ],
});

module.exports = logger;