import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Badge } from '@/app/components/ui/badge';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/app/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/app/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/app/components/ui/tabs';
import { 
  Search, 
  Filter, 
  Eye, 
  Package, 
  Truck,
  CheckCircle,
  XCircle,
  Clock,
  Download
} from 'lucide-react';
import type { Order, Product, Customer } from '@/types';

interface OrderManagementProps {
  orders: Order[];
  products: Product[];
  websiteId?: string;
}

// Mock customer data
const mockCustomers: Customer[] = [
  { customer_id: 'cust-1', website_id: 'web-1', name: 'Budi Santoso', email: 'budi@example.com' },
  { customer_id: 'cust-2', website_id: 'web-1', name: 'Ani Wijaya', email: 'ani@example.com' },
  { customer_id: 'cust-3', website_id: 'web-1', name: 'Citra Dewi', email: 'citra@example.com' },
];

// Mock order items
const mockOrderItems = [
  { order_item_id: 'oi-1', order_id: 'order-1', product_id: 'prod-1', qty: 2, price: 450000 },
  { order_item_id: 'oi-2', order_id: 'order-1', product_id: 'prod-3', qty: 1, price: 380000 },
  { order_item_id: 'oi-3', order_id: 'order-2', product_id: 'prod-2', qty: 3, price: 150000 },
  { order_item_id: 'oi-4', order_id: 'order-2', product_id: 'prod-5', qty: 1, price: 320000 },
  { order_item_id: 'oi-5', order_id: 'order-3', product_id: 'prod-1', qty: 1, price: 450000 },
];

