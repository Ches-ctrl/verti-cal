import { useState } from "react";
import { addDays, startOfDay } from "date-fns";
import { CalendarDay } from "./CalendarDay";

export function VerticalCalendar() {
  const [events, setEvents] = useState<Record<string, string[]>>({});

  const handleEventAdd = (date: Date, event: string) => {
    const dateStr = date.toISOString().split("T")[0];
    setEvents((prev) => ({
      ...prev,
      [dateStr]: [...(prev[dateStr] || []), event],
    }));
  };

  const days = Array.from({ length: 10 }, (_, i) =>
    startOfDay(addDays(new Date(), i))
  );

  return (
    <div className="max-w-md mx-auto p-4 space-y-4">
      <h1 className="text-2xl font-bold mb-6 text-center">Calendar</h1>
      <div className="space-y-4">
        {days.map((date) => (
          <CalendarDay
            key={date.toISOString()}
            date={date}
            events={events}
            onEventAdd={handleEventAdd}
          />
        ))}
      </div>
    </div>
  );
}