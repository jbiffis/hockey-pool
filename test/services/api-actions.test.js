const assert = require('assert');
const app = require('../../src/app');

describe('\'/api/actions\' service', () => {
  it('registered the service', () => {
    const service = app.service('api/actions');

    assert.ok(service, 'Registered the service');
  });
});
