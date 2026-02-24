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
  Plus,
  MoreHorizontal,
  Edit,
  Trash2,
  Star,
  Package as PackageIcon,
  CheckCircle,
  XCircle
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

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

const vendors = [
  { id: '1', name: 'HomeCraft', email: 'contact@homecraft.com', products: 45, rating: 4.8, status: 'active', joined: '2023-01-15' },
  { id: '2', name: 'TechPro', email: 'support@techpro.com', products: 120, rating: 4.5, status: 'active', joined: '2023-03-20' },
  { id: '3', name: 'UrbanGear', email: 'hello@urbangear.com', products: 78, rating: 4.7, status: 'pending', joined: '2026-02-10' },
  { id: '4', name: 'CozyLiving', email: 'info@cozyliving.com', products: 32, rating: 4.9, status: 'active', joined: '2023-06-08' },
  { id: '5', name: 'ArtisanHome', email: 'artisan@home.com', products: 56, rating: 4.6, status: 'suspended', joined: '2023-09-12' },
];

export function AdminVendors() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredVendors = vendors.filter(vendor => 
    vendor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    vendor.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
                item.id === 'vendors' 
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
            <h1 className="text-2xl font-bold text-[#111111]">Vendors</h1>
            <p className="text-gray-500">Manage marketplace vendors</p>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-[#2F5DFF] hover:bg-[#2F5DFF]/90 rounded-full">
                <Plus className="w-4 h-4 mr-2" />
                Add Vendor
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-lg">
              <DialogHeader>
                <DialogTitle>Add New Vendor</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 pt-4">
                <div>
                  <label className="text-sm font-medium">Vendor Name</label>
                  <Input placeholder="Enter vendor name" className="mt-1" />
                </div>
                <div>
                  <label className="text-sm font-medium">Email</label>
                  <Input type="email" placeholder="vendor@example.com" className="mt-1" />
                </div>
                <div>
                  <label className="text-sm font-medium">Phone</label>
                  <Input placeholder="+974" className="mt-1" />
                </div>
                <Button className="w-full bg-[#2F5DFF] hover:bg-[#2F5DFF]/90">Add Vendor</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-[22px] p-6">
            <p className="text-3xl font-bold text-[#111111]">156</p>
            <p className="text-gray-500">Total Vendors</p>
          </div>
          <div className="bg-white rounded-[22px] p-6">
            <p className="text-3xl font-bold text-green-600">142</p>
            <p className="text-gray-500">Active</p>
          </div>
          <div className="bg-white rounded-[22px] p-6">
            <p className="text-3xl font-bold text-yellow-600">8</p>
            <p className="text-gray-500">Pending</p>
          </div>
          <div className="bg-white rounded-[22px] p-6">
            <p className="text-3xl font-bold text-red-600">6</p>
            <p className="text-gray-500">Suspended</p>
          </div>
        </div>

        {/* Search */}
        <div className="relative max-w-md mb-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            placeholder="Search vendors..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 rounded-full"
          />
        </div>

        {/* Vendors Table */}
        <div className="bg-white rounded-[22px] overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Vendor</TableHead>
                <TableHead>Products</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Joined</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredVendors.map((vendor) => (
                <TableRow key={vendor.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium text-[#111111]">{vendor.name}</p>
                      <p className="text-sm text-gray-500">{vendor.email}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <PackageIcon className="w-4 h-4 text-gray-400" />
                      {vendor.products}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      {vendor.rating}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={
                      vendor.status === 'active' ? 'bg-green-100 text-green-700' :
                      vendor.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-red-100 text-red-700'
                    }>
                      {vendor.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{vendor.joined}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Approve
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="w-4 h-4 mr-2" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">
                          <XCircle className="w-4 h-4 mr-2" />
                          Suspend
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">
                          <Trash2 className="w-4 h-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
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
