const { 
  validateRequest,
  addPlayer, 
  dropPlayer
}  = require('../../hooks/transactions-hooks.js');

module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [validateRequest(), addPlayer(), dropPlayer()],
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
//TODO ON CREATE ERROR WE HAVE TO REVERT THE TRANSACTION!!!!
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
