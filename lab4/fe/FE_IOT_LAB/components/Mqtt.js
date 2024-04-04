import { Client, Message } from "react-native-paho-mqtt";

const connectUrl = "wss://io.adafruit.com:443/";
const mqttBrokerId = "iot_1";
const arrayTopic = [`ledong0110/feeds/sensor1`, `ledong0110/feeds/sensor2`, `ledong0110/feeds/sensor3`, `ledong0110/feeds/button1`, `ledong0110/feeds/button2`]

const myStorage = {
  setItem: (key, item) => {
    myStorage[key] = item;
  },
  getItem: (key) => myStorage[key],
  removeItem: (key) => {
    delete myStorage[key];
  },
};
let connectOption= {
    userName: "ledong0110",
    password: "",
    
}
let option = {
  uri: connectUrl,
  clientId: mqttBrokerId,
  storage: myStorage,
};

// Create a client instance
const client = new Client(option);

// set event handlers
client.on("connectionLost", (responseObject) => {
  if (responseObject.errorCode !== 0) {
    console.log(responseObject.errorMessage);
  }
  console.log("ERROR")
  console.log(responseObject.errorMessage)
});

function connectBroker() {
  // connect the client
  client
    .connect(connectOption)
    .then(() => {
      // Once a connection has been made, make a subscription and send a message.
      console.log("onConnect");
      for (const e of arrayTopic) {
        client.subscribe(e);
      }
    })
    .catch((responseObject) => {
      if (responseObject.errorCode !== 0) {
        console.log("ERROR")
        console.log("onConnectionLost:" + responseObject.errorMessage);
      }
    });

  return client;
}

function publishData(client, feed_id, msg) {
  
  let message = new Message(""+Number(msg));
  message.destinationName = feed_id;
  client.send(message);
}

export { connectBroker, publishData, mqttBrokerId };