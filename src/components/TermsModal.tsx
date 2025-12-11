import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AlertTriangle } from "lucide-react";

interface TermsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAccept: () => void;
}

export default function TermsModal({ open, onOpenChange, onAccept }: TermsModalProps) {
  const [agreed, setAgreed] = useState(false);

  // Reset agreement when modal opens
  useEffect(() => {
    if (open) setAgreed(false);
  }, [open]);

  const handleAccept = () => {
    if (agreed) {
      onAccept();
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[85vh] flex flex-col p-0 gap-0 overflow-hidden">
        <DialogHeader className="p-6 pb-4 flex-shrink-0 border-b">
          <DialogTitle className="text-2xl font-serif text-primary flex items-center gap-2">
            <AlertTriangle className="h-6 w-6 text-secondary-foreground" />
            Terms and Conditions
          </DialogTitle>
          <DialogDescription className="mt-2">
            Please read and accept the terms before proceeding.
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex-1 min-h-0 overflow-y-auto">
          <div className="p-6 space-y-5 text-sm text-muted-foreground">
            {/* Email Warning */}
            <div className="bg-amber-50 dark:bg-amber-950/30 p-4 rounded-lg border border-amber-200 dark:border-amber-900">
              <h4 className="font-bold text-amber-900 dark:text-amber-100 mb-2">Important: Email Requirements</h4>
              <p className="text-amber-800 dark:text-amber-200">
                Applicants are <strong>strongly recommended to use only Google or Yahoo email accounts</strong> to avoid technical incompatibilities. 
                Email accessibility may vary based on your location, country, and email server restrictions.
              </p>
            </div>

            {/* Appointment System */}
            <div>
              <h4 className="font-bold text-foreground mb-2">1. Appointment System</h4>
              <p>This appointment and scheduling system allocates slots on a <strong>first come, first served basis</strong>. Appointment dates and times are subject to availability and may change without prior notice.</p>
            </div>

            {/* Information Accuracy */}
            <div>
              <h4 className="font-bold text-foreground mb-2">2. Information Accuracy & Responsibility</h4>
              <p>
                Users accept full responsibility for supplying, checking, and verifying the accuracy and correctness of all information provided through this system. 
                <strong> Incorrect or inaccurate information may result in forfeiture of the passport application</strong> and loss of fees paid. Applicants must ensure that all details match official documents.
              </p>
            </div>

            {/* Payment Terms */}
            <div>
              <h4 className="font-bold text-foreground mb-2">3. Payment & Non-Refundable Fees</h4>
              <p className="mb-2">All fees paid through the ePayment System are <strong>NON-REFUNDABLE</strong> and will be forfeited in the following cases:</p>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li>Failure to appear on confirmed appointment date and time</li>
                <li>Cancellation of appointment after payment</li>
                <li>Application rejection due to inconsistency or incorrect information</li>
                <li>Presentation of discrepant, fraudulent, or spurious documents</li>
                <li>Non-compliance with DFA requirements and procedures</li>
              </ul>
            </div>

            {/* Document Requirements */}
            <div>
              <h4 className="font-bold text-foreground mb-2">4. Document Requirements</h4>
              <p>
                Applicants must prepare and bring all required documents on their scheduled appointment date. Original documents and valid government-issued ID are required for verification. 
                The DFA reserves the right to reject applications with missing or insufficient documentation.
              </p>
            </div>

            {/* Privacy & Data Protection */}
            <div className="bg-blue-50 dark:bg-blue-950/30 p-4 rounded-lg border border-blue-200 dark:border-blue-900">
              <h4 className="font-bold text-blue-900 dark:text-blue-100 mb-2">5. Privacy & Data Protection</h4>
              <p className="text-blue-800 dark:text-blue-200 italic">
                By proceeding with this application, you consent to the disclosure, collection, and use of your personal information as required under:
              </p>
              <ul className="list-disc list-inside space-y-1 ml-2 mt-2 text-blue-800 dark:text-blue-200">
                <li>Philippine Passport Act and its Implementing Rules and Regulations</li>
                <li>Data Privacy Act of 2012 (Republic Act 10173) and IRR</li>
                <li>DFA Online Passport Appointment System Privacy Policy</li>
                <li>DFA policies and regulations on data handling</li>
              </ul>
              <p className="text-blue-800 dark:text-blue-200 mt-2">
                <strong>Your consent constitutes a waiver of privacy rights</strong> pertaining to the disclosure and use of your personal data for passport processing purposes only.
              </p>
            </div>

            {/* Conduct & Compliance */}
            <div>
              <h4 className="font-bold text-foreground mb-2">6. Applicant Conduct & Compliance</h4>
              <p>
                Applicants must comply with all DFA regulations, instructions, and procedures. Any fraudulent information, false statements, or attempts to circumvent the system may result in:
              </p>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li>Denial of passport application</li>
                <li>Forfeiture of all fees paid</li>
                <li>Legal action and criminal prosecution</li>
                <li>Blacklisting from future DFA services</li>
              </ul>
            </div>

            {/* Health & Safety */}
            <div>
              <h4 className="font-bold text-foreground mb-2">7. Health & Safety Protocols</h4>
              <p>
                Applicants must follow all health and safety protocols in effect at DFA offices during their appointment. 
                Refusal to comply may result in cancellation of appointment without refund.
              </p>
            </div>

            {/* Disclaimer */}
            <div className="bg-red-50 dark:bg-red-950/30 p-4 rounded-lg border border-red-200 dark:border-red-900 mt-4">
              <h4 className="font-bold text-red-900 dark:text-red-100 mb-2">Important Disclaimer</h4>
              <p className="text-red-800 dark:text-red-200">
                The DFA is not responsible for technical failures, internet connectivity issues, or system errors beyond its control. 
                Users are advised to complete their appointment booking well in advance to avoid system timeouts or connectivity problems.
              </p>
            </div>

            <p className="text-xs text-muted-foreground/70 border-t pt-4 mt-4">
              Last Updated: December 2025 | DFA Online Passport Appointment System
            </p>
          </div>
        </div>

        <DialogFooter className="p-6 border-t bg-muted/20 flex-col sm:flex-row gap-4 items-center sm:justify-between flex-shrink-0">
          <div className="flex items-center space-x-2 w-full sm:w-auto">
            <Checkbox 
              id="terms" 
              checked={agreed} 
              onCheckedChange={(checked) => setAgreed(checked as boolean)}
              className="h-5 w-5 cursor-pointer"
            />
            <Label 
              htmlFor="terms" 
              className="text-sm font-medium cursor-pointer select-none"
            >
              I agree to the Terms and Conditions
            </Label>
          </div>
          <Button 
            onClick={handleAccept} 
            disabled={!agreed}
            className="w-full sm:w-auto"
          >
            Start Appointment
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
