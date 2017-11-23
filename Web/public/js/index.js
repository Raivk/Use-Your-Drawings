//We need socket.io to enable connection with server
require(['socket.io/socket.io.js']);


var socket = io.connect('localhost:8080');

//GERER UNE MACHINE A ETAT
var stateENUM = {
  HOME: "home",
  LOBBY: "lobby"
};

//CREER FONCTION SWITCH SCREEN POUR PASSER D'UN ECRAN A L'AUTRE
function switchScreen(previous, next){
  document.getElementById(previous).classList.add("hidden");
  document.getElementById(next).classList.remove("hidden");
}

function StartGame(){
  socket.emit('start_game');
  socket.on('room_opened', function(data){
      //CALCULER UNE CLE
      console.log("Salon ouvert avec la clé : " + data['key_code']);

      var key = data['key_code'];

      //SETUP PAGE
      document.getElementById("room_code").innerHTML = key;

      switchScreen(stateENUM.HOME, stateENUM.LOBBY);
  });
}

function CancelGame(){
  socket.emit('cancel_game');
  socket.off('room_opened');
  switchScreen(stateENUM.LOBBY, stateENUM.HOME);
}
