import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, CheckCircle, Calendar, MapPin, Phone } from "lucide-react";

interface AppointmentData {
  code: string;
  email: string;
  name: string;
  type: string;
  site: string;
  date: string;
  time: string;
  status: "confirmed" | "pending" | "cancelled";
}

export default function ViewAppointment() {
  const [code, setCode] = useState("");
  const [email, setEmail] = useState("");
  const [appointment, setAppointment] = useState<AppointmentData | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleViewAppointment = async () => {
    setError("");
    setAppointment(null);

    if (!code.trim() || !email.trim()) {
      setError("Please enter both appointment code and email address.");
      return;
    }

    setLoading(true);
    try {
      // Simulate API call - replace with actual backend API
      // const response = await fetch(`/api/appointments/${code}`, {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({ email })
      // });

      // For now, show demo data
      setTimeout(() => {
        if (code.toLowerCase() === "demo" && email.includes("@")) {
          setAppointment({
            code: code.toUpperCase(),
            email: email,
            name: "Juan Dela Cruz",
            type: "Individual",
            site: "DFA Manila (Aseana)",
            date: "December 20, 2025",
            time: "10:00 AM",
            status: "confirmed"
          });
        } else {
          setError("Appointment not found. Please check your appointment code and email address.");
        }
        setLoading(false);
      }, 800);
    } catch (err) {
      setError("Error retrieving appointment. Please try again.");
      setLoading(false);
    }
  };

  const handleReschedule = () => {
    // TODO: Navigate to reschedule page
    alert("Reschedule functionality coming soon!");
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-50 dark:bg-green-950/30 border-green-200 dark:border-green-900";
      case "pending":
        return "bg-yellow-50 dark:bg-yellow-950/30 border-yellow-200 dark:border-yellow-900";
      case "cancelled":
        return "bg-red-50 dark:bg-red-950/30 border-red-200 dark:border-red-900";
      default:
        return "bg-muted";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "confirmed":
        return <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />;
      case "pending":
        return <AlertCircle className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />;
      case "cancelled":
        return <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400" />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="code" className="text-sm font-semibold">
            Appointment Code <span className="text-red-500">*</span>
          </Label>
          <Input
            id="code"
            placeholder="Enter your 6-digit appointment code"
            value={code}
            onChange={(e) => setCode(e.target.value.toUpperCase())}
            onKeyPress={(e) => e.key === "Enter" && handleViewAppointment()}
            className="h-10"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email" className="text-sm font-semibold">
            Email Address <span className="text-red-500">*</span>
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="Enter your registered email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleViewAppointment()}
            className="h-10"
          />
        </div>

        <Button 
          onClick={handleViewAppointment}
          disabled={loading}
          className="w-full h-10"
        >
          {loading ? "Searching..." : "Search Appointment"}
        </Button>

        <p className="text-xs text-muted-foreground text-center">
          Demo: Use code "demo" and any email to see sample appointment
        </p>
      </div>

      {error && (
        <Alert className="border-red-200 bg-red-50 dark:bg-red-950/30 dark:border-red-900">
          <AlertCircle className="h-4 w-4 text-red-600 dark:text-red-400" />
          <AlertDescription className="text-red-800 dark:text-red-200">
            {error}
          </AlertDescription>
        </Alert>
      )}

      {appointment && (
        <div className={`rounded-lg border-2 p-6 ${getStatusColor(appointment.status)}`}>
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-2">
              {getStatusIcon(appointment.status)}
              <div>
                <h3 className="font-serif font-bold text-lg capitalize">
                  Appointment {appointment.status}
                </h3>
                <p className="text-sm text-muted-foreground">
                  Appointment Code: {appointment.code}
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-3 mb-6">
            <div className="flex items-center gap-3 text-sm">
              <span className="font-semibold text-muted-foreground min-w-[100px]">Name:</span>
              <span>{appointment.name}</span>
            </div>

            <div className="flex items-center gap-3 text-sm">
              <span className="font-semibold text-muted-foreground min-w-[100px]">Type:</span>
              <span>{appointment.type} Appointment</span>
            </div>

            <div className="flex items-start gap-3 text-sm">
              <MapPin className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-semibold text-muted-foreground">Location:</p>
                <p>{appointment.site}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 text-sm">
              <Calendar className="h-5 w-5 text-primary flex-shrink-0" />
              <div>
                <p className="font-semibold text-muted-foreground">Date & Time:</p>
                <p>{appointment.date}</p>
                <p className="font-semibold">{appointment.time}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 text-sm">
              <Phone className="h-5 w-5 text-primary flex-shrink-0" />
              <div>
                <p className="font-semibold text-muted-foreground">Confirmation Email:</p>
                <p>{appointment.email}</p>
              </div>
            </div>
          </div>

          <div className="border-t pt-4 space-y-2">
            <Alert className="bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-900">
              <AlertCircle className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              <AlertDescription className="text-blue-800 dark:text-blue-200 text-sm">
                Please arrive 15 minutes before your scheduled appointment. Bring all required documents.
              </AlertDescription>
            </Alert>

            <div className="flex gap-3 pt-2">
              <Button 
                variant="outline" 
                className="flex-1"
                onClick={handleReschedule}
              >
                Reschedule
              </Button>
              <Button 
                variant="outline" 
                className="flex-1"
                onClick={() => {
                  setAppointment(null);
                  setCode("");
                  setEmail("");
                }}
              >
                Search Another
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
