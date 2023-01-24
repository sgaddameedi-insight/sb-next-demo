const logger        = require('./logger');


const axiosRequestLogger = function (request) {
    const meta = { 
                    'meta' : {
                        'axiosReq':{
                            'headers': request.headers, 
                            'body': request.data, 
                            'url': request.url , 
                            'method':request.method
                        } 
                    }
                 };
    logger.info('Axios Sending Request:', meta)
    return request
};

const axiosResponseLogger = function (response) {
    const meta = {
                    'meta' : {
                        'axiosRes': {
                            'statusCode' : response.status , 
                            'body': response.data
                        }
                    } 
                };
    logger.info('Axios Received Response:', meta)
    return response;
};
  
const axiosErrorLogger = function (error) {
    const meta = {
                    'meta' : {
                        'axiosError': {
                            'message': error.message, 
                            'statusCode': error.status 
                        } , 
                        'axiosReq': {
                            'headers': error.config.headers,
                            'body': error.config.data,
                            'url': error.config.url,
                            'method': error.config.method 
                        }
                     } 
                };
    logger.error('Axios Received Error:', meta)
    return Promise.reject(error);
};

/* const expressWinstonLogger = expressWinston.logger({
    winstonInstance: logger,
    level: function(req, res) { return setLogLevel(res) },
    msg: 'Dp Studio Request Router:',
    ignoreRoute: function (req,res) {
        if( req.url.includes('dpstudio')
            || req.url.includes('api')){
            return false
        };
        return true;
     },
    requestWhitelist: [...expressWinston.requestWhitelist, 'body'],
    responseWhitelist: [...expressWinston.responseWhitelist, 'body'],
    dynamicMeta: function(req,res) {
        return  addExtractedData(req) 
    }
});

const expressWinstonErrorLogger = expressWinston.errorLogger({
    winstonInstance: logger,
    msg: 'DP Studio Error Router:',
    requestWhitelist: [...expressWinston.requestWhitelist, 'body'],
    responseWhitelist: [...expressWinston.responseWhitelist, 'body'],
    dynamicMeta: function(req,res) {
        return  addExtractedData(req) 
    },
    blacklistedMetaFields: ['error.config']
}); */

function addExtractedData(requestData){
    return {
        'formattedUrl': requestData?.url?.split('?')[0]
    };
}

function setLogLevel(responseData){
    let loglevel = 'info';
    if(responseData.statusCode >= 400){
        loglevel = 'error'
    }
    return loglevel
}

module.exports = {
    axiosResponseLogger,
    axiosErrorLogger,
    axiosRequestLogger,
/*     expressWinstonLogger,
    expressWinstonErrorLogger */
}