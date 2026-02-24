import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { 
  LayoutDashboard, 
  ShoppingBag, 
  Package, 
  Users, 
  Tag, 
  FileText, 
  BarChart3, 
  Settings,
  TrendingUp,
  TrendingDown,
  DollarSign,
  ShoppingCart,
  UserPlus
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const sidebarItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, href: '/admin' },
  { id: 'orders', label: 'Orders', icon: ShoppingBag, href: '/admin/orders' },
  { id: 'products', label: 'Products', icon: Package, href: '/admin/products' },
  { id: 'vendors', label: 'Vendors', icon: Users, href: '/admin/vendors' },
  { id: 'promotions', label: 'Promotions', icon: Tag, href: '#' },
  { id: 'cms', label: 'CMS', icon: FileText, href: '#' },
  { id: 'reports', label: 'Reports', icon: BarChart3, href: '#' },
  { id: 'settings', label: 'Settings', icon: Settings, href: '#' },
];

const stats = [
  { title: 'Total Sales', value: 'QAR 124,500', change: '+12.5%', trend: 'up', icon: DollarSign },
  { title: 'Orders Today', value: '48', change: '+8.2%', trend: 'up', icon: ShoppingCart },
  { title: 'New Customers', value: '156', change: '+24.1%', trend: 'up', icon: UserPlus },
  { title: 'Conversion Rate', value: '3.24%', change: '-2.1%', trend: 'down', icon: TrendingUp },
];

const recentOrders = [
  { id: 'ORD-001', customer: 'John Doe', total: 378, status: 'Delivered', date: '2026-02-20' },
  { id: 'ORD-002', customer: 'Jane Smith', total: 249, status: 'Shipped', date: '2026-02-19' },
  { id: 'ORD-003', customer: 'Mike Johnson', total: 567, status: 'Processing', date: '2026-02-19' },
  { id: 'ORD-004', customer: 'Sarah Williams', total: 189, status: 'Pending', date: '2026-02-18' },
];

const topProducts = [
  { name: 'Minimal Desk Lamp', sales: 124, revenue: 15996 },
  { name: 'Wireless Mouse', sales: 98, revenue: 14602 },
  { name: 'Everyday Backpack', sales: 87, revenue: 21663 },
  { name: 'Portable Speaker', sales: 76, revenue: 13604 },
];

export function AdminDashboard() {
  const { t: _t } = useTranslation();

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r hidden lg:block">
        <div className="p-6">
          <Link to="/" className="text-xl font-bold text-[#111111]">Souqna Admin</Link>
        </div>
        <nav className="px-4 pb-4">
          {sidebarItems.map((item) => (
            <Link
              key={item.id}
              to={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                item.id === 'dashboard' 
                  ? 'bg-[#2F5DFF] text-white' 
                  : 'hover:bg-gray-50 text-gray-700'
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 lg:p-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-[#111111]">Dashboard</h1>
            <p className="text-gray-500">Welcome back, Admin</p>
          </div>
          <Button asChild variant="outline" className="rounded-full">
            <Link to="/">View Store</Link>
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat) => (
            <Card key={stat.title}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">{stat.title}</p>
                    <p className="text-2xl font-bold text-[#111111] mt-1">{stat.value}</p>
                    <div className={`flex items-center gap-1 mt-2 text-sm ${
                      stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {stat.trend === 'up' ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                      <span>{stat.change}</span>
                    </div>
                  </div>
                  <div className="w-12 h-12 bg-[#2F5DFF]/10 rounded-full flex items-center justify-center">
                    <stat.icon className="w-6 h-6 text-[#2F5DFF]" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Recent Orders */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Recent Orders</CardTitle>
              <Button asChild variant="link" className="text-[#2F5DFF]">
                <Link to="/admin/orders">View All</Link>
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentOrders.map((order) => (
                  <div key={order.id} className="flex items-center justify-between py-2">
                    <div>
                      <p className="font-medium text-[#111111]">{order.id}</p>
                      <p className="text-sm text-gray-500">{order.customer}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">QAR {order.total}</p>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        order.status === 'Delivered' ? 'bg-green-100 text-green-700' :
                        order.status === 'Shipped' ? 'bg-blue-100 text-blue-700' :
                        order.status === 'Processing' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-gray-100 text-gray-700'
                      }`}>
                        {order.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Top Products */}
          <Card>
            <CardHeader>
              <CardTitle>Top Products</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topProducts.map((product, i) => (
                  <div key={product.name} className="flex items-center gap-4">
                    <div className="w-8 h-8 bg-[#2F5DFF] text-white rounded-full flex items-center justify-center font-bold">
                      {i + 1}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-[#111111]">{product.name}</p>
                      <p className="text-sm text-gray-500">{product.sales} sales</p>
                    </div>
                    <p className="font-medium">QAR {product.revenue}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="mt-8">
          <h2 className="text-lg font-bold text-[#111111] mb-4">Quick Actions</h2>
          <div className="flex flex-wrap gap-4">
            <Button asChild className="bg-[#2F5DFF] hover:bg-[#2F5DFF]/90 rounded-full">
              <Link to="/admin/products">Add Product</Link>
            </Button>
            <Button asChild variant="outline" className="rounded-full">
              <Link to="/admin/orders">Manage Orders</Link>
            </Button>
            <Button asChild variant="outline" className="rounded-full">
              <Link to="/admin/vendors">Manage Vendors</Link>
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
