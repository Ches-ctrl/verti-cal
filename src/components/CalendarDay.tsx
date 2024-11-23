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
    <div className={cn(
      "py-4",
      isToday && "bg-white/5 rounded-lg"
    )}>
      <div className="flex flex-col space-y-2">
        <div className="flex flex-col items-start">
          {showWeekNumber && (
            <span className="text-xs text-gray-400 mb-1">Week {weekNumber}</span>
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
              className="p-2 text-sm text-left"
            >
              {event}
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