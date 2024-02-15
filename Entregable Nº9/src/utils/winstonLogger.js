import { __dirname } from '../utils.js';

/*  --------------WINSTON----------- */
import { config } from '../config/config.js'
import winston from 'winston'

const logger = winston.createLogger({
  level: {
    debug: 0,
    http: 1,
    info: 2,
    warning: 3,
    error: 4,
    fatal: 5,
  },
  format: winston.format.combine(
    winston.format.colorize({
      colors: {
        fatal: 'red',
        error: 'red',
        warning: 'yellow',
        info: 'blue',
        http: 'cyan',
        debug: 'green',
      },
    }),
    winston.format.simple()
  ),
});

const transportConsoleDEV = new winston.transports.Console({
  level: 'debug'
});
const transportConsolePROD = new winston.transports.Console({
  level: 'info',
});

const transportFilePROD = new winston.transports.File({
  filename:`${__dirname}/logs/error.log` , 
  level: 'error',
});


if (config.MODE === 'development') {
  console.log('development')
  logger.add(transportConsoleDEV);
} else if (config.MODE === 'production') {
  logger.add(transportConsolePROD);
  logger.add(transportFilePROD);
}

export const middleLogg = (req, res, next) => {
  req.logger = logger;
  try {
    next()
  } catch (error) {
    req.logger.error('Error in request processing:', error);
    next(error); 
  }
};

