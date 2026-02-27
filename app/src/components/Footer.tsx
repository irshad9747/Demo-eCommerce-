import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useStore } from '../store';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

export function Footer() {
  const { t } = useTranslation();
  const { language } = useStore();
  const [email, setEmail] = useState('');
  const isRTL = language === 'ar';

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      toast.success(isRTL ? 'تم الاشتراك بنجاح!' : 'Subscribed successfully!');
      setEmail('');
    }
  };

  const footerLinks = {
    shop: [
      { label: t('sections.newArrivals'), href: '/search?sort=newest' },
      { label: t('sections.shopElectronics'), href: '/search?category=electronics' },
      { label: t('sections.shopFashion'), href: '/search?category=fashion' },
      { label: t('sections.shopHome'), href: '/search?category=home' },
      { label: t('sections.shopBeauty'), href: '/search?category=beauty' },
    ],
    support: [
      { label: isRTL ? 'مركز المساعدة' : 'Help Center', href: '#' },
      { label: t('sections.easyReturns'), href: '#' },
      { label: isRTL ? 'الشحن' : 'Shipping', href: '#' },
      { label: isRTL ? 'اتصل بنا' : 'Contact', href: '#' },
    ],
    sell: [
      { label: t('sections.becomeVendor'), href: '#' },
      { label: isRTL ? 'بوابة البائع' : 'Seller Portal', href: '/admin' },
      { label: isRTL ? 'الرسوم' : 'Fees', href: '#' },
    ],
    legal: [
      { label: isRTL ? 'الخصوصية' : 'Privacy', href: '#' },
      { label: isRTL ? 'الشروط' : 'Terms', href: '#' },
      { label: isRTL ? 'الكوكيز' : 'Cookies', href: '#' },
    ],
  };

  return (
    <footer className="bg-[#111111] text-white">
      <div className="px-4 sm:px-6 lg:px-8 py-12">
        {/* Top Section */}
        <div className="flex flex-col lg:flex-row justify-between gap-8 mb-12">
          {/* Logo & Tagline */}
          <div className="max-w-sm">
            <Link to="/" className="text-2xl font-bold mb-4 block">
              {isRTL ? 'وجيه' : 'wajiht'}
            </Link>
            <p className="text-gray-400">{t('footer.tagline')}</p>
          </div>

          {/* Newsletter */}
          <div className="max-w-md">
            <h3 className="text-lg font-semibold mb-2">{t('footer.newsletter')}</h3>
            <p className="text-gray-400 mb-4">{t('footer.newsletterSub')}</p>
            <form onSubmit={handleSubscribe} className="flex gap-2">
              <Input
                type="email"
                placeholder={t('footer.emailPlaceholder')}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-white/10 border-0 text-white placeholder:text-gray-500"
              />
              <Button type="submit" className="bg-[#2F5DFF] hover:bg-[#2F5DFF]/90 whitespace-nowrap">
                {t('footer.subscribe')}
              </Button>
            </form>
          </div>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div>
            <h4 className="font-semibold mb-4">{t('footer.shop')}</h4>
            <ul className="space-y-2">
              {footerLinks.shop.map((link) => (
                <li key={link.label}>
                  <Link to={link.href} className="text-gray-400 hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">{t('footer.support')}</h4>
            <ul className="space-y-2">
              {footerLinks.support.map((link) => (
                <li key={link.label}>
                  <Link to={link.href} className="text-gray-400 hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">{t('footer.sell')}</h4>
            <ul className="space-y-2">
              {footerLinks.sell.map((link) => (
                <li key={link.label}>
                  <Link to={link.href} className="text-gray-400 hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">{t('footer.legal')}</h4>
            <ul className="space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <Link to={link.href} className="text-gray-400 hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-sm">{t('footer.copyright')}</p>
          <div className="flex items-center gap-4">
            {/* Payment Icons */}
            <div className="flex items-center gap-2">
              <div className="w-10 h-6 bg-white/20 rounded" />
              <div className="w-10 h-6 bg-white/20 rounded" />
              <div className="w-10 h-6 bg-white/20 rounded" />
              <div className="w-10 h-6 bg-white/20 rounded" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
