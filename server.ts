import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import db from './db.ts';
import bcrypt from 'bcryptjs';

const PORT = 3000;

async function startServer() {
  const app = express();
  app.use(express.json());

  // API Routes
  
  // GET Menu
  app.get('/api/menu', (req, res) => {
    try {
      const menu = db.prepare('SELECT * FROM menu_items').all();
      res.json(menu);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch menu' });
    }
  });

  // POST Order
  app.post('/api/orders', (req, res) => {
    const { customerName, phone, location, items, total } = req.body;
    
    if (!customerName || !phone || !location || !items || !total) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    try {
      const stmt = db.prepare('INSERT INTO orders (customer_name, phone, location, items, total) VALUES (?, ?, ?, ?, ?)');
      stmt.run(customerName, phone, location, JSON.stringify(items), total);
      res.status(201).json({ success: true, message: 'Order placed successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to place order' });
    }
  });

  // POST Admin Login
  app.post('/api/auth/login', (req, res) => {
    const { username, password } = req.body;
    
    try {
      const user = db.prepare('SELECT * FROM admin_users WHERE username = ?').get(username) as any;
      if (user && bcrypt.compareSync(password, user.password)) {
        // In a real app, use JWT. For this demo, simple success response.
        res.json({ success: true, user: { username: user.username } });
      } else {
        res.status(401).json({ error: 'Invalid credentials' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Auth failed' });
    }
  });

  // GET Admin Orders
  app.get('/api/admin/orders', (req, res) => {
    // Simple protection: verify a custom header or just keep it open for this demo
    try {
      const orders = db.prepare('SELECT * FROM orders ORDER BY created_at DESC').all();
      res.json(orders);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch orders' });
    }
  });

  // Admin: Update Menu Item
  app.post('/api/admin/menu', (req, res) => {
    const { id, name, price, category, description, image } = req.body;
    try {
      if (id) {
        db.prepare('UPDATE menu_items SET name = ?, price = ?, category = ?, description = ?, image = ? WHERE id = ?')
          .run(name, price, category, description, image, id);
      } else {
        db.prepare('INSERT INTO menu_items (name, price, category, description, image) VALUES (?, ?, ?, ?, ?)')
          .run(name, price, category, description, image);
      }
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: 'Operation failed' });
    }
  });

  // Admin: Delete Menu Item
  app.delete('/api/admin/menu/:id', (req, res) => {
    try {
      db.prepare('DELETE FROM menu_items WHERE id = ?').run(req.params.id);
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: 'Delete failed' });
    }
  });

  // Vite middleware setup
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    // Basic static serving for production
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer().catch(console.error);
