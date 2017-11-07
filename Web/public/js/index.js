//We need socket.io to enable connection with server
require(['socket.io/socket.io.js']);


var socket = io.connect('localhost:8080');
