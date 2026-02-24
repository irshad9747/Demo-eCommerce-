import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Heart, Share2, Star, Truck, RotateCcw, Shield, Minus, Plus, ChevronRight, ChevronLeft } from 'lucide-react';
import { useStore } from '../store';
import { ProductCard } from '../components/ProductCard';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';

// Sample product data - in real app, fetch from API
const sampleProducts: import('../store').Product[] = [
  { id: '1', name: 'Minimal Desk Lamp', nameAr: 'مصباح مكتبي بسيط', price: 129, image: '/Demo-eCommerce-/images/product_1.jpg', category: 'home', rating: 4.8, reviews: 124, vendor: 'HomeCraft', inStock: true },
  { id: '2', name: 'Soft Knit Throw', nameAr: 'بطانية محبوكة ناعمة', price: 199, image: '/Demo-eCommerce-/images/product_2.jpg', category: 'home', rating: 4.9, reviews: 89, vendor: 'CozyLiving', inStock: true },
  { id: '3', name: 'Everyday Backpack', nameAr: 'حقيبة ظهر يومية', price: 249, image: '/Demo-eCommerce-/images/product_3.jpg', category: 'fashion', rating: 4.7, reviews: 156, vendor: 'UrbanGear', inStock: true },
  { id: '4', name: 'Ceramic Mug Set', nameAr: 'طقم أكواب سيراميك', price: 89, image: '/Demo-eCommerce-/images/product_4.jpg', category: 'home', rating: 4.6, reviews: 78, vendor: 'ArtisanHome', inStock: true },
  { id: '5', name: 'Wireless Mouse', nameAr: 'فأرة لاسلكية', price: 149, image: '/Demo-eCommerce-/images/product_5.jpg', category: 'electronics', rating: 4.5, reviews: 203, vendor: 'TechPro', inStock: true },
  { id: '6', name: 'Cotton Tee', nameAr: 'تيشيرت قطني', price: 79, image: '/Demo-eCommerce-/images/product_6.jpg', category: 'fashion', rating: 4.4, reviews: 112, vendor: 'BasicWear', inStock: true },
];

