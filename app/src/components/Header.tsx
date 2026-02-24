import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Search, User, Heart, ShoppingCart, Menu, Globe } from 'lucide-react';
import { useStore } from '../store';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';

export function Header() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { language, setLanguage, getCartCount, isAuthenticated, setUser } = useStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const isRTL = language === 'ar';
  const cartCount = getCartCount();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setIsSearchOpen(false);
    }
  };

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ar' : 'en');
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <header className="sticky top-0 z-[200] w-full bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <span className="text-xl font-bold text-[#111111]">
              {isRTL ? 'سوقنا' : 'Souqna'}
            </span>
          </Link>

          {/* Desktop Search */}
          <div className="hidden md:flex flex-1 max-w-xl mx-8">
            <form onSubmit={handleSearch} className="relative w-full">
              <Search className={`absolute top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 ${isRTL ? 'right-3' : 'left-3'}`} />
              <Input
                type="search"
                placeholder={t('nav.search')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full ${isRTL ? 'pr-10' : 'pl-10'} rounded-full bg-gray-50 border-0 focus:ring-2 focus:ring-[#2F5DFF]`}
              />
            </form>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            {/* Mobile Search Toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
            >
              <Search className="w-5 h-5" />
            </Button>

            {/* Language Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleLanguage}
              className="hidden sm:flex items-center gap-1"
            >
              <Globe className="w-4 h-4" />
              <span>{language === 'en' ? 'عربي' : 'EN'}</span>
            </Button>

            {/* Account */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                  <User className="w-5 h-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align={isRTL ? 'start' : 'end'} className="w-48">
                {isAuthenticated ? (
                  <>
                    <DropdownMenuItem onClick={() => navigate('/account')}>
                      {t('nav.myAccount')}
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate('/account?tab=orders')}>
                      {t('nav.orders')}
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleLogout}>
                      {t('nav.logout')}
                    </DropdownMenuItem>
                  </>
                ) : (
                  <DropdownMenuItem onClick={() => navigate('/account')}>
                    {t('nav.login')}
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Wishlist */}
            <Button variant="ghost" size="icon" onClick={() => navigate('/account?tab=wishlist')}>
              <Heart className="w-5 h-5" />
            </Button>

            {/* Cart */}
            <Button variant="ghost" size="icon" className="relative" onClick={() => navigate('/cart')}>
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#2F5DFF] text-white text-xs rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Button>

            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden">
                  <Menu className="w-5 h-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side={isRTL ? 'right' : 'left'} className="w-80">
                <div className="flex flex-col gap-6">
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold">{isRTL ? 'سوقنا' : 'Souqna'}</span>
                  </div>

                  {/* Mobile Search */}
                  <form onSubmit={handleSearch} className="relative">
                    <Search className={`absolute top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 ${isRTL ? 'right-3' : 'left-3'}`} />
                    <Input
                      type="search"
                      placeholder={t('nav.search')}
                      className={`w-full ${isRTL ? 'pr-10' : 'pl-10'}`}
                    />
                  </form>

                  {/* Mobile Nav Links */}
                  <nav className="flex flex-col gap-2">
                    <Link to="/" className="px-4 py-2 hover:bg-gray-100 rounded-lg">
                      {t('hero.shopNow')}
                    </Link>
                    <Link to="/search?category=electronics" className="px-4 py-2 hover:bg-gray-100 rounded-lg">
                      {t('sections.shopElectronics')}
                    </Link>
                    <Link to="/search?category=fashion" className="px-4 py-2 hover:bg-gray-100 rounded-lg">
                      {t('sections.shopFashion')}
                    </Link>
                    <Link to="/search?category=home" className="px-4 py-2 hover:bg-gray-100 rounded-lg">
                      {t('sections.shopHome')}
                    </Link>
                    <Link to="/search?category=beauty" className="px-4 py-2 hover:bg-gray-100 rounded-lg">
                      {t('sections.shopBeauty')}
                    </Link>
                  </nav>

                  {/* Mobile Language Toggle */}
                  <Button onClick={toggleLanguage} variant="outline" className="w-full">
                    <Globe className="w-4 h-4 mr-2" />
                    {language === 'en' ? 'Switch to Arabic' : 'التبديل إلى الإنجليزية'}
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        {/* Mobile Search Bar */}
        {isSearchOpen && (
          <div className="md:hidden pb-4">
            <form onSubmit={handleSearch} className="relative">
              <Search className={`absolute top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 ${isRTL ? 'right-3' : 'left-3'}`} />
              <Input
                type="search"
                placeholder={t('nav.search')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full ${isRTL ? 'pr-10' : 'pl-10'}`}
                autoFocus
              />
            </form>
          </div>
        )}
      </div>
    </header>
  );
}
