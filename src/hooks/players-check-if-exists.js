// This hook checks to see if a player exists before adding them.  it looks for a matching nhl_id to match them up.
// Function throws an error if they've already been added.

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