export function ProductPage() {
  const { id } = useParams<{ id: string }>();
  const { t } = useTranslation();
  const { language, addToCart, toggleWishlist, isInWishlist } = useStore();
  const isRTL = language === 'ar';

  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  // Find product - in real app, fetch from API
  const product = sampleProducts.find(p => p.id === id) || sampleProducts[0];
  const inWishlist = isInWishlist(product.id);

  const relatedProducts = sampleProducts.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);

  const displayName = isRTL && product.nameAr ? product.nameAr : product.name;

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    toast.success(isRTL ? `تمت إضافة ${quantity} عناصر إلى العربة` : `Added ${quantity} items to cart`);
  };

  const handleToggleWishlist = () => {
    toggleWishlist(product.id);
    toast.success(inWishlist
      ? (isRTL ? 'تمت الإزالة من المفضلة' : 'Removed from wishlist')
      : (isRTL ? 'تمت الإضافة إلى المفضلة' : 'Added to wishlist')
    );
  };

  const incrementQuantity = () => setQuantity(q => q + 1);
  const decrementQuantity = () => setQuantity(q => Math.max(1, q - 1));

  return (
    <div className="min-h-screen bg-[#F6F7F6]">
      {/* Breadcrumb */}
      <div className="px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Link to="/" className="hover:text-[#2F5DFF]">{isRTL ? 'الرئيسية' : 'Home'}</Link>
          {isRTL ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
          <Link to={`/search?category=${product.category}`} className="hover:text-[#2F5DFF] capitalize">{product.category}</Link>
          {isRTL ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
          <span className="text-[#111111]">{displayName}</span>
        </div>
      </div>

      <div className="px-4 sm:px-6 lg:px-8 pb-12">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="aspect-square bg-white rounded-[28px] overflow-hidden">
              <img
                src={product.image}
                alt={displayName}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex gap-3">
              {[product.image, product.image, product.image, product.image].map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={`w-20 h-20 rounded-xl overflow-hidden border-2 ${selectedImage === i ? 'border-[#2F5DFF]' : 'border-transparent'}`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <div className="flex items-start justify-between gap-4">
                <h1 className="text-2xl lg:text-3xl font-bold text-[#111111]">{displayName}</h1>
                <div className="flex gap-2">
                  <button
                    onClick={handleToggleWishlist}
                    className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50"
                  >
                    <Heart className={`w-5 h-5 ${inWishlist ? 'fill-red-500 text-red-500' : ''}`} />
                  </button>
                  <button className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50">
                    <Share2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
              <Link to={`/vendor/${product.vendor}`} className="text-[#2F5DFF] hover:underline">
                {product.vendor}
              </Link>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                <span className="font-medium">{product.rating}</span>
              </div>
              <span className="text-gray-400">({product.reviews} {isRTL ? 'تقييم' : 'reviews'})</span>
              <span className="text-green-600 text-sm">{t('product.inStock')}</span>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-3xl font-bold text-[#111111]">QAR {product.price}</span>
              {product.originalPrice && (
                <span className="text-xl text-gray-400 line-through">QAR {product.originalPrice}</span>
              )}
            </div>

            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">{t('product.quantity')}</span>
              <div className="flex items-center border rounded-full">
                <button onClick={decrementQuantity} className="w-10 h-10 flex items-center justify-center hover:bg-gray-50">
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-10 text-center">{quantity}</span>
                <button onClick={incrementQuantity} className="w-10 h-10 flex items-center justify-center hover:bg-gray-50">
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="flex gap-4">
              <Button onClick={handleAddToCart} className="flex-1 bg-[#2F5DFF] hover:bg-[#2F5DFF]/90 rounded-full h-12">
                {t('product.addToCart')}
              </Button>
              <Button variant="outline" className="flex-1 rounded-full h-12">
                {t('product.buyNow')}
              </Button>
            </div>

            <div className="grid grid-cols-3 gap-4 pt-6 border-t">
              <div className="text-center">
                <Truck className="w-6 h-6 mx-auto mb-2 text-[#2F5DFF]" />
                <p className="text-xs text-gray-600">{t('product.freeShipping')}</p>
              </div>
              <div className="text-center">
                <RotateCcw className="w-6 h-6 mx-auto mb-2 text-[#2F5DFF]" />
                <p className="text-xs text-gray-600">{t('sections.easyReturns')}</p>
              </div>
              <div className="text-center">
                <Shield className="w-6 h-6 mx-auto mb-2 text-[#2F5DFF]" />
                <p className="text-xs text-gray-600">{t('sections.securePayments')}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-12">
          <Tabs defaultValue="description">
            <TabsList className="w-full justify-start bg-transparent border-b rounded-none h-auto p-0">
              <TabsTrigger value="description" className="rounded-none border-b-2 border-transparent data-[state=active]:border-[#2F5DFF] data-[state=active]:bg-transparent py-4">
                {t('product.description')}
              </TabsTrigger>
              <TabsTrigger value="specifications" className="rounded-none border-b-2 border-transparent data-[state=active]:border-[#2F5DFF] data-[state=active]:bg-transparent py-4">
                {t('product.specifications')}
              </TabsTrigger>
              <TabsTrigger value="reviews" className="rounded-none border-b-2 border-transparent data-[state=active]:border-[#2F5DFF] data-[state=active]:bg-transparent py-4">
                {t('product.reviews')}
              </TabsTrigger>
            </TabsList>
            <TabsContent value="description" className="pt-6">
              <p className="text-gray-600 max-w-3xl">
                {isRTL
                  ? 'منتج عالي الجودة مصمم بعناية لتوفير أفضل تجربة. مصنوع من مواد premium لضمان المتانة والراحة. مثالي للاستخدام اليومي وهدية ممتازة لأحبائك.'
                  : 'A high-quality product carefully designed to provide the best experience. Made from premium materials to ensure durability and comfort. Perfect for daily use and an excellent gift for your loved ones.'}
              </p>
            </TabsContent>
            <TabsContent value="specifications" className="pt-6">
              <div className="grid md:grid-cols-2 gap-4 max-w-3xl">
                {[
                  { label: isRTL ? 'العلامة التجارية' : 'Brand', value: product.vendor },
                  { label: isRTL ? 'الفئة' : 'Category', value: product.category },
                  { label: isRTL ? 'الوزن' : 'Weight', value: '0.5 kg' },
                  { label: isRTL ? 'الأبعاد' : 'Dimensions', value: '20 x 15 x 10 cm' },
                ].map((spec, i) => (
                  <div key={i} className="flex justify-between py-2 border-b">
                    <span className="text-gray-500">{spec.label}</span>
                    <span className="text-[#111111]">{spec.value}</span>
                  </div>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="reviews" className="pt-6">
              <div className="max-w-3xl">
                <div className="flex items-center gap-4 mb-6">
                  <div className="text-4xl font-bold">{product.rating}</div>
                  <div>
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`w-5 h-5 ${i < Math.floor(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} />
                      ))}
                    </div>
                    <p className="text-gray-500">{product.reviews} {isRTL ? 'تقييم' : 'reviews'}</p>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Related Products */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-[#111111] mb-6">{t('product.relatedProducts')}</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
