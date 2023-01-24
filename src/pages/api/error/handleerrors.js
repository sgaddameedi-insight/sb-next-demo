const { GeneralError, AuthError } = require('./errors');
const logger           = require('../logger/logger');

const handleErrors = (err, req, res, next) => {
  
  if (err instanceof AuthError) {
    res.status(err.statusCode).json({status: 'error', message: 'Auth Failure'});
  }
  else if(err.response){
    res.status(502).json({status: 'error', message: 'Dependency returned error response'});
  }
  else if(err.request){
    res.status(502).json({status: 'error', message: 'Dependency did not respond'});
  }
  else{
    res.status(500).json({status: 'error', message: 'Internal Server Error'});
  }
  next(err, req, res,  next);
}

module.exports =  handleErrors