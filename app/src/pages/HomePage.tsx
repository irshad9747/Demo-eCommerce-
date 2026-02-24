import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useStore } from '../store';
import { ProductCard } from '../components/ProductCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowRight, ArrowLeft, Search, ChevronDown, Star, Truck, RotateCcw, Shield, Headphones } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);
ScrollTrigger.config({ limitCallbacks: true });

// Sample products data
const sampleProducts: import('../store').Product[] = [
  { id: '1', name: 'Minimal Desk Lamp', nameAr: 'مصباح مكتبي بسيط', price: 129, image: '/Demo-eCommerce-/images/product_1.jpg', category: 'home', rating: 4.8, reviews: 124, vendor: 'HomeCraft', inStock: true },
  { id: '2', name: 'Soft Knit Throw', nameAr: 'بطانية محبوكة ناعمة', price: 199, image: '/Demo-eCommerce-/images/product_2.jpg', category: 'home', rating: 4.9, reviews: 89, vendor: 'CozyLiving', inStock: true },
  { id: '3', name: 'Everyday Backpack', nameAr: 'حقيبة ظهر يومية', price: 249, image: '/Demo-eCommerce-/images/product_3.jpg', category: 'fashion', rating: 4.7, reviews: 156, vendor: 'UrbanGear', inStock: true },
  { id: '4', name: 'Ceramic Mug Set', nameAr: 'طقم أكواب سيراميك', price: 89, image: '/Demo-eCommerce-/images/product_4.jpg', category: 'home', rating: 4.6, reviews: 78, vendor: 'ArtisanHome', inStock: true },
  { id: '5', name: 'Wireless Mouse', nameAr: 'فأرة لاسلكية', price: 149, image: '/Demo-eCommerce-/images/product_5.jpg', category: 'electronics', rating: 4.5, reviews: 203, vendor: 'TechPro', inStock: true },
  { id: '6', name: 'Cotton Tee', nameAr: 'تيشيرت قطني', price: 79, image: '/Demo-eCommerce-/images/product_6.jpg', category: 'fashion', rating: 4.4, reviews: 112, vendor: 'BasicWear', inStock: true },
  { id: '7', name: 'Running Cap', nameAr: 'كاب رياضي', price: 59, image: '/Demo-eCommerce-/images/product_7.jpg', category: 'fashion', rating: 4.3, reviews: 67, vendor: 'SportFit', inStock: true },
  { id: '8', name: 'Portable Speaker', nameAr: 'سماعة محمولة', price: 179, image: '/Demo-eCommerce-/images/product_8.jpg', category: 'electronics', rating: 4.7, reviews: 145, vendor: 'SoundWave', inStock: true },
];

const trendingProducts = sampleProducts.slice(0, 5);
const newArrivals = sampleProducts.slice(0, 8);
const favorites = sampleProducts.slice(2, 6);

