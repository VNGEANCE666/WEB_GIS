# 🌍 WebGIS Temperature & Humidity Monitoring System  
**South Tangerang City**

This project is a **Web-based Geographic Information System (WebGIS)** designed to monitor **air temperature and humidity** conditions in real time across multiple monitoring locations.

The system integrates **IoT sensor data** (via **ThingSpeak API**) with an **interactive map powered by Leaflet.js**, enabling spatial visualization of environmental data in an informative and user-friendly manner.

---

## 🎯 Project Objectives
- To develop a location-based temperature and humidity monitoring system  
- To visualize IoT sensor data using WebGIS technology  
- To support spatial analysis of environmental conditions  
- To provide an interactive and real-time environmental monitoring platform  

---

## 🚀 Key Features

### 1. 🗺️ Interactive Map (Leaflet.js)
- Displays monitoring locations using **radius polygon areas**
- **Dynamic color mapping** based on temperature values  
  (Green = Cool, Yellow = Normal, Red = Hot)
- Informative popups for each monitoring point
- Additional spatial layers generated from **QGIS**

### 2. 📡 Real-Time Monitoring (IoT Integration)
- Direct integration with **ThingSpeak API**
- Automatic updates every **10–15 seconds**
- Supports monitoring of **up to 4 locations simultaneously**
- Data updates without page refresh

### 3. 📊 Statistical Dashboard
- Sidebar panel displaying latest temperature & humidity values
- Historical data charts (ThingSpeak Chart iframe)
- Automatic location address detection using  
  **Reverse Geocoding (Nominatim OpenStreetMap)**

### 4. 🎨 Modern & Responsive Interface
- Modern UI design with *Glassmorphism* style
- Dedicated **Dark Mode** for the About page
- Fully responsive and **mobile-friendly**
- Adaptive sidebar layout for desktop and smartphone screens

---

## 🛠️ Technologies Used

### Hardware
- ESP32
- DHT22 Sensor (Temperature & Humidity)
- GPS Module NEO-6M

### Software & Tools
- **Frontend:** HTML5, CSS3 (Custom Responsive Layout)
- **Logic:** JavaScript (Vanilla JS / ES6)
- **Mapping Library:** [Leaflet.js](https://leafletjs.com/)
- **IoT Platform:** [ThingSpeak API](https://thingspeak.com/)
- **Geocoding:** [Nominatim API](https://nominatim.org/)
- **GIS Software:** QGIS
- **Version Control:** Git & GitHub

### Map Plugins
- Leaflet MarkerCluster
- Leaflet Locate
- Leaflet Measure
- Leaflet Search (Photon)

---

## 📂 Project Structure

```text
webgis-monitoring/
│
├── index.html                  # Landing Page
├── maps.html                   # Main WebGIS Page
├── about.html                  # About the Team
├── style.css                   # Main styling
├── script.js                   # API fetching & UI logic
│
├── js/                         # JavaScript Libraries (Leaflet & Plugins)
│   ├── leaflet.js
│   ├── qgis2web_expressions.js
│   └── ...
│
├── css/                        # Leaflet CSS Libraries
│   ├── leaflet.css
│   └── ...
│
├── data/                       # Spatial Data (GeoJSON)
│   ├── RADIUS_PEMANTAUAN_5.js
│   ├── JALAN_UTM_3.js
│   ├── PEMUKIMAN_AR_25K_4.js
│   └── ...
│
├── images/                     # Image Assets
│   ├── profil1.jpg
│   ├── profil2.jpeg
│   └── ...
│
└── README.md                   # Project Documentation
````

---

## ⚙️ How to Run the Project

This project is a **static web application**, so no backend server is required.

1. Clone or download this repository
2. Ensure an active internet connection
3. Open `index.html` or `maps.html` using a modern web browser
4. *Recommended:* Use **Live Server (VS Code Extension)** for better performance

---

## 🔧 API Configuration

### 1. Change ThingSpeak Data Source

Edit the `script.js` file and locate the `fetchData` or update function:

```javascript
updatePoint(
  POINT_INDEX,
  "NEW_CHANNEL_ID",
  "NEW_API_KEY"
);
```

### 2. Modify Map Coordinates & Radius

Edit the following file:

```text
data/RADIUS_PEMANTAUAN_5.js
```

The spatial data is stored in **GeoJSON format** and can be edited directly or regenerated using **QGIS**.

---

## 🐛 Troubleshooting

**Temperature or Humidity Data is Undefined**

* Check your internet connection
* Ensure the ThingSpeak API key is still active
* Inspect browser console (Press F12)

**Map Does Not Load**

* Ensure all Leaflet JS & CSS files are properly linked
* Verify GeoJSON structure validity

**Incomplete Address Information**

* The system will attempt to display alternative location names
* This depends on OpenStreetMap data availability

---

## 👤 Project Author

**Rifqi Fairuzzabady**  
Full-Stack WebGIS Engineer


**Affiliation:**  
Computer Science Study Program  
Faculty of Mathematics and Natural Sciences  
Universitas Pakuan  

**Profiles:**  
- 🔗 GitHub: [https://github.com/VNGEANCE666]

**Institution:**
Computer Science Study Program
Faculty of Mathematics and Natural Sciences
Universitas Pakuan

---

## 🌐 Live Demo

*(Available after enabling GitHub Pages)*

```
https://username.github.io/webgis-monitoring/
```

---

## 📄 License

This project is developed for **academic and educational purposes**
and is released as an **open-source project**.
