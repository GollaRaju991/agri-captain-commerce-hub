
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Package, Truck, CheckCircle, Clock, Eye } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';

const Orders = () => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  // Mock orders data - in real app this would come from backend
  const orders = [
    {
      id: 'ORD001',
      date: '2024-01-15',
      total: 1299,
      status: 'Delivered',
      items: 2,
      products: ['Premium Tomato Seeds', 'Organic NPK Fertilizer'],
      trackingId: 'TRK123456789'
    },
    {
      id: 'ORD002',
      date: '2024-01-10',
      total: 599,
      status: 'In Transit',
      items: 1,
      products: ['Garden Tools Set'],
      trackingId: 'TRK987654321'
    },
    {
      id: 'ORD003',
      date: '2024-01-05',
      total: 2499,
      status: 'Processing',
      items: 3,
      products: ['Drip Irrigation Kit', 'Soil pH Tester', 'Organic Pesticide'],
      trackingId: 'TRK456789123'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Delivered':
        return 'bg-green-100 text-green-800';
      case 'In Transit':
        return 'bg-blue-100 text-blue-800';
      case 'Processing':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Delivered':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'In Transit':
        return <Truck className="h-4 w-4 text-blue-600" />;
      case 'Processing':
        return <Clock className="h-4 w-4 text-yellow-600" />;
      default:
        return <Package className="h-4 w-4 text-gray-600" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Your Orders</h1>
          <p className="text-gray-600">Track and manage your AgriCaptain orders</p>
        </div>

        {orders.length > 0 ? (
          <div className="space-y-6">
            {orders.map((order) => (
              <Card key={order.id} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg">Order #{order.id}</CardTitle>
                      <p className="text-sm text-gray-600">
                        Placed on {new Date(order.date).toLocaleDateString('en-IN', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(order.status)}
                      <Badge className={getStatusColor(order.status)}>
                        {order.status}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Items Ordered:</p>
                        <div className="text-sm text-gray-600">
                          {order.products.map((product, index) => (
                            <span key={index}>
                              {product}
                              {index < order.products.length - 1 && ', '}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-600">{order.items} item(s)</p>
                        <p className="font-bold text-lg">₹{order.total}</p>
                      </div>
                    </div>
                    
                    {order.trackingId && (
                      <div className="border-t pt-4">
                        <p className="text-sm text-gray-600">
                          Tracking ID: <span className="font-mono font-medium">{order.trackingId}</span>
                        </p>
                      </div>
                    )}
                    
                    <div className="flex items-center space-x-3 pt-4">
                      <Button variant="outline" size="sm" className="flex items-center space-x-1">
                        <Truck className="h-4 w-4" />
                        <span>Track Order</span>
                      </Button>
                      <Button variant="ghost" size="sm" className="flex items-center space-x-1">
                        <Eye className="h-4 w-4" />
                        <span>View Details</span>
                      </Button>
                      {order.status === 'Delivered' && (
                        <Button variant="outline" size="sm">
                          Reorder
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="text-center py-16">
              <Package className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No orders yet</h3>
              <p className="text-gray-600 mb-6">You haven't placed any orders with AgriCaptain yet.</p>
              <Button>Start Shopping</Button>
            </CardContent>
          </Card>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Orders;
