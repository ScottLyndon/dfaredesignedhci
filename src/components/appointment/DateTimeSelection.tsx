import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Calendar as CalendarIcon, Clock } from "lucide-react";
import { format, addDays } from "date-fns";

interface DateTimeSelectionProps {
  onNext: (data: any) => void;
  onBack: () => void;
  initialData: any;
}

export default function DateTimeSelection({ onNext, onBack, initialData }: DateTimeSelectionProps) {
  const [date, setDate] = useState<Date | undefined>(initialData.date ? new Date(initialData.date) : undefined);
  const [timeSlot, setTimeSlot] = useState<string>(initialData.timeSlot || "");

  const timeSlots = [
    "08:00 AM - 09:00 AM",
    "09:00 AM - 10:00 AM",
    "10:00 AM - 11:00 AM",
    "11:00 AM - 12:00 PM",
    "01:00 PM - 02:00 PM",
    "02:00 PM - 03:00 PM",
    "03:00 PM - 04:00 PM",
    "04:00 PM - 05:00 PM",
  ];

  const handleNext = () => {
    if (date && timeSlot) {
      onNext({ date: date.toISOString(), timeSlot });
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CalendarIcon className="h-5 w-5 text-primary" />
              Select Date
            </CardTitle>
            <CardDescription>
              Choose your preferred appointment date.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              disabled={(date) => date < new Date() || date > addDays(new Date(), 90) || date.getDay() === 0 || date.getDay() === 6}
              className="rounded-md border"
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary" />
              Select Time
            </CardTitle>
            <CardDescription>
              Choose an available time slot for {date ? format(date, "MMMM d, yyyy") : "the selected date"}.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {date ? (
              <div className="grid grid-cols-1 gap-2">
                {timeSlots.map((slot) => (
                  <Button
                    key={slot}
                    variant={timeSlot === slot ? "default" : "outline"}
                    className={`justify-start ${timeSlot === slot ? "bg-primary text-white" : ""}`}
                    onClick={() => setTimeSlot(slot)}
                  >
                    {slot}
                  </Button>
                ))}
              </div>
            ) : (
              <div className="flex items-center justify-center h-40 text-muted-foreground text-sm italic">
                Please select a date first
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-between">
        <Button variant="outline" onClick={onBack} size="lg">
          Back
        </Button>
        <Button onClick={handleNext} disabled={!date || !timeSlot} size="lg">
          Next Step
        </Button>
      </div>
    </div>
  );
}
