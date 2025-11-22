import React from 'react';
import { Company } from '../types';
import { Button } from './Button';

interface CompanyDetailProps {
  company: Company;
  onBack: () => void;
}

export const CompanyDetail: React.FC<CompanyDetailProps> = ({ company, onBack }) => {
  // Helper to extract color hex from tailwind class or use a default
  const getThemeColor = () => {
    if (company.color.includes('blue')) return 'from-blue-600 to-blue-400';
    if (company.color.includes('cyan')) return 'from-cyan-600 to-cyan-400';
    if (company.color.includes('indigo')) return 'from-indigo-600 to-indigo-400';
    if (company.color.includes('emerald')) return 'from-emerald-600 to-emerald-400';
    if (company.color.includes('orange')) return 'from-orange-600 to-orange-400';
    if (company.color.includes('rose')) return 'from-rose-600 to-rose-400';
    if (company.color.includes('violet')) return 'from-violet-600 to-violet-400';
    if (company.color.includes('amber')) return 'from-amber-600 to-amber-400';
    if (company.color.includes('sky')) return 'from-sky-600 to-sky-400';
    return 'from-slate-700 to-slate-500';
  };

  const bgGradient = getThemeColor();

  return (
    <div className="animate-fade-in pb-12">
      <button 
        onClick={onBack}
        className="mb-8 text-slate-500 hover:text-itso-primary flex items-center font-bold transition-colors group px-4 py-2 bg-white rounded-full shadow-sm border border-slate-100 hover:shadow-md w-fit"
      >
        <svg className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
        Ana Sayfaya Dön
      </button>

      <div className="bg-white rounded-[2.5rem] shadow-xl overflow-hidden border border-slate-100">
        {/* Hero Section */}
        <div className={`h-64 w-full relative bg-gradient-to-r ${bgGradient}`}>
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/cubes.png")' }}></div>
            <div className="absolute -bottom-12 left-8 md:left-12 flex items-end">
                <div className="w-32 h-32 bg-white rounded-3xl shadow-lg flex items-center justify-center p-2">
                    <div className="w-full h-full border-2 border-dashed border-slate-200 rounded-2xl flex items-center justify-center bg-slate-50">
                        <span className={`text-5xl font-black ${company.color}`}>{company.name.charAt(0)}</span>
                    </div>
                </div>
                <div className="mb-14 ml-6 hidden md:block">
                     <span className="bg-white/20 backdrop-blur-md border border-white/30 text-white px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider">{company.type}</span>
                </div>
            </div>
        </div>

        <div className="pt-16 px-8 md:px-12 pb-12">
            <div className="flex flex-col md:flex-row justify-between items-start mb-8">
                <div>
                    <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-2">{company.name}</h1>
                    <div className="flex items-center text-slate-500 font-medium">
                        <svg className="w-5 h-5 mr-2 text-itso-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                        İskenderun, Türkiye
                    </div>
                </div>
                <div className="mt-6 md:mt-0 flex gap-3">
                     <Button variant="outline" onClick={() => window.open(`mailto:${company.email}`)}>
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                        E-posta
                     </Button>
                     <Button onClick={() => window.open(`https://${company.website}`, '_blank')}>
                        Web Sitesi
                        <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                     </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-10">
                    <div>
                        <h3 className="text-xl font-bold text-slate-800 mb-4">Firma Hakkında</h3>
                        <p className="text-slate-600 leading-relaxed text-lg">{company.description}</p>
                    </div>
                    
                    <div>
                        <h3 className="text-xl font-bold text-slate-800 mb-6">Ürün Grupları & Yetkinlikler</h3>
                        <div className="flex flex-wrap gap-3">
                            {company.products.map((prod, idx) => (
                                <span key={idx} className="px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 font-medium text-sm hover:border-itso-secondary hover:text-itso-primary transition-colors cursor-default">
                                    {prod}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Sidebar Stats */}
                <div className="lg:col-span-1">
                    <div className="bg-slate-50 rounded-3xl p-8 border border-slate-100 sticky top-24">
                        <h4 className="font-bold text-slate-900 mb-6 text-lg">Firma İstatistikleri</h4>
                        <div className="space-y-6">
                            <div className="flex items-center justify-between pb-4 border-b border-slate-200/60">
                                <div className="flex items-center text-slate-500">
                                    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center mr-3 shadow-sm">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                                    </div>
                                    <span className="font-medium">Kuruluş Yılı</span>
                                </div>
                                <span className="font-bold text-slate-800 text-lg">{company.stats.founded}</span>
                            </div>
                            <div className="flex items-center justify-between pb-4 border-b border-slate-200/60">
                                <div className="flex items-center text-slate-500">
                                    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center mr-3 shadow-sm">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                                    </div>
                                    <span className="font-medium">Çalışan Sayısı</span>
                                </div>
                                <span className="font-bold text-slate-800 text-lg">{company.stats.employees}+</span>
                            </div>
                             <div className="flex items-center justify-between pb-4 border-b border-slate-200/60">
                                <div className="flex items-center text-slate-500">
                                    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center mr-3 shadow-sm">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                    </div>
                                    <span className="font-medium">İhracat Pazarı</span>
                                </div>
                                <span className="font-bold text-slate-800 text-lg">{company.stats.exportCountries} Ülke</span>
                            </div>
                        </div>
                        <div className="mt-8 bg-itso-surface p-4 rounded-2xl border border-itso-secondary/20">
                             <span className="block text-xs font-bold text-itso-accent uppercase tracking-wider mb-2">Doğrudan İletişim</span>
                             <p className="text-lg font-bold text-itso-primary">{company.phone}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};