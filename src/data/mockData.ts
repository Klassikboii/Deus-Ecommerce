import type { 
  SubscriptionPlan, 
  WebsiteTemplate, 
  Website, 
  Product, 
  Category,
  Order,
  Client 
} from '@/types';

export const mockSubscriptionPlans: SubscriptionPlan[] = [
  {
    plan_id: 'plan-1',
    plan_name: 'Free Trial',
    price: 0,
    duration: 14,
    features: [
      '1 Website',
      'Basic templates',
      'Up to 10 products',
      'Basic analytics',
      '14 days trial'
    ]
  },
  {
    plan_id: 'plan-2',
    plan_name: 'Starter',
    price: 299000,
    duration: 30,
    features: [
      '3 Websites',
      'All templates',
      'Up to 100 products',
      'Advanced analytics',
      'Email support',
      'Custom domain'
    ]
  },
  {
    plan_id: 'plan-3',
    plan_name: 'Professional',
    price: 799000,
    duration: 30,
    features: [
      '10 Websites',
      'All templates + Premium',
      'Unlimited products',
      'Advanced analytics',
      'Priority support',
      'Custom domain',
      'Accurate integration',
      'Multi-currency'
    ]
  },
  {
    plan_id: 'plan-4',
    plan_name: 'Enterprise',
    price: 1999000,
    duration: 30,
    features: [
      'Unlimited Websites',
      'All templates + Custom',
      'Unlimited products',
      'Enterprise analytics',
      '24/7 support',
      'Custom domain',
      'Accurate integration',
      'Multi-currency',
      'White-label solution',
      'API access'
    ]
  }
];

export const mockWebsiteTemplates: WebsiteTemplate[] = [
  {
    template_id: 'tpl-1',
    template_name: 'Fashion Boutique',
    category: 'Fashion',
    preview_image: 'https://images.unsplash.com/photo-1564518160120-94178fcdf5d4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBmYXNoaW9uJTIwZWNvbW1lcmNlfGVufDF8fHx8MTc2ODg2MzY1MXww&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Modern and elegant template for fashion and clothing stores',
    is_active: true
  },
  {
    template_id: 'tpl-2',
    template_name: 'Electronics Hub',
    category: 'Electronics',
    preview_image: 'https://images.unsplash.com/photo-1571857089849-f6390447191a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVjdHJvbmljcyUyMHN0b3JlfGVufDF8fHx8MTc2ODkxODI2MXww&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Tech-focused template perfect for electronics and gadgets',
    is_active: true
  },
  {
    template_id: 'tpl-3',
    template_name: 'Fresh Market',
    category: 'Food & Grocery',
    preview_image: 'https://images.unsplash.com/photo-1606824722920-4c652a70f348?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb29kJTIwZ3JvY2VyeSUyMG1hcmtldHxlbnwxfHx8fDE3Njg5NjMxMDB8MA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Fresh and clean design for grocery and food stores',
    is_active: true
  },
  {
    template_id: 'tpl-4',
    template_name: 'Home & Living',
    category: 'Furniture',
    preview_image: 'https://images.unsplash.com/photo-1662059361834-d361807d63e7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmdXJuaXR1cmUlMjBob21lJTIwZGVjb3J8ZW58MXx8fHwxNzY4OTE3NzA4fDA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Sophisticated template for furniture and home decor',
    is_active: true
  },
  {
    template_id: 'tpl-5',
    template_name: 'Beauty Store',
    category: 'Beauty',
    preview_image: 'https://images.unsplash.com/photo-1624574966266-1cdd65b74500?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWF1dHklMjBjb3NtZXRpY3MlMjBwcm9kdWN0c3xlbnwxfHx8fDE3Njg4MzY2OTl8MA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Beautiful template for cosmetics and beauty products',
    is_active: true
  }
];

export const mockClient: Client = {
  client_id: 'client-1',
  name: 'John Doe',
  email: 'john@example.com',
  status: 'trial'
};

export const mockWebsites: Website[] = [
  {
    website_id: 'web-1',
    client_id: 'client-1',
    template_id: 'tpl-1',
    domain: 'fashionista.mystore.id',
    site_name: 'Fashionista Store',
    status: 'published',
    published_at: '2026-01-15T10:00:00Z'
  }
];

