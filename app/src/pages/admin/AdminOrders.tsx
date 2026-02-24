import { useState } from 'react';
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
  Search,
  Filter,
  MoreHorizontal,
  Eye
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

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

const orders = [
  { id: 'ORD-001', customer: 'John Doe', email: 'john@example.com', total: 378, status: 'delivered', items: 2, date: '2026-02-20' },
  { id: 'ORD-002', customer: 'Jane Smith', email: 'jane@example.com', total: 249, status: 'shipped', items: 1, date: '2026-02-19' },
  { id: 'ORD-003', customer: 'Mike Johnson', email: 'mike@example.com', total: 567, status: 'processing', items: 3, date: '2026-02-19' },
  { id: 'ORD-004', customer: 'Sarah Williams', email: 'sarah@example.com', total: 189, status: 'pending', items: 1, date: '2026-02-18' },
  { id: 'ORD-005', customer: 'David Brown', email: 'david@example.com', total: 899, status: 'delivered', items: 5, date: '2026-02-17' },
  { id: 'ORD-006', customer: 'Emily Davis', email: 'emily@example.com', total: 456, status: 'shipped', items: 2, date: '2026-02-16' },
];

const statusColors: Record<string, string> = {
  pending: 'bg-yellow-100 text-yellow-700',
  processing: 'bg-blue-100 text-blue-700',
  shipped: 'bg-purple-100 text-purple-700',
  delivered: 'bg-green-100 text-green-700',
  cancelled: 'bg-red-100 text-red-700',
};

export function AdminOrders() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string | null>(null);

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         order.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter ? order.status === statusFilter : true;
    return matchesSearch && matchesStatus;
  });

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
                item.id === 'orders' 
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
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-[#111111]">Orders</h1>
            <p className="text-gray-500">Manage and track all orders</p>
          </div>
          <Button variant="outline" className="rounded-full">
            <Filter className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Search orders..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 rounded-full"
            />
          </div>
          <div className="flex gap-2">
            {['all', 'pending', 'processing', 'shipped', 'delivered'].map((status) => (
              <Button
                key={status}
                variant={statusFilter === status || (status === 'all' && !statusFilter) ? 'default' : 'outline'}
                size="sm"
                onClick={() => setStatusFilter(status === 'all' ? null : status)}
                className="rounded-full capitalize"
              >
                {status}
              </Button>
            ))}
          </div>
        </div>

        {/* Orders Table */}
        <div className="bg-white rounded-[22px] overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Items</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">{order.id}</TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{order.customer}</p>
                      <p className="text-sm text-gray-500">{order.email}</p>
                    </div>
                  </TableCell>
                  <TableCell>{order.items}</TableCell>
                  <TableCell>QAR {order.total}</TableCell>
                  <TableCell>
                    <Badge className={`${statusColors[order.status]} capitalize`}>
                      {order.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{order.date}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Eye className="w-4 h-4 mr-2" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem>Update Status</DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">Cancel Order</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </main>
    </div>
  );
}
