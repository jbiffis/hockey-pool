const assert = require('assert');
const app = require('../../src/app');

describe('\'api/league-transactions\' service', () => {
  it('registered the service', () => {
    const service = app.service('api/league/transactions');

    assert.ok(service, 'Registered the service');
  });
});
