import { format } from "date-fns";
import { EventDialog } from "./EventDialog";
import { cn } from "@/lib/utils";

interface CalendarDayProps {
  date: Date;
  events: Record<string, string[]>;
  onEventAdd: (date: Date, event: string) => void;
}

export function CalendarDay({ date, events, onEventAdd }: CalendarDayProps) {
  const dateStr = format(date, "yyyy-MM-dd");
  const isToday = format(new Date(), "yyyy-MM-dd") === dateStr;
  const dayEvents = events[dateStr] || [];

  return (
    <div
      className={cn(
        "p-4 mb-4 rounded-lg transition-all glass-morphism",
        isToday && "ring-2 ring-primary"
      )}
    >
      <div className="flex justify-between items-center mb-2">
        <span className="text-lg font-semibold">
          {format(date, "EEEE, MMMM d")}
        </span>
        {isToday && (
          <span className="px-2 py-1 text-xs rounded-full bg-primary text-white">
            Today
          </span>
        )}
      </div>
      {dayEvents.length > 0 && (
        <div className="space-y-2 mt-2">
          {dayEvents.map((event, index) => (
            <div
              key={index}
              className="p-2 rounded bg-secondary/50 text-sm"
            >
              {event}
            </div>
          ))}
        </div>
      )}
      <EventDialog date={date} onEventAdd={onEventAdd} />
    </div>
  );
}