/**
 * Logger Spec
 */

import * as stdMocks from 'std-mocks';
import { expect } from 'chai';

import { Logger } from './logger';
import { IOption, IMeta } from './interfaces';

describe('logger', () => {
  const message: string = 'test message';
  const colorizedDebug: string = '\u001b[34mdebug\u001b[39m:';
  const colorizedInfo: string = '\u001b[36minfo\u001b[39m:';
  const colorizedWarn: string = '\u001b[33mwarn\u001b[39m:';
  const colorizeError: string = '\u001b[31merror\u001b[39m:';
  const colorizedTest: string = '\u001b[36mtest\u001b[39m:';

  describe('Constructor', () => {
    it('should return Logger instance', () => {
      const options: IOption = { env: 'development', level: 'debug' };
      const logger: Logger = new Logger(options);

      expect(logger).is.instanceof(Logger);
    });

    describe('options.level', () => {
      it('should print log when options.level is under log level', () => {
        const options: IOption = { env: 'development', level: 'debug' };
        const logger: Logger = new Logger(options);

        stdMocks.use();
        logger.debug(message);
        stdMocks.restore();

        const resultMessage: string = `${new Date().toISOString()} - ${colorizedDebug} ${message}\n`;
        expect(stdMocks.flush().stderr[0]).to.equal(resultMessage);
      });

      it('should print log when options.level is over log level', () => {
        const options: IOption = { env: 'development', level: 'info' };
        const logger: Logger = new Logger(options);

        stdMocks.use();
        logger.debug(message);
        stdMocks.restore();

        expect(stdMocks.flush().stderr.length).to.equal(0);
      });

      it('should occur error when it receive unsupport level', () => {
        const wrongLevel: string = 'wrong level';
        const options: IOption = { env: 'development', level: wrongLevel };
        const errMsg: string = `Log Level '${wrongLevel}' is not available`;

        expect(() => new Logger(options)).to.throw().with.property('message', errMsg);
      });
    });

    describe('options.env', () => {
      it('should print log as pretty print when options.env is development', () => {
        const options: IOption = { env: 'development', level: 'debug' };
        const logger: Logger = new Logger(options);

        stdMocks.use();
        logger.debug(message);
        stdMocks.restore();

        const resultMessage: string = `${new Date().toISOString()} - ${colorizedDebug} ${message}\n`;
        expect(stdMocks.flush().stderr[0]).to.equal(resultMessage);
      });

      it('should print log as pretty print when options.env is test', () => {
        const options: IOption = { env: 'test', level: 'debug' };
        const logger: Logger = new Logger(options);

        stdMocks.use();
        logger.debug(message);
        stdMocks.restore();

        const resultMessage: string = `${new Date().toISOString()} - ${colorizedDebug} ${message}\n`;
        expect(stdMocks.flush().stderr[0]).to.equal(resultMessage);
      });

      it('should print log as json format when options.env is stage', () => {
        const options: IOption = { env: 'stage', level: 'debug' };
        const logger: Logger = new Logger(options);

        stdMocks.use();
        logger.debug(message);
        stdMocks.restore();

        const result: object = { level: 'debug', message, timestamp: new Date() };
        const resultMessage: string = `${JSON.stringify(result)}\n`;
        expect(stdMocks.flush().stderr[0]).to.equal(resultMessage);
      });

      it('should print log as json format when options.env is production', () => {
        const options: IOption = { env: 'production', level: 'debug' };
        const logger: Logger = new Logger(options);

        stdMocks.use();
        logger.debug(message);
        stdMocks.restore();

        const result: object = { level: 'debug', message, timestamp: new Date() };
        const resultMessage: string = `${JSON.stringify(result)}\n`;
        expect(stdMocks.flush().stderr[0]).to.equal(resultMessage);
      });

      it('should occur error when it receive unsupport env', () => {
        const wrongEnv: string = 'wrong env';
        const options: IOption = { env: wrongEnv, level: 'debug' };
        const errMsg: string = `Environment '${wrongEnv}' is not available`;

        expect(() => new Logger(options)).to.throw().with.property('message', errMsg);
      });
    });

    describe('baseMeta', () => {
      it('should be always appended meta', () => {
        const options: IOption = { env: 'development', level: 'debug' };
        const baseMeta: IMeta = { some_base_meta: 1 };
        const logger: Logger = new Logger(options, baseMeta);

        stdMocks.use();
        logger.debug(message);
        stdMocks.restore();

        const metaResult: string = `{ some_base_meta: \u001b[33m${baseMeta.some_base_meta}\u001b[39m }\n`;
        const resultMessage: string = `${new Date().toISOString()} - ${colorizedDebug} ${message} \n${metaResult}`;
        expect(stdMocks.flush().stderr[0]).to.equal(resultMessage);
      });
    });
  });

  describe('.debug', () => {
    it('should print log as \'debug\' level', () => {
      const options: IOption = { env: 'development', level: 'debug' };
      const logger: Logger = new Logger(options);

      stdMocks.use();
      logger.debug(message);
      stdMocks.restore();

      const resultMessage: string = `${new Date().toISOString()} - ${colorizedDebug} ${message}\n`;
      expect(stdMocks.flush().stderr[0]).to.equal(resultMessage);
    });

    it('should add meta that appended to log', () => {
      const options: IOption = { env: 'development', level: 'debug' };
      const meta: IMeta = { some_meta: 1 };
      const logger: Logger = new Logger(options);

      stdMocks.use();
      logger.debug(message, meta);
      stdMocks.restore();

      const metaResult: string = `{ some_meta: \u001b[33m${meta.some_meta}\u001b[39m }\n`;
      const resultMessage: string = `${new Date().toISOString()} - ${colorizedDebug} ${message} \n${metaResult}`;
      expect(stdMocks.flush().stderr[0]).to.equal(resultMessage);
    });
  });

  describe('.info', () => {
    it('should print log as \'info\' level', () => {
      const options: IOption = { env: 'development', level: 'debug' };
      const logger: Logger = new Logger(options);

      stdMocks.use();
      logger.info(message);
      stdMocks.restore();

      const resultMessage: string = `${new Date().toISOString()} - ${colorizedInfo} ${message}\n`;
      expect(stdMocks.flush().stdout[0]).to.equal(resultMessage);
    });
  });

  describe('.warn', () => {
    it('should print log as \'warn\' level', () => {
      const options: IOption = { env: 'development', level: 'debug' };
      const logger: Logger = new Logger(options);

      stdMocks.use();
      logger.warn(message);
      stdMocks.restore();

      const resultMessage: string = `${new Date().toISOString()} - ${colorizedWarn} ${message}\n`;
      expect(stdMocks.flush().stdout[0]).to.equal(resultMessage);
    });
  });

  describe('.error', () => {
    it('should print log as \'error\' level', () => {
      const options: IOption = { env: 'development', level: 'debug' };
      const logger: Logger = new Logger(options);

      stdMocks.use();
      logger.error(message);
      stdMocks.restore();

      const resultMessage: string = `${new Date().toISOString()} - ${colorizeError} ${message}\n`;
      expect(stdMocks.flush().stderr[0]).to.equal(resultMessage);
    });
  });

  describe('.test', () => {
    it('should print log as \'test\' level', () => {
      const options: IOption = { env: 'development', level: 'debug' };
      const logger: Logger = new Logger(options);

      stdMocks.use();
      logger.test(message);
      stdMocks.restore();

      const resultMessage: string = `${new Date().toISOString()} - ${colorizedTest} ${message}\n`;
      expect(stdMocks.flush().stdout[0]).to.equal(resultMessage);
    });
  });
});
