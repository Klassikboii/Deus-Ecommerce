// Domain SaaS / Platform Types
export interface Client {
  client_id: string;
  name: string;
  email: string;
  status: 'active' | 'inactive' | 'trial';
}

export interface SubscriptionPlan {
  plan_id: string;
  plan_name: string;
  price: number;
  duration: number; // in days
  features: string[];
}

export interface Subscription {
  subscription_id: string;
  client_id: string;
  plan_id: string;
  start_date: string;
  end_date: string;
  status: 'active' | 'trial' | 'expired' | 'cancelled';
}

export interface Website {
  website_id: string;
  client_id: string;
  template_id: string;
  domain: string;
  site_name: string;
  status: 'draft' | 'published' | 'unpublished';
  published_at?: string;
}

export interface WebsiteTemplate {
  template_id: string;
  template_name: string;
  category: string;
  preview_image: string;
  description: string;
  is_active: boolean;
}

// Template & Website Content Types
export interface TemplateSection {
  section_id: string;
  template_id: string;
  section_key: string;
  display_order: number;
}

export interface WebsiteAsset {
  asset_id: string;
  website_id: string;
  section_key: string;
  file_path: string;
  alt_text: string;
}

// E-Commerce Types
export interface Category {
  category_id: string;
  website_id: string;
  name: string;
}

export interface Product {
  product_id: string;
  website_id: string;
  category_id: string;
  name: string;
  description?: string;
  price: number;
  stock: number;
  image?: string;
}

export interface Customer {
  customer_id: string;
  website_id: string;
  name: string;
  email: string;
}

export interface Cart {
  cart_id: string;
  customer_id: string;
  status: 'active' | 'converted' | 'abandoned';
  items: CartItem[];
}

export interface CartItem {
  product_id: string;
  quantity: number;
  price: number;
}

export interface Order {
  order_id: string;
  website_id: string;
  customer_id: string;
  total_amount: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  created_at: string;
}

export interface OrderItem {
  order_item_id: string;
  order_id: string;
  product_id: string;
  qty: number;
  price: number;
}

export interface Payment {
  payment_id: string;
  order_id: string;
  method: 'credit_card' | 'bank_transfer' | 'e-wallet';
  status: 'pending' | 'paid' | 'failed';
}

export interface Shipment {
  shipment_id: string;
  order_id: string;
  courier: string;
  tracking_number: string;
}

// Accurate Integration Types
export interface AccurateAccount {
  accurate_account_id: string;
  client_id: string;
  access_token: string;
  refresh_token: string;
}

export interface AccurateCustomer {
  accurate_customer_id: string;
  customer_id: string;
  accurate_customer_ref: string;
}

export interface AccurateItem {
  accurate_item_id: string;
  product_id: string;
  accurate_item_ref: string;
}

export interface AccurateInvoice {
  accurate_invoice_id: string;
  order_id: string;
  accurate_invoice_ref: string;
}

export interface AccurateSyncLog {
  sync_log_id: string;
  accurate_account_id: string;
  entity_type: string;
  status: 'success' | 'failed' | 'pending';
  created_at: string;
}

// User & Auth Types
export interface Role {
  role_id: string;
  role_name: string;
}

export interface User {
  user_id: string;
  client_id: string;
  role_id: string;
  email: string;
  password_hash?: string;
  auth_method: 'password' | 'magic_link' | 'oauth';
}

export interface CustomerAuth {
  customer_auth_id: string;
  customer_id: string;
  password_hash?: string;
  auth_method: 'password' | 'magic_link';
}

export interface ActivityLog {
  activity_log_id: string;
  user_id: string;
  action: string;
  created_at: string;
}
