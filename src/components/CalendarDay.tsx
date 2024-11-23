import { format, getWeek, isMonday } from "date-fns";
import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";
import { Input } from "./ui/input";

interface CalendarDayProps {
  date: Date;
  events: Record<string, string[]>;
  onEventAdd: (date: Date, event: string) => void;
}

export function CalendarDay({ date, events, onEventAdd }: CalendarDayProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [newEvent, setNewEvent] = useState("");
  
  const dateStr = format(date, "yyyy-MM-dd");
  const isToday = format(new Date(), "yyyy-MM-dd") === dateStr;
  const dayEvents = events[dateStr] || [];
  const showWeekNumber = isMonday(date);
  const weekNumber = showWeekNumber ? getWeek(date) : null;

  const handleAddEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (newEvent.trim()) {
      onEventAdd(date, newEvent.trim());
      setNewEvent("");
      setIsAdding(false);
    }
  };

  return (
    <div className="py-4">
      <div className="flex justify-between items-start mb-2">
        <div className="flex flex-col items-start">
          {showWeekNumber && (
            <span className="text-xs text-gray-400 mb-1">Week {weekNumber}</span>
          )}
          <span className="text-lg font-semibold">
            {format(date, "EEEE, MMMM d")}
          </span>
        </div>
        <div className="flex items-center gap-2">
          {isToday && (
            <span className="px-2 py-1 text-xs rounded-full bg-primary text-white">
              Today
            </span>
          )}
          {!isAdding && (
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-full hover:bg-white/10"
              onClick={() => setIsAdding(true)}
            >
              <Plus className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
      
      {isAdding && (
        <form onSubmit={handleAddEvent} className="mt-2">
          <Input
            value={newEvent}
            onChange={(e) => setNewEvent(e.target.value)}
            placeholder="Add event..."
            className="glass-morphism"
            autoFocus
            onBlur={() => {
              if (!newEvent.trim()) {
                setIsAdding(false);
              }
            }}
          />
        </form>
      )}
      
      {dayEvents.length > 0 && (
        <div className="space-y-2 mt-2">
          {dayEvents.map((event, index) => (
            <div
              key={index}
              className="p-2 rounded glass-morphism text-sm text-left"
            >
              {event}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}