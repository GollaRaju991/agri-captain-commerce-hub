
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Smartphone, Download, QrCode, Tablet, ExternalLink, CheckCircle } from 'lucide-react';

const MobileAppDownload = () => {
  const [downloadStarted, setDownloadStarted] = useState(false);

  const handleDownloadInstructions = () => {
    // This would typically link to your app store or APK download
    window.open('https://docs.lovable.dev/tips-tricks/mobile-development', '_blank');
  };

  const handleDirectDownload = () => {
    setDownloadStarted(true);
    // This would be your actual APK download link
    const downloadLink = document.createElement('a');
    downloadLink.href = '/AgriCaptain.apk'; // You'll need to host your APK file
    downloadLink.download = 'AgriCaptain.apk';
    downloadLink.click();
    
    setTimeout(() => setDownloadStarted(false), 3000);
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
              <p className="font-medium">Android APK</p>
              <p className="text-sm text-gray-600">Direct download available</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
            <QrCode className="h-5 w-5 text-green-600" />
            <div>
              <p className="font-medium">QR Code Download</p>
              <p className="text-sm text-gray-600">Scan to download directly</p>
            </div>
          </div>

          <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
            <ExternalLink className="h-5 w-5 text-blue-600" />
            <div>
              <p className="font-medium">Play Store</p>
              <p className="text-sm text-gray-600">Coming soon...</p>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <Button 
            onClick={handleDirectDownload}
            className="w-full bg-green-600 hover:bg-green-700"
            disabled={downloadStarted}
          >
            {downloadStarted ? (
              <>
                <CheckCircle className="h-4 w-4 mr-2" />
                Download Started
              </>
            ) : (
              <>
                <Download className="h-4 w-4 mr-2" />
                Download APK (Direct)
              </>
            )}
          </Button>

          <Button 
            onClick={handleDownloadInstructions}
            variant="outline"
            className="w-full"
          >
            Build Instructions
          </Button>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded p-3">
          <p className="text-yellow-800 text-sm font-medium">📱 Android Features:</p>
          <ul className="text-yellow-700 text-xs mt-1 space-y-1">
            <li>• Offline product browsing</li>
            <li>• Push notifications for orders</li>
            <li>• Native camera for product scanning</li>
            <li>• GPS location for delivery</li>
            <li>• Biometric login support</li>
          </ul>
        </div>

        <div className="text-xs text-gray-500 text-center">
          <p>Current version: 1.0.0</p>
          <p>Last updated: {new Date().toLocaleDateString()}</p>
          <p>Size: ~15MB | Minimum Android: 7.0</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default MobileAppDownload;
