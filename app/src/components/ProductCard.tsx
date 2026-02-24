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
    <Link to={`/product/${product.id}`} className="group block bg-white rounded-[28px] overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      <div className="relative aspect-[4/5] overflow-hidden">
        <img
          src={product.image}
          alt={displayName}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {product.originalPrice && (
          <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
            {isRTL ? 'خصم' : 'SALE'}
          </div>
        )}
        <button
          onClick={handleToggleWishlist}
          className="absolute top-3 right-3 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:bg-white"
        >
          <Heart className={`w-5 h-5 ${inWishlist ? 'fill-red-500 text-red-500' : ''}`} />
        </button>
        <div className="absolute bottom-0 left-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button 
            onClick={handleAddToCart}
            className="w-full bg-[#2F5DFF] hover:bg-[#2F5DFF]/90 rounded-full"
          >
            <ShoppingCart className="w-4 h-4 mr-2" />
            {t('product.addToCart')}
          </Button>
        </div>
      </div>
      <div className="p-4">
        <p className="text-sm text-gray-500 mb-1">{product.vendor}</p>
        <h3 className="font-medium text-[#111111] line-clamp-2 mb-2">{displayName}</h3>
        <div className="flex items-center gap-1 mb-2">
          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
          <span className="text-sm">{product.rating}</span>
          <span className="text-sm text-gray-400">({product.reviews})</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-bold text-lg text-[#111111]">QAR {product.price}</span>
          {product.originalPrice && (
            <span className="text-sm text-gray-400 line-through">QAR {product.originalPrice}</span>
          )}
        </div>
      </div>
    </Link>
  );
}
