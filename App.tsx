
import React, { useState, useEffect, useRef } from 'react';
import { Event, MOCK_EVENTS, Registration, Company } from './types';
import { CreateEventForm } from './components/CreateEventForm';
import { EventDetail } from './components/EventDetail';
import { CompanyDetail } from './components/CompanyDetail';
import { CalendarView } from './components/CalendarView';
import { Button } from './components/Button';
import { LoginModal } from './components/LoginModal';

// Custom Logo Component to replace external image
const Logo: React.FC<{ variant?: 'color' | 'white'; className?: string }> = ({ variant = 'color', className = "" }) => {
  const color1 = variant === 'white' ? 'currentColor' : '#0060af'; // Primary Dark Blue
  const color2 = variant === 'white' ? 'currentColor' : '#00a0e3'; // Secondary Turquoise
  
  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 md:w-12 md:h-12 flex-shrink-0">
        {/* Dots representing filters/nodes */}
        <circle cx="12" cy="36" r="4" fill={color1} className="animate-pulse-slow" />
        <circle cx="22" cy="24" r="4" fill={color2} className="animate-pulse-slow" style={{ animationDelay: '0.5s' }} />
        <circle cx="12" cy="14" r="4" fill={color1} className="animate-pulse-slow" style={{ animationDelay: '1s' }} />
        
        {/* Arrow representing export/growth */}
        <path d="M26 32L40 10M40 10H28M40 10V22" stroke={color1} strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"/>
        
        {/* Abstract flow line */}
        <path d="M32 40C34 40 38 38 42 30" stroke={color2} strokeWidth="4" strokeLinecap="round" strokeDasharray="4 6" />
      </svg>
      <div className={`flex flex-col justify-center ${variant === 'white' ? 'text-white' : 'text-slate-800'}`}>
         <span className="font-black text-lg md:text-xl leading-none tracking-tight">Filtre<span className={variant === 'white' ? '' : 'text-itso-secondary'}>İhracat</span></span>
         <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] opacity-80 leading-tight mt-0.5 md:mt-1">Takımı</span>
      </div>
    </div>
  );
};

// Helper Component for Reveal on Scroll
const RevealOnScroll: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = "" }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={`reveal-element ${isVisible ? 'active' : ''} ${className}`}>
      {children}
    </div>
  );
};

