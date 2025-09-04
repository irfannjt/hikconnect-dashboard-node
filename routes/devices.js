const express = require("express");
const router = express.Router();
const db = require("../db");

// Get semua device
router.get("/", (req, res) => {
  db.query("SELECT * FROM devices ORDER BY id ASC", (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// Update status device
router.post("/update", (req, res) => {
  const { id, status } = req.body;
  if (!id || !["Online", "Offline"].includes(status)) {
    return res.status(400).json({ success: false, error: "Invalid data" });
  }

  db.query(
    "UPDATE devices SET status=? WHERE id=?",
    [status, id],
    (err, result) => {
      if (err) return res.status(500).json({ success: false, error: err.message });
      res.json({ success: true });
    }
  );
});

module.exports = router;
