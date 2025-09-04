CREATE TABLE IF NOT EXISTS devices (
  id INT AUTO_INCREMENT PRIMARY KEY,
  alias VARCHAR(100),
  device_domain VARCHAR(100),
  device_serial VARCHAR(100),
  ip_port VARCHAR(50),
  status ENUM('Online','Offline') DEFAULT 'Offline'
);

INSERT INTO devices (alias, device_domain, device_serial, ip_port, status) VALUES
('CCTV Toko 1','domain1','SN001','192.168.1.101:8000','Online'),
('CCTV Toko 2','domain2','SN002','192.168.1.102:8000','Offline');
