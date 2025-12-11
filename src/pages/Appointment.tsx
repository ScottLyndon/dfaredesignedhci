import { useState } from "react";
import { useLocation } from "wouter";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SiteSelection from "@/components/appointment/SiteSelection";
import DateTimeSelection from "@/components/appointment/DateTimeSelection";
import PersonalInfo from "@/components/appointment/PersonalInfo";
import ContactInfo from "@/components/appointment/ContactInfo";
import ReviewConfirm from "@/components/appointment/ReviewConfirm";
import { Progress } from "@/components/ui/progress";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function Appointment() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<any>({});
  const [isSuccess, setIsSuccess] = useState(false);
  const [, setLocation] = useLocation();

  const totalSteps = 5;
  const progress = (step / totalSteps) * 100;

  const handleNext = (data: any) => {
    setFormData((prev: any) => ({ ...prev, ...data }));
    setStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setStep((prev) => prev - 1);
  };

  const handleConfirm = () => {
    setIsSuccess(true);
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return <SiteSelection onNext={handleNext} initialData={formData} />;
      case 2:
        return <DateTimeSelection onNext={handleNext} onBack={handleBack} initialData={formData} />;
      case 3:
        return <PersonalInfo onNext={handleNext} onBack={handleBack} initialData={formData} />;
      case 4:
        return <ContactInfo onNext={handleNext} onBack={handleBack} initialData={formData} />;
      case 5:
        return <ReviewConfirm onNext={handleConfirm} onBack={handleBack} data={formData} />;
      default:
        return null;
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen flex flex-col bg-background bg-pattern">
        <Header />
        <main className="flex-1 container mx-auto py-12 px-4 flex items-center justify-center">
          <Card className="max-w-md w-full text-center animate-in zoom-in-95 duration-500">
            <CardHeader>
              <div className="mx-auto h-20 w-20 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <CheckCircle2 className="h-10 w-10 text-green-600" />
              </div>
              <CardTitle className="text-2xl text-green-700">Appointment Confirmed!</CardTitle>
              <CardDescription>
                Your appointment has been successfully scheduled.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-muted p-4 rounded-lg text-sm">
                <p className="font-medium text-muted-foreground mb-1">Reference Number</p>
                <p className="text-2xl font-mono font-bold tracking-wider">DFA-{Math.floor(Math.random() * 1000000)}</p>
              </div>
              <p className="text-sm text-muted-foreground">
                A confirmation email has been sent to <strong>{formData.email}</strong> with your appointment details and checklist of requirements.
              </p>
              <Button className="w-full" onClick={() => setLocation("/")}>
                Return to Home
              </Button>
            </CardContent>
          </Card>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background bg-pattern">
      <Header />
      
      <main className="flex-1 container mx-auto py-8 md:py-12 px-4">
        <div className="max-w-3xl mx-auto space-y-8">
          
          {/* Progress Indicator */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm font-medium text-muted-foreground">
              <span>Step {step} of {totalSteps}</span>
              <span>{Math.round(progress)}% Completed</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          {/* Step Title */}
          <div className="text-center md:text-left">
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-primary">
              {step === 1 && "Select Location"}
              {step === 2 && "Date & Time"}
              {step === 3 && "Personal Information"}
              {step === 4 && "Contact Information"}
              {step === 5 && "Review & Confirm"}
            </h2>
          </div>

          {/* Form Content */}
          {renderStep()}

        </div>
      </main>

      <Footer />
    </div>
  );
}
