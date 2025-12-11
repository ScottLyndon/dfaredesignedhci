import { Link } from "wouter";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useModals } from "@/contexts/ModalContext";
import type { ModalType } from "@/contexts/ModalContext";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";

type NavItem = 
  | { label: string; href: string; external: false; type: "link"; modal?: never }
  | { label: string; href: string; external: true; type: "link"; modal?: never }
  | { label: string; href: string; external: false; type: "modal"; modal: ModalType };

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { openModal } = useModals();

  const navItems: NavItem[] = [
    { label: "Home", href: "/", external: false, type: "link" },
    { label: "Schedule Appointment", href: "/appointment", external: false, type: "link" },
    { label: "Requirements", href: "#", external: false, type: "modal", modal: "requirements" },
    { label: "Where to Apply", href: "#", external: false, type: "modal", modal: "whereToApply" },
    { label: "FAQ", href: "#", external: false, type: "modal", modal: "faq" },
    { label: "Payment Merchants", href: "https://passport.gov.ph/appointment/payment/merchants", external: true, type: "link" },
  ];

  const handleNavClick = () => {
    setIsOpen(false);
  };

  return (
    <header className="w-full bg-primary text-primary-foreground shadow-md sticky top-0 z-50">
      <div className="container mx-auto py-4 px-4">
        <div className="flex items-center justify-between">
          {/* Logo Section */}
          <Link href="/">
            <div className="flex items-center gap-4 cursor-pointer">
              <img 
                src="/images/dfa-logo.png" 
                alt="Seal of the Department of Foreign Affairs of the Philippines" 
                className="h-12 w-12 md:h-16 md:w-16 object-contain drop-shadow-md"
              />
              <div className="hidden md:block">
                <p className="text-xs font-serif tracking-widest uppercase opacity-90">Republic of the Philippines</p>
                <h1 className="text-lg md:text-xl font-serif font-bold leading-tight">DEPARTMENT OF FOREIGN AFFAIRS</h1>
                <p className="text-xs opacity-80">Online Passport Appointment System</p>
              </div>
              <div className="md:hidden">
                <h1 className="text-sm font-serif font-bold">DFA Passport</h1>
                <p className="text-xs opacity-90">Appointment System</p>
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8 text-sm font-medium">
            {navItems.map((item) => {
              if (item.type === "modal") {
                return (
                  <button
                    key={item.label}
                    onClick={() => openModal(item.modal)}
                    className="hover:text-secondary transition-colors border-b-2 border-transparent hover:border-secondary py-1 text-left"
                  >
                    {item.label}
                  </button>
                );
              } else if (item.external) {
                return (
                  <a 
                    key={item.label} 
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-secondary transition-colors border-b-2 border-transparent hover:border-secondary py-1"
                  >
                    {item.label}
                  </a>
                );
              } else {
                return (
                  <Link key={item.label} href={item.href}>
                    <span className="hover:text-secondary transition-colors cursor-pointer border-b-2 border-transparent hover:border-secondary py-1">
                      {item.label}
                    </span>
                  </Link>
                );
              }
            })}
          </nav>

          {/* Mobile Navigation */}
          <div className="lg:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-primary/80">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[280px] sm:w-[320px] p-0">
                <div className="flex items-center justify-between p-4 border-b">
                  <h2 className="font-serif font-bold">Menu</h2>
                  <SheetClose asChild>
                    <Button variant="ghost" size="icon" className="text-foreground">
                      <X className="h-5 w-5" />
                    </Button>
                  </SheetClose>
                </div>
                <nav className="flex flex-col gap-1 p-4">
                  {navItems.map((item) => {
                    if (item.type === "modal") {
                      return (
                        <button
                          key={item.label}
                          onClick={() => {
                            openModal(item.modal);
                            handleNavClick();
                          }}
                          className="px-4 py-3 text-base font-medium hover:bg-primary/10 rounded-lg transition-colors text-foreground text-left"
                        >
                          {item.label}
                        </button>
                      );
                    } else if (item.external) {
                      return (
                        <a 
                          key={item.label}
                          href={item.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-4 py-3 text-base font-medium hover:bg-primary/10 rounded-lg transition-colors text-foreground flex items-center justify-between"
                          onClick={handleNavClick}
                        >
                          {item.label}
                          <span className="text-xs opacity-60">↗</span>
                        </a>
                      );
                    } else {
                      return (
                        <SheetClose key={item.label} asChild>
                          <Link href={item.href}>
                            <span className="px-4 py-3 text-base font-medium hover:bg-primary/10 rounded-lg transition-colors cursor-pointer block text-foreground">
                              {item.label}
                            </span>
                          </Link>
                        </SheetClose>
                      );
                    }
                  })}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
