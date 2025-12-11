import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { User } from "lucide-react";

interface PersonalInfoProps {
  onNext: (data: any) => void;
  onBack: () => void;
  initialData: any;
}

export default function PersonalInfo({ onNext, onBack, initialData }: PersonalInfoProps) {
  const [formData, setFormData] = useState({
    firstName: initialData.firstName || "",
    middleName: initialData.middleName || "",
    lastName: initialData.lastName || "",
    birthDate: initialData.birthDate || "",
    gender: initialData.gender || "",
    civilStatus: initialData.civilStatus || "",
    birthPlace: initialData.birthPlace || "",
  });

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const isValid = 
    formData.firstName && 
    formData.lastName && 
    formData.birthDate && 
    formData.gender && 
    formData.civilStatus && 
    formData.birthPlace;

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5 text-primary" />
            Personal Information
          </CardTitle>
          <CardDescription>
            Please enter your personal details exactly as they appear on your birth certificate or ID.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input 
                id="firstName" 
                value={formData.firstName} 
                onChange={(e) => handleChange("firstName", e.target.value)}
                placeholder="Juan"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="middleName">Middle Name (Optional)</Label>
              <Input 
                id="middleName" 
                value={formData.middleName} 
                onChange={(e) => handleChange("middleName", e.target.value)}
                placeholder="Santos"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input 
                id="lastName" 
                value={formData.lastName} 
                onChange={(e) => handleChange("lastName", e.target.value)}
                placeholder="Dela Cruz"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="birthDate">Date of Birth</Label>
              <Input 
                id="birthDate" 
                type="date"
                value={formData.birthDate} 
                onChange={(e) => handleChange("birthDate", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="birthPlace">Place of Birth</Label>
              <Input 
                id="birthPlace" 
                value={formData.birthPlace} 
                onChange={(e) => handleChange("birthPlace", e.target.value)}
                placeholder="City/Municipality, Province"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Gender</Label>
              <Select value={formData.gender} onValueChange={(val) => handleChange("gender", val)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Civil Status</Label>
              <Select value={formData.civilStatus} onValueChange={(val) => handleChange("civilStatus", val)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="single">Single</SelectItem>
                  <SelectItem value="married">Married</SelectItem>
                  <SelectItem value="widowed">Widowed</SelectItem>
                  <SelectItem value="separated">Separated</SelectItem>
                  <SelectItem value="annulled">Annulled</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-between">
        <Button variant="outline" onClick={onBack} size="lg">
          Back
        </Button>
        <Button onClick={() => onNext(formData)} disabled={!isValid} size="lg">
          Next Step
        </Button>
      </div>
    </div>
  );
}
