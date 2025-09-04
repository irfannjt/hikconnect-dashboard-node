CREATE DATABASE IF NOT EXISTS hikconnect_db CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE hikconnect_db;
CREATE TABLE IF NOT EXISTS devices (
  id INT AUTO_INCREMENT PRIMARY KEY,
  alias VARCHAR(200),
  device_domain VARCHAR(100),
  device_serial VARCHAR(100),
  ip_port VARCHAR(100),
  status ENUM('Online','Offline') DEFAULT 'Offline',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
INSERT INTO devices (alias, device_domain, device_serial, ip_port, status) VALUES
('Dummy-CCTV-1','domain1','SN001','192.168.1.101:8000','Online'),
('Dummy-CCTV-2','domain2','SN002','192.168.1.102:8000','Offline');
