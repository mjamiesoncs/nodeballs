/**
 * Created by matthewjamieson on 11/30/16.
 */

var Game = require('./game');
var waitingSockets = []
var games = []
var socketIO = null;
var clientId

module.exports = {
  setIO: function (io){
      socketIO = io;
  },

  addSocket: function(socket) {
    waitingSockets.push(socket);
    if(waitingSockets.length >= 2) {
      games.push(new Game(waitingSockets.splice(0,2)))
    } else {
      socket.emit('waiting');
    }
  }
};
