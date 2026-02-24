import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, Minus, Plus, ShoppingBag, ArrowRight, ArrowLeft } from 'lucide-react';
import { useStore } from '../store';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

export function CartPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { language, cart, updateQuantity, removeFromCart, getCartTotal, getCartCount } = useStore();
  const isRTL = language === 'ar';

  const cartTotal = getCartTotal();
  const shipping = cartTotal > 200 ? 0 : 25;
  const total = cartTotal + shipping;

  const handleCheckout = () => {
    if (cart.length === 0) {
      toast.error(isRTL ? 'العربة فارغة' : 'Cart is empty');
      return;
    }
    navigate('/checkout');
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-[#F6F7F6] flex flex-col items-center justify-center px-4">
        <ShoppingBag className="w-24 h-24 text-gray-300 mb-6" />
        <h1 className="text-2xl font-bold text-[#111111] mb-2">{t('cart.empty')}</h1>
        <p className="text-gray-500 mb-6">{isRTL ? 'أضف بعض المنتجات إلى عربتك' : 'Add some products to your cart'}</p>
        <Button asChild className="bg-[#2F5DFF] hover:bg-[#2F5DFF]/90 rounded-full">
          <Link to="/">{t('cart.continueShopping')}</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F6F7F6]">
      <div className="px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl lg:text-3xl font-bold text-[#111111] mb-8">{t('cart.title')}</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item) => (
              <div key={item.id} className="bg-white rounded-[22px] p-4 flex gap-4">
                <Link to={`/product/${item.id}`} className="w-24 h-24 flex-shrink-0">
                  <img
                    src={item.image}
                    alt={isRTL && item.nameAr ? item.nameAr : item.name}
                    className="w-full h-full object-cover rounded-xl"
                  />
                </Link>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start">
                    <Link to={`/product/${item.id}`} className="font-medium text-[#111111] line-clamp-2 hover:text-[#2F5DFF]">
                      {isRTL && item.nameAr ? item.nameAr : item.name}
                    </Link>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-gray-400 hover:text-red-500 p-1"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                  <p className="text-sm text-gray-500">{item.vendor}</p>
                  <div className="flex justify-between items-center mt-3">
                    <div className="flex items-center border rounded-full">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-8 h-8 flex items-center justify-center hover:bg-gray-50"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-8 text-center text-sm">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-8 h-8 flex items-center justify-center hover:bg-gray-50"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                    <span className="font-bold text-[#111111]">QAR {item.price * item.quantity}</span>
                  </div>
                </div>
              </div>
            ))}

            {/* Coupon */}
            <div className="bg-white rounded-[22px] p-4">
              <div className="flex gap-2">
                <Input
                  placeholder={t('cart.coupon')}
                  className="rounded-full"
                />
                <Button variant="outline" className="rounded-full">
                  {t('cart.apply')}
                </Button>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="bg-white rounded-[22px] p-6 h-fit">
            <h2 className="text-lg font-bold text-[#111111] mb-4">{t('cart.orderSummary')}</h2>
            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-gray-600">
                <span>{t('cart.subtotal')} ({getCartCount()} {isRTL ? 'عناصر' : 'items'})</span>
                <span>QAR {cartTotal}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>{t('cart.shipping')}</span>
                <span>{shipping === 0 ? (isRTL ? 'مجاني' : 'Free') : `QAR ${shipping}`}</span>
              </div>
              <div className="border-t pt-3">
                <div className="flex justify-between font-bold text-lg text-[#111111]">
                  <span>{t('cart.total')}</span>
                  <span>QAR {total}</span>
                </div>
              </div>
            </div>
            <Button
              onClick={handleCheckout}
              className="w-full bg-[#2F5DFF] hover:bg-[#2F5DFF]/90 rounded-full h-12"
            >
              {t('cart.checkout')}
              {isRTL ? <ArrowLeft className="w-4 h-4 mr-2" /> : <ArrowRight className="w-4 h-4 ml-2" />}
            </Button>
            <Button
              asChild
              variant="outline"
              className="w-full rounded-full h-12 mt-2"
            >
              <Link to="/">{t('cart.continueShopping')}</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
