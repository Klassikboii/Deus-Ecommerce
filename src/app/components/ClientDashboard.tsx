import { useState } from 'react';
import { Button } from '@/app/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Badge } from '@/app/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/app/components/ui/tabs';
import { AccurateIntegration } from './AccurateIntegration';
import { Analytics } from './Analytics';
import { OrderManagement } from './OrderManagement';
import type { Website, Client, Order, Product } from '@/types';
import { 
  Plus, 
  Globe, 
  Eye, 
  Settings, 
  BarChart3, 
  Package,
  ShoppingCart,
  TrendingUp,
  Users,
  FileText
} from 'lucide-react';

interface ClientDashboardProps {
  client: Client;
  websites: Website[];
  orders: Order[];
  products: Product[];
  onCreateWebsite: () => void;
  onViewWebsite: (websiteId: string) => void;
  onManageWebsite: (websiteId: string) => void;
}

export function ClientDashboard({ 
  client, 
  websites, 
  orders,
  products,
  onCreateWebsite,
  onViewWebsite,
  onManageWebsite 
}: ClientDashboardProps) {
  const [activeTab, setActiveTab] = useState('websites');

  const totalRevenue = orders.reduce((sum, order) => sum + order.total_amount, 0);
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(price);
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, string> = {
      published: 'bg-green-500',
      draft: 'bg-yellow-500',
      unpublished: 'bg-gray-500'
    };
    return variants[status] || 'bg-gray-500';
  };

  return (
    <div className="py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl mb-1">Dashboard</h1>
            <p className="text-gray-600">Selamat datang kembali, {client.name}</p>
          </div>
          <Badge variant={client.status === 'trial' ? 'secondary' : 'default'}>
            {client.status === 'trial' ? 'Trial Period' : 'Active'}
          </Badge>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Total Websites
              </CardTitle>
              <Globe className="w-4 h-4 text-gray-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl">{websites.length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Total Orders
              </CardTitle>
              <ShoppingCart className="w-4 h-4 text-gray-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl">{orders.length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Total Revenue
              </CardTitle>
              <TrendingUp className="w-4 h-4 text-gray-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl">{formatPrice(totalRevenue)}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Active Customers
              </CardTitle>
              <Users className="w-4 h-4 text-gray-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl">24</div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="websites">
            <Globe className="w-4 h-4 mr-2" />
            Websites
          </TabsTrigger>
          <TabsTrigger value="orders">
            <Package className="w-4 h-4 mr-2" />
            Orders
          </TabsTrigger>
          <TabsTrigger value="analytics">
            <BarChart3 className="w-4 h-4 mr-2" />
            Analytics
          </TabsTrigger>
          <TabsTrigger value="accurate">
            <FileText className="w-4 h-4 mr-2" />
            Accurate
          </TabsTrigger>
        </TabsList>

        <TabsContent value="websites" className="mt-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl">Website Saya</h2>
            <Button onClick={onCreateWebsite}>
              <Plus className="w-4 h-4 mr-2" />
              Buat Website Baru
            </Button>
          </div>

          {websites.length === 0 ? (
            <Card className="text-center py-12">
              <CardContent>
                <Globe className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                <h3 className="text-xl mb-2">Belum ada website</h3>
                <p className="text-gray-600 mb-4">
                  Mulai dengan membuat website e-commerce pertama Anda
                </p>
                <Button onClick={onCreateWebsite}>
                  <Plus className="w-4 h-4 mr-2" />
                  Buat Website Pertama
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {websites.map((website) => (
                <Card key={website.website_id}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle>{website.site_name}</CardTitle>
                        <CardDescription className="mt-1">
                          {website.domain}
                        </CardDescription>
                      </div>
                      <Badge className={getStatusBadge(website.status)}>
                        {website.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {website.published_at && (
                      <p className="text-sm text-gray-600">
                        Published: {new Date(website.published_at).toLocaleDateString('id-ID')}
                      </p>
                    )}
                  </CardContent>
                  <CardFooter className="gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="flex-1"
                      onClick={() => onViewWebsite(website.website_id)}
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      Lihat
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="flex-1"
                      onClick={() => onManageWebsite(website.website_id)}
                    >
                      <Settings className="w-4 h-4 mr-2" />
                      Kelola
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="orders" className="mt-6">
          <OrderManagement orders={orders} products={products} />
        </TabsContent>

        <TabsContent value="analytics" className="mt-6">
          <Analytics websites={websites} />
        </TabsContent>

        <TabsContent value="accurate" className="mt-6">
          <AccurateIntegration clientId={client.client_id} />
        </TabsContent>
      </Tabs>
    </div>
  );
}