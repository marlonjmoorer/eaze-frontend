const ErrorLogger = require('fs-error-logger')
const logger= ErrorLogger()
logger.setOutputFolder("./logs")
module.exports=logger


