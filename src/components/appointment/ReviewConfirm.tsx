import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, MapPin, Calendar, User, Phone } from "lucide-react";
import { format } from "date-fns";

interface ReviewConfirmProps {
  onNext: () => void;
  onBack: () => void;
  data: any;
}

export default function ReviewConfirm({ onNext, onBack, data }: ReviewConfirmProps) {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-primary" />
            Review Information
          </CardTitle>
          <CardDescription>
            Please review your details carefully before confirming your appointment.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          
          {/* Appointment Details */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-muted-foreground border-b pb-1">Appointment Details</h4>
            <div className="grid gap-2 text-sm">
              <div className="flex items-start gap-3">
                <MapPin className="h-4 w-4 text-primary mt-0.5" />
                <div>
                  <p className="font-medium">Site Location</p>
                  <p className="text-muted-foreground">{data.site}, {data.region.toUpperCase()}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Calendar className="h-4 w-4 text-primary mt-0.5" />
                <div>
                  <p className="font-medium">Date & Time</p>
                  <p className="text-muted-foreground">
                    {data.date ? format(new Date(data.date), "MMMM d, yyyy") : ""} at {data.timeSlot}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Personal Information */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-muted-foreground border-b pb-1">Personal Information</h4>
            <div className="grid gap-2 text-sm">
              <div className="flex items-start gap-3">
                <User className="h-4 w-4 text-primary mt-0.5" />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2 w-full">
                  <div>
                    <p className="font-medium">Full Name</p>
                    <p className="text-muted-foreground uppercase">
                      {data.lastName}, {data.firstName} {data.middleName}
                    </p>
                  </div>
                  <div>
                    <p className="font-medium">Birth Date</p>
                    <p className="text-muted-foreground">
                      {data.birthDate ? format(new Date(data.birthDate), "MMMM d, yyyy") : ""}
                    </p>
                  </div>
                  <div>
                    <p className="font-medium">Gender</p>
                    <p className="text-muted-foreground capitalize">{data.gender}</p>
                  </div>
                  <div>
                    <p className="font-medium">Civil Status</p>
                    <p className="text-muted-foreground capitalize">{data.civilStatus}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-muted-foreground border-b pb-1">Contact Information</h4>
            <div className="grid gap-2 text-sm">
              <div className="flex items-start gap-3">
                <Phone className="h-4 w-4 text-primary mt-0.5" />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2 w-full">
                  <div>
                    <p className="font-medium">Mobile Number</p>
                    <p className="text-muted-foreground">{data.mobileNumber}</p>
                  </div>
                  <div>
                    <p className="font-medium">Email Address</p>
                    <p className="text-muted-foreground">{data.email}</p>
                  </div>
                  <div className="sm:col-span-2">
                    <p className="font-medium">Address</p>
                    <p className="text-muted-foreground">
                      {data.address}, {data.city}, {data.province} {data.zipCode}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </CardContent>
      </Card>

      <div className="flex justify-between">
        <Button variant="outline" onClick={onBack} size="lg">
          Back
        </Button>
        <Button onClick={onNext} size="lg" className="bg-primary hover:bg-primary/90">
          Confirm Appointment
        </Button>
      </div>
    </div>
  );
}
