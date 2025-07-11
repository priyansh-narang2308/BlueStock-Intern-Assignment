
import React, { useState, useEffect } from 'react';
import { IPO } from '@/data/ipoData';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ChevronLeft, ChevronRight, Calendar, TrendingUp } from 'lucide-react';

interface FeaturedIPOCarouselProps {
  ipos: IPO[];
}

const FeaturedIPOCarousel: React.FC<FeaturedIPOCarouselProps> = ({ ipos }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % ipos.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [ipos.length]);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % ipos.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + ipos.length) % ipos.length);
  };

  const formatDate = (dateString: string) => {
    if (dateString === 'Not Issued' || !dateString) return 'Not Issued';
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: '2-digit',
      year: 'numeric'
    });
  };

  const formatPriceRange = (ipo: IPO) => {
    if (ipo.priceRange.min === 0 && ipo.priceRange.max === 0) {
      return 'Not Issued';
    }
    if (ipo.priceRange.min === ipo.priceRange.max) {
      return `₹${ipo.priceRange.min}`;
    }
    return `₹${ipo.priceRange.min} - ${ipo.priceRange.max}`;
  };

  if (ipos.length === 0) return null;

  const currentIPO = ipos[currentIndex];

  return (
    <div className="relative w-full mb-8">
      <Card className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 text-white border-0 shadow-2xl">
        <CardContent className="p-8 md:p-12">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex-1 mb-6 md:mb-0">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center text-3xl">
                  {currentIPO.logo}
                </div>
                <div>
                  <Badge variant="secondary" className="mb-2">Featured IPO</Badge>
                  <h2 className="text-3xl md:text-4xl font-bold mb-2">{currentIPO.companyName}</h2>
                  <p className="text-blue-100 text-lg">{currentIPO.sector}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-white/10 p-4 rounded-lg backdrop-blur-sm">
                  <p className="text-blue-100 text-sm">Price Band</p>
                  <p className="text-xl font-bold">{formatPriceRange(currentIPO)}</p>
                </div>
                <div className="bg-white/10 p-4 rounded-lg backdrop-blur-sm">
                  <p className="text-blue-100 text-sm">Lot Size</p>
                  <p className="text-xl font-bold">{currentIPO.lotSize || 'N/A'}</p>
                </div>
                <div className="bg-white/10 p-4 rounded-lg backdrop-blur-sm">
                  <p className="text-blue-100 text-sm">Open Date</p>
                  <p className="text-lg font-semibold">{formatDate(currentIPO.openDate)}</p>
                </div>
                <div className="bg-white/10 p-4 rounded-lg backdrop-blur-sm">
                  <p className="text-blue-100 text-sm">Close Date</p>
                  <p className="text-lg font-semibold">{formatDate(currentIPO.closeDate)}</p>
                </div>
              </div>

              <p className="text-blue-100 mb-6 text-lg leading-relaxed">
                {currentIPO.description}
              </p>

              <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
                <Button 
                  size="lg" 
                  className="bg-white text-blue-600 hover:bg-blue-50 font-semibold px-8 py-3"
                  disabled={currentIPO.status === 'closed' || currentIPO.status === 'listed'}
                >
                  {currentIPO.status === 'upcoming' ? 'Apply Now' : 
                   currentIPO.status === 'ongoing' ? 'Apply Now' : 'View Details'}
                </Button>
                <Button 
                  variant="default" 
                  size="lg"
                >
                  View RHP
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full backdrop-blur-sm transition-all"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full backdrop-blur-sm transition-all"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      <div className="flex justify-center mt-4 space-x-2">
        {ipos.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentIndex ? 'bg-blue-600' : 'bg-gray-300'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default FeaturedIPOCarousel;
