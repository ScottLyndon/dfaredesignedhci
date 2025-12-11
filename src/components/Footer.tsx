import { Link } from "wouter";
import { useModals } from "@/contexts/ModalContext";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { openModal } = useModals();

  return (
    <footer className="bg-muted text-muted-foreground border-t border-border mt-auto">
      <div className="container mx-auto py-8 md:py-12 px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Office Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img 
                src="/images/dfa-logo.png" 
                alt="Seal of the Department of Foreign Affairs of the Philippines" 
                className="h-10 w-10 object-contain"
              />
              <div>
                <h4 className="font-serif font-bold text-foreground text-sm">OFFICE OF CONSULAR AFFAIRS</h4>
                <p className="text-xs">Department of Foreign Affairs</p>
              </div>
            </div>
            <p className="text-sm leading-relaxed">
              Aseana Business Park, Bradco Avenue, Diosdado Macapagal Blvd, Parañaque, 1714 Metro Manila
            </p>
          </div>

          {/* Sitemap Column 1 */}
          <div>
            <h4 className="font-serif font-bold text-foreground mb-4">SITEMAP</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/">
                  <span className="hover:text-primary cursor-pointer transition-colors">Home</span>
                </Link>
              </li>
              <li>
                <button 
                  onClick={() => openModal("requirements")}
                  className="hover:text-primary cursor-pointer transition-colors flex items-center gap-1 text-left"
                >
                  Requirements
                </button>
              </li>
              <li>
                <Link href="/appointment">
                  <span className="hover:text-primary cursor-pointer transition-colors">Schedule an Appointment</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Sitemap Column 2 */}
          <div className="md:pt-10">
            <ul className="space-y-2 text-sm">
              <li>
                <button 
                  onClick={() => openModal("whereToApply")}
                  className="hover:text-primary cursor-pointer transition-colors flex items-center gap-1 text-left"
                >
                  Where to Apply
                </button>
              </li>
              <li>
                <button 
                  onClick={() => openModal("faq")}
                  className="hover:text-primary cursor-pointer transition-colors flex items-center gap-1 text-left"
                >
                  FAQ
                </button>
              </li>
              <li>
                <a 
                  href="https://passport.gov.ph/appointment/payment/merchants" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary cursor-pointer transition-colors flex items-center gap-1"
                >
                  Payment Merchants
                  <span className="text-xs opacity-60">↗</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Copyright & Version */}
          <div className="text-sm space-y-2 md:text-right">
            <p>&copy; {currentYear} Department of Foreign Affairs</p>
            <p>Office of the Consular Affairs</p>
            <p className="text-xs opacity-70">
              v1.2.1 | 
              <a 
                href="https://consular.dfa.gov.ph/privacy-policy/" 
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary hover:underline ml-1"
              >
                Privacy Policy
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
