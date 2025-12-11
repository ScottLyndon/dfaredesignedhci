import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Phone, Mail, MapPin } from "lucide-react";

interface ContactInfoProps {
  onNext: (data: any) => void;
  onBack: () => void;
  initialData: any;
}

export default function ContactInfo({ onNext, onBack, initialData }: ContactInfoProps) {
  const [formData, setFormData] = useState({
    mobileNumber: initialData.mobileNumber || "",
    email: initialData.email || "",
    confirmEmail: initialData.email || "",
    address: initialData.address || "",
    city: initialData.city || "",
    province: initialData.province || "",
    zipCode: initialData.zipCode || "",
  });

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const isValid = 
    formData.mobileNumber && 
    formData.email && 
    formData.confirmEmail && 
    formData.email === formData.confirmEmail &&
    formData.address && 
    formData.city && 
    formData.province;

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Phone className="h-5 w-5 text-primary" />
            Contact Information
          </CardTitle>
          <CardDescription>
            Provide your active contact details for appointment updates.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <h4 className="text-sm font-semibold flex items-center gap-2 text-muted-foreground">
              <Mail className="h-4 w-4" /> Contact Details
            </h4>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="mobileNumber">Mobile Number</Label>
                <Input 
                  id="mobileNumber" 
                  value={formData.mobileNumber} 
                  onChange={(e) => handleChange("mobileNumber", e.target.value)}
                  placeholder="0912 345 6789"
                />
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address (Google/Yahoo recommended)</Label>
                <Input 
                  id="email" 
                  type="email"
                  value={formData.email} 
                  onChange={(e) => handleChange("email", e.target.value)}
                  placeholder="juan@gmail.com"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmEmail">Confirm Email Address</Label>
                <Input 
                  id="confirmEmail" 
                  type="email"
                  value={formData.confirmEmail} 
                  onChange={(e) => handleChange("confirmEmail", e.target.value)}
                  placeholder="juan@gmail.com"
                  className={formData.email && formData.confirmEmail && formData.email !== formData.confirmEmail ? "border-destructive" : ""}
                />
                {formData.email && formData.confirmEmail && formData.email !== formData.confirmEmail && (
                  <p className="text-xs text-destructive">Emails do not match</p>
                )}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-semibold flex items-center gap-2 text-muted-foreground">
              <MapPin className="h-4 w-4" /> Current Address
            </h4>
            <div className="space-y-2">
              <Label htmlFor="address">House No., Street, Village/Subdivision</Label>
              <Input 
                id="address" 
                value={formData.address} 
                onChange={(e) => handleChange("address", e.target.value)}
                placeholder="123 Rizal Street, Barangay 1"
              />
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="city">City/Municipality</Label>
                <Input 
                  id="city" 
                  value={formData.city} 
                  onChange={(e) => handleChange("city", e.target.value)}
                  placeholder="Quezon City"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="province">Province</Label>
                <Input 
                  id="province" 
                  value={formData.province} 
                  onChange={(e) => handleChange("province", e.target.value)}
                  placeholder="Metro Manila"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="zipCode">Zip Code (Optional)</Label>
                <Input 
                  id="zipCode" 
                  value={formData.zipCode} 
                  onChange={(e) => handleChange("zipCode", e.target.value)}
                  placeholder="1100"
                />
              </div>
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
