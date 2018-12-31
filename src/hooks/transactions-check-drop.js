// Validate all rules for dropping a player from a team
// Rules are: not sure yet.

module.exports = function () {
    return context => {
      return context.service.find({
          query: {
              nhl_id: context.data.nhl_id
          }
      })
      .then(resp => {
          if (resp.data.length >= 1) {
              throw new Error("Player being added alreay exists");
          } else {
              return context;
          }
      })
    };
  };