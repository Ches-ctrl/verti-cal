import { useState } from "react";
import { addDays, startOfDay } from "date-fns";
import { CalendarDay } from "./CalendarDay";
import { Button } from "./ui/button";

export function VerticalCalendar() {
  const [events, setEvents] = useState<Record<string, string[]>>({});
  const [numberOfDays, setNumberOfDays] = useState(10);

  const handleEventAdd = (date: Date, event: string, newEvents?: Record<string, string[]>) => {
    if (newEvents) {
      setEvents(newEvents);
      return;
    }
    
    const dateStr = date.toISOString().split("T")[0];
    setEvents((prev) => ({
      ...prev,
      [dateStr]: [...(prev[dateStr] || []), event],
    }));
  };

  const handleAddWeek = () => {
    setNumberOfDays((prev) => prev + 7);
  };

  const days = Array.from({ length: numberOfDays }, (_, i) =>
    startOfDay(addDays(new Date(), i))
  );

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6 text-center">Notes</h1>
      <div>
        {days.map((date) => (
          <CalendarDay
            key={date.toISOString()}
            date={date}
            events={events}
            onEventAdd={handleEventAdd}
          />
        ))}
      </div>
      <Button
        onClick={handleAddWeek}
        variant="outline"
        className="w-full glass-morphism mt-4 rounded-full"
      >
        Add Week
      </Button>
    </div>
  );
}