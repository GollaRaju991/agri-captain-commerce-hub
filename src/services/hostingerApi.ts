
interface HostingerConfig {
  apiKey: string;
  baseUrl: string;
}

interface OrderData {
  orderId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  items: Array<{
    id: string;
    name: string;
    quantity: number;
    price: number;
  }>;
  totalAmount: number;
  paymentMethod: string;
  address: any;
}

interface OTPRequest {
  phone: string;
  message: string;
}

class HostingerApiService {
  private config: HostingerConfig;

  constructor(config: HostingerConfig) {
    this.config = config;
  }

  // Send OTP via Hostinger
  async sendOTP(phone: string, otp: string): Promise<{ success: boolean; error?: string }> {
    try {
      const response = await fetch(`${this.config.baseUrl}/send-sms`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.config.apiKey}`,
        },
        body: JSON.stringify({
          phone: phone,
          message: `Your AgriCaptain OTP is: ${otp}. Valid for 5 minutes.`
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      return { success: true };
    } catch (error) {
      console.error('Hostinger OTP error:', error);
      return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
    }
  }

  // Store order data to Hostinger
  async saveOrder(orderData: OrderData): Promise<{ success: boolean; error?: string }> {
    try {
      const response = await fetch(`${this.config.baseUrl}/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.config.apiKey}`,
        },
        body: JSON.stringify(orderData)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      return { success: true };
    } catch (error) {
      console.error('Hostinger order save error:', error);
      return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
    }
  }

  // Get customer data from Hostinger
  async getCustomerData(customerId: string): Promise<{ success: boolean; data?: any; error?: string }> {
    try {
      const response = await fetch(`${this.config.baseUrl}/customers/${customerId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${this.config.apiKey}`,
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return { success: true, data };
    } catch (error) {
      console.error('Hostinger customer data error:', error);
      return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
    }
  }

  // Sync order status with Hostinger
  async updateOrderStatus(orderId: string, status: string): Promise<{ success: boolean; error?: string }> {
    try {
      const response = await fetch(`${this.config.baseUrl}/orders/${orderId}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.config.apiKey}`,
        },
        body: JSON.stringify({ status })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return { success: true };
    } catch (error) {
      console.error('Hostinger order status update error:', error);
      return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
    }
  }
}

// Create and export the Hostinger API instance
export const hostingerApi = new HostingerApiService({
  apiKey: import.meta.env.VITE_HOSTINGER_API_KEY || 'your-hostinger-api-key-here',
  baseUrl: import.meta.env.VITE_HOSTINGER_API_URL || 'https://your-hostinger-domain.com/api'
});

export type { OrderData, OTPRequest };
