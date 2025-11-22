import React, { useState } from 'react';
import { Button } from './Button';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: () => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose, onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Simple simulation delay
    setTimeout(() => {
      // Hardcoded check for demo purposes
      // In a real app, this would hit an API endpoint
      if (password === 'admin123') {
        onLogin();
        setEmail('');
        setPassword('');
        onClose();
      } else {
        setError('Hatalı şifre. Lütfen tekrar deneyiniz. (Demo: admin123)');
      }
      setIsLoading(false);
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className="relative w-full max-w-md bg-white rounded-[2rem] shadow-2xl p-8 md:p-10 animate-fade-in border border-slate-100">
        <div className="flex flex-col items-center text-center mb-8">
          <div className="w-16 h-16 bg-itso-surface rounded-2xl flex items-center justify-center text-itso-primary mb-4 shadow-inner">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
          </div>
          <h3 className="text-2xl font-extrabold text-slate-800">Yönetici Girişi</h3>
          <p className="text-slate-500 mt-2 text-sm">Etkinlik yönetimi paneline erişmek için giriş yapınız.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Kullanıcı Adı / E-posta</label>
            <input 
              type="text" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-5 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-itso-secondary focus:border-transparent outline-none transition-all font-medium text-slate-800"
              placeholder="admin@itso.org.tr"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Şifre</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-5 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-itso-secondary focus:border-transparent outline-none transition-all font-medium text-slate-800"
              placeholder="••••••••"
            />
          </div>

          {error && (
            <div className="p-3 rounded-xl bg-red-50 text-red-600 text-sm font-medium flex items-center">
              <svg className="w-4 h-4 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              {error}
            </div>
          )}

          <Button 
            type="submit" 
            size="lg" 
            className="w-full py-4 shadow-lg shadow-itso-primary/20"
            isLoading={isLoading}
          >
            Giriş Yap
          </Button>

          <div className="text-center">
            <button type="button" onClick={onClose} className="text-sm font-bold text-slate-400 hover:text-slate-600 transition-colors">
              Vazgeç
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};