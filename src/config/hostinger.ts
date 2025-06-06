
export const hostingerConfig = {
  // Replace these with your actual Hostinger API credentials
  apiKey: import.meta.env.VITE_HOSTINGER_API_KEY || 'your-hostinger-api-key',
  apiUrl: import.meta.env.VITE_HOSTINGER_API_URL || 'https://your-hostinger-domain.com/api',
  
  // SMS/OTP configuration
  smsProvider: 'hostinger', // or your SMS provider
  
  // Database sync settings
  enableSync: true,
  retryAttempts: 3,
  syncInterval: 30000 // 30 seconds
};

// Validation function
export const validateHostingerConfig = (): boolean => {
  return !!(hostingerConfig.apiKey && hostingerConfig.apiUrl);
};
