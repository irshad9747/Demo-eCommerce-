export interface Product {
    id: string;
    name: string;
    nameAr: string;
    price: number;
    originalPrice?: number;
    image: string;
    category: 'electronics' | 'fashion' | 'home' | 'beauty';
    rating: number;
    reviews: number;
    vendor: string;
    inStock: boolean;
    isTrending?: boolean;
    isNew?: boolean;
}

export const products: Product[] = [
    {
        id: '1',
        name: 'Minimal Desk Lamp',
        nameAr: 'مصباح مكتبي بسيط',
        price: 129,
        originalPrice: 159,
        image: '/Demo-eCommerce-/images/product_1.jpg',
        category: 'home',
        rating: 4.8,
        reviews: 124,
        vendor: 'HomeCraft',
        inStock: true,
        isTrending: true
    },
    {
        id: '2',
        name: 'Soft Knit Throw',
        nameAr: 'بطانية محبوكة ناعمة',
        price: 199,
        image: '/Demo-eCommerce-/images/product_2.jpg',
        category: 'home',
        rating: 4.9,
        reviews: 89,
        vendor: 'CozyLiving',
        inStock: true,
        isTrending: true
    },
    {
        id: '3',
        name: 'Everyday Backpack',
        nameAr: 'حقيبة ظهر يومية',
        price: 249,
        originalPrice: 299,
        image: '/Demo-eCommerce-/images/product_3.jpg',
        category: 'fashion',
        rating: 4.7,
        reviews: 156,
        vendor: 'UrbanGear',
        inStock: true,
        isNew: true
    },
    {
        id: '4',
        name: 'Ceramic Mug Set',
        nameAr: 'طقم أكواب سيراميك',
        price: 89,
        image: '/Demo-eCommerce-/images/product_4.jpg',
        category: 'home',
        rating: 4.6,
        reviews: 78,
        vendor: 'ArtisanHome',
        inStock: true
    },
    {
        id: '5',
        name: 'Premium Wireless Headphones',
        nameAr: 'سماعات لاسلكية فاخرة',
        price: 899,
        originalPrice: 1199,
        image: '/Demo-eCommerce-/images/electronics_feature.jpg',
        category: 'electronics',
        rating: 4.9,
        reviews: 342,
        vendor: 'TechPro',
        inStock: true,
        isTrending: true
    },
    {
        id: '6',
        name: 'Cotton Essential Tee',
        nameAr: 'تيشيرت قطني أساسي',
        price: 79,
        image: '/Demo-eCommerce-/images/product_6.jpg',
        category: 'fashion',
        rating: 4.4,
        reviews: 112,
        vendor: 'BasicWear',
        inStock: true
    },
    {
        id: '7',
        name: 'Urban Running Cap',
        nameAr: 'كاب جري عصري',
        price: 59,
        image: '/Demo-eCommerce-/images/product_7.jpg',
        category: 'fashion',
        rating: 4.3,
        reviews: 67,
        vendor: 'SportFit',
        inStock: true
    },
    {
        id: '8',
        name: 'Portable SoundWave Speaker',
        nameAr: 'سماعة ساوند ويف المحمولة',
        price: 179,
        originalPrice: 229,
        image: '/Demo-eCommerce-/images/product_8.jpg',
        category: 'electronics',
        rating: 4.7,
        reviews: 145,
        vendor: 'SoundWave',
        inStock: true,
        isNew: true
    },
    {
        id: '9',
        name: 'Organic Face Oil',
        nameAr: 'زيت وجه عضوي',
        price: 145,
        image: '/Demo-eCommerce-/images/beauty_feature.jpg',
        category: 'beauty',
        rating: 4.8,
        reviews: 92,
        vendor: 'GlowNatural',
        inStock: true,
        isTrending: true
    },
    {
        id: '10',
        name: 'Smart Watch Series 5',
        nameAr: 'ساعة ذكية الإصدار 5',
        price: 499,
        image: '/Demo-eCommerce-/images/deals_tile_c.jpg',
        category: 'electronics',
        rating: 4.6,
        reviews: 215,
        vendor: 'TechPro',
        inStock: true
    }
];
