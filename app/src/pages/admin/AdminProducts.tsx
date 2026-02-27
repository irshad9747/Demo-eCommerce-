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
  Eye
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
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

const products = [
  { id: '1', name: 'Minimal Desk Lamp', price: 129, stock: 45, category: 'Home', vendor: 'HomeCraft', status: 'active' },
  { id: '2', name: 'Soft Knit Throw', price: 199, stock: 32, category: 'Home', vendor: 'CozyLiving', status: 'active' },
  { id: '3', name: 'Everyday Backpack', price: 249, stock: 0, category: 'Fashion', vendor: 'UrbanGear', status: 'out_of_stock' },
  { id: '4', name: 'Ceramic Mug Set', price: 89, stock: 120, category: 'Home', vendor: 'ArtisanHome', status: 'active' },
  { id: '5', name: 'Wireless Mouse', price: 149, stock: 78, category: 'Electronics', vendor: 'TechPro', status: 'active' },
  { id: '6', name: 'Cotton Tee', price: 79, stock: 200, category: 'Fashion', vendor: 'BasicWear', status: 'draft' },
];

export function AdminProducts() {
  const [searchQuery, setSearchQuery] = useState('');
  const [productsList, setProductsList] = useState(products);

  const filteredProducts = productsList.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.vendor.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleStatus = (id: string) => {
    setProductsList(productsList.map(p =>
      p.id === id ? { ...p, status: p.status === 'active' ? 'draft' : 'active' } : p
    ));
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r hidden lg:block">
        <div className="p-6">
          <Link to="/" className="text-xl font-bold text-[#111111]">wajiht Admin</Link>
        </div>
        <nav className="px-4 pb-4">
          {sidebarItems.map((item) => (
            <Link
              key={item.id}
              to={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${item.id === 'products'
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
            <h1 className="text-2xl font-bold text-[#111111]">Products</h1>
            <p className="text-gray-500">Manage your product catalog</p>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-[#2F5DFF] hover:bg-[#2F5DFF]/90 rounded-full">
                <Plus className="w-4 h-4 mr-2" />
                Add Product
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-lg">
              <DialogHeader>
                <DialogTitle>Add New Product</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 pt-4">
                <div>
                  <label className="text-sm font-medium">Product Name</label>
                  <Input placeholder="Enter product name" className="mt-1" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Price</label>
                    <Input type="number" placeholder="0.00" className="mt-1" />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Stock</label>
                    <Input type="number" placeholder="0" className="mt-1" />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium">Category</label>
                  <Input placeholder="Select category" className="mt-1" />
                </div>
                <Button className="w-full bg-[#2F5DFF] hover:bg-[#2F5DFF]/90">Save Product</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Search */}
        <div className="relative max-w-md mb-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 rounded-full"
          />
        </div>

        {/* Products Table */}
        <div className="bg-white rounded-[22px] overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Vendor</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProducts.map((product) => (
                <TableRow key={product.id}>
                  <TableCell className="font-medium">{product.name}</TableCell>
                  <TableCell>QAR {product.price}</TableCell>
                  <TableCell>
                    <span className={product.stock === 0 ? 'text-red-500' : ''}>
                      {product.stock}
                    </span>
                  </TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell>{product.vendor}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Switch
                        checked={product.status === 'active'}
                        onCheckedChange={() => toggleStatus(product.id)}
                      />
                      <Badge className={
                        product.status === 'active' ? 'bg-green-100 text-green-700' :
                          product.status === 'out_of_stock' ? 'bg-red-100 text-red-700' :
                            'bg-gray-100 text-gray-700'
                      }>
                        {product.status}
                      </Badge>
                    </div>
                  </TableCell>
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
                          View
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="w-4 h-4 mr-2" />
                          Edit
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
