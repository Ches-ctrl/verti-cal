import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

interface EventDialogProps {
  date: Date;
  onEventAdd: (date: Date, event: string) => void;
  children: React.ReactNode;
}

export function EventDialog({ date, onEventAdd, children }: EventDialogProps) {
  const [event, setEvent] = useState("");
  const [open, setOpen] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (event.trim()) {
      onEventAdd(date, event);
      setEvent("");
      setOpen(false);
      toast({
        title: "Event added",
        description: "Your event has been successfully added to the calendar.",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] glass-morphism">
        <DialogHeader>
          <DialogTitle>Add Event</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            placeholder="Enter event details..."
            value={event}
            onChange={(e) => setEvent(e.target.value)}
            className="glass-morphism"
          />
          <Button type="submit" className="w-full">
            Save Event
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}