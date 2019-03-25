if (window.WebSocket) {
	console.log("web socket OK");
} else {
	console.log("WebSocket not suported");
	alert("WebSocket FAIL. Upgrade needed.");
}

//window.addEventListener("load",init);

//wsUri = "ws://echo.websocket.org";
wsUri = "ws://localhost:9001";

var ID = Math.floor((Math.random() * 100000000) + 2);

function validate() {

    console.log("ENTRA A VALIDATE");
    var username = document.getElementById("user").value;
    var password = document.getElementById("pass").value;
    if ( username == "aa" && password == "aa"){
        alert ("Login successfully");
        init();
        //return true;
    } else {
        alert ("Login FAIL");
        location.href="indexNOPE.html";
        //return false;
    }
}


function init() {

    console.log("init() entry with uri: "+wsUri);
    initServer();
    console.log("init() server inited");

    output= document.getElementById("input");

    canvas = new fabric.Canvas('canvas');
    canvas.freeDrawingBrush.color = 'cyan';
    canvas.freeDrawingBrush.lineWidth = 10;

  //  canvas.addEventListener('click', sendAllCanvasBroadCast, false);

   /* canvas.click = function (sendAllCanvasBroadCast) {
        console.log("calling sendAllCanvasBroadCast");

    };*/

    addCircle.addEventListener('click', addCircleHandler);
    addRectangle.addEventListener('click', addRectangleHandler);
    addTriangle.addEventListener('click', addTriangleHandler);
    pencil.addEventListener('click', pencilHandler);
    selection.addEventListener('click', selectionHandler);

    descargar.addEventListener('click', descargarJson);

    console.log("init() end");

    this.canvas.on({
        'path:created': this.addObject.bind(this),
        'object:modified': this.addObject.bind(this),
        'object:moving': this.addObject.bind(this),
        'object:scaling': this.addObject.bind(this),
        'object:rotating': this.addObject.bind(this),
        'object:skewing': this.addObject.bind(this),
        'object:mousemove': this.addObject.bind(this),

    })
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



function descargarJson() {
    console.log('descargando JSON');
    JSON.stringify(canvas.toJSON())
    
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(JSON.stringify(canvas.toJSON())));
    element.setAttribute('download', 'archivo_Json_seguridad.txt');
  
    element.style.display = 'none';
    document.body.appendChild(element);
  
    element.click();
}


function connectionOpen() {
    writeToScreen('<span style="color: green;">CONNECTED</span> ');
    //websocket.send('connection open');
    console.log("onOpen end");

}

function onMessageFromServer(message) {
    console.log('received data: '+ message.data);
    var res = message.data.split("@");
    var datos = res[1];
    var idNum = res[0];
	if (isJson(datos)) {
		var obj = JSON.parse(datos);
		console.log("got shape data from server");
        if (idNum != ID) {
    canvas.loadFromJSON(JSON.parse(datos), canvas.renderAll.bind(canvas));
} else {
    console.log("sender and reciver are the same, ignoring");
}

		//drawRecivedObj(obj.type, obj.data);
	} else {
        console.log("WARNING: other info recived: "+ (datos));
        //canvas.loadFromJSON(JSON.parse(message.data), canvas.renderAll.bind(canvas));
	}
}

function addObject() {
    //websocket.send(JSON.stringify({ 'type': type, 'data': obj  }))	;

    websocket.send(ID+"@"+
        JSON.stringify(
            canvas.toJSON()));
}

function sendObject(type, obj) {
    drawRecivedObj(type,obj);
	addObject();

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

function initServer() {
    // unificar con el testWebSocket
    websocket = new WebSocket(wsUri);
    websocket.onopen = connectionOpen;
    websocket.onmessage = onMessageFromServer;
    websocket.onclose = onClose;
    websocket.onerror = onError;
}


function onClose() {
	console.log("onClose entry")
    writeToScreen('<span style="color: red;">DISCONNECTED</span> ');
	//websocket.terminate();
    websocket.close();
}


function onError(evt) {
	console.log("onError entry")
	writeToScreen('<span style="color: red;">ERROR:</span> ' + evt.data);
    //websocket.terminate();
	websocket.close();
}


function writeToScreen(message) {
	console.log("writeToScreen entry")
	var pre = document.createElement("p");
	pre.innerHTML = message;
	output.appendChild(pre);
}
