import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';
import { SlidersHorizontal, Grid3X3, List } from 'lucide-react';
import { useStore } from '../store';
import { ProductCard } from '../components/ProductCard';
import { Button } from '@/components/ui/button';
// Input not used
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';

const sampleProducts: import('../store').Product[] = [
  { id: '1', name: 'Minimal Desk Lamp', nameAr: 'مصباح مكتبي بسيط', price: 129, originalPrice: 159, image: '/images/product_1.jpg', category: 'home', rating: 4.8, reviews: 124, vendor: 'HomeCraft', inStock: true },
  { id: '2', name: 'Soft Knit Throw', nameAr: 'بطانية محبوكة ناعمة', price: 199, image: '/images/product_2.jpg', category: 'home', rating: 4.9, reviews: 89, vendor: 'CozyLiving', inStock: true },
  { id: '3', name: 'Everyday Backpack', nameAr: 'حقيبة ظهر يومية', price: 249, originalPrice: 299, image: '/images/product_3.jpg', category: 'fashion', rating: 4.7, reviews: 156, vendor: 'UrbanGear', inStock: true },
  { id: '4', name: 'Ceramic Mug Set', nameAr: 'طقم أكواب سيراميك', price: 89, image: '/images/product_4.jpg', category: 'home', rating: 4.6, reviews: 78, vendor: 'ArtisanHome', inStock: true },
  { id: '5', name: 'Wireless Mouse', nameAr: 'فأرة لاسلكية', price: 149, image: '/images/product_5.jpg', category: 'electronics', rating: 4.5, reviews: 203, vendor: 'TechPro', inStock: true },
  { id: '6', name: 'Cotton Tee', nameAr: 'تيشيرت قطني', price: 79, image: '/images/product_6.jpg', category: 'fashion', rating: 4.4, reviews: 112, vendor: 'BasicWear', inStock: true },
  { id: '7', name: 'Running Cap', nameAr: 'كاب رياضي', price: 59, image: '/images/product_7.jpg', category: 'fashion', rating: 4.3, reviews: 67, vendor: 'SportFit', inStock: true },
  { id: '8', name: 'Portable Speaker', nameAr: 'سماعة محمولة', price: 179, originalPrice: 229, image: '/images/product_8.jpg', category: 'electronics', rating: 4.7, reviews: 145, vendor: 'SoundWave', inStock: true },
];

const categories = [
  { id: 'all', label: 'All' },
  { id: 'electronics', label: 'Electronics' },
  { id: 'fashion', label: 'Fashion' },
  { id: 'home', label: 'Home' },
  { id: 'beauty', label: 'Beauty' },
];

const brands = ['HomeCraft', 'CozyLiving', 'UrbanGear', 'TechPro', 'BasicWear', 'SoundWave'];

