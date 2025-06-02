
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

interface FarmWorkerDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const FarmWorkerDialog: React.FC<FarmWorkerDialogProps> = ({ open, onOpenChange }) => {
  const [workerType, setWorkerType] = useState('');
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearched, setIsSearched] = useState(false);

  const workerTypes = [
    'Field Worker',
    'Harvester',
    'Planting Specialist',
    'Irrigation Expert',
    'Pesticide Applicator',
    'General Laborer',
    'Equipment Operator',
    'Supervisor'
  ];

  const handleSearch = () => {
    // Simulate search results
    const mockResults = [
      {
        id: 1,
        name: 'Rajesh Kumar',
        type: workerType,
        experience: '5 years',
        rating: 4.5,
        rate: '₹500/day',
        location: 'Punjab',
        availability: 'Available'
      },
      {
        id: 2,
        name: 'Suresh Patel',
        type: workerType,
        experience: '8 years',
        rating: 4.8,
        rate: '₹600/day',
        location: 'Gujarat',
        availability: 'Available'
      },
      {
        id: 3,
        name: 'Mohan Singh',
        type: workerType,
        experience: '3 years',
        rating: 4.2,
        rate: '₹450/day',
        location: 'Haryana',
        availability: 'Busy until next week'
      }
    ];
    setSearchResults(mockResults);
    setIsSearched(true);
  };

  const resetForm = () => {
    setWorkerType('');
    setStartDate(undefined);
    setEndDate(undefined);
    setSearchResults([]);
    setIsSearched(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Find Farm Workers</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Search Form */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="worker-type">Worker Type</Label>
              <Select value={workerType} onValueChange={setWorkerType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select worker type" />
                </SelectTrigger>
                <SelectContent>
                  {workerTypes.map((type) => (
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
            <Button onClick={handleSearch} disabled={!workerType || !startDate || !endDate}>
              Search Workers
            </Button>
            <Button variant="outline" onClick={resetForm}>
              Reset
            </Button>
          </div>

          {/* Search Results */}
          {isSearched && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Available Workers ({searchResults.length})</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {searchResults.map((worker) => (
                  <div key={worker.id} className="border rounded-lg p-4 space-y-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-semibold">{worker.name}</h4>
                        <p className="text-sm text-gray-600">{worker.type}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-green-600">{worker.rate}</p>
                        <p className="text-sm text-yellow-600">★ {worker.rating}</p>
                      </div>
                    </div>
                    <div className="text-sm space-y-1">
                      <p><strong>Experience:</strong> {worker.experience}</p>
                      <p><strong>Location:</strong> {worker.location}</p>
                      <p><strong>Status:</strong> 
                        <span className={worker.availability === 'Available' ? 'text-green-600' : 'text-orange-600'}>
                          {worker.availability}
                        </span>
                      </p>
                    </div>
                    <Button className="w-full" size="sm">
                      Contact Worker
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

export default FarmWorkerDialog;
