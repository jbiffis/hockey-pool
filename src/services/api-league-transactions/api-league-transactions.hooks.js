const transactions_check_add  = require('../../hooks/transactions-check-add.js');
const transactions_check_drop = require('../../hooks/transactions-check-drop.js');

module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [transactions_check_add(), transactions_check_drop()],
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
