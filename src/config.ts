import { WinstonModuleTransportOptions } from "winston";

/**
 * configuration
 */

const transportConfig: { dev: WinstonModuleTransportOptions, prod: WinstonModuleTransportOptions } = {
  dev: {
    timestamp: true,
    colorize: true,
    prettyPrint: true
  },
  prod: {
    timestamp: () => new Date(),
    formatter: (options) => {
      const { level, message } = options;
      const timestamp = options.timestamp();
      const jsonData = Object.assign({}, { level, message, timestamp }, options.meta);
      return JSON.stringify(jsonData);
    }
  }
}

export { transportConfig };
