
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { X, ExternalLink } from 'lucide-react';

interface ApplyIPOModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ApplyIPOModal: React.FC<ApplyIPOModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl bg-gradient-to-br from-blue-50 to-purple-50 border-0 shadow-2xl">
        <CardHeader className="relative text-center pb-6">
          <button
            onClick={onClose}
            className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
          >
            <X className="w-6 h-6" />
          </button>
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
            <span className="text-white text-2xl">📈</span>
          </div>
          <CardTitle className="text-2xl font-bold text-gray-900">
            Applying for this IPO?
          </CardTitle>
          <Badge className="mx-auto mt-2 bg-blue-600">BLUESTOCK</Badge>
        </CardHeader>
        
        <CardContent className="text-center space-y-6">
          <p className="text-gray-700 text-lg leading-relaxed">
            The way you compare & invest in only the best IPO, let us help you get started by comparing and 
            selecting the best Demat account. Open your Demat account now to apply for your favourite IPO.
          </p>
          
          <div className="space-y-4">
            <Button 
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white py-3 text-lg font-semibold"
              size="lg"
            >
              Open a Demat Account
            </Button>
            
            <div className="flex space-x-4">
              <Button variant="outline" className="flex-1" onClick={onClose}>
                Learn More
              </Button>
              <Button variant="outline" className="flex-1">
                Compare Brokers
                <ExternalLink className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
          
          <div className="bg-blue-100 p-4 rounded-lg">
            <p className="text-sm text-blue-800">
              <strong>Pro Tip:</strong> Compare different brokers and their features before opening a Demat account 
              to ensure you get the best rates and services for IPO applications.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ApplyIPOModal;