export function HomePage() {
  const { t } = useTranslation();
  const { language } = useStore();
  const isRTL = language === 'ar';

  // Refs for GSAP animations
  const heroRef = useRef<HTMLDivElement>(null);
  const curatedRef = useRef<HTMLDivElement>(null);
  const trendingRef = useRef<HTMLDivElement>(null);
  const electronicsRef = useRef<HTMLDivElement>(null);
  const flashDealsRef = useRef<HTMLDivElement>(null);
  const fashionRef = useRef<HTMLDivElement>(null);
  const homeRef = useRef<HTMLDivElement>(null);
  const brandRef = useRef<HTMLDivElement>(null);
  const beautyRef = useRef<HTMLDivElement>(null);
  const vendorRef = useRef<HTMLDivElement>(null);
  const loyaltyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {
      // Hero entrance animation
      const heroTl = gsap.timeline();
      heroTl.fromTo('.hero-bg',
        { scale: 1.08, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1, ease: 'power2.out' }
      )
        .fromTo('.hero-title span',
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.06, duration: 0.9, ease: 'power2.out' },
          '-=0.5'
        )
        .fromTo('.hero-search, .hero-ctas, .hero-micro',
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.1, duration: 0.6, ease: 'power2.out' },
          '-=0.4'
        );

      // Hero scroll animation
      ScrollTrigger.create({
        trigger: heroRef.current,
        start: 'top top',
        end: '+=130%',
        pin: true,
        scrub: 0.6,
        onUpdate: (self) => {
          const progress = self.progress;
          if (progress > 0.7) {
            const exitProgress = (progress - 0.7) / 0.3;
            gsap.set('.hero-content', {
              x: isRTL ? exitProgress * 18 + 'vw' : -exitProgress * 18 + 'vw',
              opacity: 1 - exitProgress * 0.75,
            });
            gsap.set('.hero-bg', {
              scale: 1 + exitProgress * 0.06,
              opacity: 1 - exitProgress * 0.4,
            });
          } else {
            gsap.set('.hero-content', { x: 0, opacity: 1 });
            gsap.set('.hero-bg', { scale: 1, opacity: 1 });
          }
        },
      });

      // Curated Picks Section
      ScrollTrigger.create({
        trigger: curatedRef.current,
        start: 'top top',
        end: '+=130%',
        pin: true,
        scrub: 0.6,
        onUpdate: (self) => {
          const progress = self.progress;
          if (progress <= 0.3) {
            const enterProgress = progress / 0.3;
            const inv = 1 - enterProgress;
            gsap.set('.curated-card-a', { x: isRTL ? inv * 60 + 'vw' : -inv * 60 + 'vw', opacity: enterProgress });
            gsap.set('.curated-card-b', { x: isRTL ? -inv * 60 + 'vw' : inv * 60 + 'vw', y: -inv * 40 + 'vh', opacity: enterProgress });
            gsap.set('.curated-card-c', { x: isRTL ? -inv * 60 + 'vw' : inv * 60 + 'vw', y: inv * 40 + 'vh', opacity: enterProgress });
          } else if (progress >= 0.7) {
            const exitProgress = (progress - 0.7) / 0.3;
            gsap.set('.curated-card-a', { x: isRTL ? exitProgress * 30 + 'vw' : -exitProgress * 30 + 'vw', opacity: 1 - exitProgress * 0.75 });
            gsap.set('.curated-card-b', { x: isRTL ? -exitProgress * 20 + 'vw' : exitProgress * 20 + 'vw', y: -exitProgress * 18 + 'vh', opacity: 1 - exitProgress * 0.8 });
            gsap.set('.curated-card-c', { x: isRTL ? -exitProgress * 20 + 'vw' : exitProgress * 20 + 'vw', y: exitProgress * 18 + 'vh', opacity: 1 - exitProgress * 0.8 });
          } else {
            gsap.set('.curated-card-a, .curated-card-b, .curated-card-c', { x: 0, y: 0, opacity: 1 });
          }
        },
      });

      // Trending Section
      ScrollTrigger.create({
        trigger: trendingRef.current,
        start: 'top top',
        end: '+=120%',
        pin: true,
        scrub: 0.6,
        onUpdate: (self) => {
          const progress = self.progress;
          if (progress <= 0.3) {
            const enterProgress = progress / 0.3;
            const inv = 1 - enterProgress;
            gsap.set('.trending-title', { x: isRTL ? inv * 40 + 'vw' : -inv * 40 + 'vw', opacity: enterProgress });
            gsap.set('.trending-strip', { x: isRTL ? -inv * 60 + 'vw' : inv * 60 + 'vw', opacity: enterProgress });
          } else if (progress >= 0.7) {
            const exitProgress = (progress - 0.7) / 0.3;
            gsap.set('.trending-title', { x: isRTL ? exitProgress * 18 + 'vw' : -exitProgress * 18 + 'vw', opacity: 1 - exitProgress * 0.75 });
            gsap.set('.trending-strip', { x: isRTL ? -exitProgress * 18 + 'vw' : exitProgress * 18 + 'vw', opacity: 1 - exitProgress * 0.75 });
          } else {
            gsap.set('.trending-title, .trending-strip', { x: 0, opacity: 1 });
          }
        },
      });

      // Electronics Section
      ScrollTrigger.create({
        trigger: electronicsRef.current,
        start: 'top top',
        end: '+=130%',
        pin: true,
        scrub: 0.6,
        onUpdate: (self) => {
          const progress = self.progress;
          if (progress <= 0.3) {
            const enterProgress = progress / 0.3;
            const inv = 1 - enterProgress;
            gsap.set('.electronics-card', { y: inv * 100 + 'vh', opacity: enterProgress });
            gsap.set('.electronics-image', { x: isRTL ? inv * 40 + 'vw' : -inv * 40 + 'vw', scale: 1.08 - enterProgress * 0.08, opacity: enterProgress });
            gsap.set('.electronics-text', { x: isRTL ? -inv * 40 + 'vw' : inv * 40 + 'vw', opacity: enterProgress });
          } else if (progress >= 0.7) {
            const exitProgress = (progress - 0.7) / 0.3;
            gsap.set('.electronics-card', { y: -exitProgress * 22 + 'vh', opacity: 1 - exitProgress * 0.75 });
            gsap.set('.electronics-text', { x: isRTL ? -exitProgress * 10 + 'vw' : exitProgress * 10 + 'vw', opacity: 1 - exitProgress * 0.8 });
          } else {
            gsap.set('.electronics-card', { y: 0, opacity: 1 });
            gsap.set('.electronics-image', { x: 0, scale: 1, opacity: 1 });
            gsap.set('.electronics-text', { x: 0, opacity: 1 });
          }
        },
      });

      // Flash Deals Section
      ScrollTrigger.create({
        trigger: flashDealsRef.current,
        start: 'top top',
        end: '+=140%',
        pin: true,
        scrub: 0.6,
        onUpdate: (self) => {
          const progress = self.progress;
          if (progress <= 0.3) {
            const enterProgress = progress / 0.3;
            const inv = 1 - enterProgress;
            gsap.set('.deals-tile-a', { x: isRTL ? inv * 60 + 'vw' : -inv * 60 + 'vw', opacity: enterProgress });
            gsap.set('.deals-tile-b', { y: -inv * 60 + 'vh', opacity: enterProgress });
            gsap.set('.deals-tile-c', { y: inv * 60 + 'vh', opacity: enterProgress });
            gsap.set('.deals-tile-d', { x: isRTL ? -inv * 60 + 'vw' : inv * 60 + 'vw', opacity: enterProgress });
          } else if (progress >= 0.7) {
            const exitProgress = (progress - 0.7) / 0.3;
            gsap.set('.deals-tiles', { y: -exitProgress * 14 + 'vh', opacity: 1 - exitProgress * 0.75 });
          } else {
            gsap.set('.deals-tile-a, .deals-tile-b, .deals-tile-c, .deals-tile-d', { x: 0, y: 0, opacity: 1 });
            gsap.set('.deals-tiles', { y: 0, opacity: 1 });
          }
        },
      });

      // Fashion Section
      ScrollTrigger.create({
        trigger: fashionRef.current,
        start: 'top top',
        end: '+=130%',
        pin: true,
        scrub: 0.6,
        onUpdate: (self) => {
          const progress = self.progress;
          if (progress <= 0.3) {
            const enterProgress = progress / 0.3;
            const inv = 1 - enterProgress;
            gsap.set('.fashion-card', { x: isRTL ? -inv * 60 + 'vw' : inv * 60 + 'vw', opacity: enterProgress });
            gsap.set('.fashion-image', { x: isRTL ? inv * 30 + 'vw' : -inv * 30 + 'vw', scale: 1.08 - enterProgress * 0.08, opacity: enterProgress });
            gsap.set('.fashion-text', { x: isRTL ? -inv * 30 + 'vw' : inv * 30 + 'vw', opacity: enterProgress });
          } else if (progress >= 0.7) {
            const exitProgress = (progress - 0.7) / 0.3;
            gsap.set('.fashion-card', { x: isRTL ? -exitProgress * 18 + 'vw' : exitProgress * 18 + 'vw', opacity: 1 - exitProgress * 0.75 });
            gsap.set('.fashion-text', { x: isRTL ? exitProgress * 10 + 'vw' : -exitProgress * 10 + 'vw', opacity: 1 - exitProgress * 0.8 });
          } else {
            gsap.set('.fashion-card', { x: 0, opacity: 1 });
            gsap.set('.fashion-image', { x: 0, scale: 1, opacity: 1 });
            gsap.set('.fashion-text', { x: 0, opacity: 1 });
          }
        },
      });

      // Home Section
      ScrollTrigger.create({
        trigger: homeRef.current,
        start: 'top top',
        end: '+=130%',
        pin: true,
        scrub: 0.6,
        onUpdate: (self) => {
          const progress = self.progress;
          if (progress <= 0.3) {
            const enterProgress = progress / 0.3;
            const inv = 1 - enterProgress;
            gsap.set('.home-card', { y: inv * 100 + 'vh', opacity: enterProgress });
            gsap.set('.home-image', { x: isRTL ? -inv * 40 + 'vw' : inv * 40 + 'vw', scale: 1.08 - enterProgress * 0.08, opacity: enterProgress });
            gsap.set('.home-text', { x: isRTL ? inv * 30 + 'vw' : -inv * 30 + 'vw', opacity: enterProgress });
          } else if (progress >= 0.7) {
            const exitProgress = (progress - 0.7) / 0.3;
            gsap.set('.home-card', { y: -exitProgress * 18 + 'vh', opacity: 1 - exitProgress * 0.75 });
            gsap.set('.home-text', { x: isRTL ? exitProgress * 10 + 'vw' : -exitProgress * 10 + 'vw', opacity: 1 - exitProgress * 0.8 });
          } else {
            gsap.set('.home-card', { y: 0, opacity: 1 });
            gsap.set('.home-image', { x: 0, scale: 1, opacity: 1 });
            gsap.set('.home-text', { x: 0, opacity: 1 });
          }
        },
      });

      // Brand Banner Section
      ScrollTrigger.create({
        trigger: brandRef.current,
        start: 'top top',
        end: '+=120%',
        pin: true,
        scrub: 0.6,
        onUpdate: (self) => {
          const progress = self.progress;
          if (progress <= 0.3) {
            const enterProgress = progress / 0.3;
            gsap.set('.brand-bg', { scale: 1.1 - enterProgress * 0.1, opacity: enterProgress });
            gsap.set('.brand-text', { y: 40 - enterProgress * 40, opacity: enterProgress });
          } else if (progress >= 0.7) {
            const exitProgress = (progress - 0.7) / 0.3;
            gsap.set('.brand-text', { y: -exitProgress * 10 + 'vh', opacity: 1 - exitProgress * 0.75 });
            gsap.set('.brand-bg', { opacity: 1 - exitProgress * 0.4 });
          } else {
            gsap.set('.brand-bg', { scale: 1, opacity: 1 });
            gsap.set('.brand-text', { y: 0, opacity: 1 });
          }
        },
      });

      // Beauty Section
      ScrollTrigger.create({
        trigger: beautyRef.current,
        start: 'top top',
        end: '+=130%',
        pin: true,
        scrub: 0.6,
        onUpdate: (self) => {
          const progress = self.progress;
          if (progress <= 0.3) {
            const enterProgress = progress / 0.3;
            const inv = 1 - enterProgress;
            gsap.set('.beauty-card', { x: isRTL ? inv * 60 + 'vw' : -inv * 60 + 'vw', opacity: enterProgress });
            gsap.set('.beauty-image', { x: isRTL ? inv * 30 + 'vw' : -inv * 30 + 'vw', scale: 1.08 - enterProgress * 0.08, opacity: enterProgress });
            gsap.set('.beauty-text', { x: isRTL ? -inv * 30 + 'vw' : inv * 30 + 'vw', opacity: enterProgress });
          } else if (progress >= 0.7) {
            const exitProgress = (progress - 0.7) / 0.3;
            gsap.set('.beauty-card', { x: isRTL ? exitProgress * 18 + 'vw' : -exitProgress * 18 + 'vw', opacity: 1 - exitProgress * 0.75 });
            gsap.set('.beauty-text', { x: isRTL ? -exitProgress * 10 + 'vw' : exitProgress * 10 + 'vw', opacity: 1 - exitProgress * 0.8 });
          } else {
            gsap.set('.beauty-card', { x: 0, opacity: 1 });
            gsap.set('.beauty-image', { x: 0, scale: 1, opacity: 1 });
            gsap.set('.beauty-text', { x: 0, opacity: 1 });
          }
        },
      });

      // Vendor Section
      ScrollTrigger.create({
        trigger: vendorRef.current,
        start: 'top top',
        end: '+=130%',
        pin: true,
        scrub: 0.6,
        onUpdate: (self) => {
          const progress = self.progress;
          if (progress <= 0.3) {
            const enterProgress = progress / 0.3;
            const inv = 1 - enterProgress;
            gsap.set('.vendor-card', { y: inv * 100 + 'vh', opacity: enterProgress });
            gsap.set('.vendor-image', { x: isRTL ? -inv * 40 + 'vw' : inv * 40 + 'vw', scale: 1.08 - enterProgress * 0.08, opacity: enterProgress });
            gsap.set('.vendor-text', { x: isRTL ? inv * 30 + 'vw' : -inv * 30 + 'vw', opacity: enterProgress });
          } else if (progress >= 0.7) {
            const exitProgress = (progress - 0.7) / 0.3;
            gsap.set('.vendor-card', { y: -exitProgress * 18 + 'vh', opacity: 1 - exitProgress * 0.75 });
            gsap.set('.vendor-text', { x: isRTL ? exitProgress * 10 + 'vw' : -exitProgress * 10 + 'vw', opacity: 1 - exitProgress * 0.8 });
          } else {
            gsap.set('.vendor-card', { y: 0, opacity: 1 });
            gsap.set('.vendor-image', { x: 0, scale: 1, opacity: 1 });
            gsap.set('.vendor-text', { x: 0, opacity: 1 });
          }
        },
      });

      // Loyalty Section
      ScrollTrigger.create({
        trigger: loyaltyRef.current,
        start: 'top top',
        end: '+=130%',
        pin: true,
        scrub: 0.6,
        onUpdate: (self) => {
          const progress = self.progress;
          if (progress <= 0.3) {
            const enterProgress = progress / 0.3;
            const inv = 1 - enterProgress;
            gsap.set('.loyalty-card', { x: isRTL ? -inv * 60 + 'vw' : inv * 60 + 'vw', opacity: enterProgress });
            gsap.set('.loyalty-image', { x: isRTL ? inv * 30 + 'vw' : -inv * 30 + 'vw', scale: 1.08 - enterProgress * 0.08, opacity: enterProgress });
            gsap.set('.loyalty-text', { x: isRTL ? -inv * 30 + 'vw' : inv * 30 + 'vw', opacity: enterProgress });
          } else if (progress >= 0.7) {
            const exitProgress = (progress - 0.7) / 0.3;
            gsap.set('.loyalty-card', { x: isRTL ? -exitProgress * 18 + 'vw' : exitProgress * 18 + 'vw', opacity: 1 - exitProgress * 0.75 });
            gsap.set('.loyalty-text', { x: isRTL ? exitProgress * 10 + 'vw' : -exitProgress * 10 + 'vw', opacity: 1 - exitProgress * 0.8 });
          } else {
            gsap.set('.loyalty-card', { x: 0, opacity: 1 });
            gsap.set('.loyalty-image', { x: 0, scale: 1, opacity: 1 });
            gsap.set('.loyalty-text', { x: 0, opacity: 1 });
          }
        },
      });

      // Flowing sections animations
      gsap.utils.toArray<HTMLElement>('.flowing-section').forEach((section) => {
        gsap.fromTo(section.querySelectorAll('.flow-item'),
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.1,
            duration: 0.6,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 80%',
              end: 'top 50%',
              scrub: 1,
            },
          }
        );
      });
    });

    mm.add("(max-width: 1023px)", () => {
      // Mobile simpler animations
      gsap.from('.hero-content', { y: 30, opacity: 0, duration: 1 });

      const sections = [
        curatedRef, trendingRef, electronicsRef, flashDealsRef,
        fashionRef, homeRef, brandRef, beautyRef, vendorRef, loyaltyRef
      ];

      sections.forEach(ref => {
        if (ref.current) {
          gsap.from(ref.current.querySelectorAll('.mobile-animate'), {
            y: 30,
            opacity: 0,
            duration: 0.8,
            stagger: 0.2,
            scrollTrigger: {
              trigger: ref.current,
              start: 'top 80%',
            }
          });
        }
      });
    });

    return () => mm.revert();
  }, [isRTL]);

  return (
    <div className="overflow-hidden">
      {/* Section 1: Hero */}
      <section ref={heroRef} className="relative h-screen w-full overflow-hidden z-10">
        <div className="hero-bg absolute inset-0">
          <img
            src="/Demo-eCommerce-/images/hero_lifestyle.jpg"
            alt="Hero"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-black/20 to-transparent" />
        </div>
        <div className="hero-content relative h-full flex flex-col justify-center px-6 sm:px-12 lg:px-24">
          <div className="max-w-2xl">
            <h1 className="hero-title text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              {t('hero.headline').split(' ').map((word, i) => (
                <span key={i} className="inline-block mr-2">{word}</span>
              ))}
            </h1>
            <p className="hero-subtitle text-lg sm:text-xl text-white/80 mb-8">
              {t('hero.subheadline')}
            </p>
            <form className="hero-search relative max-w-md mb-6">
              <Search className={`absolute top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 ${isRTL ? 'right-4' : 'left-4'}`} />
              <Input
                type="search"
                placeholder={t('nav.search')}
                className={`w-full ${isRTL ? 'pr-12' : 'pl-12'} py-6 rounded-full bg-white border-0 text-gray-900 placeholder:text-gray-500`}
              />
            </form>
            <div className="hero-ctas flex flex-wrap gap-4 mb-4">
              <Button asChild size="lg" className="bg-[#2F5DFF] hover:bg-[#2F5DFF]/90 rounded-full px-8">
                <Link to="/search">{t('hero.shopNow')}</Link>
              </Button>
              <Button asChild size="lg" variant="secondary" className="rounded-full px-8">
                <Link to="/search?deals=true">{t('hero.exploreDeals')}</Link>
              </Button>
            </div>
            <p className="hero-micro text-sm text-white/60">
              {t('hero.freeDelivery')} • {t('hero.returns')}
            </p>
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/60 flex flex-col items-center">
          <span className="text-sm mb-2">{t('hero.scroll')}</span>
          <ChevronDown className="w-5 h-5 animate-bounce" />
        </div>
      </section>

      {/* Section 2: Curated Picks */}
      <section ref={curatedRef} className="relative min-h-[80vh] lg:h-screen w-full bg-white z-20 overflow-hidden flex flex-col justify-center py-12 lg:py-0">
        <div className="lg:hidden px-6 mb-8 text-center mobile-animate">
          <h2 className="text-3xl font-bold text-[#111111]">{t('sections.curatedCollection')}</h2>
          <p className="text-gray-500 mt-2">{t('sections.handpicked')}</p>
        </div>
        <div className="relative w-full h-full lg:px-[4vw] lg:py-[14vh] px-6">
          <div className="curated-card-a lg:absolute lg:left-[4vw] lg:top-[14vh] lg:w-[52vw] lg:h-[72vh] w-full aspect-[4/5] sm:aspect-video lg:aspect-auto rounded-[28px] overflow-hidden shadow-lg mb-6 lg:mb-0 mobile-animate">
            <img src="/Demo-eCommerce-/images/featured_card_a.jpg" alt="Editor's Choice" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className={`absolute bottom-8 ${isRTL ? 'right-8' : 'left-8'} text-white`}>
              <h3 className="text-2xl font-bold mb-2">{t('sections.editorsChoice')}</h3>
              <Link to="/search" className="text-sm font-medium underline">{t('hero.shopNow')}</Link>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:block gap-6">
            <div className="curated-card-b lg:absolute lg:left-[58vw] lg:top-[14vh] lg:w-[38vw] lg:h-[34vh] w-full aspect-square sm:aspect-auto sm:h-[34vh] lg:aspect-auto rounded-[28px] overflow-hidden shadow-lg mobile-animate">
              <img src="/Demo-eCommerce-/images/featured_card_b.jpg" alt="New Arrivals" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className={`absolute bottom-6 ${isRTL ? 'right-6' : 'left-6'} text-white`}>
                <h3 className="text-xl font-bold mb-1">{t('sections.newArrivals')}</h3>
                <Link to="/search" className="text-sm font-medium underline">{t('hero.shopNow')}</Link>
              </div>
            </div>
            <div className="curated-card-c lg:absolute lg:left-[58vw] lg:top-[52vh] lg:w-[38vw] lg:h-[34vh] w-full aspect-square sm:aspect-auto sm:h-[34vh] lg:aspect-auto rounded-[28px] overflow-hidden shadow-lg mobile-animate">
              <img src="/Demo-eCommerce-/images/featured_card_c.jpg" alt="Top Rated" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className={`absolute bottom-6 ${isRTL ? 'right-6' : 'left-6'} text-white`}>
                <h2 className="text-xl font-bold mb-1">{t('sections.topRated')}</h2>
                <Link to="/search" className="text-sm font-medium underline">{t('hero.shopNow')}</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Trending Strip */}
      <section ref={trendingRef} className="relative min-h-[60vh] lg:h-screen w-full bg-white z-30 flex flex-col justify-center py-12 lg:py-0">
        <div className="trending-title px-[4vw] mobile-animate">
          <h2 className="text-4xl lg:text-7xl font-bold text-[#111111] leading-none">
            {t('sections.trendingNow')}
          </h2>
          <p className="text-gray-500 mt-4 text-lg lg:text-xl max-w-xl">
            {t('sections.trendingSub')}
          </p>
        </div>
        <div className="trending-strip relative mt-12 lg:mt-[15vh] px-[4vw]">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mobile-animate">
            {trendingProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Section 4: Electronics Section */}
      <section ref={electronicsRef} className="relative min-h-[70vh] lg:h-screen w-full flex items-center justify-center z-40 bg-[#F6F7F6] py-12 lg:py-0">
        <div className="electronics-card relative w-[92vw] lg:h-[72vh] rounded-[28px] overflow-hidden shadow-lg mobile-animate">
          <div className="flex flex-col lg:flex-row h-full">
            <div className="electronics-image w-full lg:w-[60%] h-[40vh] lg:h-full">
              <img src="/Demo-eCommerce-/images/electronics_feature.jpg" alt="Electronics" className="w-full h-full object-cover" />
            </div>
            <div className="electronics-text w-full lg:w-[40%] h-full bg-[#F6F7F6] flex flex-col justify-center p-8 lg:p-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-[#111111] mb-4">{t('sections.techFits')}</h2>
              <p className="text-gray-600 mb-8 leading-relaxed">
                {isRTL
                  ? 'اكتشف أحدث التقنيات المصممة لنمط حياتك. من الأداء القوي إلى التصميم الأنيق.'
                  : 'Discover cutting-edge technology designed for your lifestyle. From high performance to sleek design.'}
              </p>
              <Button asChild className="bg-[#111111] hover:bg-[#111111]/90 rounded-full w-fit px-8 py-6">
                <Link to="/search?category=electronics">{t('sections.exploreTech')}</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Section 5: Flash Deals / Horizontal Grid */}
      <section ref={flashDealsRef} className="relative min-h-screen w-full py-12 lg:py-24 z-50 bg-white">
        <div className="px-[4vw] mb-12 flex items-center justify-between mobile-animate">
          <div>
            <h2 className="text-3xl font-bold text-[#111111]">{t('sections.flashDeals')}</h2>
            <p className="text-gray-500 mt-2">{t('sections.limitedTime')}</p>
          </div>
          <Button variant="outline" className="rounded-full">{t('sections.viewAll')}</Button>
        </div>
        <div className="deals-tiles px-[4vw] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 lg:grid-rows-2 gap-4 lg:h-[66vh]">
          <div className="deals-tile-a lg:row-span-2 rounded-[28px] overflow-hidden relative aspect-video lg:aspect-auto mobile-animate">
            <img src="/Demo-eCommerce-/images/deals_tile_a.jpg" alt="Laptops" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-6 left-6 text-white">
              <h3 className="text-xl font-bold">{t('sections.laptopsTablets')}</h3>
              <p className="text-sm font-medium opacity-80">{isRTL ? 'خصم حتى 30%' : 'Up to 30% OFF'}</p>
            </div>
          </div>
          <div className="deals-tile-b rounded-[28px] overflow-hidden relative aspect-video lg:aspect-auto mobile-animate">
            <img src="/Demo-eCommerce-/images/deals_tile_b.jpg" alt="Audio" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-4 left-4 text-white">
              <h3 className="text-lg font-bold">{t('sections.audio')}</h3>
              <p className="text-sm font-medium opacity-80">{isRTL ? 'خصم حتى 50%' : 'Up to 50% OFF'}</p>
            </div>
          </div>
          <div className="deals-tile-c rounded-[28px] overflow-hidden relative aspect-video lg:aspect-auto mobile-animate">
            <img src="/Demo-eCommerce-/images/deals_tile_c.jpg" alt="Smartwatches" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-4 left-4 text-white">
              <h3 className="text-lg font-bold">{t('sections.smartwatches')}</h3>
              <p className="text-sm font-medium opacity-80">{isRTL ? 'خصم حتى 20%' : 'Up to 20% OFF'}</p>
            </div>
          </div>
          <div className="deals-tile-d lg:row-span-2 rounded-[28px] overflow-hidden relative aspect-video lg:aspect-auto mobile-animate">
            <img src="/Demo-eCommerce-/images/deals_tile_d.jpg" alt="Gaming" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-6 left-6 text-white">
              <h3 className="text-xl font-bold">{t('sections.gaming')}</h3>
              <p className="text-sm font-medium opacity-80">{isRTL ? 'خصم حتى 40%' : 'Up to 40% OFF'}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 6: Fashion Feature */}
      <section ref={fashionRef} className="relative min-h-[70vh] lg:h-screen w-full flex items-center justify-center z-[60] py-12 lg:py-0">
        <div className="fashion-card relative w-[92vw] lg:h-[72vh] rounded-[28px] overflow-hidden shadow-lg mobile-animate">
          <div className="flex flex-col lg:flex-row h-full">
            <div className="fashion-image w-full lg:w-[55%] h-[40vh] lg:h-full">
              <img src="/Demo-eCommerce-/images/fashion_feature.jpg" alt="Fashion" className="w-full h-full object-cover" />
            </div>
            <div className="fashion-text w-full lg:w-[45%] h-full bg-white flex flex-col justify-center p-8 lg:p-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-[#111111] mb-4">{t('sections.freshFits')}</h2>
              <p className="text-gray-600 mb-8 leading-relaxed italic">
                {isRTL
                  ? '"الموضة ليست شيئًا موجودًا في الفساتين فقط. الموضة في السماء، في الشارع، الموضة تتعلق بالأفكار، بالطريقة التي نعيش بها، بما يحدث."'
                  : '"Fashion is not something that exists in dresses only. Fashion is in the sky, in the street, fashion has to do with ideas, the way we live, what is happening."'}
              </p>
              <Button asChild className="bg-[#111111] hover:bg-[#111111]/90 rounded-full w-fit px-8 py-6">
                <Link to="/search?category=fashion">{t('sections.shopFashion')}</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Section 7: Home Feature */}
      <section ref={homeRef} className="relative min-h-[70vh] lg:h-screen w-full flex items-center justify-center bg-[#F6F7F6] z-[70] py-12 lg:py-0">
        <div className="home-card relative w-[92vw] lg:h-[72vh] rounded-[28px] overflow-hidden shadow-lg mobile-animate">
          <div className="flex flex-col-reverse lg:flex-row h-full">
            <div className="home-text w-full lg:w-[40%] h-full bg-[#111111] flex flex-col justify-center p-8 lg:p-12 py-12 lg:py-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">{t('sections.homeAesthetics')}</h2>
              <p className="text-white/70 mb-8 leading-relaxed">
                {isRTL
                  ? 'حول مساحتك إلى ملاذ. اعثر على القطع المثالية التي تجعل منزلك يشعر وكأنه منزلك حقًا.'
                  : 'Transform your space into a sanctuary. Find the perfect pieces that make your house feel like home.'}
              </p>
              <Button asChild variant="secondary" className="rounded-full w-fit px-8 py-6">
                <Link to="/search?category=home">{t('sections.discoverHome')}</Link>
              </Button>
            </div>
            <div className="home-image w-full lg:w-[60%] h-[40vh] lg:h-full">
              <img src="/Demo-eCommerce-/images/home_feature.jpg" alt="Home" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* Section 8: Brand Banner */}
      <section ref={brandRef} className="relative min-h-[60vh] lg:h-screen w-full z-[80] overflow-hidden">
        <div className="brand-bg absolute inset-0">
          <img src="/Demo-eCommerce-/images/brand_banner.jpg" alt="Brand" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/10 to-black/45" />
        </div>
        <div className="brand-text relative h-full flex flex-col items-center justify-center text-center text-white px-6 py-20">
          <h2 className="text-3xl lg:text-5xl font-bold mb-4 max-w-3xl mobile-animate">{t('sections.quality')}</h2>
          <p className="text-lg lg:text-xl text-white/80 mb-8 mobile-animate">{t('sections.brandSub')}</p>
          <Button size="lg" className="bg-white text-[#111111] hover:bg-white/90 rounded-full px-8 mobile-animate">
            {t('sections.startShopping')}
          </Button>
        </div>
      </section>

      {/* Section 9: New Arrivals (Flowing) */}
      <section className="flowing-section py-20 px-[4vw] bg-[#F6F7F6] z-[90]">
        <div className="flex justify-between items-center mb-10 flow-item">
          <h2 className="text-3xl font-bold text-[#111111]">{t('sections.newArrivals')}</h2>
          <Button variant="link" className="text-[#2F5DFF]">{t('sections.viewAll')}</Button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {newArrivals.map((product) => (
            <div key={product.id} className="flow-item">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </section>

      {/* Section 10: Beauty */}
      <section ref={beautyRef} className="relative min-h-[70vh] lg:h-screen w-full flex items-center justify-center z-[100] py-12 lg:py-0">
        <div className="beauty-card relative w-[92vw] lg:h-[72vh] rounded-[28px] overflow-hidden shadow-lg mobile-animate">
          <div className="flex flex-col lg:flex-row h-full">
            <div className="beauty-image w-full lg:w-[55%] h-[40vh] lg:h-full">
              <img src="/Demo-eCommerce-/images/beauty_feature.jpg" alt="Beauty" className="w-full h-full object-cover" />
            </div>
            <div className="beauty-text w-full lg:w-[45%] h-full bg-white flex flex-col justify-center p-8 lg:p-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-[#111111] mb-4">{t('sections.glowStarts')}</h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                {isRTL
                  ? 'ارتقِ بروتينك اليومي مع اختيارات الجمال المتميزة لدينا. من العناية بالبشرة إلى مستحضرات التجميل.'
                  : 'Elevate your daily routine with our premium beauty picks. From skincare to makeup essentials.'}
              </p>
              <Button asChild className="bg-[#111111] hover:bg-[#111111]/90 rounded-full w-fit px-8 py-6">
                <Link to="/search?category=beauty">{t('sections.shopBeauty')}</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Section 11: Customer Favorites (Flowing) */}
      <section className="flowing-section py-20 px-[4vw] bg-[#F6F7F6] z-[110]">
        <div className="flex justify-between items-center mb-10 flow-item">
          <h2 className="text-3xl font-bold text-[#111111]">{t('sections.customerFavorites')}</h2>
          <div className="flex gap-2">
            {['All', 'Electronics', 'Fashion', 'Home'].map((filter) => (
              <Button key={filter} variant="outline" size="sm" className="rounded-full">
                {filter}
              </Button>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {favorites.map((product) => (
            <div key={product.id} className="flow-item">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </section>

      {/* Section 12: Vendor Spotlight */}
      <section ref={vendorRef} className="relative min-h-[70vh] lg:h-screen w-full flex items-center justify-center z-[120] py-12 lg:py-0">
        <div className="vendor-card relative w-[92vw] lg:h-[72vh] rounded-[28px] overflow-hidden shadow-lg mobile-animate">
          <div className="flex flex-col-reverse lg:flex-row h-full">
            <div className="vendor-text w-full lg:w-[40%] h-full bg-[#F6F7F6] flex flex-col justify-center p-8 lg:p-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-[#111111] mb-4">{t('sections.meetMakers')}</h2>
              <p className="text-gray-600 mb-8 leading-relaxed">
                {isRTL
                  ? 'تواصل مع أفضل البائعين المحليين واكتشف منتجات فريدة مصنوعة بشغف.'
                  : 'Connect with top local vendors and discover unique products made with passion.'}
              </p>
              <div className="flex flex-wrap gap-4">
                <Button asChild className="bg-[#111111] hover:bg-[#111111]/90 rounded-full px-8 py-6">
                  <Link to="/search?vendors=true">{t('sections.exploreStores')}</Link>
                </Button>
                <Button variant="outline" className="rounded-full px-8 py-6 border-[#111111] text-[#111111]">
                  {t('sections.becomeVendor')}
                </Button>
              </div>
            </div>
            <div className="vendor-image w-full lg:w-[60%] h-[40vh] lg:h-full">
              <img src="/Demo-eCommerce-/images/vendor_spotlight.jpg" alt="Vendors" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* Section 13: Why Shop With Us (Flowing) */}
      <section className="flowing-section py-20 px-[4vw] bg-[#F6F7F6] z-[130]">
        <h2 className="text-3xl font-bold text-[#111111] text-center mb-12 flow-item">{t('sections.whyShop')}</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: Truck, title: t('sections.fastDelivery'), desc: t('sections.fastDeliverySub') },
            { icon: RotateCcw, title: t('sections.easyReturns'), desc: t('sections.easyReturnsSub') },
            { icon: Shield, title: t('sections.securePayments'), desc: t('sections.securePaymentsSub') },
            { icon: Headphones, title: t('sections.support'), desc: t('sections.supportSub') },
          ].map((item, i) => (
            <div key={i} className="flow-item bg-white rounded-[22px] p-6 shadow-sm">
              <item.icon className="w-8 h-8 text-[#2F5DFF] mb-4" />
              <h3 className="font-semibold text-[#111111] mb-2">{item.title}</h3>
              <p className="text-sm text-gray-500">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Section 14: Loyalty */}
      <section ref={loyaltyRef} className="relative min-h-[70vh] lg:h-screen w-full flex items-center justify-center z-[140] py-12 lg:py-0">
        <div className="loyalty-card relative w-[92vw] lg:h-[72vh] rounded-[28px] overflow-hidden shadow-lg mobile-animate">
          <div className="flex flex-col lg:flex-row h-full">
            <div className="loyalty-image w-full lg:w-[55%] h-[40vh] lg:h-full">
              <img src="/Demo-eCommerce-/images/loyalty_feature.jpg" alt="Loyalty" className="w-full h-full object-cover" />
            </div>
            <div className="loyalty-text w-full lg:w-[45%] h-full bg-white flex flex-col justify-center p-8 lg:p-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-[#111111] mb-4">{t('sections.earnAsYouShop')}</h2>
              <p className="text-gray-600 mb-8 leading-relaxed">
                {isRTL
                  ? 'انضم إلى برنامج الولاء لدينا واكسب نقاطًا مع كل عملية شراء. استبدلها بخصومات حصرية ومكافآت.'
                  : 'Join our loyalty program and earn points with every purchase. Redeem for exclusive discounts and rewards.'}
              </p>
              <div className="flex flex-wrap gap-4">
                <Button className="bg-[#111111] hover:bg-[#111111]/90 rounded-full px-8 py-6">
                  {t('sections.joinFree')}
                </Button>
                <Button variant="outline" className="rounded-full px-8 py-6 border-[#111111] text-[#111111]">
                  {t('sections.learnMore')}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 15: Testimonials (Flowing) */}
      <section className="flowing-section py-20 px-[4vw] bg-[#F6F7F6] z-[150] pb-32">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 flow-item gap-4">
          <h2 className="text-3xl font-bold text-[#111111]">{t('sections.whatShoppersSay')}</h2>
          <Button variant="link" className="text-[#111111] p-0 underline">{t('sections.readAllReviews')}</Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              text: isRTL
                ? 'التوصيل كان أسرع مما توقعت وجودة المنتج ممتازة.'
                : 'Delivery was faster than expected and product quality is outstanding.',
              author: isRTL ? 'سارة ج.' : 'Sarah J.',
              role: isRTL ? 'متسوق معتمد' : 'Verified Shopper'
            },
            {
              text: isRTL
                ? 'خدمة عملاء رائعة وتجربة تسوق سلسة للغاية.'
                : 'Amazing customer service and a very smooth shopping experience.',
              author: isRTL ? 'محمد ع.' : 'Ahmed K.',
              role: isRTL ? 'عميل وفي' : 'Loyal Customer'
            },
            {
              text: isRTL
                ? 'أفضل مكان للعثور على قطع فريدة لمنزلي.'
                : 'The best place to find unique pieces for my home.',
              author: isRTL ? 'ليلى م.' : 'Layla M.',
              role: isRTL ? 'مصممة ديكور' : 'Interior Designer'
            }
          ].map((t, i) => (
            <div key={i} className="flow-item bg-white p-8 rounded-[28px] shadow-sm border border-gray-100 italic relative">
              <span className="text-6xl text-gray-100 absolute top-4 left-4 font-serif">"</span>
              <p className="text-gray-700 mb-6 relative z-10">{t.text}</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gray-200" />
                <div>
                  <p className="font-bold text-[#111111] text-sm">{t.author}</p>
                  <p className="text-xs text-gray-400">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
