/**
 * Logger
 */

import * as winston from 'winston';

import { Option, Meta } from './interfaces';
import { prodEnvs, envs, levels, colors } from './constants';
import { transportConfig } from './config';

/**
 * Logger Class
 */
class Logger {

  private baseMeta: Meta;
  private logger: winston.LoggerInstance;

  /**
   * @constructor
   *
   * @param {Option} options - logger options
   * @param {Meta} baseMeta - meta that always included
   */
  constructor(options: Option, baseMeta: Meta = {}) {
    this.baseMeta = baseMeta;

    // validation
    this.validateParams(options);
    
    // create logger
    this.logger = this.createWinstonLogger(options);
  }

  /**
   * log with debug level
   *
   * @param {string} message - log message
   * @param {Meta} meta - log metadata
   */
  public debug(message: string, meta: Meta = {}) {
    const metas = Object.assign({}, this.baseMeta, meta);
    this.logger.debug(message, metas);
  }

  /**
   * log with info level
   *
   * @param {string} message - log message
   * @param {Meta} meta - log metadata
   */
  public info(message: string, meta: Meta = {}) {
    const metas = Object.assign({}, this.baseMeta, meta);
    this.logger.info(message, metas);
  }

  /**
   * log with warn level
   *
   * @param {string} message - log message
   * @param {Meta} meta - log metadata
   */
  public warn(message: string, meta: Meta = {}) {
    const metas = Object.assign({}, this.baseMeta, meta);
    this.logger.warn(message, metas);
  }

  /**
   * log with error level
   *
   * @param {string} message - log message
   * @param {Meta} meta - log metadata
   */
  public error(message: string, meta: Meta = {}) {
    const metas = Object.assign({}, this.baseMeta, meta);
    this.logger.error(message, metas);
  }

  /**
   * log with test level
   *
   * @param {string} message - log message
   * @param {Meta} meta - log metadata
   */
  public test(message: string, meta: Meta = {}) {
    const metas = Object.assign({}, this.baseMeta, meta);
    this.logger.log('test', message, metas);
  }

  /**
   * Validate Logger Params
   *
   * @param {Option} options - logger options
   */
  private validateParams(options: Option): void {
    const { env, level } = options;

    if (!Object.keys(levels).includes(level)) {
      throw new Error(`Log Level '${level}' is not available`);
    }

    if (!envs.includes(env)) {
      throw new Error(`Environment '${level}' is not available`);
    }
  }

  /**
   * create logger with winston
   *
   * @param {Osption} options - logger options
   */
  private createWinstonLogger(options: Option): winston.LoggerInstance {
    const { env, level } = options;
    const transportConfiguration: winston.WinstonModuleTransportOptions = prodEnvs.includes(env) ?
      transportConfig.prod : transportConfig.dev;

    const logger = new (winston.Logger)({
      level,
      levels,
      colors,
      transports: [new (winston.transports.Console)(transportConfiguration)]
    });
    return logger;
  }
}

export { Logger };
