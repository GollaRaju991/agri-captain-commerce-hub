
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

interface RentVehicleDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const RentVehicleDialog: React.FC<RentVehicleDialogProps> = ({ open, onOpenChange }) => {
  const [vehicleType, setVehicleType] = useState('');
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearched, setIsSearched] = useState(false);

  const vehicleTypes = [
    'Tractor',
    'Harvester',
    'Cultivator',
    'Seed Drill',
    'Thresher',
    'Rotavator',
    'Plough',
    'Sprayer',
    'Truck',
    'Trailer'
  ];

  const handleSearch = () => {
    // Simulate search results
    const mockResults = [
      {
        id: 1,
        name: 'John Deere 5050D',
        type: vehicleType,
        model: '2022',
        rate: '₹1500/day',
        location: 'Punjab',
        owner: 'Ram Singh',
        condition: 'Excellent',
        availability: 'Available'
      },
      {
        id: 2,
        name: 'Mahindra 575 DI',
        type: vehicleType,
        model: '2021',
        rate: '₹1200/day',
        location: 'Haryana',
        owner: 'Suresh Kumar',
        condition: 'Good',
        availability: 'Available'
      },
      {
        id: 3,
        name: 'Sonalika DI 745 III',
        type: vehicleType,
        model: '2020',
        rate: '₹1000/day',
        location: 'Gujarat',
        owner: 'Prakash Patel',
        condition: 'Good',
        availability: 'Booked until next week'
      }
    ];
    setSearchResults(mockResults);
    setIsSearched(true);
  };

  const resetForm = () => {
    setVehicleType('');
    setStartDate(undefined);
    setEndDate(undefined);
    setSearchResults([]);
    setIsSearched(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Rent Farm Vehicles</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Search Form */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="vehicle-type">Vehicle Type</Label>
              <Select value={vehicleType} onValueChange={setVehicleType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select vehicle type" />
                </SelectTrigger>
                <SelectContent>
                  {vehicleTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Start Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !startDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {startDate ? format(startDate, "PPP") : <span>Pick start date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={startDate}
                    onSelect={setStartDate}
                    initialFocus
                    className="pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div>
              <Label>End Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !endDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {endDate ? format(endDate, "PPP") : <span>Pick end date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={endDate}
                    onSelect={setEndDate}
                    initialFocus
                    className="pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <div className="flex gap-2">
            <Button onClick={handleSearch} disabled={!vehicleType || !startDate || !endDate}>
              Search Vehicles
            </Button>
            <Button variant="outline" onClick={resetForm}>
              Reset
            </Button>
          </div>

          {/* Search Results */}
          {isSearched && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Available Vehicles ({searchResults.length})</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {searchResults.map((vehicle) => (
                  <div key={vehicle.id} className="border rounded-lg p-4 space-y-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-semibold">{vehicle.name}</h4>
                        <p className="text-sm text-gray-600">{vehicle.type} - {vehicle.model}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-green-600">{vehicle.rate}</p>
                      </div>
                    </div>
                    <div className="text-sm space-y-1">
                      <p><strong>Owner:</strong> {vehicle.owner}</p>
                      <p><strong>Location:</strong> {vehicle.location}</p>
                      <p><strong>Condition:</strong> {vehicle.condition}</p>
                      <p><strong>Status:</strong> 
                        <span className={vehicle.availability === 'Available' ? 'text-green-600' : 'text-orange-600'}>
                          {vehicle.availability}
                        </span>
                      </p>
                    </div>
                    <Button className="w-full" size="sm">
                      Book Vehicle
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RentVehicleDialog;
