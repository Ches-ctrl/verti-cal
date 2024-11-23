import { format, getWeek } from "date-fns";
import { EventDialog } from "./EventDialog";
import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";
import { Button } from "./ui/button";

interface CalendarDayProps {
  date: Date;
  events: Record<string, string[]>;
  onEventAdd: (date: Date, event: string) => void;
}

export function CalendarDay({ date, events, onEventAdd }: CalendarDayProps) {
  const dateStr = format(date, "yyyy-MM-dd");
  const isToday = format(new Date(), "yyyy-MM-dd") === dateStr;
  const dayEvents = events[dateStr] || [];
  const weekNumber = getWeek(date);

  return (
    <div
      className={cn(
        "p-4 mb-4 rounded-lg transition-all glass-morphism",
        isToday && "ring-2 ring-primary"
      )}
    >
      <div className="flex justify-between items-center mb-2">
        <div className="flex flex-col items-start">
          <span className="text-lg font-semibold">
            {format(date, "EEEE, MMMM d")}
          </span>
          <span className="text-xs text-gray-400">Week {weekNumber}</span>
        </div>
        <div className="flex items-center gap-2">
          {isToday && (
            <span className="px-2 py-1 text-xs rounded-full bg-primary text-white">
              Today
            </span>
          )}
          <EventDialog date={date} onEventAdd={onEventAdd}>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-full hover:bg-white/10"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </EventDialog>
        </div>
      </div>
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