export function SearchPage() {
  const { t: _t } = useTranslation();
  const [searchParams] = useSearchParams();
  const { language } = useStore();
  const isRTL = language === 'ar';

  const query = searchParams.get('q') || '';
  const categoryParam = searchParams.get('category') || 'all';

  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>(categoryParam !== 'all' ? [categoryParam] : []);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState('relevance');

  const [filteredProducts, setFilteredProducts] = useState(sampleProducts);

  useEffect(() => {
    let filtered = sampleProducts;

    // Filter by search query
    if (query) {
      filtered = filtered.filter(p => 
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        (p.nameAr && p.nameAr.includes(query))
      );
    }

    // Filter by category
    if (selectedCategories.length > 0) {
      filtered = filtered.filter(p => selectedCategories.includes(p.category));
    }

    // Filter by brand
    if (selectedBrands.length > 0) {
      filtered = filtered.filter(p => selectedBrands.includes(p.vendor));
    }

    // Filter by price
    filtered = filtered.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);

    // Sort
    switch (sortBy) {
      case 'price-low':
        filtered = [...filtered].sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered = [...filtered].sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered = [...filtered].sort((a, b) => b.rating - a.rating);
        break;
    }

    setFilteredProducts(filtered);
  }, [query, selectedCategories, selectedBrands, priceRange, sortBy]);

  const toggleCategory = (cat: string) => {
    setSelectedCategories(prev => 
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
    );
  };

  const toggleBrand = (brand: string) => {
    setSelectedBrands(prev => 
      prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]
    );
  };

  const FilterContent = () => (
    <div className="space-y-6">
      {/* Price Range */}
      <div>
        <h4 className="font-medium text-[#111111] mb-3">{isRTL ? 'نطاق السعر' : 'Price Range'}</h4>
        <Slider
          value={priceRange}
          onValueChange={setPriceRange}
          max={500}
          step={10}
        />
        <div className="flex justify-between mt-2 text-sm text-gray-500">
          <span>QAR {priceRange[0]}</span>
          <span>QAR {priceRange[1]}</span>
        </div>
      </div>

      {/* Categories */}
      <div>
        <h4 className="font-medium text-[#111111] mb-3">{isRTL ? 'الفئات' : 'Categories'}</h4>
        <div className="space-y-2">
          {categories.filter(c => c.id !== 'all').map((cat) => (
            <label key={cat.id} className="flex items-center gap-2 cursor-pointer">
              <Checkbox
                checked={selectedCategories.includes(cat.id)}
                onCheckedChange={() => toggleCategory(cat.id)}
              />
              <span className="text-sm">{cat.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Brands */}
      <div>
        <h4 className="font-medium text-[#111111] mb-3">{isRTL ? 'الماركات' : 'Brands'}</h4>
        <div className="space-y-2">
          {brands.map((brand) => (
            <label key={brand} className="flex items-center gap-2 cursor-pointer">
              <Checkbox
                checked={selectedBrands.includes(brand)}
                onCheckedChange={() => toggleBrand(brand)}
              />
              <span className="text-sm">{brand}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Rating */}
      <div>
        <h4 className="font-medium text-[#111111] mb-3">{isRTL ? 'التقييم' : 'Rating'}</h4>
        <div className="space-y-2">
          {[4, 3, 2, 1].map((rating) => (
            <label key={rating} className="flex items-center gap-2 cursor-pointer">
              <Checkbox />
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className={`text-sm ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}>★</span>
                ))}
                <span className="text-sm text-gray-500">{isRTL ? 'وأعلى' : '& up'}</span>
              </div>
            </label>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F6F7F6]">
      <div className="px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-[#111111]">
              {query ? `${isRTL ? 'نتائج البحث: ' : 'Search results: '}"${query}"` : (isRTL ? 'جميع المنتجات' : 'All Products')}
            </h1>
            <p className="text-gray-500">{filteredProducts.length} {isRTL ? 'منتج' : 'products'}</p>
          </div>

          <div className="flex items-center gap-4">
            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="border rounded-full px-4 py-2 text-sm"
            >
              <option value="relevance">{isRTL ? 'الأكثر صلة' : 'Most Relevant'}</option>
              <option value="price-low">{isRTL ? 'السعر: من الأقل' : 'Price: Low to High'}</option>
              <option value="price-high">{isRTL ? 'السعر: من الأعلى' : 'Price: High to Low'}</option>
              <option value="rating">{isRTL ? 'الأعلى تقييمًا' : 'Highest Rated'}</option>
            </select>

            {/* View Mode */}
            <div className="flex border rounded-full overflow-hidden">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 ${viewMode === 'grid' ? 'bg-[#2F5DFF] text-white' : 'bg-white'}`}
              >
                <Grid3X3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 ${viewMode === 'list' ? 'bg-[#2F5DFF] text-white' : 'bg-white'}`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>

            {/* Mobile Filter */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="lg:hidden rounded-full">
                  <SlidersHorizontal className="w-4 h-4 mr-2" />
                  {isRTL ? 'تصفية' : 'Filter'}
                </Button>
              </SheetTrigger>
              <SheetContent side={isRTL ? 'right' : 'left'} className="w-80">
                <div className="py-4">
                  <h3 className="text-lg font-bold mb-4">{isRTL ? 'تصفية' : 'Filters'}</h3>
                  <FilterContent />
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Desktop Sidebar */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="bg-white rounded-[22px] p-6 sticky top-24">
              <h3 className="text-lg font-bold text-[#111111] mb-4">{isRTL ? 'تصفية' : 'Filters'}</h3>
              <FilterContent />
            </div>
          </aside>

          {/* Products Grid */}
          <div className="flex-1">
            {filteredProducts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500">{isRTL ? 'لا توجد منتجات مطابقة' : 'No products found'}</p>
              </div>
            ) : (
              <div className={viewMode === 'grid' 
                ? 'grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4' 
                : 'space-y-4'
              }>
                {filteredProducts.map((product) => (
                  <ProductCard 
                    key={product.id} 
                    product={product} 
                    variant={viewMode === 'list' ? 'horizontal' : 'default'}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
