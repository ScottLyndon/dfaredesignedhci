import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin, AlertCircle, ExternalLink } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface SiteSelectionProps {
  onNext: (data: any) => void;
  initialData: any;
}

export interface OfficeInfo {
  name: string;
  address: string;
  contact: string;
  mapsUrl?: string;
}

export const OFFICE_DATABASE: Record<string, Record<string, Record<string, OfficeInfo>>> = {
  "ASIA PACIFIC": {
    PHILIPPINES: {
      // NCR Region
      "DFA Manila (Aseana)": {
        name: "DFA Manila (Aseana)",
        address: "Aseana Business Park, Bradco Avenue, Diosdado Macapagal Blvd, Parañaque, 1714 Metro Manila",
        contact: "+63-2-8834-4000",
        mapsUrl: "https://www.google.com/maps/search/Aseana+Business+Park+DFA+Parañaque"
      },
      "DFA NCR Central (Robinsons Galleria Ortigas, Quezon City)": {
        name: "DFA NCR Central",
        address: "Robinsons Galleria Ortigas, Quezon City, Metro Manila",
        contact: "+63-2-6312-5555",
        mapsUrl: "https://www.google.com/maps/search/Robinsons+Galleria+Ortigas+DFA"
      },
      "DFA NCR East (SM Megamall, Mandaluyong City)": {
        name: "DFA NCR East",
        address: "SM Megamall, EDSA, Mandaluyong City, Metro Manila",
        contact: "+63-2-6312-5555",
        mapsUrl: "https://www.google.com/maps/search/SM+Megamall+DFA"
      },
      "DFA NCR Northeast (Ali Mall Cubao, Quezon City)": {
        name: "DFA NCR Northeast",
        address: "Ali Mall, Cubao, Quezon City, Metro Manila",
        contact: "+63-2-5551-0000",
        mapsUrl: "https://www.google.com/maps/search/Ali+Mall+Cubao+DFA"
      },
      "DFA NCR North (Robinsons Novaliches, Quezon City)": {
        name: "DFA NCR North",
        address: "Robinsons Novaliches, North Avenue, Quezon City, Metro Manila",
        contact: "+63-2-4123-4000",
        mapsUrl: "https://www.google.com/maps/search/Robinsons+Novaliches+DFA"
      },
      "DFA NCR South (Festival Mall, Muntinlupa City)": {
        name: "DFA NCR South",
        address: "Festival Mall, Muntinlupa City, Metro Manila",
        contact: "+63-2-7799-0000",
        mapsUrl: "https://www.google.com/maps/search/Festival+Mall+Muntinlupa+DFA"
      },
      "DFA NCR West (SM City, Manila)": {
        name: "DFA NCR West",
        address: "SM Mall of Asia, Pasay City, Metro Manila",
        contact: "+63-2-5555-0000",
        mapsUrl: "https://www.google.com/maps/search/SM+Mall+of+Asia+DFA"
      },
      // Luzon Region
      "Antipolo (SM Center, Antipolo City, Rizal)": {
        name: "Antipolo",
        address: "SM Center, Antipolo City, Rizal",
        contact: "+63-2-6700-0000",
        mapsUrl: "https://www.google.com/maps/search/SM+Center+Antipolo+DFA"
      },
      "Angeles (SM City Clark, Angeles City)": {
        name: "Angeles",
        address: "SM City Clark, Angeles City, Pampanga",
        contact: "+63-45-309-0000",
        mapsUrl: "https://www.google.com/maps/search/SM+City+Clark+Angeles+DFA"
      },
      "Baguio (SM City Baguio)": {
        name: "Baguio",
        address: "SM City Baguio, Baguio City, Benguet",
        contact: "+63-74-442-0000",
        mapsUrl: "https://www.google.com/maps/search/SM+City+Baguio+DFA"
      },
      "Balanga (The Bunker Building, Capitol Compound)": {
        name: "Balanga",
        address: "The Bunker Building, Capitol Compound, Balanga City, Bataan",
        contact: "+63-47-799-0000",
        mapsUrl: "https://www.google.com/maps/search/Bunker+Building+Balanga+DFA"
      },
      "Candon (Candon City Arena)": {
        name: "Candon",
        address: "Candon City Arena, Candon City, Ilocos Sur",
        contact: "+63-77-722-0000",
        mapsUrl: "https://www.google.com/maps/search/Candon+City+Arena+DFA"
      },
      "Dasmariñas (SM City Dasmariñas)": {
        name: "Dasmariñas",
        address: "SM City Dasmariñas, Dasmariñas, Cavite",
        contact: "+63-46-809-0000",
        mapsUrl: "https://www.google.com/maps/search/SM+City+Dasmarinas+DFA"
      },
      "La Union (CSI Mall San Fernando, La Union)": {
        name: "La Union",
        address: "CSI Mall San Fernando, San Fernando, La Union",
        contact: "+63-72-242-0000",
        mapsUrl: "https://www.google.com/maps/search/CSI+Mall+San+Fernando+La+Union+DFA"
      },
      "Legazpi (Pacific Mall Legazpi)": {
        name: "Legazpi",
        address: "Pacific Mall Legazpi, Legazpi City, Albay",
        contact: "+63-52-480-0000",
        mapsUrl: "https://www.google.com/maps/search/Pacific+Mall+Legazpi+DFA"
      },
      "Lipa (Robinsons Lipa)": {
        name: "Lipa",
        address: "Robinsons Lipa, Batangas",
        contact: "+63-43-723-0000",
        mapsUrl: "https://www.google.com/maps/search/Robinsons+Lipa+DFA"
      },
      "Lucena (Pacific Mall, Lucena)": {
        name: "Lucena",
        address: "Pacific Mall, Lucena City, Quezon",
        contact: "+63-42-712-0000",
        mapsUrl: "https://www.google.com/maps/search/Pacific+Mall+Lucena+DFA"
      },
      "Malolos (CTTCH, Xentro Mall, Malolos City)": {
        name: "Malolos",
        address: "CTTCH, Xentro Mall, Malolos City, Bulacan",
        contact: "+63-44-961-0000",
        mapsUrl: "https://www.google.com/maps/search/Xentro+Mall+Malolos+DFA"
      },
      "Olongapo (SM City Olongapo Central)": {
        name: "Olongapo",
        address: "SM City Olongapo Central, Olongapo City, Zambales",
        contact: "+63-47-224-0000",
        mapsUrl: "https://www.google.com/maps/search/SM+City+Olongapo+DFA"
      },
      "Pampanga (Robinsons StarMills San Fernando)": {
        name: "Pampanga",
        address: "Robinsons StarMills San Fernando, Pampanga",
        contact: "+63-45-961-0000",
        mapsUrl: "https://www.google.com/maps/search/Robinsons+StarMills+San+Fernando+DFA"
      },
      "Paniqui, Tarlac (WalterMart)": {
        name: "Paniqui, Tarlac",
        address: "WalterMart, Paniqui, Tarlac",
        contact: "+63-45-982-0000",
        mapsUrl: "https://www.google.com/maps/search/WalterMart+Paniqui+Tarlac+DFA"
      },
      "San Pablo (SM City San Pablo)": {
        name: "San Pablo",
        address: "SM City San Pablo, San Pablo City, Laguna",
        contact: "+63-49-304-0000",
        mapsUrl: "https://www.google.com/maps/search/SM+City+San+Pablo+DFA"
      },
      "Santiago, Isabela (Robinsons Place Santiago)": {
        name: "Santiago, Isabela",
        address: "Robinsons Place Santiago, Santiago, Isabela",
        contact: "+63-78-305-0000",
        mapsUrl: "https://www.google.com/maps/search/Robinsons+Place+Santiago+Isabela+DFA"
      },
      "Tuguegarao (Regional Govt Center, Tuguegarao City)": {
        name: "Tuguegarao",
        address: "Regional Government Center, Tuguegarao City, Cagayan",
        contact: "+63-78-844-0000",
        mapsUrl: "https://www.google.com/maps/search/Regional+Government+Center+Tuguegarao+DFA"
      },
      // Visayas Region
      "Antique (CityMall Antique)": {
        name: "Antique",
        address: "CityMall Antique, Antique",
        contact: "+63-36-540-0000",
        mapsUrl: "https://www.google.com/maps/search/CityMall+Antique+DFA"
      },
      "Bacolod (Robinsons Bacolod)": {
        name: "Bacolod",
        address: "Robinsons Bacolod, Bacolod City, Negros Occidental",
        contact: "+63-34-433-0000",
        mapsUrl: "https://www.google.com/maps/search/Robinsons+Bacolod+DFA"
      },
      "Cebu (Robinsons Galleria, Cebu City)": {
        name: "Cebu",
        address: "Robinsons Galleria, Cebu City, Cebu",
        contact: "+63-32-412-0000",
        mapsUrl: "https://www.google.com/maps/search/Robinsons+Galleria+Cebu+DFA"
      },
      "Dumaguete (Robinsons Dumaguete)": {
        name: "Dumaguete",
        address: "Robinsons Dumaguete, Dumaguete City, Negros Oriental",
        contact: "+63-35-225-0000",
        mapsUrl: "https://www.google.com/maps/search/Robinsons+Dumaguete+DFA"
      },
      "Iloilo (Robinsons Iloilo)": {
        name: "Iloilo",
        address: "Robinsons Iloilo, Iloilo City, Iloilo",
        contact: "+63-33-336-0000",
        mapsUrl: "https://www.google.com/maps/search/Robinsons+Iloilo+DFA"
      },
      "Pagadian (C3 Mall, Pagadian City)": {
        name: "Pagadian",
        address: "C3 Mall, Pagadian City, Zamboanga del Sur",
        contact: "+63-62-214-0000",
        mapsUrl: "https://www.google.com/maps/search/C3+Mall+Pagadian+DFA"
      },
      "Tagbilaran (Alturas Mall, Tagbilaran City)": {
        name: "Tagbilaran",
        address: "Alturas Mall, Tagbilaran City, Bohol",
        contact: "+63-38-501-0000",
        mapsUrl: "https://www.google.com/maps/search/Alturas+Mall+Tagbilaran+DFA"
      },
      "Tacloban (Robinsons N. Abucay, Tacloban City)": {
        name: "Tacloban",
        address: "Robinsons N. Abucay, Tacloban City, Leyte",
        contact: "+63-53-321-0000",
        mapsUrl: "https://www.google.com/maps/search/Robinsons+Tacloban+DFA"
      },
      // Mindanao Region
      "Butuan (Robinsons Butuan)": {
        name: "Butuan",
        address: "Robinsons Butuan, Butuan City, Agusan del Norte",
        contact: "+63-85-225-0000",
        mapsUrl: "https://www.google.com/maps/search/Robinsons+Butuan+DFA"
      },
      "Cagayan De Oro (BPO Tower SM Downtown Premier)": {
        name: "Cagayan De Oro",
        address: "BPO Tower SM Downtown Premier, Cagayan de Oro City, Misamis Oriental",
        contact: "+63-88-857-0000",
        mapsUrl: "https://www.google.com/maps/search/SM+Downtown+Premier+Cagayan+de+Oro+DFA"
      },
      "Clarin (Town Center, Clarin, Misamis Occidental)": {
        name: "Clarin",
        address: "Town Center, Clarin, Misamis Occidental",
        contact: "+63-34-510-0000",
        mapsUrl: "https://www.google.com/maps/search/Town+Center+Clarin+DFA"
      },
      "Davao (SM City Davao)": {
        name: "Davao",
        address: "SM City Davao, Davao City, Davao del Sur",
        contact: "+63-82-221-0000",
        mapsUrl: "https://www.google.com/maps/search/SM+City+Davao+DFA"
      },
      "General Santos (Robinsons Gen. Santos City)": {
        name: "General Santos",
        address: "Robinsons General Santos City, General Santos City, South Cotabato",
        contact: "+63-83-552-0000",
        mapsUrl: "https://www.google.com/maps/search/Robinsons+General+Santos+DFA"
      },
      "Kidapawan (Kidapawan City)": {
        name: "Kidapawan",
        address: "Kidapawan City, North Cotabato",
        contact: "+63-64-288-0000",
        mapsUrl: "https://www.google.com/maps/search/Kidapawan+City+DFA"
      },
      "Zamboanga (Go-Velayo Bldg. Vet. Ave., Zamboanga)": {
        name: "Zamboanga",
        address: "Go-Velayo Building, Veterinary Avenue, Zamboanga City, Zamboanga del Sur",
        contact: "+63-62-991-0000",
        mapsUrl: "https://www.google.com/maps/search/Zamboanga+City+Veterinary+Avenue+DFA"
      },
      // Other Luzon Region
      "Calasiao (Robinsons Calasiao, Pangasinan)": {
        name: "Calasiao",
        address: "Robinsons Calasiao, Pangasinan",
        contact: "+63-75-523-0000",
        mapsUrl: "https://www.google.com/maps/search/Robinsons+Calasiao+DFA"
      },
      "Ilocos Norte (Robinsons Place, San Nicolas)": {
        name: "Ilocos Norte",
        address: "Robinsons Place, San Nicolas, Ilocos Norte",
        contact: "+63-77-700-0000",
        mapsUrl: "https://www.google.com/maps/search/Robinsons+Place+San+Nicolas+DFA"
      },
      // Palawan
      "Puerto Prinsesa (Robinsons Palawan)": {
        name: "Puerto Prinsesa",
        address: "Robinsons Palawan, Puerto Prinsesa City, Palawan",
        contact: "+63-48-434-0000",
        mapsUrl: "https://www.google.com/maps/search/Robinsons+Palawan+Puerto+Prinsesa+DFA"
      }
    }
  }
};

