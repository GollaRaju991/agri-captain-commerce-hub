
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Bell, Package, Gift, Truck, AlertCircle, CheckCircle } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';

const Notifications = () => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  // Mock notifications data
  const notifications = [
    {
      id: '1',
      type: 'order',
      title: 'Order Delivered Successfully',
      message: 'Your order #ORD001 has been delivered. Thank you for shopping with AgriCaptain!',
      time: '2 hours ago',
      isRead: false,
      icon: Package
    },
    {
      id: '2',
      type: 'offer',
      title: 'New Coupon Available',
      message: 'Get ₹50 off on your next order with code WELCOME50. Valid till 31st Dec.',
      time: '1 day ago',
      isRead: false,
      icon: Gift
    },
    {
      id: '3',
      type: 'shipping',
      title: 'Order Shipped',
      message: 'Your order #ORD002 has been shipped and will reach you soon. Track your order.',
      time: '2 days ago',
      isRead: true,
      icon: Truck
    },
    {
      id: '4',
      type: 'alert',
      title: 'Payment Reminder',
      message: 'Your pending payment of ₹599 for order #ORD003 is due tomorrow.',
      time: '3 days ago',
      isRead: true,
      icon: AlertCircle
    }
  ];

  const getIconColor = (type: string) => {
    switch (type) {
      case 'order':
        return 'text-green-600';
      case 'offer':
        return 'text-blue-600';
      case 'shipping':
        return 'text-orange-600';
      case 'alert':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  const markAllAsRead = () => {
    // Implementation for marking all notifications as read
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Notifications</h1>
            <p className="text-gray-600">Stay updated with your AgriCaptain activities</p>
          </div>
          {notifications.some(n => !n.isRead) && (
            <Button variant="outline" onClick={markAllAsRead}>
              Mark all as read
            </Button>
          )}
        </div>

        {notifications.length > 0 ? (
          <div className="space-y-4">
            {notifications.map((notification) => {
              const IconComponent = notification.icon;
              return (
                <Card 
                  key={notification.id} 
                  className={`hover:shadow-md transition-shadow ${
                    !notification.isRead ? 'border-l-4 border-l-blue-500 bg-blue-50' : ''
                  }`}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className={`flex-shrink-0 w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center ${getIconColor(notification.type)}`}>
                        <IconComponent className="h-5 w-5" />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <h3 className="text-sm font-semibold text-gray-900 truncate">
                            {notification.title}
                          </h3>
                          {!notification.isRead && (
                            <Badge className="bg-blue-500 text-xs ml-2">New</Badge>
                          )}
                        </div>
                        
                        <p className="text-sm text-gray-600 mb-2">
                          {notification.message}
                        </p>
                        
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-gray-400">{notification.time}</span>
                          {!notification.isRead && (
                            <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700">
                              Mark as read
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        ) : (
          <Card>
            <CardContent className="text-center py-16">
              <Bell className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No notifications</h3>
              <p className="text-gray-600">You're all caught up! We'll notify you when there are new updates.</p>
            </CardContent>
          </Card>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Notifications;
