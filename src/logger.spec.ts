/**
 * Logger Spec
 */

import * as stdMocks from 'std-mocks';
import { expect } from 'chai';

import { Logger } from './logger';
import { Option, Meta } from './interfaces';

describe('logger', () => {
  const message = 'test message';
  const colorizedDebug = '\u001b[34mdebug\u001b[39m:';
  const colorizedInfo = '\u001b[36minfo\u001b[39m:';
  const colorizedWarn = '\u001b[33mwarn\u001b[39m:';
  const colorizeError = '\u001b[31merror\u001b[39m:';
  const colorizedTest = '\u001b[36mtest\u001b[39m:';
  
  describe('Constructor', () => {
    it('should return Logger instance', () => {
      const options: Option = { env: 'development', level: 'debug' };
      const logger: Logger = new Logger(options);

      expect(logger).is.instanceof(Logger);
    });  

    describe('options.level', () => {
      it('should print log when options.level is under log level', () => {
        const options: Option = { env: 'development', level: 'debug' };
        const logger: Logger = new Logger(options);
  
        stdMocks.use();
        logger.debug(message);
        stdMocks.restore();
  
        const resultMessage = `${new Date().toISOString()} - ${colorizedDebug} ${message}\n`;
        expect(stdMocks.flush().stderr[0]).to.equal(resultMessage);
      });
  
      it('should print log when options.level is over log level', () => {
        const options: Option = { env: 'development', level: 'info' };
        const logger: Logger = new Logger(options);
  
        stdMocks.use();
        logger.debug(message);
        stdMocks.restore();
  
        expect(stdMocks.flush().stderr[0]).to.equal(undefined);
      });
    });

    describe('options.env', () => {
      it('should print log as pretty print when options.env is development', () => {
        const options: Option = { env: 'development', level: 'debug' };
        const logger: Logger = new Logger(options);
  
        stdMocks.use();
        logger.debug(message);
        stdMocks.restore();
  
        const resultMessage = `${new Date().toISOString()} - ${colorizedDebug} ${message}\n`;
        expect(stdMocks.flush().stderr[0]).to.equal(resultMessage);
      });

      it('should print log as pretty print when options.env is test', () => {
        const options: Option = { env: 'test', level: 'debug' };
        const logger: Logger = new Logger(options);
  
        stdMocks.use();
        logger.debug(message);
        stdMocks.restore();
  
        const resultMessage = `${new Date().toISOString()} - ${colorizedDebug} ${message}\n`;
        expect(stdMocks.flush().stderr[0]).to.equal(resultMessage);
      });

      it('should print log as json format when options.env is stage', () => {
        const options: Option = { env: 'stage', level: 'debug' };
        const logger: Logger = new Logger(options);
  
        stdMocks.use();
        logger.debug(message);
        stdMocks.restore();
  
        const result: object = { level: 'debug', message, timestamp: new Date() };
        const resultMessage = `${JSON.stringify(result)}\n`;
        expect(stdMocks.flush().stderr[0]).to.equal(resultMessage);
      });

      it('should print log as json format when options.env is production', () => {
        const options: Option = { env: 'production', level: 'debug' };
        const logger: Logger = new Logger(options);
  
        stdMocks.use();
        logger.debug(message);
        stdMocks.restore();
  
        const result: object = { level: 'debug', message, timestamp: new Date() };
        const resultMessage = `${JSON.stringify(result)}\n`;
        expect(stdMocks.flush().stderr[0]).to.equal(resultMessage);
      });
    });

    describe('baseMeta', () => {
      it('should be always appended meta', () => {
        const options: Option = { env: 'development', level: 'debug' };
        const baseMeta: Meta = { 'some_base_meta': 1 };
        const logger: Logger = new Logger(options, baseMeta);
  
        stdMocks.use();
        logger.debug(message);
        stdMocks.restore();
  
        const metaResult: string = `{ some_base_meta: \u001b[33m${baseMeta.some_base_meta}\u001b[39m }\n`;
        const resultMessage = `${new Date().toISOString()} - ${colorizedDebug} ${message} \n${metaResult}`;
        expect(stdMocks.flush().stderr[0]).to.equal(resultMessage);
      });
    });
  });


  describe('.debug', () => {
    it('should print log as \'debug\' level', () => {
      const options: Option = { env: 'development', level: 'debug' };
      const logger: Logger = new Logger(options);

      stdMocks.use();
      logger.debug(message);
      stdMocks.restore();

      const resultMessage = `${new Date().toISOString()} - ${colorizedDebug} ${message}\n`;
      expect(stdMocks.flush().stderr[0]).to.equal(resultMessage);
    });

    it('should add meta that appended to log', () => {
      const options: Option = { env: 'development', level: 'debug' };
      const meta: Meta = { some_meta: 1 };
      const logger: Logger = new Logger(options);

      stdMocks.use();
      logger.debug(message, meta);
      stdMocks.restore();

      const metaResult: string = `{ some_meta: \u001b[33m${meta.some_meta}\u001b[39m }\n`;
      const resultMessage = `${new Date().toISOString()} - ${colorizedDebug} ${message} \n${metaResult}`;
      expect(stdMocks.flush().stderr[0]).to.equal(resultMessage);
    });
  });

  describe('.info', () => {
    it('should print log as \'info\' level', () => {
      const options: Option = { env: 'development', level: 'debug' };
      const logger: Logger = new Logger(options);

      stdMocks.use();
      logger.info(message);
      stdMocks.restore();

      const resultMessage = `${new Date().toISOString()} - ${colorizedInfo} ${message}\n`;
      expect(stdMocks.flush().stdout[0]).to.equal(resultMessage);
    });
  });

  describe('.warn', () => {
    it('should print log as \'warn\' level', () => {
      const options: Option = { env: 'development', level: 'debug' };
      const logger: Logger = new Logger(options);

      stdMocks.use();
      logger.warn(message);
      stdMocks.restore();

      const resultMessage = `${new Date().toISOString()} - ${colorizedWarn} ${message}\n`;
      expect(stdMocks.flush().stdout[0]).to.equal(resultMessage);
    });
  });

  describe('.error', () => {
    it('should print log as \'error\' level', () => {
      const options: Option = { env: 'development', level: 'debug' };
      const logger: Logger = new Logger(options);

      stdMocks.use();
      logger.error(message);
      stdMocks.restore();

      const resultMessage = `${new Date().toISOString()} - ${colorizeError} ${message}\n`;
      expect(stdMocks.flush().stderr[0]).to.equal(resultMessage);
    });
  });

  describe('.test', () => {
    it('should print log as \'test\' level', () => {
      const options: Option = { env: 'development', level: 'debug' };
      const logger: Logger = new Logger(options);

      stdMocks.use();
      logger.test(message);
      stdMocks.restore();

      const resultMessage = `${new Date().toISOString()} - ${colorizedTest} ${message}\n`;
      expect(stdMocks.flush().stdout[0]).to.equal(resultMessage);
    });
  });
});