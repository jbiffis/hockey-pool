const assert = require('assert');
const feathers = require('@feathersjs/feathers');
const teamsCheckAdd = require('../../src/hooks/teams-check-add');

describe('\'teams-check-add\' hook', () => {
  let app;

  beforeEach(() => {
    app = feathers();

    app.use('/dummy', {
      async get(id) {
        return { id };
      }
    });

    app.service('dummy').hooks({
      before: teamsCheckAdd()
    });
  });

  it('runs the hook', async () => {
    const result = await app.service('dummy').get('test');
    
    assert.deepEqual(result, { id: 'test' });
  });
});