export const mockCategories: Category[] = [
  {
    category_id: 'cat-1',
    website_id: 'web-1',
    name: 'Men\'s Fashion'
  },
  {
    category_id: 'cat-2',
    website_id: 'web-1',
    name: 'Women\'s Fashion'
  },
  {
    category_id: 'cat-3',
    website_id: 'web-1',
    name: 'Accessories'
  }
];

export const mockProducts: Product[] = [
  {
    product_id: 'prod-1',
    website_id: 'web-1',
    category_id: 'cat-1',
    name: 'Classic Denim Jacket',
    description: 'Timeless denim jacket perfect for any season',
    price: 450000,
    stock: 25,
    image: 'https://images.unsplash.com/photo-1657349038547-b18a07fb4329?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZW5pbSUyMGphY2tldCUyMGZhc2hpb258ZW58MXx8fHwxNzY4OTE1NDAwfDA&ixlib=rb-4.1.0&q=80&w=1080'
  },
  {
    product_id: 'prod-2',
    website_id: 'web-1',
    category_id: 'cat-1',
    name: 'Cotton T-Shirt',
    description: 'Comfortable 100% cotton t-shirt',
    price: 150000,
    stock: 50,
    image: 'https://images.unsplash.com/photo-1626160200951-fc4b4f8d4de9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aGl0ZSUyMHRzaGlydCUyMGNsb3RoaW5nfGVufDF8fHx8MTc2ODkzNDQxNXww&ixlib=rb-4.1.0&q=80&w=1080'
  },
  {
    product_id: 'prod-3',
    website_id: 'web-1',
    category_id: 'cat-2',
    name: 'Summer Dress',
    description: 'Light and breezy summer dress',
    price: 380000,
    stock: 30,
    image: 'https://images.unsplash.com/photo-1762342694449-aff34a8de4f9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdW1tZXIlMjBkcmVzcyUyMGVsZWdhbnR8ZW58MXx8fHwxNzY4OTYzMzU1fDA&ixlib=rb-4.1.0&q=80&w=1080'
  },
  {
    product_id: 'prod-4',
    website_id: 'web-1',
    category_id: 'cat-2',
    name: 'Casual Blouse',
    description: 'Elegant casual blouse for everyday wear',
    price: 280000,
    stock: 40,
    image: 'https://images.unsplash.com/photo-1761117228880-df2425bd70da?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXN1YWwlMjBibG91c2UlMjBmYXNoaW9ufGVufDF8fHx8MTc2ODk2MzM1NXww&ixlib=rb-4.1.0&q=80&w=1080'
  },
  {
    product_id: 'prod-5',
    website_id: 'web-1',
    category_id: 'cat-3',
    name: 'Leather Wallet',
    description: 'Premium leather wallet',
    price: 320000,
    stock: 20,
    image: 'https://images.unsplash.com/photo-1703355685552-885762b8c9b8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsZWF0aGVyJTIwd2FsbGV0JTIwYWNjZXNzb3JpZXN8ZW58MXx8fHwxNzY4OTEwOTA2fDA&ixlib=rb-4.1.0&q=80&w=1080'
  },
  {
    product_id: 'prod-6',
    website_id: 'web-1',
    category_id: 'cat-3',
    name: 'Designer Sunglasses',
    description: 'Stylish UV protection sunglasses',
    price: 550000,
    stock: 15,
    image: 'https://images.unsplash.com/photo-1722842529941-825976fc14f1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZXNpZ25lciUyMHN1bmdsYXNzZXN8ZW58MXx8fHwxNzY4OTAyMTg0fDA&ixlib=rb-4.1.0&q=80&w=1080'
  }
];

export const mockOrders: Order[] = [
  {
    order_id: 'order-1',
    website_id: 'web-1',
    customer_id: 'cust-1',
    total_amount: 1100000,
    status: 'delivered',
    created_at: '2026-01-18T14:30:00Z'
  },
  {
    order_id: 'order-2',
    website_id: 'web-1',
    customer_id: 'cust-2',
    total_amount: 730000,
    status: 'processing',
    created_at: '2026-01-20T09:15:00Z'
  },
  {
    order_id: 'order-3',
    website_id: 'web-1',
    customer_id: 'cust-3',
    total_amount: 450000,
    status: 'shipped',
    created_at: '2026-01-21T11:45:00Z'
  }
];