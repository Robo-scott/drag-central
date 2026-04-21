import { useState } from 'react';
import type { WPEvent } from '@/types/wordpress';

interface Props {
  events: WPEvent[];
  accentColor: string;
}

export default function EventCalendar({ events, accentColor }: Props) {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
  ];
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  // Get events grouped by date string (YYYY-MM-DD)
  const eventsByDate = new Map<string, WPEvent[]>();
  events.forEach((event) => {
    const startDate = new Date(event.acf.start_at);
    const dateKey = `${startDate.getFullYear()}-${String(startDate.getMonth() + 1).padStart(2, '0')}-${String(startDate.getDate()).padStart(2, '0')}`;
    if (!eventsByDate.has(dateKey)) {
      eventsByDate.set(dateKey, []);
    }
    eventsByDate.get(dateKey)!.push(event);
  });

  // Get days in month
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

  // Previous month
  const prevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
    setSelectedDate(null);
  };

  // Next month
  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
    setSelectedDate(null);
  };

  // Check if date is today
  const isToday = (day: number) => {
    return (
      day === today.getDate() &&
      currentMonth === today.getMonth() &&
      currentYear === today.getFullYear()
    );
  };

  // Check if date has events
  const getDateEvents = (day: number) => {
    const dateKey = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return eventsByDate.get(dateKey) || [];
  };

  // Selected date events
  const selectedDateEvents = selectedDate ? eventsByDate.get(selectedDate) || [] : [];

  return (
    <div>
      {/* Calendar Header */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={prevMonth}
          className="text-track-silver hover:text-white transition-colors p-1"
          aria-label="Previous month"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
        <h3 className="font-rajdhani font-bold text-white text-lg uppercase tracking-[0.04em]">
          {monthNames[currentMonth]} {currentYear}
        </h3>
        <button
          onClick={nextMonth}
          className="text-track-silver hover:text-white transition-colors p-1"
          aria-label="Next month"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>

      {/* Day names */}
      <div className="grid grid-cols-7 gap-1 mb-1">
        {dayNames.map((day) => (
          <div key={day} className="text-center text-track-silver text-[0.6rem] font-inter font-medium uppercase py-1">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-1">
        {/* Empty cells for days before the 1st */}
        {Array.from({ length: firstDayOfMonth }).map((_, i) => (
          <div key={`empty-${i}`} className="aspect-square" />
        ))}

        {/* Days */}
        {Array.from({ length: daysInMonth }).map((_, i) => {
          const day = i + 1;
          const dayEvents = getDateEvents(day);
          const hasEvents = dayEvents.length > 0;
          const isTodayDate = isToday(day);
          const dateKey = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
          const isSelected = selectedDate === dateKey;

          return (
            <button
              key={day}
              onClick={() => hasEvents ? setSelectedDate(isSelected ? null : dateKey) : undefined}
              className={`aspect-square flex flex-col items-center justify-center rounded-md text-xs font-inter transition-all relative ${
                isTodayDate
                  ? 'ring-1 ring-white/50'
                  : ''
              } ${
                hasEvents
                  ? 'text-white cursor-pointer hover:opacity-80'
                  : 'text-track-silver cursor-default'
              } ${
                isSelected && hasEvents
                  ? 'bg-opacity-30'
                  : ''
              }`}
              style={{
                backgroundColor: isSelected && hasEvents ? accentColor : isTodayDate ? `${accentColor}20` : 'transparent',
              }}
            >
              <span className={`font-medium ${isTodayDate ? 'text-white font-bold' : ''}`}>{day}</span>
              {hasEvents && (
                <div className="flex gap-0.5 mt-0.5">
                  {dayEvents.slice(0, 3).map((_, j) => (
                    <span
                      key={j}
                      className="w-1 h-1 rounded-full"
                      style={{ backgroundColor: accentColor }}
                    />
                  ))}
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Selected date events */}
      {selectedDate && selectedDateEvents.length > 0 && (
        <div className="mt-4 bg-asphalt rounded-md p-3 border" style={{ borderColor: `${accentColor}30` }}>
          <h4 className="font-montserrat font-bold text-white text-xs uppercase tracking-wider mb-2">
            Events on {selectedDate}
          </h4>
          {selectedDateEvents.map((event) => (
            <div key={event.id} className="py-2 border-b border-smoke last:border-b-0">
              <p className="text-white text-xs font-montserrat font-bold">{event.title.rendered}</p>
              {event.acf.official_url && (
                <a
                  href={event.acf.official_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-inter mt-1 inline-block hover:underline"
                  style={{ color: accentColor }}
                >
                  View Event Details →
                </a>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
