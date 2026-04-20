export interface MenuItem {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
  description: string;
}

export interface Order {
  id: number;
  customer_name: string;
  phone: string;
  location: string;
  items: string; // JSON string
  total: number;
  status: string;
  created_at: string;
}

export interface CartItem extends MenuItem {
  quantity: number;
}
