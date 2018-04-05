/**
 * setup before test
 */

// tslint:disable

import * as sinon from 'sinon';

beforeEach(function(): void {
  this.sandbox = sinon.sandbox.create();
  this.clock = sinon.useFakeTimers(new Date());
});

afterEach(function(): void {
  this.clock.restore();
  this.sandbox.restore();
});
