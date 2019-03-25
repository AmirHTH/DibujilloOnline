var WebSocketServer = require('ws').Server;
wss = new WebSocketServer ({ port:9001 });
var clients = [];
//var oldMsg = "1";


console.log('Lanzando');

wss.on('connection', function connection(ws) {
    //var con = request.accept('any-protocol', request.origin)
    clients.push(ws)
    ws.send("conectado", "pepe");
    ws.on('message', function incoming(message) {
       // console.log('received: %s', message);
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

