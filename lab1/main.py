from adafruit_mqtt import Adafruit_MQTT
import time
import random

AIO_FEED_ID = ["button1", "button2"]#, "sensor1", "sensor2", "sensor3", "ai"]
AIO_USERNAME = "ledong0110"
AIO_KEY = "aio_iYyE93rB64dcXAweBfnCdt2ftFK2"

obj = Adafruit_MQTT(username=AIO_USERNAME, key=AIO_KEY, feed_ids=AIO_FEED_ID)
counter = 10
sensor_type = 0
while True:
    counter -= 1
    if counter <= 0:
        counter = 10
        print("Random data is publishing...")
        if sensor_type == 0:
            print("Temperature...")
            temp = random.randint(10,20)
            obj.publish("sensor1", temp)
            sensor_type = 1
        elif sensor_type == 1:
            print("Brightness...")
            brightness = random.randint(100,500)
            obj.publish("sensor2", brightness)
            sensor_type = 2
        elif sensor_type == 2:
            print("Humidity...")
            humi = random.randint(50,70)
            obj.publish("sensor3", humi)
            sensor_type = 0
        else:
            pass
            
    time.sleep(1)
