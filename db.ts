import Database from 'better-sqlite3';
import path from 'path';
import bcrypt from 'bcryptjs';

const db = new Database(path.join(process.cwd(), 'database.sqlite'));

// Create tables
db.exec(`
  CREATE TABLE IF NOT EXISTS menu_items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    price REAL NOT NULL,
    category TEXT NOT NULL,
    image TEXT,
    description TEXT
  );

  CREATE TABLE IF NOT EXISTS orders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    customer_name TEXT NOT NULL,
    phone TEXT NOT NULL,
    location TEXT NOT NULL,
    items TEXT NOT NULL, -- JSON string
    total REAL NOT NULL,
    status TEXT DEFAULT 'pending',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS admin_users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL
  );
`);

// Seed initial data if empty
const menuCount = db.prepare('SELECT count(*) as count FROM menu_items').get() as { count: number };
if (menuCount.count === 0) {
  const insertMenu = db.prepare('INSERT INTO menu_items (name, price, category, image, description) VALUES (?, ?, ?, ?, ?)');
  
  const items = [
    ['Double-Double Burger', 4.95, 'Burgers', 'https://images.unsplash.com/photo-1547584370-2cc98b8b8dc8?q=80&w=800', 'Two beef patties, two slices of cheese, onions, lettuce, and tomato.'],
    ['Cheeseburger', 3.50, 'Burgers', 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=800', 'Beef patty with cheese, fresh lettuce, and our secret sauce.'],
    ['Hamburger', 3.10, 'Burgers', 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?q=80&w=800', 'The classic original burger with all the fixings.'],
    ['Animal Style Fries', 4.25, 'Sides', 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?q=80&w=800', 'Hand-cut fries topped with cheese, grilled onions, and spread.'],
    ['Classic Fries', 2.80, 'Sides', 'https://images.unsplash.com/photo-1630384060421-cb20d0e0649d?q=80&w=800', 'Freshly peeled and diced potatoes, deep fried in vegetable oil.'],
    ['Milkshake', 3.25, 'Beverages', 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?q=80&w=800', 'Real ice cream shakes: Chocolate, Vanilla, or Strawberry.'],
    ['Fountain Soda', 2.10, 'Beverages', 'https://images.unsplash.com/photo-1622483767028-3f66f34a0701?q=80&w=800', 'Ice cold Coca-Cola products. Refreshing!'],
  ];

  for (const item of items) {
    insertMenu.run(...item);
  }
}

const adminCount = db.prepare('SELECT count(*) as count FROM admin_users').get() as { count: number };
if (adminCount.count === 0) {
  const hashedPassword = bcrypt.hashSync('admin123', 10);
  db.prepare('INSERT INTO admin_users (username, password) VALUES (?, ?)').run('admin', hashedPassword);
}

export default db;
