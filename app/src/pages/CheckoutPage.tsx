import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, ChevronLeft, CreditCard, MapPin, User, Check } from 'lucide-react';
import { useStore } from '../store';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { toast } from 'sonner';

export function CheckoutPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { language, cart, getCartTotal, clearCart } = useStore();
  const isRTL = language === 'ar';

  const [step, setStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState('card');

  const cartTotal = getCartTotal();
  const shipping = cartTotal > 200 ? 0 : 25;
  const total = cartTotal + shipping;

  const handlePlaceOrder = () => {
    toast.success(isRTL ? 'تم تأكيد طلبك بنجاح!' : 'Order placed successfully!');
    clearCart();
    navigate('/account?tab=orders');
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-[#F6F7F6] flex flex-col items-center justify-center px-4">
        <h1 className="text-2xl font-bold text-[#111111] mb-2">{isRTL ? 'العربة فارغة' : 'Cart is empty'}</h1>
        <Button asChild className="bg-[#2F5DFF] hover:bg-[#2F5DFF]/90 rounded-full mt-4">
          <a href="/">{t('cart.continueShopping')}</a>
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F6F7F6]">
      <div className="px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl lg:text-3xl font-bold text-[#111111] mb-8">{t('checkout.title')}</h1>

        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-8">
          {[
            { num: 1, label: t('checkout.contactInfo'), icon: User },
            { num: 2, label: t('checkout.shippingAddress'), icon: MapPin },
            { num: 3, label: t('checkout.payment'), icon: CreditCard },
          ].map((s, i) => (
            <div key={s.num} className="flex items-center">
              <div className={`flex flex-col items-center ${step >= s.num ? 'text-[#2F5DFF]' : 'text-gray-400'}`}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${step >= s.num ? 'border-[#2F5DFF] bg-[#2F5DFF] text-white' : 'border-gray-300'}`}>
                  {step > s.num ? <Check className="w-5 h-5" /> : <s.icon className="w-5 h-5" />}
                </div>
                <span className="text-xs mt-1 hidden sm:block">{s.label}</span>
              </div>
              {i < 2 && (
                <div className={`w-16 sm:w-24 h-0.5 mx-2 ${step > s.num ? 'bg-[#2F5DFF]' : 'bg-gray-300'}`} />
              )}
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-2">
            {step === 1 && (
              <div className="bg-white rounded-[22px] p-6">
                <h2 className="text-lg font-bold text-[#111111] mb-4">{t('checkout.contactInfo')}</h2>
                <div className="space-y-4">
                  <div>
                    <Label>{t('checkout.email')}</Label>
                    <Input type="email" placeholder="email@example.com" className="rounded-full mt-1" />
                  </div>
                  <div>
                    <Label>{t('checkout.phone')}</Label>
                    <Input type="tel" placeholder="+974" className="rounded-full mt-1" />
                  </div>
                </div>
                <Button onClick={() => setStep(2)} className="mt-6 bg-[#2F5DFF] hover:bg-[#2F5DFF]/90 rounded-full">
                  {t('checkout.continue')}
                  {isRTL ? <ChevronLeft className="w-4 h-4 mr-2" /> : <ChevronRight className="w-4 h-4 ml-2" />}
                </Button>
              </div>
            )}

            {step === 2 && (
              <div className="bg-white rounded-[22px] p-6">
                <h2 className="text-lg font-bold text-[#111111] mb-4">{t('checkout.shippingAddress')}</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <Label>{t('checkout.fullName')}</Label>
                    <Input placeholder="John Doe" className="rounded-full mt-1" />
                  </div>
                  <div className="md:col-span-2">
                    <Label>{t('checkout.address')}</Label>
                    <Input placeholder="123 Main St" className="rounded-full mt-1" />
                  </div>
                  <div>
                    <Label>{t('checkout.city')}</Label>
                    <Input placeholder="Doha" className="rounded-full mt-1" />
                  </div>
                  <div>
                    <Label>{t('checkout.zipCode')}</Label>
                    <Input placeholder="00000" className="rounded-full mt-1" />
                  </div>
                </div>
                <div className="flex gap-4 mt-6">
                  <Button variant="outline" onClick={() => setStep(1)} className="rounded-full">
                    {t('checkout.back')}
                  </Button>
                  <Button onClick={() => setStep(3)} className="bg-[#2F5DFF] hover:bg-[#2F5DFF]/90 rounded-full">
                    {t('checkout.continue')}
                    {isRTL ? <ChevronLeft className="w-4 h-4 mr-2" /> : <ChevronRight className="w-4 h-4 ml-2" />}
                  </Button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="bg-white rounded-[22px] p-6">
                <h2 className="text-lg font-bold text-[#111111] mb-4">{t('checkout.payment')}</h2>
                <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-4">
                  <div className="flex items-center space-x-2 border rounded-xl p-4">
                    <RadioGroupItem value="card" id="card" />
                    <Label htmlFor="card" className="flex items-center gap-2 cursor-pointer">
                      <CreditCard className="w-5 h-5" />
                      {isRTL ? 'بطاقة ائتمان' : 'Credit Card'}
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 border rounded-xl p-4">
                    <RadioGroupItem value="cod" id="cod" />
                    <Label htmlFor="cod" className="cursor-pointer">{t('checkout.cod')}</Label>
                  </div>
                </RadioGroup>

                {paymentMethod === 'card' && (
                  <div className="mt-4 space-y-4">
                    <div>
                      <Label>{t('checkout.cardNumber')}</Label>
                      <Input placeholder="0000 0000 0000 0000" className="rounded-full mt-1" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>{t('checkout.expiry')}</Label>
                        <Input placeholder="MM/YY" className="rounded-full mt-1" />
                      </div>
                      <div>
                        <Label>{t('checkout.cvv')}</Label>
                        <Input placeholder="123" className="rounded-full mt-1" />
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex gap-4 mt-6">
                  <Button variant="outline" onClick={() => setStep(2)} className="rounded-full">
                    {t('checkout.back')}
                  </Button>
                  <Button onClick={handlePlaceOrder} className="bg-[#2F5DFF] hover:bg-[#2F5DFF]/90 rounded-full">
                    {t('checkout.placeOrder')}
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Order Summary */}
          <div className="bg-white rounded-[22px] p-6 h-fit">
            <h2 className="text-lg font-bold text-[#111111] mb-4">{t('checkout.orderSummary')}</h2>
            <div className="space-y-3 mb-6">
              {cart.map((item) => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span className="text-gray-600">{isRTL && item.nameAr ? item.nameAr : item.name} x {item.quantity}</span>
                  <span>QAR {item.price * item.quantity}</span>
                </div>
              ))}
              <div className="border-t pt-3 mt-3">
                <div className="flex justify-between text-gray-600">
                  <span>{t('cart.subtotal')}</span>
                  <span>QAR {cartTotal}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>{t('cart.shipping')}</span>
                  <span>{shipping === 0 ? (isRTL ? 'مجاني' : 'Free') : `QAR ${shipping}`}</span>
                </div>
                <div className="flex justify-between font-bold text-lg text-[#111111] mt-3">
                  <span>{t('cart.total')}</span>
                  <span>QAR {total}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
