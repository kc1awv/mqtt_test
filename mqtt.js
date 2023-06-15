function startConnect(){
    clientID = "clientID - " + parseInt(Math.random() * 100);

    host = "mqtt.m17labs.org"
    port = "8084"

    document.getElementById("messages").insertAdjacentHTML("afterbegin", "<span> Connecting to " + host + " on port " + port + "</span><br>");
    document.getElementById("messages").insertAdjacentHTML("afterbegin", "<span> Using the client Id " + clientID + " </span><br>");

    client = new Paho.MQTT.Client(host,Number(port),clientID);

    client.onConnectionLost = onConnectionLost;
    client.onMessageArrived = onMessageArrived;

    client.connect({
        useSSL: true,
        onSuccess: onConnect
    });
}

function onConnect(){
    topic =  document.getElementById("topic_s").value;
    document.getElementById("messages").insertAdjacentHTML("afterbegin", "<span> Subscribing to topic " + topic + "</span><br>");
    client.subscribe(topic);
}

function onConnectionLost(responseObject){
    document.getElementById("messages").insertAdjacentHTML("afterbegin", "<span> ERROR: Connection is lost.</span><br>");
    if(responseObject !=0){
        document.getElementById("messages").insertAdjacentHTML("afterbegin", "<span> ERROR:" + responseObject.errorMessage + "</span><br>");
    }
}

function onMessageArrived(message){
    console.log("OnMessageArrived: " + message.payloadString);
    document.getElementById("messages").insertAdjacentHTML("afterbegin", "<span>" + Date.now() + " Topic:" + message.destinationName + " | Message : " + message.payloadString + "</span><br>");
}

function startDisconnect(){
    client.disconnect();
    document.getElementById("messages").insertAdjacentHTML("afterbegin", "<span> Disconnected. </span><br>");
}
