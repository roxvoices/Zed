export interface Quote {
  id: number;
  name: string;
  email: string;
  phone: string;
  pickup: string;
  delivery: string;
  weight: string;
  description: string;
  status: string;
  created_at: string;
}

export interface Order {
  id: number;
  tracking_id: string;
  name: string;
  email: string;
  phone: string;
  pickup: string;
  delivery: string;
  weight: string;
  description: string;
  status: 'Pending' | 'In Transit' | 'Arrived in Zambia' | 'Out for Delivery' | 'Delivered' | 'Arrived' | 'Cancelled';
  created_at: string;
}

export interface Review {
  id: number;
  name: string;
  rating: number;
  comment: string;
  created_at: string;
}

export interface GalleryItem {
  id: number;
  image_data: string;
  caption: string;
  created_at: string;
}

export interface Announcement {
  id: number;
  message: string;
  type: 'info' | 'warning' | 'success';
  active: number;
  created_at: string;
}

export interface Stats {
  totalOrders: number;
  pendingOrders: number;
  deliveredOrders: number;
  totalQuotes: number;
}