// Scrollytelling Section Component
const ScrollyTellingSection: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);
  
  const steps = [
    {
      id: 0,
      title: "İhtiyaç Analizi",
      desc: "Projenin ilk adımında firmalarımızı dinliyor, potansiyellerini keşfediyor ve ihracat yol haritalarını verilerle çiziyoruz.",
      color: "bg-blue-600",
      icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
    },
    {
      id: 1,
      title: "Eğitim & Gelişim",
      desc: "Belirlenen ihtiyaçlara yönelik, alanında uzman eğitmenlerle kurumsal kapasiteyi artırıcı yoğun eğitim programları düzenliyoruz.",
      color: "bg-cyan-500",
      icon: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
    },
    {
      id: 2,
      title: "Danışmanlık",
      desc: "Firmalarımıza özel atanan danışmanlarla birebir görüşmeler yaparak, teoriyi pratiğe döküyor ve süreçleri iyileştiriyoruz.",
      color: "bg-indigo-600",
      icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
    },
    {
      id: 3,
      title: "Global Pazarlama",
      desc: "Hazır olan firmalarımızla yurt dışı pazarlama faaliyetleri, B2B görüşmeler ve fuar katılımları gerçekleştirerek ihracatı başlatıyoruz.",
      color: "bg-emerald-500",
      icon: "M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    }
  ];

  useEffect(() => {
    const handleScroll = () => {
      const section = document.getElementById('scrolly-section');
      if (!section) return;
      
      const rect = section.getBoundingClientRect();
      const relativeY = -rect.top + (window.innerHeight / 3); // Trigger point
      
      if (relativeY < 0) {
        setActiveStep(0);
        return;
      }
      
      const current = Math.min(Math.floor(relativeY / 400), steps.length - 1);
      if (current >= 0) setActiveStep(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div id="scrolly-section" className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 flex flex-col md:flex-row gap-12">
      {/* Sticky Visual Side */}
      <div className="hidden md:block w-1/2 relative">
        <div className="sticky top-40 h-[500px] w-full rounded-[2.5rem] overflow-hidden shadow-2xl transition-all duration-700 border-4 border-white">
          <div className={`absolute inset-0 transition-colors duration-700 ${steps[activeStep].color}`}></div>
          <div className="absolute inset-0 bg-black/10 backdrop-blur-sm"></div>
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-12 text-center">
            <div key={activeStep} className="animate-fade-in">
                <div className="w-32 h-32 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center mb-8 mx-auto">
                   <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={steps[activeStep].icon} /></svg>
                </div>
                <h3 className="text-4xl font-extrabold mb-4">{steps[activeStep].title}</h3>
                <div className="flex justify-center gap-2 mt-8">
                  {steps.map((_, idx) => (
                    <div key={idx} className={`h-2 rounded-full transition-all duration-300 ${idx === activeStep ? 'w-12 bg-white' : 'w-2 bg-white/40'}`} />
                  ))}
                </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scrolling Text Side */}
      <div className="w-full md:w-1/2 py-10 md:py-0">
        <div className="mb-20">
          <span className="text-itso-secondary font-bold tracking-widest uppercase text-sm">Nasıl Çalışıyoruz?</span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-slate-800 mt-2 mb-6">Başarıya Giden <br/>4 Adımlı Yolculuk</h2>
        </div>
        {steps.map((step, index) => (
          <div key={step.id} className={`min-h-[400px] flex flex-col justify-center transition-opacity duration-500 ${index === activeStep ? 'opacity-100' : 'opacity-30 grayscale'}`}>
             <div className="md:hidden mb-6 p-4 rounded-2xl bg-itso-primary text-white w-fit">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={step.icon} /></svg>
             </div>
             <span className="text-6xl font-black text-slate-100 mb-4 select-none">0{index + 1}</span>
             <h3 className="text-2xl font-bold text-slate-800 mb-4">{step.title}</h3>
             <p className="text-lg text-slate-600 leading-relaxed">{step.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

// Real Member Companies Data
const MEMBER_COMPANIES: Company[] = [
    { 
        id: '1',
        name: "ASAŞ", 
        type: "Global Üretici", 
        color: "text-red-600",
        description: "1970'li yıllardan bu yana filtre sektöründe öncü olan ASAŞ Filtre, 6 kıtada onlarca ülkeye ihracat yapan Türkiye'nin en büyük filtre üretim tesislerinden biridir. Otomotiv ve endüstriyel alanda geniş ürün yelpazesine sahiptir.",
        website: "asasfilter.com",
        email: "info@asasfilter.com",
        phone: "0326 626 20 20",
        stats: { founded: 1972, employees: 950, exportCountries: 62 },
        products: ["Yağ Filtreleri", "Yakıt Filtreleri", "Hava Filtreleri", "Kabin Filtreleri"]
    },
    { 
        id: '2',
        name: "FILMAR", 
        type: "İhracat Lideri", 
        color: "text-blue-800",
        description: "FIL MAR, yüksek kaliteli filtre üretimi ve müşteri memnuniyeti odaklı yaklaşımıyla sektörün önde gelen markalarından biridir. Geniş stok kapasitesi ve hızlı lojistik ağıyla bilinir.",
        website: "filmar.com.tr",
        email: "info@filmar.com.tr",
        phone: "0326 614 50 50",
        stats: { founded: 1985, employees: 450, exportCountries: 45 },
        products: ["Otomotiv Filtreleri", "Ağır Vasıta Filtreleri", "Endüstriyel Filtreler"]
    },
    { 
        id: '3',
        name: "AKFİL", 
        type: "Ağır Vasıta", 
        color: "text-blue-600",
        description: "AKFİL Filtre, özellikle ağır vasıta ve iş makineleri grubunda uzmanlaşmış, yüksek dayanıklılığa sahip filtreler üreten köklü bir kuruluştur. AR-GE yatırımlarıyla ürün kalitesini sürekli artırmaktadır.",
        website: "akfil.com",
        email: "satis@akfil.com",
        phone: "0326 618 10 10",
        stats: { founded: 1988, employees: 320, exportCountries: 38 },
        products: ["Hava Filtreleri", "Yağ Filtreleri", "Yakıt Filtreleri"]
    },
    { 
        id: '4',
        name: "GFT", 
        type: "Teknoloji", 
        color: "text-orange-600",
        description: "General Filter Technology (GFT), modern üretim teknolojileri ve mühendislik çözümleriyle filtre sektörüne yön veren yenilikçi bir firmadır. Özel tasarım filtre çözümleri sunmaktadır.",
        website: "gftfiltre.com",
        email: "info@gftfiltre.com",
        phone: "0326 615 00 00",
        stats: { founded: 2005, employees: 180, exportCountries: 25 },
        products: ["Ekolojik Filtreler", "Yakıt Sistemleri", "Hava Filtrasyonu"]
    },
    { 
        id: '5',
        name: "AGM Otomotiv", 
        type: "Otomotiv", 
        color: "text-red-500",
        description: "Otomotiv yan sanayisinde, binek ve hafif ticari araç grupları için yüksek standartlarda filtre üretimi gerçekleştiren, dinamik ve gelişen bir firmadır.",
        website: "agmfiltre.com",
        email: "info@agmfiltre.com",
        phone: "0326 600 01 01",
        stats: { founded: 2010, employees: 120, exportCountries: 15 },
        products: ["Otomotiv Filtreleri", "Yan Sanayi Ürünleri"]
    },
    { 
        id: '6',
        name: "EKSPER", 
        type: "Endüstriyel", 
        color: "text-sky-600",
        description: "EKSPER Filtre, geniş ürün gamı ve kaliteli hammadde kullanımıyla hem iç pazarda hem de dış pazarda güvenilen bir markadır. Müşteri taleplerine hızlı çözümler üretir.",
        website: "eksperfiltre.com",
        email: "export@eksperfiltre.com",
        phone: "0326 600 02 02",
        stats: { founded: 1998, employees: 210, exportCountries: 30 },
        products: ["Endüstriyel Filtreler", "Otomotiv Filtreleri"]
    },
    { 
        id: '7',
        name: "ISKA", 
        type: "Otomotiv", 
        color: "text-rose-600",
        description: "ISKA Filtre, sektördeki tecrübesi ve modern üretim parkuru ile otomotiv sektörünün ihtiyaç duyduğu filtreleri uluslararası kalite standartlarında üretmektedir.",
        website: "iskafiltre.com",
        email: "info@iskafiltre.com",
        phone: "0326 600 03 03",
        stats: { founded: 2002, employees: 150, exportCountries: 20 },
        products: ["Hava Filtreleri", "Polen Filtreleri", "Yağ Filtreleri"]
    },
    { 
        id: '8',
        name: "LOTUS", 
        type: "Filtre", 
        color: "text-emerald-600",
        description: "Sürdürülebilir üretim anlayışı ve çevre dostu teknolojileri benimseyen LOTUS Filtre, sektörün yenilikçi ve genç dinamiklerinden biridir.",
        website: "lotusfiltre.com",
        email: "info@lotusfiltre.com",
        phone: "0326 600 04 04",
        stats: { founded: 2015, employees: 85, exportCountries: 12 },
        products: ["Eko Filtreler", "Kabin Filtreleri", "Özel Üretim"]
    },
    { 
        id: '9',
        name: "ONFİLTRE", 
        type: "Yenilikçi", 
        color: "text-indigo-600",
        description: "ONFİLTRE, teknolojik altyapısı ve uzman kadrosuyla filtre üretiminde verimliliği ve kaliteyi ön planda tutan, ihracat odaklı çalışan bir üreticidir.",
        website: "onfiltre.com",
        email: "satis@onfiltre.com",
        phone: "0326 600 05 05",
        stats: { founded: 2012, employees: 100, exportCountries: 18 },
        products: ["Yağ Filtreleri", "Hava Filtreleri", "Endüstriyel Çözümler"]
    }
];

const App: React.FC = () => {
  const [events, setEvents] = useState<Event[]>(MOCK_EVENTS);
  const [view, setView] = useState<'home' | 'create' | 'detail' | 'company-detail'>('home');
  const [eventViewMode, setEventViewMode] = useState<'list' | 'calendar'>('list');
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [scrolled, setScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Admin / Auth State
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  // Handle scroll for sticky header effect
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleEventClick = (event: Event) => {
    setSelectedEvent(event);
    setView('detail');
    window.scrollTo(0,0);
  };
  
  const handleCompanyClick = (company: Company) => {
    setSelectedCompany(company);
    setView('company-detail');
    window.scrollTo(0,0);
  };

  const handleSaveEvent = (newEvent: Event) => {
    setEvents(prev => [newEvent, ...prev]);
    setView('home');
  };

  const handleRegistration = (reg: Registration) => {
    setRegistrations(prev => [...prev, reg]);
    setEvents(prev => prev.map(e => e.id === reg.eventId ? { ...e, registeredCount: e.registeredCount + 1 } : e));
  };

  const handleLoginSuccess = () => {
    setIsAdmin(true);
  };

  // Filter events based on search query
  const filteredEvents = events.filter(event => 
    event.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const now = new Date();
  const upcomingEvents = filteredEvents.filter(e => new Date(e.date) >= now);
  const pastEvents = filteredEvents.filter(e => new Date(e.date) < now);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans selection:bg-itso-secondary selection:text-white relative">
      {/* Login Modal */}
      <LoginModal 
        isOpen={isLoginOpen} 
        onClose={() => setIsLoginOpen(false)} 
        onLogin={handleLoginSuccess} 
      />

      {/* Modern Sticky Header */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 backdrop-blur-lg shadow-sm py-2 border-b border-slate-100' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div className="cursor-pointer transition-transform hover:scale-105" onClick={() => setView('home')}>
             <Logo variant="color" />
          </div>
          <div className="flex items-center gap-2 md:gap-8">
            <nav className="hidden md:flex gap-8">
                <button onClick={() => { setView('home'); setTimeout(() => document.getElementById('about-section')?.scrollIntoView({behavior: 'smooth'}), 100); }} className="text-sm font-bold text-slate-600 hover:text-itso-primary transition-colors">Proje Hakkında</button>
                <button onClick={() => { setView('home'); setTimeout(() => document.getElementById('companies-section')?.scrollIntoView({behavior: 'smooth'}), 100); }} className="text-sm font-bold text-slate-600 hover:text-itso-primary transition-colors">Üyeler</button>
                <button onClick={() => { setView('home'); setTimeout(() => document.getElementById('events-section')?.scrollIntoView({behavior: 'smooth'}), 100); }} className="text-sm font-bold text-slate-600 hover:text-itso-primary transition-colors">Etkinlikler</button>
            </nav>
            
            {isAdmin ? (
                <div className="flex items-center gap-4">
                    <Button 
                        variant="primary" 
                        size="sm"
                        onClick={() => setView('create')}
                        className={`${view === 'create' ? 'hidden' : ''} shadow-lg shadow-itso-secondary/20`}
                    >
                        + Etkinlik Ekle
                    </Button>
                    <button 
                        onClick={() => { setIsAdmin(false); setView('home'); }} 
                        className="text-sm font-bold text-red-500 hover:text-red-600 bg-red-50 hover:bg-red-100 px-4 py-2 rounded-xl transition-colors"
                    >
                        Çıkış Yap
                    </button>
                </div>
            ) : (
                <Button 
                    variant="secondary" 
                    size="sm"
                    onClick={() => setIsLoginOpen(true)}
                    className="font-bold text-xs md:text-sm"
                >
                    Yönetici Girişi
                </Button>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow w-full">
        
        {view === 'home' && (
          <div className="space-y-0 animate-fade-in">
            {/* Immersive Hero Section */}
            <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-slate-50 to-white pt-20">
                {/* Animated Background Blobs */}
                <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-itso-secondary/10 rounded-full blur-[100px] animate-float -z-10"></div>
                <div className="absolute bottom-0 left-0 w-[40vw] h-[40vw] bg-itso-primary/10 rounded-full blur-[80px] animate-float -z-10" style={{ animationDelay: '2s' }}></div>
                
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                    <RevealOnScroll>
                      <h1 className="text-5xl md:text-8xl font-extrabold text-slate-900 mb-8 tracking-tight leading-snug md:leading-normal">
                          Birlikte Üretiyor, <br/>
                          <span className="text-transparent bg-clip-text bg-gradient-to-r from-itso-primary to-itso-secondary">Dünyaya İhraç Ediyoruz.</span>
                      </h1>
                      <p className="text-xl md:text-2xl text-slate-500 mb-12 max-w-3xl mx-auto leading-relaxed font-light">
                          İskenderun Ticaret ve Sanayi Odası "Filtre İhracat Takımı" ile sektörün küresel rekabet gücünü artırıyor.
                      </p>
                      <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                          <Button onClick={() => document.getElementById('events-section')?.scrollIntoView({behavior: 'smooth'})} size="lg" className="w-full md:w-auto px-12 py-5 text-lg shadow-xl shadow-itso-primary/20 hover:scale-105 transition-transform">
                              Etkinlik Takvimi
                          </Button>
                          <button onClick={() => document.getElementById('scrolly-section')?.scrollIntoView({behavior: 'smooth'})} className="w-full md:w-auto px-12 py-5 rounded-2xl font-bold text-slate-600 bg-white border border-slate-200 hover:border-itso-secondary hover:text-itso-primary transition-all flex items-center justify-center group">
                              Proje Süreci
                              <svg className="w-5 h-5 ml-2 group-hover:translate-y-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>
                          </button>
                      </div>
                    </RevealOnScroll>
                </div>
            </div>

            {/* Scrollytelling Section */}
            <div className="bg-white">
               <ScrollyTellingSection />
            </div>

            {/* About Project Section */}
            <div id="about-section" className="py-24 bg-slate-50">
              <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                 <RevealOnScroll>
                    <span className="text-itso-secondary font-bold tracking-widest uppercase text-sm mb-4 block">Proje Hakkında</span>
                    <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-8">Sektörün Geleceğini Birlikte Şekillendiriyoruz</h2>
                    <div className="prose prose-lg prose-slate mx-auto text-slate-600">
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                        </p>
                        <p>
                            Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.
                        </p>
                    </div>
                 </RevealOnScroll>
              </div>
            </div>

            {/* Stats Parallax Banner */}
            <RevealOnScroll>
            <div className="py-24 bg-itso-dark relative overflow-hidden text-white">
               <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/cubes.png")' }}></div>
               <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
                     {[
                        { label: 'Filtre Üreticisi', value: '50+' },
                        { label: 'İhracat Hedefi', value: '$500M' },
                        { label: 'Düzenlenen Eğitim', value: '120' },
                        { label: 'Memnuniyet', value: '%98' },
                     ].map((stat, i) => (
                        <div key={i} className="space-y-2 group">
                           <div className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-slate-500 group-hover:to-itso-secondary transition-all">{stat.value}</div>
                           <div className="text-sm font-bold text-slate-400 uppercase tracking-widest">{stat.label}</div>
                        </div>
                     ))}
                  </div>
               </div>
            </div>
            </RevealOnScroll>

             {/* Member Companies Section */}
            <div id="companies-section" className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <RevealOnScroll>
                        <div className="text-center mb-16">
                            <span className="text-itso-secondary font-bold tracking-widest uppercase text-sm">Paydaşlarımız</span>
                            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mt-2">Projemize Değer Katan <br/> Firmalarımız</h2>
                        </div>
                    </RevealOnScroll>
                    <RevealOnScroll>
                        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
                            {MEMBER_COMPANIES.map((company) => (
                                <div 
                                    key={company.id} 
                                    onClick={() => handleCompanyClick(company)}
                                    className="group relative bg-white border border-slate-100 rounded-2xl p-8 flex flex-col items-center justify-center gap-4 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-40 cursor-pointer overflow-hidden"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-br from-slate-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                    <div className="relative z-10 flex items-center justify-center w-12 h-12 rounded-xl bg-slate-50 group-hover:bg-white shadow-sm transition-colors">
                                        <span className={`text-2xl font-black ${company.color} opacity-70 group-hover:opacity-100`}>{company.name.charAt(0)}</span>
                                    </div>
                                    <div className="relative z-10 text-center">
                                        <h4 className="font-bold text-slate-700 group-hover:text-slate-900 text-sm md:text-base">{company.name}</h4>
                                        <p className="text-[10px] uppercase tracking-wider font-bold text-slate-400 mt-1">{company.type}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </RevealOnScroll>
                </div>
            </div>

            {/* Events Section */}
            <div id="events-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
                <RevealOnScroll>
                  <div className="flex flex-col lg:flex-row items-center justify-between mb-16 gap-6">
                      <div>
                          <span className="text-itso-secondary font-bold tracking-widest uppercase text-sm">Takvim</span>
                          <h3 className="text-4xl font-extrabold text-slate-900 mt-2">
                            Etkinlik Programı
                          </h3>
                      </div>
                      
                      <div className="flex flex-col md:flex-row gap-4 w-full lg:w-auto">
                          {/* Search Bar */}
                          <div className="relative w-full md:w-64 group">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <svg className="h-5 w-5 text-slate-400 group-focus-within:text-itso-secondary transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                </div>
                                <input
                                    type="text"
                                    className="block w-full pl-10 pr-3 py-2.5 border border-slate-200 rounded-xl leading-5 bg-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-itso-secondary focus:border-transparent sm:text-sm transition-all shadow-sm"
                                    placeholder="Etkinlik ara..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                          </div>

                          {/* View Toggle */}
                          <div className="flex bg-white rounded-xl p-1 border border-slate-200 shadow-sm self-start md:self-auto">
                            <button 
                                onClick={() => setEventViewMode('list')}
                                className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${eventViewMode === 'list' ? 'bg-itso-primary text-white shadow-md' : 'text-slate-500 hover:text-slate-700'}`}
                            >
                                Liste
                            </button>
                            <button 
                                onClick={() => setEventViewMode('calendar')}
                                className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${eventViewMode === 'calendar' ? 'bg-itso-primary text-white shadow-md' : 'text-slate-500 hover:text-slate-700'}`}
                            >
                                Takvim
                            </button>
                          </div>
                      </div>
                  </div>
                </RevealOnScroll>
                
                {eventViewMode === 'calendar' ? (
                    <CalendarView events={filteredEvents} onEventClick={handleEventClick} />
                ) : (
                    <>
                        {/* Upcoming Events Grid */}
                        {upcomingEvents.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mb-24">
                                {upcomingEvents.map((event) => (
                                  <RevealOnScroll key={event.id} className="h-full">
                                    <div 
                                        onClick={() => handleEventClick(event)}
                                        className="group bg-white rounded-[2rem] hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 cursor-pointer overflow-hidden border border-slate-100 flex flex-col h-full relative"
                                    >
                                        <div className="h-72 overflow-hidden relative">
                                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent z-10"></div>
                                            <img 
                                                src={event.image} 
                                                alt={event.title} 
                                                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-1000" 
                                            />
                                            <div className="absolute top-6 left-6 z-20">
                                                <span className={`px-4 py-2 rounded-xl text-[10px] font-bold text-white shadow-lg backdrop-blur-md border border-white/20 uppercase tracking-wide
                                                    ${event.type === 'Eğitim' ? 'bg-blue-600' : 
                                                      event.type === 'Danışmanlık' ? 'bg-indigo-600' : 'bg-emerald-600'}`}>
                                                    {event.type}
                                                </span>
                                            </div>
                                            <div className="absolute bottom-6 left-6 z-20 text-white">
                                                 <div className="text-3xl font-black">{new Date(event.date).getDate()}</div>
                                                 <div className="text-sm font-medium opacity-90">{new Date(event.date).toLocaleDateString('tr-TR', { month: 'long' })}</div>
                                            </div>
                                        </div>
                                        <div className="p-8 flex flex-col flex-grow">
                                            <h4 className="text-xl font-bold text-slate-800 mb-4 leading-snug group-hover:text-itso-primary transition-colors">{event.title}</h4>
                                            <p className="text-slate-500 text-sm line-clamp-3 mb-8 leading-relaxed">{event.description}</p>
                                            <div className="mt-auto pt-6 border-t border-slate-50 flex items-center justify-between">
                                                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center">
                                                   <svg className="w-4 h-4 mr-2 text-itso-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                                                   {event.location}
                                                </div>
                                                <span className="w-10 h-10 rounded-full bg-slate-50 text-slate-400 flex items-center justify-center group-hover:bg-itso-secondary group-hover:text-white transition-colors">
                                                   <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                  </RevealOnScroll>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-12 text-slate-500 bg-slate-50 rounded-3xl border border-dashed border-slate-200 mb-24">
                                <p>{searchQuery ? 'Aradığınız kriterlere uygun etkinlik bulunamadı.' : 'Şu anda planlanmış gelecek etkinlik bulunmamaktadır.'}</p>
                            </div>
                        )}

                        {/* Past Events Section */}
                        <RevealOnScroll>
                            <div className="flex items-end justify-between mb-10 border-t border-slate-200 pt-16">
                                <div>
                                    <h3 className="text-2xl font-bold text-slate-400 mt-2">
                                        Tamamlanan Etkinlikler
                                    </h3>
                                </div>
                            </div>
                        </RevealOnScroll>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 opacity-80 hover:opacity-100 transition-opacity">
                            {pastEvents.map((event) => (
                              <RevealOnScroll key={event.id} className="h-full">
                                <div 
                                    onClick={() => handleEventClick(event)}
                                    className="group bg-slate-50 rounded-[2rem] hover:shadow-lg transition-all duration-500 cursor-pointer overflow-hidden border border-slate-100 flex flex-col h-full relative grayscale hover:grayscale-0"
                                >
                                     <div className="h-48 overflow-hidden relative">
                                        <img 
                                            src={event.image} 
                                            alt={event.title} 
                                            className="w-full h-full object-cover" 
                                        />
                                        <div className="absolute inset-0 bg-slate-900/20 group-hover:bg-transparent transition-colors"></div>
                                        <div className="absolute top-4 left-4">
                                             <span className="bg-slate-800 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase">Tamamlandı</span>
                                        </div>
                                    </div>
                                    <div className="p-6 flex flex-col flex-grow">
                                        <div className="text-sm font-bold text-slate-400 mb-2">{new Date(event.date).toLocaleDateString('tr-TR', { day:'numeric', month: 'long', year: 'numeric' })}</div>
                                        <h4 className="text-lg font-bold text-slate-700 mb-3 leading-snug">{event.title}</h4>
                                        <div className="mt-auto pt-4 flex items-center justify-between text-slate-400 text-sm">
                                            <span>İncele</span>
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                                        </div>
                                    </div>
                                </div>
                              </RevealOnScroll>
                            ))}
                        </div>
                    </>
                )}
            </div>
          </div>
        )}

        {view === 'create' && isAdmin && (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 animate-fade-in pt-32 pb-20">
                <CreateEventForm 
                    onSave={handleSaveEvent} 
                    onCancel={() => setView('home')} 
                />
            </div>
        )}

        {view === 'detail' && selectedEvent && (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
                <EventDetail 
                    event={selectedEvent} 
                    onBack={() => setView('home')} 
                    onRegister={handleRegistration}
                    isAdmin={isAdmin}
                    registrations={registrations}
                />
            </div>
        )}

        {view === 'company-detail' && selectedCompany && (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
                <CompanyDetail 
                    company={selectedCompany} 
                    onBack={() => setView('home')} 
                />
            </div>
        )}

      </main>

      {/* Footer */}
      <footer className="bg-itso-dark text-white pt-24 pb-12 border-t border-slate-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-20">
                <div className="max-w-sm">
                    <div className="mb-8">
                        <Logo variant="white" />
                    </div>
                    <p className="text-slate-400 text-sm leading-relaxed mb-8">
                        T.C. Ticaret Bakanlığı desteği ve İTSO öncülüğünde, filtre sektöründe faaliyet gösteren firmaların ihracat kapasitelerini artırmak için kurulmuş iş birliği platformu.
                    </p>
                    <div className="flex gap-4">
                        {['twitter', 'facebook', 'linkedin', 'instagram'].map(social => (
                             <a key={social} href="#" className="w-10 h-10 rounded-full bg-white/5 hover:bg-itso-secondary hover:text-white flex items-center justify-center transition-all text-slate-400">
                                 <span className="sr-only">{social}</span>
                                 <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="2" /></svg>
                             </a>
                        ))}
                    </div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-12 md:gap-20">
                    <div>
                        <h5 className="text-sm font-bold uppercase tracking-widest text-white mb-6">Menü</h5>
                        <ul className="space-y-4 text-sm text-slate-400 font-medium">
                            <li><a href="#" className="hover:text-itso-secondary transition-colors">Ana Sayfa</a></li>
                            <li><a href="#" className="hover:text-itso-secondary transition-colors">Hakkımızda</a></li>
                            <li><a href="#" className="hover:text-itso-secondary transition-colors">Etkinlikler</a></li>
                            <li><a href="#" className="hover:text-itso-secondary transition-colors">İletişim</a></li>
                        </ul>
                    </div>
                    <div>
                        <h5 className="text-sm font-bold uppercase tracking-widest text-white mb-6">Destek</h5>
                        <ul className="space-y-4 text-sm text-slate-400 font-medium">
                            <li><a href="#" className="hover:text-itso-secondary transition-colors">S.S.S.</a></li>
                            <li><a href="#" className="hover:text-itso-secondary transition-colors">Gizlilik</a></li>
                            <li><a href="#" className="hover:text-itso-secondary transition-colors">Şartlar</a></li>
                        </ul>
                    </div>
                    <div>
                        <h5 className="text-sm font-bold uppercase tracking-widest text-white mb-6">İletişim</h5>
                        <p className="text-slate-400 text-sm mb-4">Atatürk Bulvarı No:1<br/>İskenderun, Hatay</p>
                        <p className="text-white text-lg font-bold hover:text-itso-secondary cursor-pointer transition-colors">0326 614 00 00</p>
                    </div>
                </div>
            </div>
            <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-slate-500 font-medium">
                <p>&copy; {new Date().getFullYear()} İskenderun Ticaret ve Sanayi Odası.</p>
                <div className="flex gap-6 mt-4 md:mt-0">
                    <span>URGE Projesi 2024</span>
                </div>
            </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
