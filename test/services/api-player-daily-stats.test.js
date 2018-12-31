const assert = require('assert');
const app = require('../../src/app');

describe('\'api/player-daily-stats\' service', () => {
  it('registered the service', () => {
    const service = app.service('api/player-daily-stats');

    assert.ok(service, 'Registered the service');
  });
});
