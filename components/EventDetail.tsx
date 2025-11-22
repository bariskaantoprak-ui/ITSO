
import React, { useState } from 'react';
import { Event, Registration } from '../types';
import { Button } from './Button';

interface EventDetailProps {
  event: Event;
  onBack: () => void;
  onRegister: (registration: Registration) => void;
  isAdmin?: boolean;
  registrations?: Registration[];
}

export const EventDetail: React.FC<EventDetailProps> = ({ event, onBack, onRegister, isAdmin = false, registrations = [] }) => {
  const [activeTab, setActiveTab] = useState<'info' | 'register' | 'files' | 'gallery' | 'participants'>('info');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Registration Form State - Phone removed
  const [regForm, setRegForm] = useState({
    fullName: '',
    companyName: '',
    email: ''
  });
  const [isRegistered, setIsRegistered] = useState(false);

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onRegister({
        eventId: event.id,
        ...regForm
    });
    setIsRegistered(true);
  };

  const nextImage = () => {
    if (event.gallery && event.gallery.length > 0) {
        setCurrentImageIndex((prev) => (prev + 1) % event.gallery.length);
    }
  };

  const prevImage = () => {
    if (event.gallery && event.gallery.length > 0) {
        setCurrentImageIndex((prev) => (prev - 1 + event.gallery.length) % event.gallery.length);
    }
  };

  const eventRegistrations = registrations.filter(r => r.eventId === event.id);

  const downloadCSV = () => {
    if (eventRegistrations.length === 0) {
        alert('İndirilecek katılımcı bulunmamaktadır.');
        return;
    }
    
    // Add BOM for Excel to correctly display UTF-8 characters
    const BOM = "\uFEFF";
    const headers = ['Ad Soyad', 'Firma Adı', 'E-posta', 'Durum'];
    const rows = eventRegistrations.map(reg => [
      `"${reg.fullName}"`,
      `"${reg.companyName}"`,
      `"${reg.email}"`,
      '"Onaylandı"'
    ]);

    const csvContent = BOM + [
      headers.join(','),
      ...rows.map(r => r.join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    // Sanitize filename
    const safeTitle = event.title.substring(0, 30).replace(/[^a-z0-9]/gi, '_');
    link.setAttribute('download', `${safeTitle}_katilimcilar.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const tabs = [
    { id: 'info', label: 'Detaylar', icon: 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
    { id: 'gallery', label: 'Galeri', icon: 'M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z' },
    { id: 'files', label: `Dokümanlar (${event.documents.length})`, icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' },
    { id: 'register', label: 'Kayıt Ol', icon: 'M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z' },
  ];

  if (isAdmin) {
      tabs.push({ id: 'participants', label: `Katılımcılar (${eventRegistrations.length})`, icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z' });
  }

  return (
    <div className="animate-fade-in pb-12">
      <button 
        onClick={onBack}
        className="mb-8 text-slate-500 hover:text-itso-primary flex items-center font-bold transition-colors group px-4 py-2 bg-white rounded-full shadow-sm border border-slate-100 hover:shadow-md w-fit"
      >
        <svg className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
        Etkinlik Listesine Dön
      </button>

      <div className="bg-white rounded-[2.5rem] shadow-xl overflow-hidden border border-slate-100">
        {/* Hero Image with Overlay */}
        <div className="h-96 w-full relative">
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent z-10"></div>
            <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
            <div className="absolute bottom-0 left-0 right-0 z-20 p-8 md:p-12">
                 <span className={`inline-block px-4 py-1.5 mb-4 rounded-full text-xs font-bold text-white backdrop-blur-md border border-white/20 uppercase tracking-wider shadow-lg
                    ${event.type === 'Eğitim' ? 'bg-indigo-500/80' : 
                      event.type === 'Danışmanlık' ? 'bg-orange-500/80' : 'bg-emerald-500/80'}`}>
                    {event.type}
                </span>
                <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-6 leading-tight drop-shadow-lg max-w-4xl">{event.title}</h1>
                <div className="flex flex-wrap items-center text-white text-sm font-medium gap-4 md:gap-8">
                    <div className="flex items-center bg-white/10 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10">
                        <svg className="w-5 h-5 mr-2 text-itso-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                        {new Date(event.date).toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' })}
                    </div>
                    <div className="flex items-center bg-white/10 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10">
                        <svg className="w-5 h-5 mr-2 text-itso-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        {event.time}
                    </div>
                    <div className="flex items-center bg-white/10 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10">
                        <svg className="w-5 h-5 mr-2 text-itso-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                        {event.location}
                    </div>
                </div>
            </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-slate-100 bg-white sticky top-[72px] z-30 px-6 md:px-12">
            <nav className="flex space-x-8 overflow-x-auto no-scrollbar">
                {tabs.map(tab => (
                    <button 
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id as any)}
                        className={`
                            group relative min-w-fit flex items-center py-6 text-sm font-bold transition-all duration-300
                            ${activeTab === tab.id 
                                ? 'text-itso-primary' 
                                : 'text-slate-400 hover:text-slate-600'}
                        `}
                    >
                        <svg className={`w-5 h-5 mr-2 transition-colors ${activeTab === tab.id ? 'text-itso-primary' : 'text-slate-300 group-hover:text-slate-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={tab.icon} /></svg>
                        {tab.label}
                        {activeTab === tab.id && (
                            <span className="absolute bottom-0 left-0 w-full h-1 bg-itso-primary rounded-t-full"></span>
                        )}
                    </button>
                ))}
            </nav>
        </div>

        <div className="p-8 md:p-12 min-h-[400px] bg-slate-50/30">
            {activeTab === 'info' && (
                <div className="animate-fade-in grid grid-cols-1 lg:grid-cols-3 gap-12">
                    <div className="lg:col-span-2 prose prose-lg prose-slate max-w-none">
                        <h3 className="text-2xl font-bold text-slate-800 mb-6">Etkinlik Hakkında</h3>
                        <p className="text-slate-600 leading-relaxed whitespace-pre-line text-base">{event.detailedContent}</p>
                        
                        <h4 className="text-xl font-bold text-slate-800 mt-10 mb-6">Kazanımlar</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                             {(event.keyTakeaways || [
                                'Sektörel yenilikler ve global trendler',
                                'Uygulamalı vaka analizleri',
                                'Uzman eğitmenlerden mentorluk',
                                'Profesyonel networking fırsatları'
                             ]).map((item, i) => (
                                 <div key={i} className="flex items-center p-4 bg-white rounded-xl border border-slate-100 shadow-sm">
                                     <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-50 flex items-center justify-center text-green-500 mr-3">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                                     </div>
                                     <span className="text-sm font-medium text-slate-700">{item}</span>
                                 </div>
                             ))}
                        </div>
                    </div>
                    <div className="lg:col-span-1">
                        <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-lg shadow-slate-200/50 sticky top-40">
                            <h4 className="font-bold text-slate-800 mb-6 text-lg">Organizasyon Detayları</h4>
                            <div className="space-y-8">
                                <div className="p-4 bg-itso-surface rounded-2xl border border-itso-secondary/20">
                                    <span className="block text-xs font-bold text-itso-accent uppercase tracking-wider mb-2">İletişim</span>
                                    <p className="text-sm text-slate-700 font-medium">URGE Proje Ofisi</p>
                                    <p className="text-lg font-bold text-itso-primary mt-1">{event.organizerContact || '0326 614 00 00'}</p>
                                </div>
                                <Button onClick={() => setActiveTab('register')} className="w-full py-4 shadow-xl shadow-itso-primary/20 text-base">Hemen Kayıt Ol</Button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {activeTab === 'gallery' && (
                <div className="animate-fade-in max-w-4xl mx-auto">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-2xl font-bold text-slate-800">Etkinlik Galerisi</h3>
                        <span className="text-sm font-medium text-slate-500 bg-white px-3 py-1 rounded-lg border border-slate-200">
                            {event.gallery && event.gallery.length > 0 ? `${currentImageIndex + 1} / ${event.gallery.length}` : '0 Fotoğraf'}
                        </span>
                    </div>

                    {(!event.gallery || event.gallery.length === 0) ? (
                        <div className="flex flex-col items-center justify-center py-24 text-slate-400 bg-white rounded-[2rem] border border-dashed border-slate-200">
                             <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-6">
                                <svg className="w-10 h-10 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                             </div>
                             <p className="font-medium text-lg">Bu etkinlik için görsel bulunmamaktadır.</p>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            {/* Main Carousel Display with Smooth Transitions */}
                            <div className="relative aspect-video w-full bg-slate-900 rounded-3xl overflow-hidden shadow-2xl group">
                                {event.gallery.map((img, idx) => (
                                    <div 
                                        key={idx}
                                        className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${idx === currentImageIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
                                    >
                                        <img 
                                            src={img} 
                                            alt={`Gallery ${idx}`} 
                                            className="w-full h-full object-cover"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                                    </div>
                                ))}
                                
                                <button 
                                    onClick={prevImage}
                                    className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-white hover:text-slate-900 transition-all opacity-0 group-hover:opacity-100 transform translate-x-[-20px] group-hover:translate-x-0 z-20"
                                >
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                                </button>
                                <button 
                                    onClick={nextImage}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-white hover:text-slate-900 transition-all opacity-0 group-hover:opacity-100 transform translate-x-[20px] group-hover:translate-x-0 z-20"
                                >
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                                </button>
                            </div>

                            {/* Thumbnails */}
                            <div className="flex gap-4 overflow-x-auto pb-4 px-1 no-scrollbar">
                                {event.gallery.map((img, idx) => (
                                    <button 
                                        key={idx}
                                        onClick={() => setCurrentImageIndex(idx)}
                                        className={`relative flex-shrink-0 w-24 h-16 rounded-xl overflow-hidden transition-all duration-500 ${currentImageIndex === idx ? 'ring-2 ring-itso-primary ring-offset-2 opacity-100 scale-105' : 'opacity-60 hover:opacity-100'}`}
                                    >
                                        <img src={img} alt={`Thumbnail ${idx}`} className="w-full h-full object-cover" />
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            )}

            {activeTab === 'register' && (
                <div className="max-w-2xl mx-auto animate-fade-in">
                    {isRegistered ? (
                        <div className="text-center py-20 bg-green-50/50 rounded-3xl border border-green-100">
                            <div className="mx-auto flex items-center justify-center h-24 w-24 rounded-full bg-green-100 mb-8 shadow-sm animate-bounce">
                                <svg className="h-12 w-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                            </div>
                            <h3 className="text-3xl font-bold text-green-800 mb-4">Kaydınız Başarıyla Alındı!</h3>
                            <p className="text-green-600 mb-8 text-lg max-w-md mx-auto">Kaydınız sisteme işlenmiştir. Etkinlikte görüşmek üzere!</p>
                            <Button variant="outline" onClick={() => setActiveTab('info')} className="bg-white">Detaylara Dön</Button>
                        </div>
                    ) : (
                        <form onSubmit={handleRegisterSubmit} className="space-y-8 bg-white p-10 rounded-3xl border border-slate-100 shadow-sm">
                            <div className="text-center mb-10">
                                <h3 className="text-2xl font-bold text-slate-800">Katılım Formu</h3>
                                <p className="text-slate-500 mt-2">Lütfen bilgilerinizi eksiksiz doldurunuz.</p>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-bold text-slate-700 mb-3">Ad Soyad</label>
                                    <input required type="text" value={regForm.fullName} onChange={e => setRegForm({...regForm, fullName: e.target.value})} className="w-full px-5 py-4 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-itso-secondary focus:border-transparent outline-none transition-all font-medium text-slate-800 placeholder-slate-400" placeholder="İsim Soyisim" />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-bold text-slate-700 mb-3">Firma Adı</label>
                                    <input required type="text" value={regForm.companyName} onChange={e => setRegForm({...regForm, companyName: e.target.value})} className="w-full px-5 py-4 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-itso-secondary focus:border-transparent outline-none transition-all font-medium text-slate-800 placeholder-slate-400" placeholder="Temsil edilen firma" />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-bold text-slate-700 mb-3">E-posta</label>
                                    <input required type="email" value={regForm.email} onChange={e => setRegForm({...regForm, email: e.target.value})} className="w-full px-5 py-4 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-itso-secondary focus:border-transparent outline-none transition-all font-medium text-slate-800 placeholder-slate-400" placeholder="ornek@sirket.com" />
                                </div>
                            </div>
                            <Button type="submit" size="lg" className="w-full mt-8 shadow-xl shadow-itso-primary/20 py-4 text-base">Kayıt Ol</Button>
                        </form>
                    )}
                </div>
            )}

            {activeTab === 'files' && (
                <div className="animate-fade-in max-w-4xl mx-auto">
                    <div className="flex items-center justify-between mb-8">
                        <h3 className="text-2xl font-bold text-slate-800">Etkinlik Materyalleri</h3>
                        <span className="text-sm font-medium text-slate-500 bg-white px-3 py-1 rounded-lg border border-slate-200">{event.documents.length} Dosya</span>
                    </div>
                    
                    {event.documents.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-24 text-slate-400 bg-white rounded-[2rem] border border-dashed border-slate-200">
                            <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-6">
                                <svg className="w-10 h-10 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                            </div>
                            <p className="font-medium text-lg">Bu etkinlik için henüz dosya yüklenmemiştir.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 gap-4">
                            {event.documents.map((doc, idx) => (
                                <div key={idx} className="group flex items-center justify-between p-6 bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-lg hover:border-itso-secondary/30 transition-all duration-300 cursor-pointer">
                                    <div className="flex items-center">
                                        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mr-6 flex-shrink-0 transition-colors ${doc.type === 'pdf' ? 'bg-red-50 text-red-500 group-hover:bg-red-100' : doc.type === 'pptx' ? 'bg-orange-50 text-orange-500 group-hover:bg-orange-100' : 'bg-blue-50 text-blue-500 group-hover:bg-blue-100'}`}>
                                            {doc.type === 'pdf' && <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>}
                                            {doc.type === 'pptx' && <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" /></svg>}
                                            {doc.type === 'docx' && <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>}
                                        </div>
                                        <div>
                                            <h4 className="text-lg font-bold text-slate-800 group-hover:text-itso-primary transition-colors mb-1">{doc.name}</h4>
                                            <div className="flex items-center text-xs font-medium text-slate-500">
                                                <span className="uppercase bg-slate-100 px-2 py-0.5 rounded text-slate-600 mr-2">{doc.type}</span>
                                                <span>{doc.size}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <Button variant="secondary" size="sm" onClick={() => alert('Dosya indiriliyor...')} className="flex-shrink-0 opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all">
                                        İndir
                                    </Button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}

            {/* Admin Participants Panel */}
            {activeTab === 'participants' && isAdmin && (
                <div className="animate-fade-in max-w-5xl mx-auto">
                    <div className="flex items-center justify-between mb-8">
                        <h3 className="text-2xl font-bold text-slate-800">Katılımcı Listesi</h3>
                        <Button variant="secondary" size="sm" onClick={downloadCSV}>Listeyi İndir (CSV)</Button>
                    </div>

                    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="bg-slate-50 border-b border-slate-200">
                                        <th className="p-4 font-bold text-slate-700 text-sm">Ad Soyad</th>
                                        <th className="p-4 font-bold text-slate-700 text-sm">Firma</th>
                                        <th className="p-4 font-bold text-slate-700 text-sm">E-posta</th>
                                        <th className="p-4 font-bold text-slate-700 text-sm text-right">Durum</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {eventRegistrations.length > 0 ? (
                                        eventRegistrations.map((reg, idx) => (
                                            <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                                                <td className="p-4 font-bold text-slate-800">{reg.fullName}</td>
                                                <td className="p-4 text-slate-600">{reg.companyName}</td>
                                                <td className="p-4 text-slate-500 font-mono text-sm">{reg.email}</td>
                                                <td className="p-4 text-right">
                                                    <span className="inline-block px-2 py-1 rounded-lg bg-green-100 text-green-700 text-xs font-bold">Onaylandı</span>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan={4} className="p-8 text-center text-slate-500">Henüz kayıtlı katılımcı bulunmamaktadır.</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}
        </div>
      </div>
    </div>
  );
};
