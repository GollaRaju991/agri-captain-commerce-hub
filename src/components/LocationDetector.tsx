
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { MapPin, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';

interface LocationData {
  pincode: string;
  city: string;
  state: string;
  area: string;
}

interface LocationDetectorProps {
  onLocationDetected: (location: LocationData) => void;
}

const LocationDetector: React.FC<LocationDetectorProps> = ({ onLocationDetected }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { translations } = useLanguage();

  const getCurrentLocation = async () => {
    setIsLoading(true);
    
    if (!navigator.geolocation) {
      toast({
        title: "Location Not Supported",
        description: "Geolocation is not supported by this browser.",
        variant: "destructive"
      });
      setIsLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          
          // In a real app, you would call a reverse geocoding API
          // For demo purposes, we'll simulate the response
          const mockLocationData = {
            pincode: "500001",
            city: "Hyderabad",
            state: "Telangana",
            area: "Secunderabad"
          };
          
          onLocationDetected(mockLocationData);
          
          toast({
            title: "Location Detected",
            description: `${mockLocationData.area}, ${mockLocationData.city}`
          });
        } catch (error) {
          toast({
            title: "Error",
            description: "Failed to get location details.",
            variant: "destructive"
          });
        } finally {
          setIsLoading(false);
        }
      },
      (error) => {
        toast({
          title: "Location Error",
          description: "Please allow location access or enter manually.",
          variant: "destructive"
        });
        setIsLoading(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 60000
      }
    );
  };

  return (
    <Button
      type="button"
      variant="outline"
      onClick={getCurrentLocation}
      disabled={isLoading}
      className="w-full"
    >
      {isLoading ? (
        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
      ) : (
        <MapPin className="h-4 w-4 mr-2" />
      )}
      {translations.get_location}
    </Button>
  );
};

export default LocationDetector;
