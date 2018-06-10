if (window.WebSocket) {
	console.log("web socket OK");
} else {
	console.log("WebSocket not suported");
	alert("WebSocket FAIL. Upgrade needed.");
}

window.addEventListener("load",init);

wsUri = "ws://echo.websocket.org";

function init() {
	output= document.getElementById("output");
	testWebSocket();
}

function testWebSocket() { 
	websocket = new WebSocket(wsUri); 
	websocket.onopen = onOpen; 
	websocket.onclose = onClose; 
	websocket.onmessage = onMessage;
	websocket.onerror = onError;
}

function onOpen() {
	writeToScreen("CONNECTED"); 
	doSend("Hello Websocket!!"); 
}

function onClose() { 
	writeToScreen("DISCONNECTED");
} 

function onMessage(evt) {
	writeToScreen('<span style="color: blue;">RESPONSE: ' + evt.data + '</span>'); websocket.close();
}

function onError(evt) { 
	writeToScreen('<span style="color: red;">ERROR:</span> ' + evt.data);
}

function doSend(message) { 
	writeToScreen("SENT: " + message); 
	websocket.send(message);
}

function writeToScreen(message) { 
	var pre = document.createElement("p"); 
	pre.innerHTML = message; 
	output.appendChild(pre);
}
