import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/app/components/ui/select';
import { 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { TrendingUp, TrendingDown, Users, ShoppingCart, Package, DollarSign } from 'lucide-react';
import { useState } from 'react';
import type { Website } from '@/types';

interface AnalyticsProps {
  websites: Website[];
  selectedWebsiteId?: string;
}

export function Analytics({ websites, selectedWebsiteId }: AnalyticsProps) {
  const [timeRange, setTimeRange] = useState('7days');
  const [selectedWebsite, setSelectedWebsite] = useState<string>(selectedWebsiteId || 'all');

  // Mock data untuk sales chart
  const salesData = [
    { date: '15 Jan', revenue: 4200000, orders: 12 },
    { date: '16 Jan', revenue: 3800000, orders: 10 },
    { date: '17 Jan', revenue: 5100000, orders: 15 },
    { date: '18 Jan', revenue: 4700000, orders: 14 },
    { date: '19 Jan', revenue: 6200000, orders: 18 },
    { date: '20 Jan', revenue: 5500000, orders: 16 },
    { date: '21 Jan', revenue: 7300000, orders: 21 },
  ];

  // Mock data untuk product performance
  const productData = [
    { name: 'Denim Jacket', sales: 45, revenue: 20250000 },
    { name: 'Summer Dress', sales: 38, revenue: 14440000 },
    { name: 'Designer Sunglasses', sales: 29, revenue: 15950000 },
    { name: 'Cotton T-Shirt', sales: 52, revenue: 7800000 },
    { name: 'Leather Wallet', sales: 31, revenue: 9920000 },
  ];

  // Mock data untuk category distribution
  const categoryData = [
    { name: "Men's Fashion", value: 35, color: '#3b82f6' },
    { name: "Women's Fashion", value: 42, color: '#ec4899' },
    { name: 'Accessories', value: 23, color: '#8b5cf6' },
  ];

  // Mock data untuk visitor stats
  const visitorData = [
    { date: '15 Jan', visitors: 245, pageViews: 892 },
    { date: '16 Jan', visitors: 198, pageViews: 745 },
    { date: '17 Jan', visitors: 312, pageViews: 1124 },
    { date: '18 Jan', visitors: 289, pageViews: 1056 },
    { date: '19 Jan', visitors: 356, pageViews: 1289 },
    { date: '20 Jan', visitors: 334, pageViews: 1198 },
    { date: '21 Jan', visitors: 401, pageViews: 1456 },
  ];

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price);
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('id-ID').format(num);
  };

  // Calculate metrics
  const totalRevenue = salesData.reduce((sum, day) => sum + day.revenue, 0);
  const totalOrders = salesData.reduce((sum, day) => sum + day.orders, 0);
  const totalVisitors = visitorData.reduce((sum, day) => sum + day.visitors, 0);
  const averageOrderValue = totalRevenue / totalOrders;
  const conversionRate = (totalOrders / totalVisitors) * 100;

  return (
    <div className="space-y-6">
      {/* Header with filters */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl mb-1">Analytics</h2>
          <p className="text-gray-600">
            {selectedWebsite === 'all' 
              ? 'Ringkasan performa semua website' 
              : 'Performa website yang dipilih'}
          </p>
        </div>
        <div className="flex gap-4">
          {!selectedWebsiteId && (
            <Select value={selectedWebsite} onValueChange={setSelectedWebsite}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Pilih website" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua Website</SelectItem>
                {websites.map(website => (
                  <SelectItem key={website.website_id} value={website.website_id}>
                    {website.site_name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Periode" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7days">7 Hari Terakhir</SelectItem>
              <SelectItem value="30days">30 Hari Terakhir</SelectItem>
              <SelectItem value="90days">90 Hari Terakhir</SelectItem>
              <SelectItem value="1year">1 Tahun Terakhir</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Total Revenue
            </CardTitle>
            <DollarSign className="w-4 h-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl mb-1">{formatPrice(totalRevenue)}</div>
            <div className="flex items-center text-sm text-green-600">
              <TrendingUp className="w-4 h-4 mr-1" />
              <span>+12.5% dari periode sebelumnya</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Total Orders
            </CardTitle>
            <ShoppingCart className="w-4 h-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl mb-1">{formatNumber(totalOrders)}</div>
            <div className="flex items-center text-sm text-green-600">
              <TrendingUp className="w-4 h-4 mr-1" />
              <span>+8.2% dari periode sebelumnya</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Avg. Order Value
            </CardTitle>
            <Package className="w-4 h-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl mb-1">{formatPrice(averageOrderValue)}</div>
            <div className="flex items-center text-sm text-red-600">
              <TrendingDown className="w-4 h-4 mr-1" />
              <span>-2.1% dari periode sebelumnya</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Conversion Rate
            </CardTitle>
            <Users className="w-4 h-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl mb-1">{conversionRate.toFixed(2)}%</div>
            <div className="flex items-center text-sm text-green-600">
              <TrendingUp className="w-4 h-4 mr-1" />
              <span>+3.4% dari periode sebelumnya</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Revenue & Orders</CardTitle>
            <CardDescription>Perkembangan penjualan harian</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip 
                  formatter={(value: number, name: string) => {
                    if (name === 'revenue') return formatPrice(value);
                    return value;
                  }}
                />
                <Legend />
                <Line 
                  yAxisId="left"
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="#3b82f6" 
                  strokeWidth={2}
                  name="Revenue"
                />
                <Line 
                  yAxisId="right"
                  type="monotone" 
                  dataKey="orders" 
                  stroke="#10b981" 
                  strokeWidth={2}
                  name="Orders"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Visitor Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Website Traffic</CardTitle>
            <CardDescription>Pengunjung dan page views</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={visitorData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="visitors" fill="#8b5cf6" name="Visitors" />
                <Bar dataKey="pageViews" fill="#ec4899" name="Page Views" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Products */}
        <Card>
          <CardHeader>
            <CardTitle>Top Products</CardTitle>
            <CardDescription>Produk terlaris berdasarkan penjualan</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={productData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="name" type="category" width={120} />
                <Tooltip 
                  formatter={(value: number, name: string) => {
                    if (name === 'revenue') return formatPrice(value);
                    return value;
                  }}
                />
                <Legend />
                <Bar dataKey="sales" fill="#3b82f6" name="Sales" />
                <Bar dataKey="revenue" fill="#10b981" name="Revenue" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Category Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Sales by Category</CardTitle>
            <CardDescription>Distribusi penjualan per kategori</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center">
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Additional Stats */}
      <Card>
        <CardHeader>
          <CardTitle>Detailed Statistics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <div className="text-sm text-gray-600 mb-1">Total Visitors</div>
              <div className="text-2xl mb-1">{formatNumber(totalVisitors)}</div>
              <div className="text-sm text-gray-600">
                Avg. {Math.round(totalVisitors / visitorData.length)} visitors/day
              </div>
            </div>
            <div>
              <div className="text-sm text-gray-600 mb-1">Bounce Rate</div>
              <div className="text-2xl mb-1">42.3%</div>
              <div className="text-sm text-green-600">-5.2% improvement</div>
            </div>
            <div>
              <div className="text-sm text-gray-600 mb-1">Avg. Session Duration</div>
              <div className="text-2xl mb-1">3m 24s</div>
              <div className="text-sm text-green-600">+18s improvement</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
