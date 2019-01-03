const helpers = require('./helper-functions.js');

module.exports = function () {
    return context => {
        if (context.data.name) {
            context.data.name = helpers.team.valName(context.data.name);
        }

        return context;
    }
}