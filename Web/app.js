//Setup base variables for the server to work
var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

var rooms = {};

//USEFULL THINGS
function makeid() {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

  for (var i = 0; i < 4; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}

//We'll use the public folder, so we tell the server to place public in front of each path (avoid repetitions)
app.use(express.static(__dirname + '/public'));

//We use a simple one page app, so tell the server to render the index
app.get('/', function(req, res){
  res.render('/index.html');
});

//Register event on connection of new client
io.on('connection', function(socket){
  socket.on('start_game', function(){
      //CALCULER UNE CLE
      console.log("ouverture d'un salon prive");

      var key = makeid();

      rooms[key] = {
          'host_socket' : socket,
          'key' : key,
          'players' : []
      }

      socket.emit('room_opened',{'key_code':key});

      //IN CASE THE GAME IS CANCELED
      socket.on('cancel_game',function(){
          //SUPPRESSION DU SALON
          console.log("cancel game");
          //CALL DISCONNECT ON EACH CONNECTED CLIENT
          delete rooms[key];

          socket.off('cancel_game');
      });
  });

  socket.on('disconnect', function() {
    console.log('Player disconnection');

    for(room in rooms){
      if(rooms[room]['host_socket'] == socket){
        console.log("fermeture d'un salon")
        // We found a room where host was hosting !
        //LOOKING THROUGHT OTHER SOCKETS TO NOTIFY THEM OF DISCONNECTION

        //REMOVE ROOM !
        delete rooms[room];
      }
    }
 });
});

//port = process.env.PORT
port = 8080
server.listen(port);
console.log("Use your drawings server listening on port "+port);
