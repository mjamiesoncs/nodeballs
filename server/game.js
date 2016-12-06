/**
 * Created by matthewjamieson on 11/30/16.
 */

/**
 * Game consisting of 2 clients
 * @param clientSockets
 * @constructor
 */
function Game (clientSockets){
  clientSockets.forEach((socket) => {
    socket.emit('ready');
    addBallListener(socket)
  })

  function addBallListener(socket) {
    socket.on('ball', function (msg){
      clientSockets.forEach((ballsocket) => {
        ballsocket.emit('ball', msg)
      })
    })
  }
}

module.exports = Game