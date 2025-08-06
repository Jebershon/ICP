const winston = require('winston');

const { combine, timestamp, json, errors, simple } = winston.format;

class Logger {
  static defaultLevel = 'debug';
  static useJson = true;

  static #jsonFormat = combine(errors({ stack: true }), timestamp(), json());
  static #simpleFormat = simple();

  // TODO: check structured logging and contextual logging
  static newLogger = () => {
    const format = Logger.useJson ? Logger.#jsonFormat : Logger.#simpleFormat;
    const logger = winston.createLogger({
      level: Logger.defaultLevel,
      format: format,
      transports: [new winston.transports.Console()],
    });
    return logger;
  };
}

exports.Logger = Logger;
