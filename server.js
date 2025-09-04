const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const http = require('http');
const path = require('path');
const cron = require('node-cron');
const { scrapeHiConnect } = require('./services/scraper');
const db = require('./db');
const devicesRoute = require('./routes/devices');
require('dotenv').config();

const app = express();
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server);

const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:true }));

app.use('/api/devices', devicesRoute);
app.use(express.static(path.join(__dirname, 'public')));

io.on('connection', (socket)=>{
  console.log('Client connected', socket.id);
});

async function broadcastDevice(device){
  io.emit('status_update', device);
}

cron.schedule('* * * * *', async ()=>{
  console.log('[cron] running scraper...');
  try{
    const devices = await scrapeHiConnect();
    if (!devices || devices.length===0) { console.log('[cron] no devices from scraper'); return; }
    for (const d of devices){
      const name = d.name || d.alias || '';
      const statusRaw = (d.status||'').toLowerCase();
      const status = statusRaw.includes('on') ? 'Online' : 'Offline';
      try{
        const [rows] = await db.query('SELECT * FROM devices WHERE alias = ? LIMIT 1', [name]);
        if (rows.length>0){
          await db.query('UPDATE devices SET status=? WHERE id=?', [status, rows[0].id]);
          broadcastDevice({ id: rows[0].id, alias: name, status });
        } else {
          const [res] = await db.query('INSERT INTO devices (alias, device_domain, device_serial, ip_port, status) VALUES (?,?,?,?,?)', [name, '', '', '', status]);
          broadcastDevice({ id: res.insertId, alias: name, status });
        }
      } catch(e){ console.error('DB update error', e.message); }
    }
  } catch(e){ console.error('Cron error', e.message); }
});

server.listen(PORT, ()=>{
  console.log(`Server running at http://localhost:${PORT}`);
});
