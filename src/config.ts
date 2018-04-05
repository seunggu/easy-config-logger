/**
 * config
 */

import { WinstonModuleTransportOptions } from 'winston';

/**
 * configuration
 */

const transportConfig: { dev: WinstonModuleTransportOptions; prod: WinstonModuleTransportOptions } = {
  dev: {
    timestamp: true,
    colorize: true,
    prettyPrint: true
  },
  prod: {
    timestamp: (): Date => new Date(),
    formatter: (options: { level: string; message: string; timestamp: (() => Date); meta: object }): string => {
      const { level, message } = options;
      const timestamp: Date = options.timestamp();
      const jsonData: object = { level, message, timestamp, ...options.meta };

      return JSON.stringify(jsonData);
    }
  }
};

export { transportConfig };
