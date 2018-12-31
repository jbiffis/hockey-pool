const assert = require('assert');
const app = require('../../src/app');

describe('\'api/league\' service', () => {
  it('registered the service', () => {
    const service = app.service('api/league');

    assert.ok(service, 'Registered the service');
  });
});
