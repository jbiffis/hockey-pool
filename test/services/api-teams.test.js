const assert = require('assert');
const app = require('../../src/app');

describe('\'/api/teams\' service', () => {
  it('registered the service', () => {
    const service = app.service('api/teams');

    assert.ok(service, 'Registered the service');
  });
});
