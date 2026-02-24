import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Star, MapPin, Package, Users, MessageCircle } from 'lucide-react';
import { useStore } from '../store';
import { ProductCard } from '../components/ProductCard';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const sampleProducts: import('../store').Product[] = [
  { id: '1', name: 'Minimal Desk Lamp', nameAr: 'مصباح مكتبي بسيط', price: 129, image: '/images/product_1.jpg', category: 'home', rating: 4.8, reviews: 124, vendor: 'HomeCraft', inStock: true },
  { id: '2', name: 'Soft Knit Throw', nameAr: 'بطانية محبوكة ناعمة', price: 199, image: '/images/product_2.jpg', category: 'home', rating: 4.9, reviews: 89, vendor: 'HomeCraft', inStock: true },
  { id: '4', name: 'Ceramic Mug Set', nameAr: 'طقم أكواب سيراميك', price: 89, image: '/images/product_4.jpg', category: 'home', rating: 4.6, reviews: 78, vendor: 'HomeCraft', inStock: true },
];

export function VendorPage() {
  const { id } = useParams<{ id: string }>();
  const { t: _t } = useTranslation();
  const { language } = useStore();
  const isRTL = language === 'ar';

  // In real app, fetch vendor data from API
  const vendor = {
    id: id || '1',
    name: id || 'HomeCraft',
    description: isRTL 
      ? 'متخصصون في منتجات المنزل العصرية والمستدامة. نؤمن بأن منزلك يعكس شخصيتك.'
      : 'Specializing in modern and sustainable home products. We believe your home reflects your personality.',
    rating: 4.8,
    reviews: 342,
    products: 156,
    followers: 1205,
    location: isRTL ? 'الدوحة، قطر' : 'Doha, Qatar',
    joined: '2023',
    banner: '/images/home_feature.jpg',
    logo: '/images/product_1.jpg',
  };

  return (
    <div className="min-h-screen bg-[#F6F7F6]">
      {/* Banner */}
      <div className="h-48 lg:h-64 relative">
        <img src={vendor.banner} alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
      </div>

      {/* Vendor Info */}
      <div className="px-4 sm:px-6 lg:px-8 -mt-16 relative z-10">
        <div className="bg-white rounded-[28px] p-6 shadow-lg">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Logo */}
            <div className="w-24 h-24 md:w-32 md:h-32 rounded-2xl overflow-hidden border-4 border-white shadow-lg -mt-16 bg-white">
              <img src={vendor.logo} alt={vendor.name} className="w-full h-full object-cover" />
            </div>

            {/* Info */}
            <div className="flex-1">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-bold text-[#111111]">{vendor.name}</h1>
                  <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      {vendor.rating} ({vendor.reviews} {isRTL ? 'تقييم' : 'reviews'})
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {vendor.location}
                    </span>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Button variant="outline" className="rounded-full">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    {isRTL ? 'تواصل' : 'Contact'}
                  </Button>
                  <Button className="bg-[#2F5DFF] hover:bg-[#2F5DFF]/90 rounded-full">
                    <Users className="w-4 h-4 mr-2" />
                    {isRTL ? 'متابعة' : 'Follow'}
                  </Button>
                </div>
              </div>

              <p className="text-gray-600 mt-4 max-w-2xl">{vendor.description}</p>

              <div className="flex gap-6 mt-4 pt-4 border-t">
                <div className="text-center">
                  <p className="text-2xl font-bold text-[#111111]">{vendor.products}</p>
                  <p className="text-sm text-gray-500">{isRTL ? 'منتجات' : 'Products'}</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-[#111111]">{vendor.followers}</p>
                  <p className="text-sm text-gray-500">{isRTL ? 'متابعين' : 'Followers'}</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-[#111111]">{vendor.rating}</p>
                  <p className="text-sm text-gray-500">{isRTL ? 'التقييم' : 'Rating'}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="products">
          <TabsList className="bg-white rounded-full p-1 mb-6">
            <TabsTrigger value="products" className="rounded-full data-[state=active]:bg-[#2F5DFF] data-[state=active]:text-white">
              <Package className="w-4 h-4 mr-2" />
              {isRTL ? 'المنتجات' : 'Products'}
            </TabsTrigger>
            <TabsTrigger value="reviews" className="rounded-full data-[state=active]:bg-[#2F5DFF] data-[state=active]:text-white">
              <Star className="w-4 h-4 mr-2" />
              {isRTL ? 'التقييمات' : 'Reviews'}
            </TabsTrigger>
            <TabsTrigger value="about" className="rounded-full data-[state=active]:bg-[#2F5DFF] data-[state=active]:text-white">
              <Users className="w-4 h-4 mr-2" />
              {isRTL ? 'عن المتجر' : 'About'}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="products">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {sampleProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="reviews">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white rounded-[22px] p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-gray-200 rounded-full" />
                    <div>
                      <p className="font-medium">{isRTL ? 'عميل ' : 'Customer '}{i}</p>
                      <div className="flex gap-1">
                        {[...Array(5)].map((_, j) => (
                          <Star key={j} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-600">
                    {isRTL 
                      ? 'منتج رائع وجودة ممتازة. التوصيل كان سريعًا والتغليف ممتاز.'
                      : 'Great product and excellent quality. Delivery was fast and packaging was great.'}
                  </p>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="about">
            <div className="bg-white rounded-[22px] p-8 max-w-3xl">
              <h3 className="text-xl font-bold text-[#111111] mb-4">{isRTL ? 'عن ' : 'About '}{vendor.name}</h3>
              <p className="text-gray-600 mb-6">{vendor.description}</p>
              <div className="space-y-4">
                <div className="flex justify-between py-2 border-b">
                  <span className="text-gray-500">{isRTL ? 'الموقع' : 'Location'}</span>
                  <span className="text-[#111111]">{vendor.location}</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="text-gray-500">{isRTL ? 'تاريخ الانضمام' : 'Joined'}</span>
                  <span className="text-[#111111]">{vendor.joined}</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="text-gray-500">{isRTL ? 'إجمالي المنتجات' : 'Total Products'}</span>
                  <span className="text-[#111111]">{vendor.products}</span>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
