import * as sinon from 'sinon';

beforeEach(function() {
  this.sandbox = sinon.sandbox.create();
  this.clock = sinon.useFakeTimers(new Date());
});

afterEach(function() {
  this.clock.restore();
  this.sandbox.restore();
});
