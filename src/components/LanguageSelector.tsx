
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Languages } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const languages = [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी' },
  { code: 'te', name: 'Telugu', nativeName: 'తెలుగు' },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்' },
  { code: 'kn', name: 'Kannada', nativeName: 'ಕನ್ನಡ' },
  { code: 'ml', name: 'Malayalam', nativeName: 'മലയാളം' },
  { code: 'gu', name: 'Gujarati', nativeName: 'ગુજરાતી' },
  { code: 'mr', name: 'Marathi', nativeName: 'मराठी' },
  { code: 'bn', name: 'Bengali', nativeName: 'বাংলা' },
  { code: 'pa', name: 'Punjabi', nativeName: 'ਪੰਜਾਬੀ' }
];

interface LanguageSelectorProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ 
  open, 
  onOpenChange
}) => {
  const { language, setLanguage } = useLanguage();

  const handleLanguageChange = (languageCode: string) => {
    setLanguage(languageCode);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Languages className="h-5 w-5" />
            Select Language / भाषा चुनें
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <p className="text-sm text-gray-600">
            Choose your preferred language for the application
          </p>
          
          <div className="grid grid-cols-1 gap-2">
            {languages.map((lang) => (
              <Button
                key={lang.code}
                variant={language === lang.code ? "default" : "outline"}
                className="justify-start h-auto p-3"
                onClick={() => handleLanguageChange(lang.code)}
              >
                <div className="text-left">
                  <div className="font-medium">{lang.nativeName}</div>
                  <div className="text-sm opacity-70">{lang.name}</div>
                </div>
              </Button>
            ))}
          </div>
          
          <div className="pt-4 border-t">
            <p className="text-xs text-gray-500">
              Language settings will be applied throughout the application
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LanguageSelector;
