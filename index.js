var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var socketHandler = require('./server/socketHandler');
var game = require('./server/game');

app.use(express.static('public'));

socketHandler.setIO(io);
io.on('connection', function (socket){
  socketHandler.addSocket(socket);
});


http.listen(3000, function(){
  console.log('listening on 3000')
});

