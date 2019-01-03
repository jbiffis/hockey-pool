const player_check_if_exists = require('../../hooks/players-check-if-exists.js');
const { disallow } = require('feathers-hooks-common');

module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [player_check_if_exists(), disallow('rest')],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
