
import React, { useState } from 'react';
import { generateEventDescription, generateEventImage } from '../services/geminiService';
import { Button } from './Button';
import { Event } from '../types';

interface CreateEventFormProps {
  onSave: (event: Event) => void;
  onCancel: () => void;
}

export const CreateEventForm: React.FC<CreateEventFormProps> = ({ onSave, onCancel }) => {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [location, setLocation] = useState('');
  const [type, setType] = useState<'Eğitim' | 'Danışmanlık' | 'Etkinlik'>('Eğitim');
  const [rawNotes, setRawNotes] = useState('');
  const [detailedContent, setDetailedContent] = useState('');
  const [organizerContact, setOrganizerContact] = useState('');
  const [rawTakeaways, setRawTakeaways] = useState('');
  const [generatedImage, setGeneratedImage] = useState('');
  const [imagePrompt, setImagePrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);

  const handleAIHelp = async () => {
    if (!title || !rawNotes) {
      alert('Lütfen önce başlık ve kısa notlar giriniz.');
      return;
    }
    setIsGenerating(true);
    const description = await generateEventDescription(title, rawNotes);
    setDetailedContent(description);
    setIsGenerating(false);
  };

  const handleImageGen = async () => {
      if (!imagePrompt) return;
      setIsGeneratingImage(true);
      const img = await generateEventImage(imagePrompt);
      if (img) setGeneratedImage(img);
      setIsGeneratingImage(false);
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Convert raw takeaways (newline separated) to array
    const takeawaysList = rawTakeaways.split('\n').filter(item => item.trim() !== '');

    const newEvent: Event = {
      id: Date.now().toString(),
      title,
      date,
      time,
      location,
      type,
      description: detailedContent.substring(0, 100) + '...',
      detailedContent,
      image: generatedImage || `https://picsum.photos/800/400?random=${Date.now()}`,
      documents: [],
      gallery: [],
      capacity: 50,
      registeredCount: 0,
      organizerContact: organizerContact || 'URGE Proje Ofisi',
      keyTakeaways: takeawaysList.length > 0 ? takeawaysList : ['Detaylar etkinlikte paylaşılacaktır.']
    };
    onSave(newEvent);
  };

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-[2rem] shadow-xl p-8 md:p-12 border border-slate-100">
      <div className="mb-10 pb-8 border-b border-slate-100 flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-bold text-slate-800">Yeni Etkinlik Oluştur</h2>
            <p className="text-slate-500 mt-2 font-medium">Etkinlik detaylarını girerek takvime ekleyin.</p>
          </div>
          <div className="hidden md:block w-12 h-12 bg-itso-surface rounded-2xl flex items-center justify-center text-itso-primary">
             <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
          </div>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="md:col-span-2">
            <label className="block text-sm font-bold text-slate-700 mb-3">Etkinlik Başlığı</label>
            <input 
              required
              type="text" 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-5 py-4 border border-slate-200 rounded-xl focus:ring-2 focus:ring-itso-secondary focus:border-transparent outline-none transition-all bg-slate-50 focus:bg-white font-medium"
              placeholder="Örn: İleri Satış Teknikleri ve Pazarlama Stratejileri"
            />
          </div>
          
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-3">Etkinlik Türü</label>
            <div className="relative">
                <select 
                value={type}
                onChange={(e) => setType(e.target.value as any)}
                className="w-full px-5 py-4 border border-slate-200 rounded-xl focus:ring-2 focus:ring-itso-secondary focus:border-transparent outline-none appearance-none bg-slate-50 focus:bg-white transition-all font-medium cursor-pointer"
                >
                <option value="Eğitim">Eğitim</option>
                <option value="Danışmanlık">Danışmanlık</option>
                <option value="Etkinlik">Etkinlik</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-500">
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 mb-3">Tarih</label>
            <input 
              required
              type="date" 
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-5 py-4 border border-slate-200 rounded-xl focus:ring-2 focus:ring-itso-secondary focus:border-transparent outline-none transition-all bg-slate-50 focus:bg-white font-medium"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 mb-3">Saat</label>
            <input 
              required
              type="text" 
              value={time}
              onChange={(e) => setTime(e.target.value)}
              placeholder="09:00 - 17:00"
              className="w-full px-5 py-4 border border-slate-200 rounded-xl focus:ring-2 focus:ring-itso-secondary focus:border-transparent outline-none transition-all bg-slate-50 focus:bg-white font-medium"
            />
          </div>

          <div>
             <label className="block text-sm font-bold text-slate-700 mb-3">Konum</label>
             <input 
              required
              type="text" 
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full px-5 py-4 border border-slate-200 rounded-xl focus:ring-2 focus:ring-itso-secondary focus:border-transparent outline-none transition-all bg-slate-50 focus:bg-white font-medium"
              placeholder="Toplantı Salonu veya Adres"
            />
          </div>
          
          <div>
             <label className="block text-sm font-bold text-slate-700 mb-3">Organizasyon İletişim</label>
             <input 
              type="text" 
              value={organizerContact}
              onChange={(e) => setOrganizerContact(e.target.value)}
              className="w-full px-5 py-4 border border-slate-200 rounded-xl focus:ring-2 focus:ring-itso-secondary focus:border-transparent outline-none transition-all bg-slate-50 focus:bg-white font-medium"
              placeholder="Örn: 0326 614 00 00"
            />
          </div>
        </div>

        {/* AI Image Generator */}
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-3xl p-8 border border-purple-100">
          <div className="flex items-center justify-between mb-6">
             <div className="flex items-center">
                <div className="p-3 bg-white rounded-xl text-2xl mr-4 shadow-sm">🎨</div>
                <div>
                    <label className="block text-base font-bold text-purple-900">AI Görsel Oluşturucu</label>
                    <span className="text-sm text-purple-700/70">Etkinlik için özel kapak görseli tasarlayın.</span>
                </div>
             </div>
          </div>
          <div className="flex gap-4">
            <input 
                type="text"
                value={imagePrompt}
                onChange={(e) => setImagePrompt(e.target.value)}
                placeholder="Örn: Modern bir ofis ortamında çalışan mühendisler, mavi tonlar..."
                className="flex-1 px-5 py-4 border border-purple-200 rounded-xl focus:ring-2 focus:ring-purple-400 outline-none bg-white/80"
            />
            <Button 
                type="button" 
                onClick={handleImageGen} 
                isLoading={isGeneratingImage}
                className="bg-purple-600 hover:bg-purple-700 text-white shadow-lg shadow-purple-200"
            >
                Oluştur
            </Button>
          </div>
          {generatedImage && (
              <div className="mt-6 relative rounded-xl overflow-hidden h-48 w-full border border-purple-100">
                  <img src={generatedImage} alt="Generated" className="w-full h-full object-cover" />
                  <div className="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">Hazır</div>
              </div>
          )}
        </div>

        {/* Text Generator */}
        <div className="bg-gradient-to-r from-indigo-50 to-cyan-50 rounded-3xl p-8 border border-indigo-100">
          <div className="flex items-center justify-between mb-6">
             <div className="flex items-center">
                <div className="p-3 bg-white rounded-xl text-2xl mr-4 shadow-sm">✨</div>
                <div>
                    <label className="block text-base font-bold text-indigo-900">AI İçerik Asistanı</label>
                    <span className="text-sm text-indigo-700/70">Kısa notlarınızı girin, Gemini profesyonel bir etkinlik metni oluştursun.</span>
                </div>
             </div>
          </div>
          
          <textarea 
            value={rawNotes}
            onChange={(e) => setRawNotes(e.target.value)}
            rows={3}
            className="w-full px-5 py-4 border border-indigo-200/50 rounded-xl focus:ring-2 focus:ring-itso-secondary focus:border-transparent mb-6 outline-none bg-white/80 backdrop-blur-sm placeholder-indigo-300"
            placeholder="Örn: Dijital pazarlama, sosyal medya reklamları, bütçe yönetimi konuları işlenecek. Uzman eğitmen gelecek."
          />
          <Button 
            type="button" 
            onClick={handleAIHelp} 
            variant="primary" 
            size="md"
            isLoading={isGenerating}
            className="w-full md:w-auto font-bold shadow-lg shadow-indigo-500/20"
          >
             ✨ Gemini ile Oluştur
          </Button>
        </div>

        <div>
          <label className="block text-sm font-bold text-slate-700 mb-3">Etkinlik Detayı (Nihai Metin)</label>
          <textarea 
            required
            value={detailedContent}
            onChange={(e) => setDetailedContent(e.target.value)}
            rows={6}
            className="w-full px-5 py-4 border border-slate-200 rounded-xl focus:ring-2 focus:ring-itso-secondary focus:border-transparent outline-none bg-slate-50 focus:bg-white font-medium leading-relaxed"
            placeholder="Etkinlik detayları buraya gelecek..."
          />
        </div>

        <div>
          <label className="block text-sm font-bold text-slate-700 mb-3">Kazanımlar (Her satıra bir madde)</label>
          <textarea 
            value={rawTakeaways}
            onChange={(e) => setRawTakeaways(e.target.value)}
            rows={4}
            className="w-full px-5 py-4 border border-slate-200 rounded-xl focus:ring-2 focus:ring-itso-secondary focus:border-transparent outline-none bg-slate-50 focus:bg-white font-medium leading-relaxed"
            placeholder="Sektörel yenilikler&#10;Vaka analizleri&#10;Networking fırsatı"
          />
        </div>

        <div className="flex justify-end space-x-6 pt-8 border-t border-slate-100">
          <Button type="button" variant="ghost" onClick={onCancel}>İptal</Button>
          <Button type="submit" size="lg" className="shadow-xl shadow-itso-primary/30 px-10">Etkinliği Kaydet</Button>
        </div>
      </form>
    </div>
  );
};
