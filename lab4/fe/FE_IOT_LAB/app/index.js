import { StyleSheet, Text, View, Switch } from "react-native";
import { connectBroker, publishData } from "../components/Mqtt";
import { useEffect, useState } from "react";

const mqttClient = connectBroker();
    

export default function Page() {
  const [temp, setTemp] = useState("0")
  const [humid, setHummid] = useState("0")
  const [bright, setBright] = useState("0")
  const [isEnabledBtn1, setIsEnabledBtn1] = useState(false);
  const [isEnabledBtn2, setIsEnabledBtn2] = useState(false);
  const toggleSwitchBtn1 = () => { 
    publishData(mqttClient, "ledong0110/feeds/button1",!isEnabledBtn1)
    setIsEnabledBtn1(previousState => !previousState)
  };
  const toggleSwitchBtn2 =  () => { 
    publishData(mqttClient, "ledong0110/feeds/button2",!isEnabledBtn2)
    setIsEnabledBtn2(previousState => !previousState)
  };
  
  useEffect( () => {
    
    mqttClient.on("messageReceived", (message) => {
        //_destinationName
        console.log(message._destinationName+":");
        console.log(message.payloadString);
        if (message.destinationName.includes("sensor1")) {
            setTemp(message.payloadString);
        }
        if (message.destinationName.includes("sensor2")) {
            setBright(message.payloadString);
        }
        if (message.destinationName.includes("sensor3")) {
            setHummid(message.payloadString);
        }
        if (message.destinationName.includes("button1")) {
            setIsEnabledBtn1(parseInt(message.payloadString)==1);
        }
        if (message.destinationName.includes("button2")) {
            setIsEnabledBtn2(parseInt(message.payloadString)==1);
        }
    });
    return () => {};
  }, [])
  return (
    <View style={styles.container}>
        <View style={styles.block1}>
            <View style={styles.temp}>
                <Text style={styles.title}>{temp}°C</Text>
                
            </View>
            <View style={styles.humid}>
                <Text style={styles.title}>{humid}%</Text>
                
            </View>
            <View style={styles.bright}>
                <Text style={styles.title}>{bright} lux</Text>
                
            </View>
        </View>
        <Switch
            style={styles.switch}
            trackColor={{false: '#767577', true: '#81b0ff'}}
            thumbColor={isEnabledBtn1 ? '#f5dd4b' : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitchBtn1}
            value={isEnabledBtn1}
      />
      <Switch
            style={styles.switch}
            trackColor={{false: '#767577', true: '#81b0ff'}}
            thumbColor={isEnabledBtn2 ? '#f5dd4b' : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitchBtn2}
            value={isEnabledBtn2}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  switch: {
    marginTop: 100,
    padding: 10,
    transform: [{ scaleX: 5. },{ scaleY: 5 }]
  },
  container: {
    flex: 1,
    alignItems: "center",
    padding: 24,
    gap: 50,
  },
  block1: {
    marginTop: 50,
    flexDirection: "row",
    justifyContent: "center",
    gap: 15
  },
  temp: {
    // flex: 1,
    padding: 10,
    justifyContent: "center",
    backgroundColor: "red",
    // color: "#fff",
    // maxWidth: 960,
    marginHorizontal: "auto",
    aspectRatio: 1
  },
  humid: {
    // flex: 1,
    padding: 10,
    justifyContent: "center",
    backgroundColor: "blue",
    aspectRatio: 1
    // maxWidth: 960,
    // marginHorizontal: "auto",
  },
  bright: {
    // flex: 1,
    padding: 10,
    justifyContent: "center",
    backgroundColor: "purple",
    aspectRatio: 1
    // maxWidth: 960,
    // marginHorizontal: "auto",
  },
  title: {
    fontSize: 25,
    color: "white",
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 36,
    color: "#38434D",
  },
});
