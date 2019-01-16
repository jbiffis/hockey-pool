const assert = require('assert');
const app = require('../../src/app');

describe('\'test-psql\' service', () => {
  it('registered the service', () => {
    const service = app.service('test-psql');

    assert.ok(service, 'Registered the service');
  });
});
