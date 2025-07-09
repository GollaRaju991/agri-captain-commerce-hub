import React, { useEffect, useState } from 'react';

interface LocationData {
  country: string;
  state: string;
  district: string;
  division?: string;
  mandal?: string;
}

interface LocationDetectorProps {
  enabled?: boolean;
  onLocationDetected: (location: LocationData) => void;
}

const LocationDetector: React.FC<LocationDetectorProps> = ({ enabled = false, onLocationDetected }) => {
  const [isDetecting, setIsDetecting] = useState(false);

  useEffect(() => {
    if (!enabled) return;

    const detectLocation = async () => {
      setIsDetecting(true);
      
      try {
        // First try to get location using browser geolocation
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            async (position) => {
              const { latitude, longitude } = position.coords;
              
              try {
                // Use a reverse geocoding service to get location details
                // For demo purposes, we'll use a mock response for India/Telangana
                const mockLocationData: LocationData = {
                  country: 'India',
                  state: 'Telangana',
                  district: 'Hyderabad',
                  division: 'Secunderabad',
                  mandal: 'Begumpet'
                };
                
                onLocationDetected(mockLocationData);
              } catch (error) {
                console.error('Error in reverse geocoding:', error);
                // Fallback to default location
                onLocationDetected({
                  country: 'India',
                  state: 'Telangana',
                  district: 'Hyderabad'
                });
              }
              setIsDetecting(false);
            },
            (error) => {
              console.error('Geolocation error:', error);
              // Fallback to IP-based location detection or default
              onLocationDetected({
                country: 'India',
                state: 'Telangana',
                district: 'Hyderabad'
              });
              setIsDetecting(false);
            }
          );
        } else {
          // Geolocation not supported, use default
          onLocationDetected({
            country: 'India',
            state: 'Telangana',
            district: 'Hyderabad'
          });
          setIsDetecting(false);
        }
      } catch (error) {
        console.error('Location detection error:', error);
        onLocationDetected({
          country: 'India',
          state: 'Telangana',
          district: 'Hyderabad'
        });
        setIsDetecting(false);
      }
    };

    detectLocation();
  }, [enabled, onLocationDetected]);

  if (!enabled || !isDetecting) {
    return null;
  }

  return (
    <div className="text-xs text-gray-500">
      📍 Detecting location...
    </div>
  );
};

export default LocationDetector;