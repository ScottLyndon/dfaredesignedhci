import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

interface FAQModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const faqItems = [
  {
    question: "How do I schedule an appointment?",
    answer: "Click on 'Schedule Appointment' and select whether you're applying as an individual or group. Fill in all required information and submit. You'll receive a confirmation code via email."
  },
  {
    question: "What documents do I need to bring?",
    answer: "Required documents vary by application type. Visit the 'Requirements' section for a complete list of acceptable IDs and supporting documents needed for your specific application."
  },
  {
    question: "Can I reschedule my appointment?",
    answer: "Yes, you can reschedule your appointment using your appointment code and registered email address. Visit the 'View Appointment' tab to make changes."
  },
  {
    question: "What is the processing time for a passport?",
    answer: "Standard processing time is 10 business days. Rush processing (3-5 business days) and Express service (24 hours) are available for additional fees."
  },
  {
    question: "What payment methods are accepted?",
    answer: "We accept payment through accredited payment merchants. Visit the 'Payment Merchants' section to view all accepted payment methods and partner institutions."
  },
  {
    question: "Can I apply for a group passport appointment?",
    answer: "Yes! Group appointments are available for up to 5 applicants. This is convenient for families or groups applying together. Select 'Group Appointment' when starting your application."
  },
  {
    question: "What if I lose my confirmation code?",
    answer: "You can retrieve your appointment details using your email address. Go to 'View Appointment' and enter your email. If you need further assistance, contact the DFA directly."
  },
  {
    question: "Is my personal data secure?",
    answer: "Yes. We comply with the Data Privacy Act of 2012 and implement strict security measures to protect your personal information. See our Privacy Policy for details."
  }
];

export default function FAQModal({ open, onOpenChange }: FAQModalProps) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-serif text-primary">
            Frequently Asked Questions
          </DialogTitle>
          <DialogDescription>
            Find answers to common questions about passport appointments
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3 py-4">
          {faqItems.map((item, index) => (
            <div
              key={index}
              className="border rounded-lg overflow-hidden hover:border-primary/50 transition-colors"
            >
              <button
                onClick={() => toggleExpand(index)}
                className="w-full flex items-center justify-between p-4 bg-muted/30 hover:bg-muted/50 transition-colors text-left"
              >
                <h3 className="font-semibold text-foreground pr-4">
                  {item.question}
                </h3>
                <ChevronDown
                  className={`h-5 w-5 text-primary flex-shrink-0 transition-transform ${
                    expandedIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>
              {expandedIndex === index && (
                <div className="p-4 bg-background border-t">
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {item.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
