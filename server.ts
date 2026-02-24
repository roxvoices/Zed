import express from "express";
import { createServer as createViteServer } from "vite";
import Database from "better-sqlite3";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbPath = process.env.NODE_ENV === 'production' && process.env.RENDER ? '/data/zedcart.db' : 'zedcart.db';
const db = new Database(dbPath);

// Initialize Database
db.exec(`
  CREATE TABLE IF NOT EXISTS quotes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    pickup TEXT NOT NULL,
    delivery TEXT NOT NULL,
    weight TEXT NOT NULL,
    description TEXT,
    status TEXT DEFAULT 'Pending',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS orders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    tracking_id TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    pickup TEXT NOT NULL,
    delivery TEXT NOT NULL,
    weight TEXT NOT NULL,
    description TEXT,
    status TEXT DEFAULT 'Pending',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS reviews (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    rating INTEGER NOT NULL,
    comment TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS gallery (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    image_data TEXT NOT NULL,
    caption TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS announcements (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    message TEXT NOT NULL,
    type TEXT DEFAULT 'info',
    active INTEGER DEFAULT 1,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
`);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: '10mb' }));

  // API Routes
  
  // Announcements
  app.get("/api/announcements", (req, res) => {
    try {
      const data = db.prepare("SELECT * FROM announcements WHERE active = 1 ORDER BY created_at DESC").all();
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch announcements" });
    }
  });

  app.get("/api/admin/announcements", (req, res) => {
    try {
      const data = db.prepare("SELECT * FROM announcements ORDER BY created_at DESC").all();
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch announcements" });
    }
  });

  app.post("/api/admin/announcements", (req, res) => {
    const { message, type } = req.body;
    try {
      db.prepare("INSERT INTO announcements (message, type) VALUES (?, ?)").run(message, type || 'info');
      res.status(201).json({ message: "Announcement created" });
    } catch (error) {
      res.status(500).json({ error: "Failed to create announcement" });
    }
  });

  app.patch("/api/admin/announcements/:id", (req, res) => {
    const id = Number(req.params.id);
    const { message, type, active } = req.body;
    console.log(`PATCH request for announcement ${id}`);
    if (isNaN(id)) return res.status(400).json({ error: "Invalid ID" });
    try {
      const result = db.prepare("UPDATE announcements SET message = ?, type = ?, active = ? WHERE id = ?")
        .run(message, type, active, id);
      if (result.changes === 0) return res.status(404).json({ error: "Not found" });
      res.json({ message: "Announcement updated" });
    } catch (error) {
      console.error('Update announcement error:', error);
      res.status(500).json({ error: "Failed to update announcement" });
    }
  });

  app.delete("/api/admin/announcements/:id", (req, res) => {
    const id = Number(req.params.id);
    console.log(`DELETE request received for announcement ID: ${id}`);
    if (isNaN(id)) {
      console.error(`Invalid announcement ID: ${req.params.id}`);
      return res.status(400).json({ error: "Invalid announcement ID" });
    }
    try {
      const result = db.prepare("DELETE FROM announcements WHERE id = ?").run(id);
      console.log(`Delete result for announcement ${id}:`, result);
      if (result.changes === 0) {
        console.warn(`Announcement ${id} not found for deletion`);
        return res.status(404).json({ error: "Announcement not found" });
      }
      res.json({ message: "Announcement deleted" });
    } catch (error) {
      console.error('Database error in DELETE /api/admin/announcements:', error);
      res.status(500).json({ error: "Failed to delete announcement" });
    }
  });

  // Gallery
  app.get("/api/gallery", (req, res) => {
    try {
      const data = db.prepare("SELECT * FROM gallery ORDER BY created_at DESC").all();
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch gallery" });
    }
  });

  app.post("/api/admin/gallery", (req, res) => {
    const { image_data, caption } = req.body;
    try {
      db.prepare("INSERT INTO gallery (image_data, caption) VALUES (?, ?)").run(image_data, caption);
      res.status(201).json({ message: "Image added to gallery" });
    } catch (error) {
      res.status(500).json({ error: "Failed to add image" });
    }
  });

  app.delete("/api/admin/gallery/:id", (req, res) => {
    const id = Number(req.params.id);
    console.log(`DELETE request received for gallery ID: ${id}`);
    if (isNaN(id)) {
      console.error(`Invalid gallery ID: ${req.params.id}`);
      return res.status(400).json({ error: "Invalid gallery ID" });
    }
    try {
      const result = db.prepare("DELETE FROM gallery WHERE id = ?").run(id);
      console.log(`Delete result for gallery item ${id}:`, result);
      if (result.changes === 0) {
        console.warn(`Gallery item ${id} not found for deletion`);
        return res.status(404).json({ error: "Image not found in gallery" });
      }
      res.json({ message: "Image deleted from gallery" });
    } catch (error) {
      console.error('Database error in DELETE /api/admin/gallery:', error);
      res.status(500).json({ error: "Failed to delete image" });
    }
  });

  // Reviews
  app.get("/api/reviews", (req, res) => {
    try {
      const data = db.prepare("SELECT * FROM reviews ORDER BY created_at DESC").all();
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch reviews" });
    }
  });

  app.post("/api/reviews", (req, res) => {
    const { name, rating, comment } = req.body;
    try {
      db.prepare("INSERT INTO reviews (name, rating, comment) VALUES (?, ?, ?)")
        .run(name, rating, comment);
      res.status(201).json({ message: "Review submitted" });
    } catch (error) {
      res.status(500).json({ error: "Failed to submit review" });
    }
  });

  // Quotes
  app.post("/api/quotes", (req, res) => {
    const { name, email, phone, pickup, delivery, weight, description } = req.body;
    try {
      const stmt = db.prepare(`
        INSERT INTO quotes (name, email, phone, pickup, delivery, weight, description)
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `);
      stmt.run(name, email, phone, pickup, delivery, weight, description);
      res.status(201).json({ message: "Quote request submitted successfully" });
    } catch (error) {
      res.status(500).json({ error: "Failed to submit quote request" });
    }
  });

  app.get("/api/admin/quotes", (req, res) => {
    try {
      const quotes = db.prepare("SELECT * FROM quotes ORDER BY created_at DESC").all();
      res.json(quotes);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch quotes" });
    }
  });

  app.delete("/api/admin/quotes/:id", (req, res) => {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid quote ID" });
    }
    try {
      const result = db.prepare("DELETE FROM quotes WHERE id = ?").run(id);
      if (result.changes === 0) {
        return res.status(404).json({ error: "Quote not found" });
      }
      res.json({ message: "Quote deleted" });
    } catch (error) {
      console.error('Database error in DELETE /api/admin/quotes:', error);
      res.status(500).json({ error: "Failed to delete quote" });
    }
  });

  // Orders
  app.post("/api/admin/orders", (req, res) => {
    const { name, email, phone, pickup, delivery, weight, description } = req.body;
    const tracking_id = "ZC-" + Math.random().toString(36).substring(2, 10).toUpperCase();
    try {
      const stmt = db.prepare(`
        INSERT INTO orders (tracking_id, name, email, phone, pickup, delivery, weight, description)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `);
      stmt.run(tracking_id, name, email, phone, pickup, delivery, weight, description);
      res.status(201).json({ tracking_id });
    } catch (error) {
      res.status(500).json({ error: "Failed to create order" });
    }
  });

  app.get("/api/admin/orders", (req, res) => {
    try {
      const orders = db.prepare("SELECT * FROM orders ORDER BY created_at DESC").all();
      res.json(orders);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch orders" });
    }
  });

  app.patch("/api/admin/orders/:id", (req, res) => {
    const id = Number(req.params.id);
    const { status } = req.body;
    console.log(`PATCH request for order ${id} with status: ${status}`);
    if (isNaN(id)) return res.status(400).json({ error: "Invalid order ID" });
    try {
      const result = db.prepare("UPDATE orders SET status = ? WHERE id = ?").run(status, id);
      if (result.changes === 0) return res.status(404).json({ error: "Order not found" });
      res.json({ message: "Order status updated" });
    } catch (error) {
      console.error('Update order error:', error);
      res.status(500).json({ error: "Failed to update order" });
    }
  });

  app.delete("/api/admin/orders/:id", (req, res) => {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid order ID" });
    }
    try {
      const result = db.prepare("DELETE FROM orders WHERE id = ?").run(id);
      if (result.changes === 0) {
        return res.status(404).json({ error: "Order not found" });
      }
      res.json({ message: "Order deleted" });
    } catch (error) {
      console.error('Database error in DELETE /api/admin/orders:', error);
      res.status(500).json({ error: "Failed to delete order" });
    }
  });

  // Public Tracking
  app.get("/api/track/:trackingId", (req, res) => {
    try {
      const order = db.prepare("SELECT * FROM orders WHERE tracking_id = ?").get(req.params.trackingId);
      if (order) {
        res.json(order);
      } else {
        res.status(404).json({ error: "Parcel not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Tracking failed" });
    }
  });

  // Admin Stats
  app.get("/api/admin/stats", (req, res) => {
    try {
      const totalOrders = db.prepare("SELECT COUNT(*) as count FROM orders").get().count;
      const pendingOrders = db.prepare("SELECT COUNT(*) as count FROM orders WHERE status = 'Pending'").get().count;
      const deliveredOrders = db.prepare("SELECT COUNT(*) as count FROM orders WHERE status = 'Delivered'").get().count;
      const totalQuotes = db.prepare("SELECT COUNT(*) as count FROM quotes").get().count;
      res.json({ totalOrders, pendingOrders, deliveredOrders, totalQuotes });
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch stats" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, "dist")));
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "dist", "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
