var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static('public'));

io.on('connection', function (socket){

  console.log('a user has connected');

  socket.on('ball', function (msg){
    console.log('ball', msg);
    io.emit('ball', msg);
  })
});

http.listen(3000, function(){
  console.log('listening on 3000')
});

