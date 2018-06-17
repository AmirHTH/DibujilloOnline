if (window.WebSocket) {
	console.log("web socket OK");
} else {
	console.log("WebSocket not suported");
	alert("WebSocket FAIL. Upgrade needed.");
}

window.addEventListener("load",init);
window.addEventListener("load",initDraw);

//wsUri = "ws://echo.websocket.org";
wsUri = "ws://localhost:9001";


function initDraw() {
    console.log("initDraw entry with uri: "+wsUri);
    initServer();
    console.log("initDraw server inited");

    canvas = new fabric.Canvas('canvas');
    canvas.freeDrawingBrush.color = 'green';
    canvas.freeDrawingBrush.lineWidth = 10;
    //canvas.addEventListener("onmouseup", sendall);

    addCircle.addEventListener('click', addCircleHandler);
    addRectangle.addEventListener('click', addRectangleHandler);
    addTriangle.addEventListener('click', addTriangleHandler);
    pencil.addEventListener('click', pencilHandler);
    selection.addEventListener('click', selectionHandler);

    console.log("initDraw end");
}
function init() {
    console.log("init entry with uri: "+wsUri);
	//output= document.getElementById("input");
    console.log("init output");
	//testWebSocket();
    console.log("init end");
}

function isJson (str) {
	try {
		JSON.parse(str);
	} catch (e) {
		return false;
    }
    return true;
}

function addCircleHandler() {
	var obj = {
		radius : 20,
		top    : 100,
		left   : 100,
		fill   : 'green'
	};
	sendObject('Circle', obj);
}

function addRectangleHandler() {
    var obj = {
        top    : 200,
        left   : 150,
        width  : 60,
        height : 90,
        fill   : 'red'
    };
    sendObject('Rectangle', obj);
}

function addTriangleHandler() {
    var obj = {
        top    : 50,
        left   : 50,
        width  : 20,
        height : 30,
        fill   : 'blue'
    };
    sendObject('Triangle', obj);
}

function pencilHandler() {
	canvas.isDrawingMode=true;
}

function selectionHandler() {
	canvas.isDrawingMode =false;
}


function initServer() {
	// unificar con el testWebSocket
    websocket = new WebSocket(wsUri);
    websocket.onopen = connectionOpen;
    websocket.onmessage = onMessageFromServer;
}

function connectionOpen() {
	websocket.send('connection open');
}

function onMessageFromServer(message) {
	console.log('received: '+ message);
    console.log('received data: '+ message.data);
	if (isJson(message.data)) {
		var obj = JSON.parse(message.data);
		console.log("got data from server");
		drawRecivedObj(obj.type, obj.data);
	} else {
		// si no es un json será un mensaje del chat ?
	}
}

function addObject(type, obj) {
    websocket.send(JSON.stringify({
        'type': type,
        'data': obj
    }))	;
}

function sendObject(type, obj) {
    drawRecivedObj(type,obj);
	addObject(type,obj);

}

function drawRecivedObj(type, obj) {
    var shape;
    if (type == 'Triangle') {

        shape= new fabric.Triangle(obj)

    } else if (type == 'Rectangle') {

        shape= new fabric.Rect(obj)

    } else if (type == 'Circle') {

        shape= new fabric.Circle(obj)

    }
    canvas.add(shape);
}


function testWebSocket() {
    console.log("testWebSocket entry");
	websocket = new WebSocketty(wsUri);
    console.log("testWebSocket metods")
	websocket.onopen = onOpen; 
	websocket.onclose = onClose; 
	websocket.onmessage = onMessage;
	websocket.onerror = onError;
    console.log("testWebSocket end")
}

function onOpen() {
	console.log("onOpen entry")
	writeToScreen("CONNECTED");
	console.log("onOpen write")
	doSend("Hello Websoket!!");
	console.log("onOpen end")
}

function onClose() {
	console.log("onClose entry")
	writeToScreen("DISCONNECTED");
} 

function onMessage(evt) {
	console.log("onMessage entry")
	writeToScreen('<span style="color: blue;">RESPONSE: ' + evt.data + '</span>'); websocket.close();
}

function onError(evt) {
	console.log("onError entry")
	writeToScreen('<span style="color: red;">ERROR:</span> ' + evt.data);
}

function doSend(message) {
	console.log("doSend entry")

	writeToScreen("SENT: " + message);
	websocket.send(message);
}

function writeToScreen(message) {
	console.log("writeToScreen entry")
	var pre = document.createElement("p");
	pre.innerHTML = message;
	output.appendChild(pre);
}
