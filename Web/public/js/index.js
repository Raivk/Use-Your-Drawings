//We need socket.io to enable connection with server
require(['socket.io/socket.io.js']);


var socket = io.connect('localhost:8080');

//GERER UNE MACHINE A ETAT

//CREER FONCTION SWITCH SCREEN POUR PASSER D'UN ECRAN A L'AUTRE

function StartGame(){
  socket.emit('start_game');
  socket.on('room_opened', function(data){
      //CALCULER UNE CLE
      console.log("Salon ouvert avec la clé : " + data['key_code']);

      var key = data['key_code'];
  });
}

function CancelGame(){
  socket.emit('cancel_game');
  socket.off('room_opened');
}
