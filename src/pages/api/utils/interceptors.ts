const axios = require('axios');
const loggerUtil = require('../logger/loggerutil');
const configextentions = require('./config/configextensions.js');

// configextentions.loadConfig();


if (typeof window === "undefined") {
  //Add axios request logger
  axios.interceptors.request.use(loggerUtil.axiosRequestLogger);

  //Add axios response logger
  axios.interceptors.response.use(
    loggerUtil.axiosResponseLogger,
    loggerUtil.axiosErrorLogger
  );
}
