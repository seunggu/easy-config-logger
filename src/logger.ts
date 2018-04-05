/**
 * Logger
 */

import * as winston from 'winston';

import { transportConfig } from './config';
import { colors, envs, levels, prodEnvs } from './constants';
import { IMeta, IOption } from './interfaces';

/**
 * Logger Class
 */
class Logger {

  private baseMeta: IMeta;
  private logger: winston.LoggerInstance;

  /**
   * @param options - logger options
   * @param baseMeta - meta that always included
   */
  constructor(options: IOption, baseMeta: IMeta = {}) {
    this.baseMeta = baseMeta;

    // validation
    this.validateParams(options);

    // create logger
    this.logger = this.createWinstonLogger(options);
  }

  /**
   * log with debug level
   *
   * @param message - log message
   * @param meta - log metadata
   */
  public debug(message: string, meta: IMeta = {}): void {
    const metas: object = { ...this.baseMeta, ...meta };
    this.logger.debug(message, metas);
  }

  /**
   * log with info level
   *
   * @param message - log message
   * @param meta - log metadata
   */
  public info(message: string, meta: IMeta = {}): void {
    const metas: object = { ...this.baseMeta, ...meta };
    this.logger.info(message, metas);
  }

  /**
   * log with warn level
   *
   * @param message - log message
   * @param meta - log metadata
   */
  public warn(message: string, meta: IMeta = {}): void {
    const metas: object = { ...this.baseMeta, ...meta };
    this.logger.warn(message, metas);
  }

  /**
   * log with error level
   *
   * @param message - log message
   * @param meta - log metadata
   */
  public error(message: string, meta: IMeta = {}): void {
    const metas: object = { ...this.baseMeta, ...meta };
    this.logger.error(message, metas);
  }

  /**
   * log with test level
   *
   * @param message - log message
   * @param meta - log metadata
   */
  public test(message: string, meta: IMeta = {}): void {
    const metas: object = { ...this.baseMeta, ...meta };
    this.logger.log('test', message, metas);
  }

  /**
   * Validate Logger Params
   *
   * @param options - logger options
   */
  private validateParams(options: IOption): void {
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
   * @param options - logger options
   */
  private createWinstonLogger(options: IOption): winston.LoggerInstance {
    const { env, level } = options;
    const transportConfiguration: winston.WinstonModuleTransportOptions = prodEnvs.includes(env) ?
      transportConfig.prod : transportConfig.dev;

    return new (winston.Logger)({
      level,
      levels,
      colors,
      transports: [new (winston.transports.Console)(transportConfiguration)]
    });
  }
}

export { Logger };
