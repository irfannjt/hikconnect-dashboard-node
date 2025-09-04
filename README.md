# 📡 HikConnect Dashboard (Node.js + MySQL)

Dashboard sederhana untuk monitoring status perangkat CCTV (HiConnect) berbasis **Node.js + Express + MySQL**.

## 🚀 Fitur
- Menampilkan daftar device CCTV
- Menandai status **Online / Offline**
- Toggle status perangkat langsung dari dashboard
- API endpoint untuk integrasi

## 📂 Struktur Project
```
hikconnect-dashboard-node/
│── package.json
│── server.js
│── db.js
│── routes/devices.js
│── public/
│   ├── index.html
│   └── style.css
│── devices.sql
```

## ⚙️ Instalasi di Localhost
1. Clone repo / extract ZIP
2. Install dependency:
   ```bash
   npm install
   ```
3. Buat database MySQL `hikconnect_db`
4. Import `devices.sql` ke MySQL
5. Jalankan server:
   ```bash
   npm run dev
   ```
6. Akses di browser:
   ```
   http://localhost:3000
   ```

## 🌍 Deploy ke Public
- Bisa deploy ke **Heroku, Render, Railway, atau VPS**
- Pastikan buat MySQL database dan update konfigurasi di `db.js`

---
👨‍💻 Dibuat untuk memudahkan monitoring CCTV berbasis web.
