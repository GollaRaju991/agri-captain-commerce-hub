
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Smartphone, Download, QrCode, Tablet } from 'lucide-react';

const MobileAppDownload = () => {
  const handleDownloadInstructions = () => {
    // This would typically link to your app store or APK download
    window.open('https://docs.lovable.dev/tips-tricks/mobile-development', '_blank');
  };

  return (
    <Card className="max-w-md mx-auto">
      <CardHeader className="text-center">
        <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
          <Smartphone className="h-8 w-8 text-green-600" />
        </div>
        <CardTitle className="text-xl">Download AgriCaptain Mobile App</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-center text-gray-600">
          <p>Get the full AgriCaptain experience on your mobile device!</p>
        </div>
        
        <div className="space-y-3">
          <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
            <Tablet className="h-5 w-5 text-green-600" />
            <div>
              <p className="font-medium">Android</p>
              <p className="text-sm text-gray-600">Available for Android 7.0+</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
            <QrCode className="h-5 w-5 text-green-600" />
            <div>
              <p className="font-medium">QR Code Download</p>
              <p className="text-sm text-gray-600">Scan to download directly</p>
            </div>
          </div>
        </div>

        <Button 
          onClick={handleDownloadInstructions}
          className="w-full bg-green-600 hover:bg-green-700"
        >
          <Download className="h-4 w-4 mr-2" />
          Download Instructions
        </Button>

        <div className="text-xs text-gray-500 text-center">
          <p>Current version: 1.0.0</p>
          <p>Last updated: {new Date().toLocaleDateString()}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default MobileAppDownload;
