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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MapPin, Phone, ExternalLink, AlertCircle } from "lucide-react";
import { OFFICE_DATABASE, type OfficeInfo } from "./appointment/SiteSelection";

interface WhereToApplyModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function WhereToApplyModal({ open, onOpenChange }: WhereToApplyModalProps) {
  const [selectedRegion, setSelectedRegion] = useState<string>("");
  const [selectedCountry, setSelectedCountry] = useState<string>("");
  const [selectedSite, setSelectedSite] = useState<string>("");

  const regions = Object.keys(OFFICE_DATABASE);
  
  const countries = selectedRegion 
    ? Object.keys(OFFICE_DATABASE[selectedRegion] || {}) 
    : [];

  const sites = selectedRegion && selectedCountry
    ? Object.entries(OFFICE_DATABASE[selectedRegion]?.[selectedCountry] || {}).map(([key, value]) => ({
        key,
        ...value
      }))
    : [];

  const selectedOffice = sites.find(s => s.key === selectedSite) as (OfficeInfo & { key: string }) | undefined;

  const handleOpenMaps = () => {
    if (selectedOffice?.mapsUrl) {
      window.open(selectedOffice.mapsUrl, "_blank");
    }
  };

  const handleReset = () => {
    setSelectedRegion("");
    setSelectedCountry("");
    setSelectedSite("");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-serif text-primary">
            Where to Apply
          </DialogTitle>
          <DialogDescription>
            Select your nearest DFA office location and get directions
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Selection Controls */}
          <div className="space-y-4">
            <div>
              <label className="text-sm font-semibold text-foreground mb-2 block">
                Select Region
              </label>
              <Select value={selectedRegion} onValueChange={(value) => {
                setSelectedRegion(value);
                setSelectedCountry("");
                setSelectedSite("");
              }}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose a region..." />
                </SelectTrigger>
                <SelectContent>
                  {regions.map((region) => (
                    <SelectItem key={region} value={region}>
                      {region}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {selectedRegion && (
              <div>
                <label className="text-sm font-semibold text-foreground mb-2 block">
                  Select Province/Location
                </label>
                <Select value={selectedCountry} onValueChange={(value) => {
                  setSelectedCountry(value);
                  setSelectedSite("");
                }}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a province..." />
                  </SelectTrigger>
                  <SelectContent>
                    {countries.map((country) => (
                      <SelectItem key={country} value={country}>
                        {country}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            {selectedCountry && (
              <div>
                <label className="text-sm font-semibold text-foreground mb-2 block">
                  Select Office
                </label>
                <Select value={selectedSite} onValueChange={setSelectedSite}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose an office..." />
                  </SelectTrigger>
                  <SelectContent>
                    {sites.map((site) => (
                      <SelectItem key={site.key} value={site.key}>
                        {site.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>

          {/* Office Details */}
          {selectedOffice && (
            <div className="border-2 border-primary/30 rounded-lg p-4 bg-primary/5 space-y-3">
              <h3 className="font-semibold text-lg text-primary">
                {selectedOffice.name}
              </h3>
              
              <div className="space-y-2 text-sm">
                <div className="flex gap-3">
                  <MapPin className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <p className="text-foreground">{selectedOffice.address}</p>
                </div>
                
                {selectedOffice.contact && (
                  <div className="flex gap-3">
                    <Phone className="h-5 w-5 text-primary flex-shrink-0" />
                    <a
                      href={`tel:${selectedOffice.contact}`}
                      className="text-primary hover:underline"
                    >
                      {selectedOffice.contact}
                    </a>
                  </div>
                )}
              </div>

              <Alert className="bg-blue-50 border-blue-200">
                <AlertCircle className="h-4 w-4 text-blue-600" />
                <AlertDescription className="text-blue-800 text-sm">
                  Office hours and services may vary. Please verify before visiting.
                </AlertDescription>
              </Alert>

              <Button 
                className="w-full gap-2" 
                onClick={handleOpenMaps}
              >
                <ExternalLink className="h-4 w-4" />
                Get Directions on Google Maps
              </Button>
            </div>
          )}

          {!selectedOffice && selectedRegion && (
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                Select a province and office to view details and get directions.
              </AlertDescription>
            </Alert>
          )}
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t">
          <Button variant="outline" onClick={handleReset}>
            Reset
          </Button>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
