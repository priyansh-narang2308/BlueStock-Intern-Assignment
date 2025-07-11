
import React from 'react';
import { IPO } from '@/data/ipoData';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Calendar, TrendingUp, Package, ExternalLink } from 'lucide-react';

interface IPOCardProps {
  ipo: IPO;
  onClick?: () => void;
  variant?: 'default' | 'compact';
}

const IPOCard: React.FC<IPOCardProps> = ({ ipo, onClick, variant = 'default' }) => {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'upcoming':
        return <Badge variant="info" className="text-xs">Upcoming</Badge>;
      case 'ongoing':
        return <Badge variant="success" className="text-xs">Live</Badge>;
      case 'closed':
        return <Badge variant="warning" className="text-xs">Closed</Badge>;
      case 'listed':
        return <Badge variant="secondary" className="text-xs">Listed</Badge>;
      default:
        return <Badge variant="outline" className="text-xs">Unknown</Badge>;
    }
  };

  const formatDate = (dateString: string) => {
    if (dateString === 'Not Issued' || !dateString) return 'Not Issued';
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: '2-digit'
    });
  };

  const formatPriceRange = () => {
    if (ipo.priceRange.min === 0 && ipo.priceRange.max === 0) {
      return 'Not Issued';
    }
    if (ipo.priceRange.min === ipo.priceRange.max) {
      return `₹${ipo.priceRange.min}`;
    }
    return `₹${ipo.priceRange.min} - ${ipo.priceRange.max}`;
  };

  if (variant === 'compact') {
    return (
      <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer border-l-4 border-l-blue-500" onClick={onClick}>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="text-2xl">{ipo.logo}</div>
              <div>
                <h3 className="font-semibold text-sm text-gray-900">{ipo.companyName}</h3>
                <div className="flex items-center space-x-4 text-xs text-gray-600 mt-1">
                  <span>Price: {formatPriceRange()}</span>
                  <span>Lot: {ipo.lotSize || 'N/A'}</span>
                </div>
              </div>
            </div>
            <div className="text-right">
              {getStatusBadge(ipo.status)}
              <div className="text-xs text-gray-500 mt-1">
                {formatDate(ipo.openDate)} - {formatDate(ipo.closeDate)}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg bg-white" onClick={onClick}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white text-xl">
              {ipo.logo}
            </div>
            <div>
              <h3 className="font-bold text-lg text-gray-900 group-hover:text-blue-600 transition-colors">
                {ipo.companyName}
              </h3>
              <p className="text-sm text-gray-500">{ipo.sector}</p>
            </div>
          </div>
          {getStatusBadge(ipo.status)}
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex items-center space-x-2 text-sm">
              <Calendar className="w-4 h-4 text-gray-400" />
              <span className="text-gray-600">Open</span>
            </div>
            <p className="font-semibold text-gray-900">{formatDate(ipo.openDate)}</p>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center space-x-2 text-sm">
              <Calendar className="w-4 h-4 text-gray-400" />
              <span className="text-gray-600">Close</span>
            </div>
            <p className="font-semibold text-gray-900">{formatDate(ipo.closeDate)}</p>
          </div>
        </div>

        <div className="border-t pt-4">
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <p className="text-sm text-gray-600">Price Band</p>
              <p className="font-bold text-lg text-gray-900">{formatPriceRange()}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Lot Size</p>
              <p className="font-bold text-lg text-gray-900">{ipo.lotSize || 'N/A'}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <p className="text-sm text-gray-600">Issue Size</p>
              <p className="font-semibold text-gray-900">{ipo.issueSize}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Issue Type</p>
              <p className="font-semibold text-gray-900">{ipo.issueType}</p>
            </div>
          </div>

          {ipo.status === 'listed' && ipo.currentReturn && (
            <div className="bg-green-50 p-3 rounded-lg mb-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-green-700">Current Return</span>
                <div className="flex items-center space-x-1">
                  <TrendingUp className="w-4 h-4 text-green-600" />
                  <span className="font-bold text-green-700">{ipo.currentReturn}%</span>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="flex space-x-2">
          <Button 
            className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white"
            disabled={ipo.status === 'closed' || ipo.status === 'listed'}
          >
            {ipo.status === 'upcoming' ? 'Apply Now' : 
             ipo.status === 'ongoing' ? 'Apply Now' : 
             ipo.status === 'closed' ? 'Closed' : 'Listed'}
          </Button>
          <Button variant="outline" size="sm">
            <ExternalLink className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default IPOCard;
