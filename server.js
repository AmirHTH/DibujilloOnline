var express = require('express')
var app = express()

app.get('/', function (req, res) {
   res.sendFile(__dirname + '/html/index.html');
})

app.listen(3080, function () {
   console.log('Example app listening on port 3080!')
})

app.use(express.static('html'));

var WebSocketServer = require('ws').Server;
wss = new WebSocketServer ({ port:9001 });
console.log('WS app listening on port 9001!');
var clients = [];


var mensaje;


console.log('Lanzando');


wss.on('connection', function connection(ws) {
    
    clients.push(ws)
    console.log('Ha conectado un usuario, hay: '+clients.length);
    if (ws.readyState === ws.OPEN) {
        ws.send(mensaje+"@"+clients.length); // enviar canvas y usrs al conectar
   }


   ws.on('close', function close() {
    console.log('Se ha desconectando un usuario, quedan '+(clients.length-1));
    clients.pop(ws);
    
    })
    ws.on('message', function incoming(message) {

        mensaje=message; // guardamos el mensaje para enviarlo a alguien recien conectado
        clients.forEach(function(client) {
            if (client.readyState === client.OPEN) {   
               client.send(message+"@"+clients.length);           
            }
        });
    });
});