export function OrderManagement({ orders, products, websiteId }: OrderManagementProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(price);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusBadgeVariant = (status: string) => {
    const variants: Record<string, 'default' | 'secondary' | 'outline' | 'destructive'> = {
      pending: 'secondary',
      processing: 'default',
      shipped: 'default',
      delivered: 'default',
      cancelled: 'destructive'
    };
    return variants[status] || 'outline';
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-4 h-4" />;
      case 'processing':
        return <Package className="w-4 h-4" />;
      case 'shipped':
        return <Truck className="w-4 h-4" />;
      case 'delivered':
        return <CheckCircle className="w-4 h-4" />;
      case 'cancelled':
        return <XCircle className="w-4 h-4" />;
      default:
        return null;
    }
  };

  const getCustomer = (customerId: string) => {
    return mockCustomers.find(c => c.customer_id === customerId);
  };

  const getOrderItems = (orderId: string) => {
    return mockOrderItems.filter(oi => oi.order_id === orderId);
  };

  const getProduct = (productId: string) => {
    return products.find(p => p.product_id === productId);
  };

  // Filter orders
  const filteredOrders = orders
    .filter(order => {
      if (websiteId && order.website_id !== websiteId) return false;
      
      const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
      const customer = getCustomer(order.customer_id);
      const matchesSearch = 
        order.order_id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        customer?.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        customer?.email.toLowerCase().includes(searchQuery.toLowerCase());
      
      return matchesStatus && matchesSearch;
    })
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

  const handleViewOrder = (order: Order) => {
    setSelectedOrder(order);
    setIsDetailOpen(true);
  };

  // Calculate stats
  const stats = {
    total: filteredOrders.length,
    pending: filteredOrders.filter(o => o.status === 'pending').length,
    processing: filteredOrders.filter(o => o.status === 'processing').length,
    shipped: filteredOrders.filter(o => o.status === 'shipped').length,
    delivered: filteredOrders.filter(o => o.status === 'delivered').length,
    cancelled: filteredOrders.filter(o => o.status === 'cancelled').length,
    totalRevenue: filteredOrders.reduce((sum, o) => sum + o.total_amount, 0)
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl mb-1">Order Management</h2>
          <p className="text-gray-600">
            {websiteId ? 'Kelola pesanan untuk website ini' : 'Kelola semua pesanan'}
          </p>
        </div>
        <Button variant="outline">
          <Download className="w-4 h-4 mr-2" />
          Export
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-sm text-gray-600 mb-1">Total Orders</div>
            <div className="text-2xl">{stats.total}</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-sm text-gray-600 mb-1">Pending</div>
            <div className="text-2xl text-yellow-600">{stats.pending}</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-sm text-gray-600 mb-1">Processing</div>
            <div className="text-2xl text-blue-600">{stats.processing}</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-sm text-gray-600 mb-1">Shipped</div>
            <div className="text-2xl text-purple-600">{stats.shipped}</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-sm text-gray-600 mb-1">Delivered</div>
            <div className="text-2xl text-green-600">{stats.delivered}</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-sm text-gray-600 mb-1">Cancelled</div>
            <div className="text-2xl text-red-600">{stats.cancelled}</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-sm text-gray-600 mb-1">Revenue</div>
            <div className="text-lg">{formatPrice(stats.totalRevenue)}</div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter */}
      <div className="flex gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            type="text"
            placeholder="Cari order ID, nama customer, atau email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[180px]">
            <Filter className="w-4 h-4 mr-2" />
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Semua Status</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="processing">Processing</SelectItem>
            <SelectItem value="shipped">Shipped</SelectItem>
            <SelectItem value="delivered">Delivered</SelectItem>
            <SelectItem value="cancelled">Cancelled</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Orders Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b bg-gray-50">
                <tr>
                  <th className="text-left p-4">Order ID</th>
                  <th className="text-left p-4">Customer</th>
                  <th className="text-left p-4">Date</th>
                  <th className="text-left p-4">Amount</th>
                  <th className="text-left p-4">Status</th>
                  <th className="text-left p-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="p-12 text-center text-gray-600">
                      <Package className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                      <p>Tidak ada pesanan yang ditemukan</p>
                    </td>
                  </tr>
                ) : (
                  filteredOrders.map((order) => {
                    const customer = getCustomer(order.customer_id);
                    return (
                      <tr key={order.order_id} className="border-b last:border-0 hover:bg-gray-50">
                        <td className="p-4">
                          <span className="font-mono text-sm">{order.order_id}</span>
                        </td>
                        <td className="p-4">
                          <div>
                            <div className="font-medium">{customer?.name}</div>
                            <div className="text-sm text-gray-600">{customer?.email}</div>
                          </div>
                        </td>
                        <td className="p-4 text-sm">{formatDate(order.created_at)}</td>
                        <td className="p-4 font-medium">{formatPrice(order.total_amount)}</td>
                        <td className="p-4">
                          <Badge variant={getStatusBadgeVariant(order.status)} className="gap-1">
                            {getStatusIcon(order.status)}
                            {order.status}
                          </Badge>
                        </td>
                        <td className="p-4">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleViewOrder(order)}
                          >
                            <Eye className="w-4 h-4 mr-2" />
                            Detail
                          </Button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Order Detail Dialog */}
      <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Order Details</DialogTitle>
            <DialogDescription>
              Order ID: <span className="font-mono">{selectedOrder?.order_id}</span>
            </DialogDescription>
          </DialogHeader>
          
          {selectedOrder && (
            <div className="space-y-6">
              {/* Customer Info */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Customer Information</CardTitle>
                </CardHeader>
                <CardContent>
                  {(() => {
                    const customer = getCustomer(selectedOrder.customer_id);
                    return (
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Name:</span>
                          <span className="font-medium">{customer?.name}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Email:</span>
                          <span className="font-medium">{customer?.email}</span>
                        </div>
                      </div>
                    );
                  })()}
                </CardContent>
              </Card>

              {/* Order Info */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Order Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Order Date:</span>
                      <span className="font-medium">{formatDate(selectedOrder.created_at)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Status:</span>
                      <Badge variant={getStatusBadgeVariant(selectedOrder.status)}>
                        {selectedOrder.status}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Order Items */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Order Items</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {getOrderItems(selectedOrder.order_id).map((item) => {
                      const product = getProduct(item.product_id);
                      return (
                        <div key={item.order_item_id} className="flex items-center gap-4 pb-4 border-b last:border-0">
                          {product?.image ? (
                            <img 
                              src={product.image} 
                              alt={product.name}
                              className="w-16 h-16 object-cover rounded"
                            />
                          ) : (
                            <div className="w-16 h-16 bg-gray-100 rounded flex items-center justify-center">
                              <Package className="w-8 h-8 text-gray-400" />
                            </div>
                          )}
                          <div className="flex-1">
                            <div className="font-medium">{product?.name}</div>
                            <div className="text-sm text-gray-600">
                              Qty: {item.qty} × {formatPrice(item.price)}
                            </div>
                          </div>
                          <div className="font-medium">
                            {formatPrice(item.qty * item.price)}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <div className="mt-4 pt-4 border-t">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-medium">Total:</span>
                      <span className="text-2xl font-semibold">{formatPrice(selectedOrder.total_amount)}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Actions */}
              <div className="flex gap-2">
                <Button variant="outline" className="flex-1">
                  <Download className="w-4 h-4 mr-2" />
                  Download Invoice
                </Button>
                <Button variant="outline" className="flex-1">
                  Update Status
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
