const feathers = require('@feathersjs/feathers');
const socketio = require('@feathersjs/socketio-client');
const io = require('socket.io-client');
const rp = require('request-promise');
const Promise = require('bluebird');

const socket = io('http://localhost:3030');
const app = feathers();

// Set up Socket.io client with the socket
app.configure(socketio(socket));

var baseOptions = {
  uri: 'https://statsapi.web.nhl.com/api/v1',
  json: true // Automatically parses the JSON string in the response
};

//TODO: Jordan please fill in the rest of this information using https://statsapi.web.nhl.com/api/v1/teams/4
var teams = [
  {id: 1, teamName: 'New Jersey Devils', shortName: 'NJD'},
  {id: 2, teamName: 'New York Islanders', shortName: 'NYI'},
  {id: 3, teamName: 'New York Rangers', shortName: 'NYR'},
  {id: 4, teamName: 'Philadelphia Flyers', shortName: 'PHI'}
]

getPlayers();

function getPlayers () {
 
  // for each team, get roster
  return Promise.each(teams, team => {
    options = Object.assign({}, baseOptions);
    options.uri = options.uri + '/teams/' + team.id + '/roster';

    return makeCall(options)
      .then(players => {
        return Promise.each(players, player => {
          // Add the player
          return app.service('api/players').create({
            fullName: player.person.fullName,
            nhl_id: player.person.id,
            number: player.jerseyNumber,
            primaryPosition: player.position.abbreviation
          })
          .catch(err => {
            console.log(err);
          })
        });
      });
  }); 
 }

 function makeCall(params) {
  return rp(params)
    .then(function(resp) {
      return resp.roster;
    })
    .catch(function(err) {
      console.log(err);
    })
 }
