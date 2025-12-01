#include <SPI.h>
#include <RH_RF95.h>
#include <WiFi.h>
#include <Firebase_ESP_Client.h>
#include "addons/TokenHelper.h"
#include "addons/RTDBHelper.h"

#define RF95_FREQ 915.0
#define LED       2
#define RFM95_CS 5
#define RFM95_RST 4
#define RFM95_INT 14

// Arduino9x_RX
// -*- mode: C++ -*-
// Example sketch showing how to create a simple messaging client (receiver)
// with the RH_RF95 class. RH_RF95 class does not provide for addressing or
// reliability, so you should only use RH_RF95 if you do not need the higher
// level messaging abilities.
// It is designed to work with the other example Arduino9x_TX


// Fire Base stuff
#define API_KEY "AIzaSyAp1IwI5lIyzyRm1Uv9MAPkQ3x43SGksWM"
#define DATABASE_URL "https://opensense-b7275-default-rtdb.firebaseio.com"

// const char *ssid = "1d-103@Lexington_crossing";
// const char *password = "597NUUDU5";

const char *ssid = "Iphone 3G";
const char *password = "password";


FirebaseData fbdo;
FirebaseAuth auth;
FirebaseConfig config;

unsigned long sendDataPrevMillis = 0;
bool signupOK = false;
bool alarm_state = false;
// Singleton instance of the radio driver
RH_RF95 rf95(RFM95_CS, RFM95_INT);

// Blinky on receipt
#define LED 2
struct SensorData {
  float f;        // e.g., 4 bytes temp in farenheight
  float h;           // e.g., 4 bytes humidity as percentage
  uint16_t pm25_value;      // e.g., 2 bytes airquality 
  uint16_t gasses;           // e.g., 2 bytes gas sensor
  uint16_t noise;            // 2 bytes
};
const size_t STRUCT_SIZE = sizeof(SensorData);

void setup() 
{
  pinMode(LED, OUTPUT);     
  pinMode(RFM95_RST, OUTPUT);
  digitalWrite(RFM95_RST, HIGH);

  Serial.begin(9600);
  delay(100);

  Serial.println("Arduino LoRa RX Test!");
  
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

  // Defaults after init are 434.0MHz, 13dBm, Bw = 125 kHz, Cr = 4/5, Sf = 128chips/symbol, CRC on

  // The default transmitter power is 13dBm, using PA_BOOST.
  // If you are using RFM95/96/97/98 modules which uses the PA_BOOST transmitter pin, then 
  // you can set transmitter powers from 5 to 23 dBm:
  rf95.setTxPower(23, false);

  // Conncting to wifi
  Serial.print("Connecting to ");
  Serial.println(ssid);
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("");
  Serial.println("WiFi connected.");
  Serial.println("IP address: ");
  Serial.println(WiFi.localIP());

  config.api_key = API_KEY;
  config.database_url = DATABASE_URL;
  if (Firebase.signUp(&config, &auth, "", "")){
    Serial.println("Signup OK");
    signupOK = true;
  }
  else{
    Serial.printf("%s\n", config.signer.signupError.message.c_str());
  }
  
  config.token_status_callback = tokenStatusCallback;
  Firebase.begin(&config, &auth);
  Firebase.reconnectWiFi(true);
  Serial.println("Setup Done.");
}

void loop()
{
  if (rf95.available())
  {
    // Should be a message for us now   
    uint8_t buf[STRUCT_SIZE];
    uint8_t len = STRUCT_SIZE;
    
    if (rf95.recv(buf, &len))
    {
      digitalWrite(LED, HIGH);
      if (len == STRUCT_SIZE){
        SensorData *receivedData = (SensorData *)buf;
        Serial.println("\n-------------------------------------");
        Serial.println("✅ Sensor Data Received!");
        
        // 4. Access and print the data using the -> operator
        Serial.print("Temperature (F): ");
        Serial.println(receivedData->f, 2); // Print float with 2 decimal places
        
        Serial.print("Humidity (%): ");
        Serial.println(receivedData->h, 2);
        
        Serial.print("PM2.5 Value:     ");
        Serial.println(receivedData->pm25_value);
        
        Serial.print("Gasses Value:    ");
        Serial.println(receivedData->gasses);
        
        Serial.print("Noise Value:     ");
        Serial.println(receivedData->noise);
        
        Serial.println("-------------------------------------");

        // SENDING TO FIREBASE
        Serial.println("Sending received data to Firebase");
        if (Firebase.ready() & signupOK ){
          // PM 2.5
          if (Firebase.RTDB.setInt(&fbdo, "latest/pm", receivedData->pm25_value)){
          Serial.println(); Serial.println(" PM sent to Firebase as Int.");
          }
          else Serial.println("Failed" + fbdo.errorReason());
          //gas
          if (Firebase.RTDB.setInt(&fbdo, "latest/gas", receivedData->gasses)){
          Serial.println(); Serial.println(" Gasses sent to Firebase as Int.");
          }
          else Serial.println("Failed" + fbdo.errorReason());

          // Noise
          if (Firebase.RTDB.setInt(&fbdo, "latest/sound", receivedData->noise)){
          Serial.println(); Serial.println(" PM sent to Firebase as Int.");
          }
          else Serial.println("Failed" + fbdo.errorReason());
          // humidity 
          if (Firebase.RTDB.setFloat(&fbdo, "latest/humidity", receivedData->h)){
          Serial.println(); Serial.println("Humidity sent to Firebase as Float.");
          }
          else Serial.println("Failed" + fbdo.errorReason());
          // temperature in farenheight
          if (Firebase.RTDB.setFloat(&fbdo, "latest/temp", receivedData->f)){
          Serial.println();  Serial.println("Temperature sent to Firebase as Float.");
          }
          else Serial.println("Failed" + fbdo.errorReason());
          if (Firebase.RTDB.getBool(&fbdo, "latest/alarm")) {
              alarm_state = fbdo.boolData();
              Serial.println();
              Serial.print("Replying w/ Alarm Status: ");
              Serial.println(alarm_state);
          }
          else Serial.println("Failed" + fbdo.errorReason());
        }
      }
      else{
        Serial.print("\nError: Size Mismatch. Expected ");
        Serial.print(STRUCT_SIZE);
        Serial.print(" bytes, but received ");
        Serial.print(len);
        Serial.println(" bytes.");
      }
      RH_RF95::printBuffer("Received: ", buf, len);
      Serial.print("Got: ");
      Serial.println((char*)buf);
       Serial.print("RSSI: ");
      Serial.println(rf95.lastRssi(), DEC);
      // Send a reply
      uint8_t data[] = { alarm_state ? '1' : '0' };
      rf95.send(data, sizeof(data));
      rf95.waitPacketSent();
      Serial.println("Sent Alarm Status");
      digitalWrite(LED, LOW);

      
    }

    else
    {
      Serial.println("Receive failed");
    }
  }
}