export default function SiteSelection({ onNext, initialData }: SiteSelectionProps) {
  const [region, setRegion] = useState(initialData.region || "ASIA PACIFIC");
  const [country, setCountry] = useState(initialData.country || "PHILIPPINES");
  const [site, setSite] = useState(initialData.site || "");
  const [selectedOffice, setSelectedOffice] = useState<OfficeInfo | null>(null);

  const regions = ["ASIA PACIFIC"];
  const countries = ["PHILIPPINES"];
  
  const availableSites = OFFICE_DATABASE[region]?.[country] || {};

  const handleSiteChange = (value: string) => {
    setSite(value);
    const office = availableSites[value as keyof typeof availableSites];
    setSelectedOffice(office || null);
  };

  const handleNext = () => {
    if (region && country && site) {
      onNext({ region, country, site });
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-primary" />
            Site Location
          </CardTitle>
          <CardDescription>
            Specify the site where you want to set an appointment:
          </CardDescription>
        </CardHeader>
        <CardContent className="grid md:grid-cols-2 gap-8">
          {/* Left Column - Selection Fields */}
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-bold">Region <span className="text-red-500">*</span></label>
              <Select value={region} onValueChange={setRegion}>
                <SelectTrigger className="h-10">
                  <SelectValue placeholder="Select Region" />
                </SelectTrigger>
                <SelectContent>
                  {regions.map((r) => (
                    <SelectItem key={r} value={r}>
                      {r}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold">Country/Special Administrative Region <span className="text-red-500">*</span></label>
              <Select value={country} onValueChange={setCountry}>
                <SelectTrigger className="h-10">
                  <SelectValue placeholder="Select Country" />
                </SelectTrigger>
                <SelectContent>
                  {countries.map((c) => (
                    <SelectItem key={c} value={c}>
                      {c}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold">Site <span className="text-red-500">*</span></label>
              <Select value={site} onValueChange={handleSiteChange}>
                <SelectTrigger className="h-10">
                  <SelectValue placeholder="- PLEASE SELECT A SITE -" />
                </SelectTrigger>
                <SelectContent className="max-h-96 overflow-y-auto">
                  {Object.keys(availableSites).map((s) => (
                    <SelectItem key={s} value={s}>
                      {s}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Right Column - Office Details */}
          <div className="space-y-4">
            <div>
              <label className="text-sm font-bold text-muted-foreground">Office Name</label>
              <div className="mt-2 p-3 bg-muted rounded border">
                <p className="text-sm">{selectedOffice?.name || "-"}</p>
              </div>
            </div>

            <div>
              <label className="text-sm font-bold text-muted-foreground">Office Address</label>
              <div className="mt-2 p-3 bg-muted rounded border min-h-[100px] space-y-2">
                <p className="text-sm leading-relaxed">{selectedOffice?.address || "-"}</p>
                {selectedOffice?.mapsUrl && (
                  <a 
                    href={selectedOffice.mapsUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-xs text-primary hover:text-primary/80 font-semibold mt-2"
                  >
                    <MapPin className="h-4 w-4" />
                    View on Google Maps & Directions
                    <ExternalLink className="h-3 w-3" />
                  </a>
                )}
              </div>
            </div>

            <div>
              <label className="text-sm font-bold text-muted-foreground">Contact Number</label>
              <div className="mt-2 p-3 bg-muted rounded border">
                <p className="text-sm">{selectedOffice?.contact || "-"}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          Please note: Appointment dates and times are subject to availability. Peak periods may have limited slots. We recommend booking your appointment at least 2 weeks in advance.
        </AlertDescription>
      </Alert>

      <div className="flex justify-between">
        <Button variant="outline" onClick={() => onNext(null)}>
          Cancel
        </Button>
        <Button onClick={handleNext} disabled={!region || !country || !site} size="lg">
          Next Step
        </Button>
      </div>
    </div>
  );
}