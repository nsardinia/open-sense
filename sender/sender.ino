#include <SPI.h>
#include <RH_RF95.h>
#include <SoftwareSerial.h>
#include "Adafruit_PM25AQI.h"
#include "DHT.h"


#define LED       2
#define RFM95_CS 5
#define RFM95_RST 4
#define RFM95_INT 14
//must match RX's freq!
#define RF95_FREQ 915.0
#define DHTPIN 15
#define DHTTYPE DHT22 // DHT 22 (AM2302)
#define microphone 33
#define gas 32
#define gas_digital 13
#define buzzer 21
#define rx_pin 35

// Singleton instance of the radio driver
RH_RF95 rf95(RFM95_CS, RFM95_INT);

SoftwareSerial pmSerial(rx_pin, 3);
// initialize air quality sensor
Adafruit_PM25AQI aqi = Adafruit_PM25AQI();
// initialize temp/humid sensor
DHT dht(DHTPIN, DHTTYPE);

struct SensorData {
  float f;        // e.g., 4 bytes temp in farenheight
  float h;           // e.g., 4 bytes humidity as percentage
  uint16_t pm25_value;      // e.g., 2 bytes airquality 
  uint16_t gasses;           // e.g., 2 bytes gas sensor
  uint16_t noise;            // 2 bytes
};

SensorData sensor_data;

void setup() 
{
  dht.begin();
  pinMode(RFM95_RST, OUTPUT);
  pinMode(LED, OUTPUT);
  pinMode(gas_digital, INPUT);
  pinMode(buzzer, OUTPUT);
  digitalWrite(RFM95_RST, HIGH);
  pmSerial.begin(9600);

  Serial.begin(115200);
  delay(100);

  Serial.println("Arduino LoRa TX Test!");

  // manual reset
  digitalWrite(RFM95_RST, LOW);
  delay(10);
  digitalWrite(RFM95_RST, HIGH);
  delay(10);

  while (!rf95.init()) {
    Serial.println("LoRa radio init failed");
    while (1);
  }
  Serial.println("LoRa radio init OK!");

  // Defaults after init are 434.0MHz, modulation GFSK_Rb250Fd250, +13dbM
  if (!rf95.setFrequency(RF95_FREQ)) {
    Serial.println("setFrequency failed");
    while (1);
  }
  Serial.print("Set Freq to: "); Serial.println(RF95_FREQ);
  
  rf95.setTxPower(23, false);

  if (! aqi.begin_UART(&pmSerial)) { // connect to the sensor over software serial 
    Serial.println("Could not find PM 2.5 sensor!");
    while (1) delay(10);
  }
  Serial.println("PM25 found!");

}

int16_t packetnum = 0;  // packet counter, we increment per xmission

void loop()
{
  // ************reading from PM air quality sensor**************
  PM25_AQI_Data data;
  if (! aqi.read(&data)) {
    Serial.println("Could not read from AQI");
    
    delay(500);  // try again in a bit!
    return;
  }

  Serial.println("AQI reading success");
  sensor_data.pm25_value = data.aqi_pm25_us;
  Serial.print(F("PM2.5 AQI US: ")); Serial.println(sensor_data.pm25_value);

  // **************read temp/humid**********************
  sensor_data.h = dht.readHumidity();
  // Read temperature as Fahrenheit (isFahrenheit = true)
  sensor_data.f = dht.readTemperature(true);
  if (isnan(sensor_data.h) || isnan(sensor_data.f)) {
    Serial.println(F("Failed to read from DHT sensor!"));
    return;
  }
  Serial.print(F("Humidity: "));
  Serial.print(sensor_data.h);
  Serial.print(F("%  Temperature: "));
  Serial.print(sensor_data.f);
  Serial.println(F("°F"));

  //  *************** Noise & Gas detection ****************
  sensor_data.noise = analogRead(microphone);
  Serial.print("Noise Level: "); Serial.println(sensor_data.noise);
  sensor_data.gasses = analogRead(gas);
  Serial.print("Gas Present/4095: "); Serial.println(sensor_data.gasses);
  // if (digitalRead(gas_digital) == HIGH){ 
  //   digitalWrite(buzzer, HIGH);
  //   Serial.println("Buzzing!");
  // }

  // ******************* Lora Sending ************************
  Serial.println("Sending to rf95_server");
  // Send a message to rf95_server
  
  Serial.println("Sending Sensor Data Struct..."); 
  
  digitalWrite(LED, HIGH);
  delay(10);
  rf95.send( (uint8_t *)&sensor_data, sizeof(sensor_data));

  Serial.println("Waiting for packet to complete..."); delay(10);
  rf95.waitPacketSent();
  // Now wait for a reply
  uint8_t buf[RH_RF95_MAX_MESSAGE_LEN];
  uint8_t len = sizeof(buf);

  Serial.println("Waiting for reply..."); delay(100);
  if (rf95.waitAvailableTimeout(1000))
  { 
    // Should be a reply message for us now   
    if (rf95.recv(buf, &len))
   {  bool alarm = (buf[0] == '1');
      // Serial.print("Got reply: ");
      // Serial.println((char*)buf);
      Serial.print("Received alarm: ");
      Serial.println(alarm ? "true" : "false");
      Serial.print("RSSI: ");
      Serial.println(rf95.lastRssi(), DEC);  
      if (alarm){
        Serial.println("***ALARM***");
        digitalWrite(buzzer, HIGH);
        delay(2000);}
      else {digitalWrite(buzzer, LOW);}
    }
    else
    {
      Serial.println("Receive failed");
    }
  }
  else
  {
    Serial.println("No reply, is there a listener around?");
  }
  delay(1000);
  digitalWrite(LED, LOW); // message was sent

}
