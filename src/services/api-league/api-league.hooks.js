const logger = require('../../hooks/logger.js');
const leagues_check_add = require('../../hooks/leagues-check-add.js');
//const league_validation = require('../../hooks/leagues-validation.js')

module.exports = {
  before: {
    all: [logger()],
    find: [],
    get: [],
    create: [function() {
      return leagues_check_add()
    }],
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
