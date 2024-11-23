import { format, getWeek, isMonday } from "date-fns";
import { cn } from "@/lib/utils";
import { Plus, X } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";
import { Input } from "./ui/input";

interface CalendarDayProps {
  date: Date;
  events: Record<string, string[]>;
  onEventAdd: (date: Date, event: string, newEvents?: Record<string, string[]>) => void;
}

export function CalendarDay({ date, events, onEventAdd }: CalendarDayProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [newEvent, setNewEvent] = useState("");
  const [hoveredEventIndex, setHoveredEventIndex] = useState<number | null>(null);
  
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

  const handleDeleteEvent = (indexToDelete: number) => {
    const updatedEvents = dayEvents.filter((_, index) => index !== indexToDelete);
    const newEvents = { ...events };
    if (updatedEvents.length === 0) {
      delete newEvents[dateStr];
    } else {
      newEvents[dateStr] = updatedEvents;
    }
    onEventAdd(date, "", newEvents);
  };

  return (
    <div className="py-4 px-1">
      <div className="flex flex-col space-y-2">
        <div 
          className={cn(
            "flex flex-col items-start py-1.5 px-3 rounded-xl",
            isToday && "bg-purple-500/10"
          )}
        >
          {showWeekNumber && (
            <span className="text-xs text-gray-400">Week {weekNumber}</span>
          )}
          <div className="flex justify-between items-center w-full">
            <span className="text-lg font-semibold">
              {format(date, "EEEE, MMMM d")}
            </span>
          </div>
        </div>
      </div>
      
      <div className="min-h-[40px] mt-2">
        <div className="space-y-2">
          {dayEvents.length > 0 && dayEvents.map((event, index) => (
            <div
              key={index}
              className="text-sm text-left relative group"
              onMouseEnter={() => setHoveredEventIndex(index)}
              onMouseLeave={() => setHoveredEventIndex(null)}
            >
              {event}
              {hoveredEventIndex === index && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-1/2 -translate-y-1/2 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => handleDeleteEvent(index)}
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
          ))}
          {isAdding && (
            <form onSubmit={handleAddEvent}>
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
          <div className="flex justify-end">
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
      </div>
    </div>
  );
}