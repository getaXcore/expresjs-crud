import appRoot from 'app-root-path';
import winston from 'winston';

const option = {
    file: {
        level: 'info',
        filename: `${appRoot}/logs/express-crud.log`,
        handleExceptions: true,
        json: true,
        maxsize: 5242880, // 5MB
        maxFiles: 5,
        colorize: true,
    },
    console: {
        level: 'debug',
        handleExceptions: true,
        json: false,
        colorize: true,
    }
};

export const logger = winston.createLogger({
    transports: [
        new winston.transports.File(option.file),
        new winston.transports.Console(option.console)
    ],
    exitOnError: false, //applikasi bakalan tetep jalan walaupun ada exception
    format:winston.format.combine(
        winston.format.prettyPrint(),
    ),
});

logger.stream = {
    write: function(message, encoding){
        logger.info(message)
    },
};

//module.exports = logger;