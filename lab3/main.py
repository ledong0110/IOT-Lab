from adafruit_mqtt import Adafruit_MQTT
import time
import random
from simple_ai import image_detector
from uart import *

AIO_FEED_ID = ["button1", "button2"]#, "sensor1", "sensor2", "sensor3", "ai"]
AIO_USERNAME = "ledong0110"
AIO_KEY = ""

def callbackFn(feed_id, payload):
    if feed_id == "button1":
        if payload == "0":
            writeData("1")
        else:
            writeData("2")
    elif feed_id == "button2":
        if payload == "0":
            writeData("3")
        else:
            writeData("4")

obj = Adafruit_MQTT(username=AIO_USERNAME, key=AIO_KEY, feed_ids=AIO_FEED_ID)
obj.addCallbackFn(callbackFn)
counter = 10
sensor_type = 0
counter_ai = 5
previousResult = aiResult = ""
while True:
    counter -= 1
    counter_ai -= 1
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
    
    if counter_ai <= 0:
        counter_ai = 5
        previousResult = aiResult
        aiResult = image_detector()
        print("AI output: ", aiResult)
        if previousResult != aiResult: obj.publish("ai", aiResult)
    readSerial(obj)
    # writeData("Mở đèn, mở đèn ... \n")
    time.sleep(1)
