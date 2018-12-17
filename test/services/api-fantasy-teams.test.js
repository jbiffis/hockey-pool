const assert = require('assert');
const app = require('../../src/app');

describe('\'/api/fantasy/teams\' service', () => {
  it('registered the service', () => {
    const service = app.service('api/fantasy/teams');

    assert.ok(service, 'Registered the service');
  });
});
