import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Heart, Star, ShoppingCart } from 'lucide-react';
import { useStore, type Product } from '../store';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface ProductCardProps {
  product: Product;
  variant?: 'default' | 'compact' | 'horizontal';
}

export function ProductCard({ product, variant = 'default' }: ProductCardProps) {
  const { t } = useTranslation();
  const { language, addToCart, toggleWishlist, isInWishlist } = useStore();
  const isRTL = language === 'ar';
  const inWishlist = isInWishlist(product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
    toast.success(isRTL ? 'تمت الإضافة إلى العربة' : 'Added to cart');
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product.id);
    toast.success(inWishlist
      ? (isRTL ? 'تمت الإزالة من المفضلة' : 'Removed from wishlist')
      : (isRTL ? 'تمت الإضافة إلى المفضلة' : 'Added to wishlist')
    );
  };

  const displayName = isRTL && product.nameAr ? product.nameAr : product.name;

  if (variant === 'horizontal') {
    return (
      <Link to={`/product/${product.id}`} className="flex gap-4 bg-white rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow">
        <div className="w-24 h-24 flex-shrink-0">
          <img
            src={product.image}
            alt={displayName}
            className="w-full h-full object-cover rounded-xl"
          />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-medium text-[#111111] line-clamp-2">{displayName}</h3>
          <p className="text-sm text-gray-500">{product.vendor}</p>
          <div className="flex items-center gap-1 mt-1">
            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
            <span className="text-sm">{product.rating}</span>
            <span className="text-sm text-gray-400">({product.reviews})</span>
          </div>
          <div className="flex items-center justify-between mt-2">
            <div className="flex items-center gap-2">
              <span className="font-bold text-[#111111]">QAR {product.price}</span>
              {product.originalPrice && (
                <span className="text-sm text-gray-400 line-through">QAR {product.originalPrice}</span>
              )}
            </div>
            <Button size="sm" onClick={handleAddToCart} className="bg-[#2F5DFF] hover:bg-[#2F5DFF]/90">
              <ShoppingCart className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </Link>
    );
  }

  if (variant === 'compact') {
    return (
      <Link to={`/product/${product.id}`} className="group block">
        <div className="relative aspect-square rounded-2xl overflow-hidden bg-gray-100 mb-3">
          <img
            src={product.image}
            alt={displayName}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <button
            onClick={handleToggleWishlist}
            className="absolute top-2 right-2 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <Heart className={`w-4 h-4 ${inWishlist ? 'fill-red-500 text-red-500' : ''}`} />
          </button>
        </div>
        <h3 className="font-medium text-[#111111] line-clamp-1">{displayName}</h3>
        <div className="flex items-center gap-1 mt-1">
          <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
          <span className="text-sm">{product.rating}</span>
        </div>
        <p className="font-bold text-[#111111] mt-1">QAR {product.price}</p>
      </Link>
    );
  }

  return (
    <Link to={`/product/${product.id}`} className="group block bg-white rounded-[24px] lg:rounded-[32px] overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-black/5 transition-all duration-500 hover:-translate-y-2">
      <div className="relative aspect-[4/5] overflow-hidden bg-[#F6F7F6]">
        <img
          src={product.image}
          alt={displayName}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        {product.originalPrice && (
          <div className="absolute top-3 left-3 lg:top-4 lg:left-4 bg-red-600 text-white text-[9px] lg:text-[10px] font-bold px-2 lg:px-3 py-1 rounded-full uppercase tracking-wider shadow-lg">
            {isRTL ? 'خصم' : 'Sale'}
          </div>
        )}
        <button
          onClick={handleToggleWishlist}
          className="absolute top-3 right-3 lg:top-4 lg:right-4 w-9 h-9 lg:w-11 lg:h-11 bg-white/95 backdrop-blur-md rounded-full flex items-center justify-center lg:opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white shadow-xl translate-y-0 lg:translate-y-2 group-hover:translate-y-0"
        >
          <Heart className={`w-4 h-4 lg:w-[18px] lg:h-[18px] ${inWishlist ? 'fill-red-500 text-red-500' : 'text-[#111111]'}`} />
        </button>
        <div className="absolute bottom-4 left-4 right-4 lg:bottom-6 lg:left-6 lg:right-6 lg:opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-0 lg:translate-y-4 group-hover:translate-y-0">
          <Button
            onClick={handleAddToCart}
            className="w-full bg-[#111111]/90 lg:bg-[#111111] hover:bg-black text-white rounded-full py-5 lg:py-6 shadow-xl backdrop-blur-sm lg:backdrop-blur-none"
          >
            <ShoppingCart className="w-4 h-4 mr-2" />
            <span className="text-xs lg:text-sm">{t('product.addToCart')}</span>
          </Button>
        </div>
      </div>
      <div className="p-4 lg:p-6">
        <p className="text-[9px] lg:text-[10px] font-bold uppercase tracking-widest text-[#2F5DFF] mb-1 lg:mb-2">{product.vendor}</p>
        <h3 className="text-sm lg:text-base font-semibold text-[#111111] line-clamp-2 mb-2 lg:mb-3 leading-snug group-hover:text-[#2F5DFF] transition-colors">{displayName}</h3>
        <div className="flex items-center gap-1.5 mb-2 lg:mb-4">
          <div className="flex items-center gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className={`w-2.5 h-2.5 lg:w-3 h-3 ${i < Math.floor(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-200'}`} />
            ))}
          </div>
          <span className="text-[10px] lg:text-xs font-medium text-gray-500">({product.reviews})</span>
        </div>
        <div className="flex items-center gap-2 lg:gap-3">
          <span className="font-bold text-base lg:text-xl text-[#111111] tracking-tight">QAR {product.price}</span>
          {product.originalPrice && (
            <span className="text-[10px] lg:text-sm text-gray-400 line-through decoration-red-500/30">QAR {product.originalPrice}</span>
          )}
        </div>
      </div>
    </Link>
  );
}
