import { useState } from 'react';
import { Button } from '@/app/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/app/components/ui/tabs';
import { ProductManagement } from './ProductManagement';
import { WebsiteSettings } from './WebsiteSettings';
import { OrderManagement } from './OrderManagement';
import { Analytics } from './Analytics';
import { 
  ArrowLeft, 
  Package, 
  Settings, 
  ShoppingCart,
  BarChart3,
  Eye
} from 'lucide-react';
import type { Website, Product, Category, Order } from '@/types';

interface WebsiteManagementProps {
  website: Website;
  products: Product[];
  categories: Category[];
  orders: Order[];
  onBack: () => void;
  onPreview: () => void;
  onWebsiteUpdate: (website: Website) => void;
  onProductsChange: (products: Product[]) => void;
}

export function WebsiteManagement({ 
  website, 
  products, 
  categories, 
  orders,
  onBack,
  onPreview,
  onWebsiteUpdate,
  onProductsChange
}: WebsiteManagementProps) {
  const [activeTab, setActiveTab] = useState('products');

  // Filter products and orders for this website
  const websiteProducts = products.filter(p => p.website_id === website.website_id);
  const websiteOrders = orders.filter(o => o.website_id === website.website_id);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="border-b bg-white sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" onClick={onBack}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Kembali
              </Button>
              <div>
                <h1 className="text-xl">{website.site_name}</h1>
                <p className="text-sm text-gray-600">{website.domain}</p>
              </div>
            </div>
            <Button variant="outline" onClick={onPreview}>
              <Eye className="w-4 h-4 mr-2" />
              Preview Website
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="products">
              <Package className="w-4 h-4 mr-2" />
              Products
            </TabsTrigger>
            <TabsTrigger value="orders">
              <ShoppingCart className="w-4 h-4 mr-2" />
              Orders
            </TabsTrigger>
            <TabsTrigger value="analytics">
              <BarChart3 className="w-4 h-4 mr-2" />
              Analytics
            </TabsTrigger>
            <TabsTrigger value="settings">
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </TabsTrigger>
          </TabsList>

          <TabsContent value="products">
            <ProductManagement 
              websiteId={website.website_id}
              products={websiteProducts}
              categories={categories}
              onProductsChange={onProductsChange}
            />
          </TabsContent>

          <TabsContent value="orders">
            <OrderManagement 
              orders={websiteOrders}
              products={websiteProducts}
              websiteId={website.website_id}
            />
          </TabsContent>

          <TabsContent value="analytics">
            <Analytics 
              websites={[website]}
              selectedWebsiteId={website.website_id}
            />
          </TabsContent>

          <TabsContent value="settings">
            <WebsiteSettings 
              website={website}
              onUpdate={onWebsiteUpdate}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
