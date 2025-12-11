import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, CheckCircle } from "lucide-react";

interface RequirementsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const requirements = [
  {
    title: "For First-Time Applicants",
    items: [
      "Original Birth Certificate (NSO/PSA certified copy or authenticated copy)",
      "At least one valid ID (Philippine Passport, Driver's License, SSS ID, etc.)",
      "Proof of Philippine Citizenship (if not evident from birth certificate)",
      "Duly accomplished DFA Form 120 (Application for Philippine Passport)"
    ]
  },
  {
    title: "For Renewal Applicants",
    items: [
      "Original old/expired Philippine Passport",
      "At least one valid ID (if passport has expired for more than 5 years)",
      "Recent passport-size photo (4x6 cm, white background)",
      "Duly accomplished DFA Form 120 (Application for Philippine Passport)"
    ]
  },
  {
    title: "For Replacement/Reissuance",
    items: [
      "Original lost/damaged Philippine Passport (if available)",
      "Affidavit of Loss (notarized, if passport is lost)",
      "At least one valid ID",
      "Recent passport-size photo (4x6 cm, white background)",
      "Duly accomplished DFA Form 120 (Application for Philippine Passport)"
    ]
  },
  {
    title: "Acceptable Identification Documents",
    items: [
      "Philippine Passport",
      "Driver's License",
      "National ID (ID/PWD/Senior ID)",
      "SSS ID",
      "GSIS ID",
      "PNP ID",
      "Student ID (with expiration date)",
      "Professional License",
      "Postal ID",
      "NBI Clearance"
    ]
  }
];

export default function RequirementsModal({ open, onOpenChange }: RequirementsModalProps) {
  const [expandedIndex, setExpandedIndex] = useState<number>(0);

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? -1 : index);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-serif text-primary">
            Passport Application Requirements
          </DialogTitle>
          <DialogDescription>
            Essential documents needed for your passport application
          </DialogDescription>
        </DialogHeader>

        <Alert className="bg-blue-50 border-blue-200">
          <AlertCircle className="h-4 w-4 text-blue-600" />
          <AlertDescription className="text-blue-800">
            All original documents must be brought to your appointment. Photocopies are not accepted except where specified by DFA regulations.
          </AlertDescription>
        </Alert>

        <div className="space-y-3 py-4">
          {requirements.map((section, index) => (
            <div key={index} className="border rounded-lg overflow-hidden">
              <button
                onClick={() => toggleExpand(index)}
                className={`w-full flex items-center justify-between p-4 transition-colors ${
                  expandedIndex === index
                    ? "bg-primary/10 border-b"
                    : "bg-muted/30 hover:bg-muted/50"
                }`}
              >
                <h3 className="font-semibold text-foreground pr-4">
                  {section.title}
                </h3>
                <div
                  className={`text-primary flex-shrink-0 transition-transform ${
                    expandedIndex === index ? "rotate-180" : ""
                  }`}
                >
                  ▼
                </div>
              </button>
              {expandedIndex === index && (
                <div className="p-4 bg-background">
                  <ul className="space-y-2">
                    {section.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex gap-3">
                        <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-foreground">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>

        <Alert className="bg-amber-50 border-amber-200">
          <AlertCircle className="h-4 w-4 text-amber-600" />
          <AlertDescription className="text-amber-800">
            Requirements may vary based on your specific situation. Please verify with the DFA office before your appointment.
          </AlertDescription>
        </Alert>

        <div className="flex justify-end gap-3 pt-4 border-t">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
