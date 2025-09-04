const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");

const devicesRoute = require("./routes/devices");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes API
app.use("/api/devices", devicesRoute);

// Serve frontend
app.use(express.static(path.join(__dirname, "public")));

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
