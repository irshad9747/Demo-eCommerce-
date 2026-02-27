import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useStore } from '../store';
import { ProductCard } from '../components/ProductCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, ChevronDown, Truck, RotateCcw, Shield, Headphones, ArrowRight } from 'lucide-react';
import { products } from '../data/products';

gsap.registerPlugin(ScrollTrigger);

const trendingProducts = products.filter(p => p.isTrending).slice(0, 4);

export function HomePage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { language } = useStore();
  const [heroSearch, setHeroSearch] = useState('');
  const isRTL = language === 'ar';

  const handleHeroSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (heroSearch.trim()) {
      navigate(`/search?q=${encodeURIComponent(heroSearch)}`);
    }
  };

  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();
    const ctx = gsap.context(() => {
      // 1. Hero Reveal Logic - Explicit Opacity
      const heroTl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      heroTl.fromTo('.hero-overlay', { opacity: 0 }, { opacity: 1, duration: 1.5 })
        .fromTo('.hero-content-reveal', { y: 50, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.1, duration: 1 }, '-=0.8');

      // 2. Section Reveal Global Pattern
      mm.add("(min-width: 768px)", () => {
        gsap.utils.toArray<HTMLElement>('.reveal-section').forEach((section) => {
          gsap.fromTo(section.querySelectorAll('.reveal-item'),
            { y: 40, opacity: 0 },
            {
              scrollTrigger: {
                trigger: section,
                start: 'top 90%', // Fire earlier
                toggleActions: 'play none none reverse',
                invalidateOnRefresh: true,
              },
              y: 0,
              opacity: 1,
              duration: 0.8,
              stagger: 0.1,
              ease: 'power2.out',
              clearProps: "all" // Ensure no stuck styles
            }
          );
        });

        // 3. Simple Parallax
        gsap.utils.toArray<HTMLElement>('.parallax-bg').forEach((bg) => {
          gsap.to(bg, {
            scrollTrigger: {
              trigger: bg.parentElement,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1,
            },
            y: '15%',
            ease: 'none'
          });
        });
      });

      mm.add("(max-width: 767px)", () => {
        gsap.utils.toArray<HTMLElement>('.reveal-section').forEach((section) => {
          gsap.fromTo(section.querySelectorAll('.reveal-item'),
            { y: 20, opacity: 0 },
            {
              scrollTrigger: {
                trigger: section,
                start: 'top 95%',
                toggleActions: 'play none none none',
              },
              y: 0,
              opacity: 1,
              duration: 0.5,
              stagger: 0.08,
              ease: 'power1.out',
              clearProps: "opacity,transform"
            }
          );
        });
      });

      // Force a refresh after a short delay
      setTimeout(() => ScrollTrigger.refresh(), 500);
    }, containerRef);

    return () => {
      ctx.revert();
      ScrollTrigger.refresh();
    }
  }, [isRTL]);

  return (
    <div ref={containerRef} className="bg-white min-h-screen">
      {/* 1. NEW HERO: Cinematic & Focused */}
      <section ref={heroRef} className="relative h-[85vh] lg:h-[95vh] w-full overflow-hidden flex items-center px-6 lg:px-24">
        <div className="hero-overlay absolute inset-0 z-0">
          <img
            src="/Demo-eCommerce-/images/hero_lifestyle.jpg"
            alt="Wajiht Hero"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent lg:from-black/50" />
        </div>

        <div className="relative z-10 max-w-3xl hero-content-reveal">
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white mb-6 leading-[1.1] drop-shadow-2xl">
            {isRTL ? (
              <>أناقة <span className="text-[#2F5DFF]">وجيه</span> لمستقبلك</>
            ) : (
              <>Curated <span className="text-[#2F5DFF]">wajiht</span> Elegance</>
            )}
          </h1>
          <p className="text-base lg:text-xl text-white/80 mb-8 lg:mb-10 max-w-xl">
            {t('hero.subheadline')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button asChild size="lg" className="bg-[#2F5DFF] hover:bg-[#2F5DFF]/90 rounded-full px-8 lg:px-10 py-6 lg:py-7 text-lg shadow-lg shadow-[#2F5DFF]/20">
              <Link to="/search">{t('hero.shopNow')}</Link>
            </Button>
            <form onSubmit={handleHeroSearch} className="relative w-full max-w-xs group">
              <Search className={`absolute top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 ${isRTL ? 'right-4' : 'left-4'}`} />
              <Input
                value={heroSearch}
                onChange={(e) => setHeroSearch(e.target.value)}
                placeholder={t('nav.search')}
                className={`rounded-full bg-white/10 backdrop-blur-xl border border-white/20 text-white placeholder:text-white/50 py-6 lg:py-7 ${isRTL ? 'pr-12' : 'pl-12'} focus-visible:ring-1 focus-visible:ring-[#2F5DFF]/50 transition-all focus:bg-white/20`}
              />
            </form>
          </div>
          <div className="mt-8 lg:mt-12 flex flex-wrap gap-6 items-center text-white/60 text-xs hero-content-reveal">
            <span className="flex items-center gap-2"><Truck className="w-4 h-4" /> {t('hero.freeDelivery')}</span>
            <span className="flex items-center gap-2"><RotateCcw className="w-4 h-4" /> {t('hero.returns')}</span>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce cursor-pointer opacity-50 text-white hidden sm:block">
          <ChevronDown className="w-6 h-6" />
        </div>
      </section>

      {/* 2. REFINED CATEGORIES: Grid of Excellence */}
      <section className="reveal-section py-12 lg:py-20 px-6 lg:px-24">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-10 lg:mb-16 gap-6 reveal-item">
          <div className="max-w-xl">
            <h2 className="text-3xl lg:text-5xl font-bold text-[#111111] mb-4">
              {t('sections.curatedCollection')}
            </h2>
            <p className="text-gray-500 text-base lg:text-lg">
              {isRTL ? 'نحن نختار الأفضل لضمان حصولك على جودة لا تضاهى وتصاميم مميزة.' : 'We hand-select only the finest items to ensure you get pieces that last across generations.'}
            </p>
          </div>
          <Link to="/search" className="group flex items-center gap-2 text-[#2F5DFF] font-semibold text-base lg:text-lg hover:underline transition-all">
            {isRTL ? 'تصفح الكل' : 'View Catalog'} <ArrowRight className={`w-5 h-5 transition-transform group-hover:translate-x-1 ${isRTL ? 'rotate-180' : ''}`} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {[
            { img: 'featured_card_a.jpg', name: t('sections.editorsChoice') },
            { img: 'featured_card_b.jpg', name: t('sections.newArrivals') },
            { img: 'featured_card_c.jpg', name: t('sections.topRated') },
          ].map((cat, i) => (
            <div key={i} className="reveal-item group relative h-[350px] lg:h-[500px] overflow-hidden rounded-[32px] lg:rounded-[40px] shadow-xl hover:shadow-[#2F5DFF]/10 transition-all cursor-pointer">
              <img src={`/Demo-eCommerce-/images/${cat.img}`} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" alt={cat.name} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
              <div className={`absolute bottom-8 lg:bottom-10 ${isRTL ? 'right-8 lg:right-10' : 'left-8 lg:left-10'} text-white`}>
                <h3 className="text-2xl lg:text-3xl font-bold mb-4">{cat.name}</h3>
                <Button variant="outline" className="rounded-full border-white/30 text-white group-hover:bg-white group-hover:text-black transition-colors backdrop-blur-sm px-6">
                  {t('hero.shopNow')}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. TRENDING: High End Grid */}
      <section className="reveal-section py-12 lg:py-20 bg-[#F6F7F6] px-6 lg:px-24">
        <div className="flex justify-between items-center mb-10 reveal-item">
          <h2 className="text-2xl lg:text-4xl font-bold text-[#111111]">{t('sections.trendingNow')}</h2>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8">
          {trendingProducts.map((p) => (
            <div key={p.id} className="reveal-item">
              <ProductCard product={p} />
            </div>
          ))}
        </div>
      </section>

      {/* 4. FEATURE BANNERS: Modern Splendor */}
      <section className="reveal-section py-12 lg:py-20 px-6 lg:px-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10">
          <div className="reveal-item relative h-[400px] lg:h-[600px] rounded-[32px] lg:rounded-[48px] overflow-hidden cursor-pointer">
            <img src="/Demo-eCommerce-/images/electronics_feature.jpg" className="parallax-bg absolute inset-0 w-full h-[120%] object-cover -top-[10%]" alt="Tech" />
            <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px] lg:backdrop-blur-[2px] transition-all hover:backdrop-blur-0" />
            <div className="absolute inset-0 flex flex-col justify-end p-8 lg:p-12 text-white">
              <span className="text-[10px] lg:text-sm font-bold tracking-widest uppercase mb-2 lg:mb-4 opacity-70">Elevated Specs</span>
              <h3 className="text-2xl lg:text-4xl font-bold mb-4 lg:mb-6">{t('sections.techFits')}</h3>
              <Button asChild size="lg" className="bg-white text-black hover:bg-white/90 rounded-full w-fit px-6 lg:px-8">
                <Link to="/search?category=electronics">{t('sections.exploreTech')}</Link>
              </Button>
            </div>
          </div>

          <div className="reveal-item relative h-[400px] lg:h-[600px] rounded-[32px] lg:rounded-[48px] overflow-hidden cursor-pointer">
            <img src="/Demo-eCommerce-/images/fashion_feature.jpg" className="parallax-bg absolute inset-0 w-full h-[120%] object-cover -top-[10%]" alt="Fashion" />
            <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px] lg:backdrop-blur-[2px] transition-all hover:backdrop-blur-0" />
            <div className="absolute inset-0 flex flex-col justify-end p-8 lg:p-12 text-white">
              <span className="text-[10px] lg:text-sm font-bold tracking-widest uppercase mb-2 lg:mb-4 opacity-70">Style Manifest</span>
              <h3 className="text-2xl lg:text-4xl font-bold mb-4 lg:mb-6">{t('sections.freshFits')}</h3>
              <Button asChild size="lg" className="bg-white text-black hover:bg-white/90 rounded-full w-fit px-6 lg:px-8">
                <Link to="/search?category=fashion">{t('sections.shopFashion')}</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* 5. BRAND ETHOS: Typography Excellence */}
      <section className="reveal-section py-20 lg:py-32 bg-[#111111] text-white text-center px-6">
        <div className="max-w-4xl mx-auto reveal-item">
          <h2 className="text-3xl lg:text-7xl font-bold mb-6 lg:mb-10 tracking-tight leading-tight">
            {isRTL ? 'وجيه: تجسيد للشغف والجودة والابتكار' : 'wajiht: A manifest of passion, quality, and legacy'}
          </h2>
          <p className="text-white/60 text-base lg:text-2xl leading-relaxed mb-10 lg:mb-12">
            {t('sections.brandSub')}
          </p>
          <div className="h-[2px] w-12 lg:w-20 bg-[#2F5DFF] mx-auto" />
        </div>
      </section>

      {/* 6. VENDOR SPOTLIGHT: Community Corner */}
      <section className="reveal-section py-12 lg:py-20 px-6 lg:px-24">
        <div className="bg-[#F6F7F6] rounded-[40px] lg:rounded-[60px] p-8 lg:p-20 overflow-hidden reveal-item">
          <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-center">
            <div className="w-full lg:w-1/2">
              <div className="grid grid-cols-2 gap-4">
                <img src="/Demo-eCommerce-/images/vendor_spotlight.jpg" className="rounded-[24px] lg:rounded-[30px] w-full h-48 lg:h-80 object-cover" alt="Artisan" />
                <img src="/Demo-eCommerce-/images/featured_card_a.jpg" className="rounded-[24px] lg:rounded-[30px] w-full h-48 lg:h-80 object-cover mt-8 lg:mt-12" alt="Artisan" />
              </div>
            </div>
            <div className="w-full lg:w-1/2 text-center lg:text-start">
              <h2 className="text-2xl lg:text-4xl font-bold text-[#111111] mb-4 lg:mb-6">{t('sections.meetMakers')}</h2>
              <p className="text-gray-600 text-base lg:text-lg mb-8 lg:mb-10 leading-relaxed">
                {isRTL ? 'نحن فخورون بكوننا منصة تدعم المبدعين المحليين. كل منتج تراه هو قصة نجاح وحرفة فريدة تروى عبر تفاصيلها.'
                  : 'Our platform is more than just a marketplace; it\'s a bridge between passionate makers and those who appreciate authentic craft.'}
              </p>
              <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
                <Button size="lg" className="rounded-full px-8 py-6 bg-black text-white w-full sm:w-auto">{t('sections.exploreStores')}</Button>
                <Button variant="outline" size="lg" className="rounded-full px-8 py-6 border-black text-black w-full sm:w-auto">{t('sections.becomeVendor')}</Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. TRUST: Values Grid */}
      <section className="reveal-section py-12 lg:py-20 px-6 lg:px-24 border-t border-gray-100 mb-10 lg:mb-20">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {[
            { icon: Truck, title: t('sections.fastDelivery'), desc: isRTL ? 'توصيل سريع متاح' : 'Next-day delivery' },
            { icon: Shield, title: t('sections.securePayments'), desc: isRTL ? 'دفع آمن تماماً' : '100% Secure' },
            { icon: RotateCcw, title: t('sections.easyReturns'), desc: isRTL ? 'إرجاع سهل' : 'Easy returns' },
            { icon: Headphones, title: t('sections.support'), desc: isRTL ? 'دعم متواصل' : '24/7 Support' },
          ].map((v, i) => (
            <div key={i} className="reveal-item flex flex-col items-center text-center">
              <div className="w-12 h-12 lg:w-16 lg:h-16 bg-[#2F5DFF]/10 rounded-xl lg:rounded-2xl flex items-center justify-center mb-4 lg:mb-6">
                <v.icon className="w-6 h-6 lg:w-8 h-8 text-[#2F5DFF]" />
              </div>
              <h3 className="text-sm lg:text-xl font-bold text-[#111111] mb-1 lg:mb-2">{v.title}</h3>
              <p className="text-[10px] lg:text-base text-gray-500 line-clamp-1">{v.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
