const player_check_if_exists = require('../../hooks/players-check-if-exists.js');

module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [player_check_if_exists()],
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
