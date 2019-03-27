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
//var oldMsg = "1";

//var contador=0;


console.log('Lanzando');
/*
ws.on('close', function() {
    console.log("connection closed");
    clients.splice(clients.indexOf(ws), 1);
  });*/

wss.on('connection', function connection(ws) {
    //var con = request.accept('any-protocol', request.origin)
    clients.push(ws)
    console.log('Ha conectado un usuario, hay: '+clients.length);
   // ws.send("conectado", "pepe");
   // ws.on('marchaUSR',  function incoming(ws) { console.log("cerrando"+ws); clients.pop(ws); });

   ws.on('close', function close() {
    console.log('Se ha desconectando un usuario, quedan '+(clients.length-1));
    clients.pop(ws);
    
    })
    ws.on('message', function incoming(message) {
        //console.log('received: %s', message);
       /* if(message.includes('marchaUSR'))
        {
           contador--;
        }
        if(message.includes('entraUSR'))
        {
           contador++;
        }*/
        clients.forEach(function(client) {
            if (client.readyState === client.OPEN) {
               // if (message.length >= oldMsg.length) {
                   // oldMsg = message;
                    client.send(message+"@"+clients.length);
               // }
            }
        });
    });
});


