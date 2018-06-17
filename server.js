var WebSocketServer = require('ws').Server;
wss = new WebSocketServer ({ port:9001 });
var clients = [];


wss.on('connection', function connection(ws) {
    //var con = request.accept('any-protocol', request.origin)
    clients.push(ws)
    ws.on('message', function incoming(message) {
        console.log('received: %s', message);
        clients.forEach(function(client) {
           //if (!client.readyState == 3) {

            client.send(message);

           // }
        });
    });
});

