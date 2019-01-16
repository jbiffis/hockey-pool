const feathers = require('@feathersjs/feathers');
const socketio = require('@feathersjs/socketio-client');
const io = require('socket.io-client');
const rp = require('request-promise');
const Promise = require('bluebird');

const socket = io('http://localhost:3030');
const app = feathers();

// Set up Socket.io client with the socket.  this connects to our hockey pool app.
app.configure(socketio(socket));

var baseOptions = {
  uri: 'https://statsapi.web.nhl.com/api/v1',
  json: true // Automatically parses the JSON string in the response
};
var teams = [
  {id: 1, teamName: 'New Jersey Devils', shortName: 'NJD'},
  {id: 2, teamName: 'New York Islanders', shortName: 'NYI'},
  {id: 3, teamName: 'New York Rangers', shortName: 'NYR'},
  {id: 4, teamName: 'Philadelphia Flyers', shortName: 'PHI'},
  {id: 5, teamName: 'Pitsburgh Penguins', shortName: 'PIT'},
  {id: 6, teamName: 'Boston Bruins', shortName: 'BOS'},
  {id: 7, teamName: 'Buffalo Sabres', shortName: 'BUF'},
  {id: 8, teamName: 'Montreal Canadiens', shortName: 'MTL'},
  {id: 9, teamName: 'Ottawa Senators', shortName: 'OTT',},
  {id:10, teamName: 'Toronto Maple Leafs', shortName: 'TOR'},
  {id:12, teamName: 'Carolina Hurrcianes', shortName: 'CAR'},    
  {id:13, teamName: 'Florida Panthers', shortName: 'FLA'},   
  {id:14, teamName: 'Tampa Bay Lightning', shortName: 'TBL'},   
  {id:15, teamName: 'Washington Capitals', shortName: 'WSH'},   
  {id:16, teamName: 'Chicago Blackhawks', shortName: 'CHI'},   
  {id:17, teamName: 'Detroit Red Wings', shortName: 'DET'},   
  {id:18, teamName: 'Nashville Predators', shortName: 'NSH'},   
  {id:19, teamName: 'St. Louis Blues', shortName: 'STL'},   
  {id:20, teamName: 'Calgary Flames', shortName: 'CGY'},   
  {id:21, teamName: 'Colorado Avalanche', shortName: 'COL'},   
  {id:22, teamName: 'Edmonton Oilers', shortName: 'EDM'},   
  {id:23, teamName: 'Vancouver Canucks', shortName: 'VAN'},   
  {id:24, teamName: 'Anaheim Ducks', shortName: 'ANA'},   
  {id:25, teamName: 'Dallas Stars', shortName: 'DAL'},   
  {id:26, teamName: 'Los Angeles Kings', shortName: 'LAK'},   
  {id:28, teamName: 'San Jose Sharks', shortName: 'SJS'},   
  {id:29, teamName: 'Columbus Blue Jackets', shortName: 'CBJ'},   
  {id:30, teamName: 'Minnesota Wild', shortName: 'MIN'},   
  {id:52, teamName: 'Winnepeg Jets', shortName: 'WPG'},  
  {id:53, teamName: 'Arizona Coyotes', shortName: 'ARI'},      
  {id:54, teamName: 'Vegas Golden Knights', shortName: 'VGK'}, 
]

//kick things off
getPlayers();

function getPlayers () {
 
  // for each team, get roster
  return Promise.each(teams, team => {
    options = Object.assign({}, baseOptions);   //copy the base options object so we can modify
    options.uri = options.uri + '/teams/' + team.id + '/roster';  //set the team.
    options.team = team.shortName;
    
    // call the nhl api
    return makeCall(options)
      .then(players => {    // we get back a list of players on this team
        return Promise.each(players, player => {
          // Add the player
          return app.service('api/players').create({
            full_name: player.person.fullName,
            nhl_id: player.person.id,
            number: player.jerseyNumber,
            primary_position: player.position.abbreviation,
            current_team: options.team.shortname
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
