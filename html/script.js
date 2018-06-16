if (window.WebSocket) {
	console.log("web socket OK");
} else {
	console.log("WebSocket not suported");
	alert("WebSocket FAIL. Upgrade needed.");
}

window.addEventListener("load",init);

wsUri = "ws://echo.websocket.org";

function init() {
    console.log("init entry");
	output= document.getElementById("input");
    console.log("init output");
	testWebSocket();
    console.log("init end");
}

function testWebSocket() {
    console.log("testWebSocket entry");
	websocket = new WebSocket(wsUri);
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
