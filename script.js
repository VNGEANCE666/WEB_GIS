// --- 1. SETUP TOMBOL SIDEBAR ---
const sidebar = document.getElementById("sidebar");
const toggleBtn = document.getElementById("toggle-btn");

if (sidebar && toggleBtn) {
  toggleBtn.addEventListener("click", () => {
    sidebar.classList.toggle("collapsed");
    const mainEl = document.querySelector("main");
    if (mainEl) mainEl.classList.toggle("collapsed");
  });
}

// Toggle Statistik
const toggleStatBtn = document.getElementById("toggle-statistics");
if (toggleStatBtn) {
  toggleStatBtn.addEventListener("click", () => {
    const statisticsSection = document.getElementById("statistics-section");
    const mapsSection = document.querySelector(".webgis-content");
    if (statisticsSection) {
      statisticsSection.classList.toggle("collapsed");
      if (mapsSection) {
        mapsSection.style.flex = statisticsSection.classList.contains("collapsed") ? "1" : "0.25";
      }
    }
  });
}

// --- 2. VARIABEL GLOBAL UNTUK PETA (Wajib Ada) ---
var suhu_dht22_titik1 = "0", kelembaban_dht22_titik1 = "0";
var suhu_dht22_titik2 = "0", kelembaban_dht22_titik2 = "0";
var suhu_dht22_titik3 = "0", kelembaban_dht22_titik3 = "0";
var suhu_dht22_titik4 = "0", kelembaban_dht22_titik4 = "0";

// --- 3. FUNGSI UPDATE UI (Satu Fungsi untuk Semua Titik) ---
function updateDataTitik(channelID, apiKey, index) {
    const url = `https://api.thingspeak.com/channels/${channelID}/feeds/last.json?timezone=Asia%2FJakarta&api_key=${apiKey}`;
    
    fetch(url)
      .then(r => r.json()).then(data => {
        // A. Update Variabel Global (Penting untuk Peta)
        let suhu = parseFloat(data.field4).toFixed(2);
        let hum = parseFloat(data.field3).toFixed(2);
        
        if(index == 1) { suhu_dht22_titik1 = suhu; kelembaban_dht22_titik1 = hum; }
        if(index == 2) { suhu_dht22_titik2 = suhu; kelembaban_dht22_titik2 = hum; }
        if(index == 3) { suhu_dht22_titik3 = suhu; kelembaban_dht22_titik3 = hum; }
        if(index == 4) { suhu_dht22_titik4 = suhu; kelembaban_dht22_titik4 = hum; }

        // B. Update Angka di Layar (Sidebar)
        setText(`suhu-titik${index}`, suhu);
        setText(`kelembaban-titik${index}`, hum);

        // C. Update Lokasi & Alamat
        updateLocation(data.field1, data.field2, index);
      })
      .catch(e => console.error(`Err Titik ${index}`, e));
}

// Fungsi Mencari Alamat (Nominatim)
function updateLocation(lat, lon, i) {
    if(!lat || !lon) return;

    // 1. Update Koordinat di HTML (Support format Sidebar & Card)
    setText(`coordinate${i}`, `${lat}, ${lon}`); // Sidebar
    setText(`lat${i}`, lat); // Card
    setText(`long${i}`, lon); // Card
    
    // Update Link Maps
    if(document.getElementById(`go-to-maps${i}`)) {
        document.getElementById(`go-to-maps${i}`).href = `https://www.google.com/maps/search/?api=1&query=$${lat},${lon}`;
    }

    // 2. Ambil Nama Jalan/Tempat
    fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`)
    .then(r => r.json())
    .then(loc => {
        // LOGIKA PENCARIAN NAMA (Supaya tidak "Jalan tidak ditemukan")
        let namaTempat = "Lokasi tidak dikenal";

        if (loc.address) {
            namaTempat = loc.address.road ||       // 1. Coba Nama Jalan
                         loc.address.building ||   // 2. Coba Nama Gedung
                         loc.address.village ||    // 3. Coba Nama Desa
                         loc.address.hamlet ||     // 4. Coba Nama Dusun
                         loc.address.suburb ||     // 5. Coba Kecamatan
                         loc.display_name.split(',')[0]; // 6. Ambil potongan pertama
        } else if (loc.display_name) {
            namaTempat = loc.display_name.split(',')[0];
        }

        // Tampilkan Nama Tempat ke HTML (Support Sidebar & Card)
        setText(`address${i}`, namaTempat);      // Untuk Sidebar
        setText(`residental${i}`, namaTempat);   // Untuk Card
        setText(`type${i}`, loc.type || "Area"); // Tipe lokasi
    })
    .catch(e => console.log("Gagal geocoding", e));
}

// Helper untuk set text aman (biar gak error kalau elemen gak ada)
function setText(id, text) {
    if(document.getElementById(id)) document.getElementById(id).innerText = text;
}

// --- 4. EKSEKUSI ---
function fetchData() {
    updateDataTitik("3224295", "T8QVJ06LCOY99K48", 1);
    updateDataTitik("3224296", "AOI634SUB91B8F64", 2);
    updateDataTitik("3224297", "DV2JPE946T2C7CIK", 3);
    updateDataTitik("3224298", "S067ZW2KT03JOA1T", 4);
}

// Jalankan
fetchData();
setInterval(fetchData, 10000);