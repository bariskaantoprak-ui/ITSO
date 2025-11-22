import React, { useState } from 'react';
import { Event } from '../types';
import { Button } from './Button';

interface CalendarViewProps {
  events: Event[];
  onEventClick: (event: Event) => void;
}

export const CalendarView: React.FC<CalendarViewProps> = ({ events, onEventClick }) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const getDaysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
  const getFirstDayOfMonth = (year: number, month: number) => {
    // 0 = Sunday, 1 = Monday...
    // We want Monday to be the first column.
    const day = new Date(year, month, 1).getDay();
    return day === 0 ? 6 : day - 1;
  };

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);

  const monthNames = [
    "Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran",
    "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"
  ];

  const weekDays = ["Pzt", "Sal", "Çar", "Per", "Cum", "Cmt", "Paz"];

  const prevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const today = new Date();
  const isToday = (d: number) => 
    d === today.getDate() && month === today.getMonth() && year === today.getFullYear();

  const renderDays = () => {
    const days = [];
    
    // Empty cells for previous month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-24 md:h-32 bg-slate-50/50 border border-slate-100 rounded-xl"></div>);
    }

    // Days of current month
    for (let d = 1; d <= daysInMonth; d++) {
      // Find events for this day
      const dayEvents = events.filter(e => {
        const eDate = new Date(e.date);
        return eDate.getDate() === d && eDate.getMonth() === month && eDate.getFullYear() === year;
      });

      days.push(
        <div key={d} className={`relative h-24 md:h-32 bg-white border border-slate-100 rounded-xl p-2 flex flex-col hover:border-itso-secondary/50 transition-colors group ${isToday(d) ? 'ring-2 ring-itso-secondary ring-offset-2' : ''}`}>
          <span className={`text-sm font-bold w-7 h-7 flex items-center justify-center rounded-full mb-1 ${isToday(d) ? 'bg-itso-secondary text-white' : 'text-slate-700'}`}>
            {d}
          </span>
          
          <div className="flex-1 overflow-y-auto custom-scrollbar space-y-1">
            {dayEvents.map(event => (
              <button 
                key={event.id}
                onClick={(e) => { e.stopPropagation(); onEventClick(event); }}
                className={`w-full text-left text-[10px] font-bold truncate px-2 py-1 rounded-md transition-all hover:scale-105
                    ${event.type === 'Eğitim' ? 'bg-blue-50 text-blue-700 hover:bg-blue-100' : 
                      event.type === 'Danışmanlık' ? 'bg-orange-50 text-orange-700 hover:bg-orange-100' : 
                      'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'}`}
              >
                {event.title}
              </button>
            ))}
          </div>
          {dayEvents.length > 0 && (
             <div className="absolute bottom-1 right-2 md:hidden">
                <div className="w-2 h-2 bg-itso-secondary rounded-full"></div>
             </div>
          )}
        </div>
      );
    }

    return days;
  };

  return (
    <div className="bg-white rounded-[2.5rem] shadow-xl border border-slate-100 p-6 md:p-10 animate-fade-in">
      {/* Calendar Header */}
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-2xl font-extrabold text-slate-800">
          {monthNames[month]} {year}
        </h3>
        <div className="flex gap-2">
          <Button variant="secondary" size="sm" onClick={prevMonth} className="!px-3">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
          </Button>
          <Button variant="secondary" size="sm" onClick={nextMonth} className="!px-3">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          </Button>
        </div>
      </div>

      {/* Weekday Headers */}
      <div className="grid grid-cols-7 gap-2 md:gap-4 mb-4 text-center">
        {weekDays.map(day => (
          <div key={day} className="text-xs md:text-sm font-bold text-slate-400 uppercase tracking-wider">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-2 md:gap-4">
        {renderDays()}
      </div>
    </div>
  );
};