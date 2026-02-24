import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';
import { User, Package, MapPin, Heart, CreditCard, LogOut, ChevronRight, ChevronLeft, Star } from 'lucide-react';
import { useStore } from '../store';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
// Tabs components not used in this file
import { toast } from 'sonner';

export function AccountPage() {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const defaultTab = searchParams.get('tab') || 'overview';
  const { language, user, isAuthenticated, setUser, wishlist } = useStore();
  const isRTL = language === 'ar';

  const [activeTab, setActiveTab] = useState(defaultTab);
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate login
    setUser({
      id: '1',
      name: 'John Doe',
      email: email,
    });
    toast.success(isRTL ? 'تم تسجيل الدخول بنجاح' : 'Logged in successfully');
  };

  const handleLogout = () => {
    setUser(null);
    toast.success(isRTL ? 'تم تسجيل الخروج' : 'Logged out');
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#F6F7F6] flex items-center justify-center px-4">
        <div className="bg-white rounded-[28px] p-8 w-full max-w-md">
          <h1 className="text-2xl font-bold text-[#111111] mb-2 text-center">
            {isLogin ? (isRTL ? 'تسجيل الدخول' : 'Login') : (isRTL ? 'إنشاء حساب' : 'Create Account')}
          </h1>
          <p className="text-gray-500 text-center mb-6">
            {isLogin 
              ? (isRTL ? 'أدخل بياناتك للوصول إلى حسابك' : 'Enter your details to access your account')
              : (isRTL ? 'أنشئ حسابًا جديدًا للبدء' : 'Create a new account to get started')}
          </p>

          <form onSubmit={handleLogin} className="space-y-4">
            {!isLogin && (
              <div>
                <label className="text-sm text-gray-600">{isRTL ? 'الاسم' : 'Name'}</label>
                <Input placeholder="John Doe" className="rounded-full mt-1" />
              </div>
            )}
            <div>
              <label className="text-sm text-gray-600">{t('checkout.email')}</label>
              <Input 
                type="email" 
                placeholder="email@example.com" 
                className="rounded-full mt-1"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label className="text-sm text-gray-600">{isRTL ? 'كلمة المرور' : 'Password'}</label>
              <Input 
                type="password" 
                placeholder="••••••••" 
                className="rounded-full mt-1"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <Button type="submit" className="w-full bg-[#2F5DFF] hover:bg-[#2F5DFF]/90 rounded-full h-12">
              {isLogin ? (isRTL ? 'تسجيل الدخول' : 'Login') : (isRTL ? 'إنشاء حساب' : 'Sign Up')}
            </Button>
          </form>

          <p className="text-center mt-4 text-sm text-gray-500">
            {isLogin ? (isRTL ? 'ليس لديك حساب؟' : 'Don\'t have an account?') : (isRTL ? 'لديك حساب بالفعل؟' : 'Already have an account?')}
            <button 
              onClick={() => setIsLogin(!isLogin)}
              className="text-[#2F5DFF] ml-1 hover:underline"
            >
              {isLogin ? (isRTL ? 'إنشاء حساب' : 'Sign Up') : (isRTL ? 'تسجيل الدخول' : 'Login')}
            </button>
          </p>
        </div>
      </div>
    );
  }

  const menuItems = [
    { id: 'overview', label: isRTL ? 'نظرة عامة' : 'Overview', icon: User },
    { id: 'orders', label: t('nav.orders'), icon: Package },
    { id: 'addresses', label: t('nav.addresses'), icon: MapPin },
    { id: 'wishlist', label: t('nav.wishlist'), icon: Heart },
    { id: 'payment', label: isRTL ? 'طرق الدفع' : 'Payment Methods', icon: CreditCard },
  ];

  const orders = [
    { id: 'ORD-001', date: '2026-02-20', total: 378, status: isRTL ? 'تم التوصيل' : 'Delivered', items: 2 },
    { id: 'ORD-002', date: '2026-02-15', total: 249, status: isRTL ? 'قيد الشحن' : 'Shipped', items: 1 },
    { id: 'ORD-003', date: '2026-02-10', total: 567, status: isRTL ? 'تم التوصيل' : 'Delivered', items: 3 },
  ];

  const addresses = [
    { id: 1, name: 'Home', address: '123 Main St, Doha, Qatar', default: true },
    { id: 2, name: 'Work', address: '456 Office Building, Doha, Qatar', default: false },
  ];

  return (
    <div className="min-h-screen bg-[#F6F7F6]">
      <div className="px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-[22px] p-4">
              <div className="flex items-center gap-3 mb-6 p-2">
                <div className="w-12 h-12 bg-[#2F5DFF] rounded-full flex items-center justify-center text-white font-bold">
                  {user?.name.charAt(0)}
                </div>
                <div>
                  <p className="font-medium text-[#111111]">{user?.name}</p>
                  <p className="text-sm text-gray-500">{user?.email}</p>
                </div>
              </div>
              <nav className="space-y-1">
                {menuItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                      activeTab === item.id ? 'bg-[#2F5DFF] text-white' : 'hover:bg-gray-50 text-gray-700'
                    }`}
                  >
                    <item.icon className="w-5 h-5" />
                    <span>{item.label}</span>
                    {isRTL ? <ChevronLeft className="w-4 h-4 mr-auto" /> : <ChevronRight className="w-4 h-4 ml-auto" />}
                  </button>
                ))}
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-50 transition-colors"
                >
                  <LogOut className="w-5 h-5" />
                  <span>{t('nav.logout')}</span>
                </button>
              </nav>
            </div>
          </div>

          {/* Content */}
          <div className="lg:col-span-3">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-[#111111]">{isRTL ? 'نظرة عامة' : 'Overview'}</h2>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-white rounded-[22px] p-6">
                    <Package className="w-8 h-8 text-[#2F5DFF] mb-4" />
                    <p className="text-3xl font-bold text-[#111111]">12</p>
                    <p className="text-gray-500">{t('nav.orders')}</p>
                  </div>
                  <div className="bg-white rounded-[22px] p-6">
                    <Heart className="w-8 h-8 text-[#2F5DFF] mb-4" />
                    <p className="text-3xl font-bold text-[#111111]">{wishlist.length}</p>
                    <p className="text-gray-500">{t('nav.wishlist')}</p>
                  </div>
                  <div className="bg-white rounded-[22px] p-6">
                    <Star className="w-8 h-8 text-[#2F5DFF] mb-4" />
                    <p className="text-3xl font-bold text-[#111111]">2,450</p>
                    <p className="text-gray-500">{isRTL ? 'نقاط الولاء' : 'Loyalty Points'}</p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'orders' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-[#111111]">{t('nav.orders')}</h2>
                <div className="space-y-4">
                  {orders.map((order) => (
                    <div key={order.id} className="bg-white rounded-[22px] p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <p className="font-medium text-[#111111]">{order.id}</p>
                          <p className="text-sm text-gray-500">{order.date}</p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-sm ${
                          order.status === (isRTL ? 'تم التوصيل' : 'Delivered') 
                            ? 'bg-green-100 text-green-700' 
                            : 'bg-blue-100 text-blue-700'
                        }`}>
                          {order.status}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <p className="text-gray-600">{order.items} {isRTL ? 'عناصر' : 'items'}</p>
                        <p className="font-bold text-[#111111]">QAR {order.total}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'addresses' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold text-[#111111]">{t('nav.addresses')}</h2>
                  <Button className="bg-[#2F5DFF] hover:bg-[#2F5DFF]/90 rounded-full">
                    {isRTL ? 'إضافة عنوان' : 'Add Address'}
                  </Button>
                </div>
                <div className="space-y-4">
                  {addresses.map((addr) => (
                    <div key={addr.id} className="bg-white rounded-[22px] p-6">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="font-medium text-[#111111]">{addr.name}</p>
                            {addr.default && (
                              <span className="text-xs bg-gray-100 px-2 py-1 rounded-full">
                                {isRTL ? 'افتراضي' : 'Default'}
                              </span>
                            )}
                          </div>
                          <p className="text-gray-600 mt-1">{addr.address}</p>
                        </div>
                        <Button variant="ghost" size="sm">
                          {isRTL ? 'تعديل' : 'Edit'}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'wishlist' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-[#111111]">{t('nav.wishlist')}</h2>
                {wishlist.length === 0 ? (
                  <div className="bg-white rounded-[22px] p-12 text-center">
                    <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">{isRTL ? 'قائمة المفضلة فارغة' : 'Your wishlist is empty'}</p>
                  </div>
                ) : (
                  <div className="grid md:grid-cols-2 gap-4">
                    {wishlist.map((id) => (
                      <div key={id} className="bg-white rounded-[22px] p-4">
                        <p className="text-gray-500">{isRTL ? 'المنتج #' : 'Product #'}{id}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'payment' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-[#111111]">{isRTL ? 'طرق الدفع' : 'Payment Methods'}</h2>
                <div className="bg-white rounded-[22px] p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-8 bg-gray-200 rounded" />
                    <div>
                      <p className="font-medium text-[#111111]">•••• •••• •••• 4242</p>
                      <p className="text-sm text-gray-500">{isRTL ? 'تنتهي في' : 'Expires'} 12/28</p>
                    </div>
                    <span className="ml-auto text-xs bg-gray-100 px-2 py-1 rounded-full">
                      {isRTL ? 'افتراضي' : 'Default'}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
