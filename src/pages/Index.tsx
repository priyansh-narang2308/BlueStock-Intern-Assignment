import React, { useState, useMemo } from 'react';
import {
  upcomingIPOs,
  ongoingIPOs,
  listedIPOs,
  ipoNews,
  ipoAnalysis,
  faqData,
} from '@/data/ipoData';
import IPOCard from '@/components/IPOCard';
import FeaturedIPOCarousel from '@/components/FeaturedIPOCarousel';
import SearchAndFilter from '@/components/SearchAndFilter';
import NewsSection from '@/components/NewsSection';
import FAQAccordion from '@/components/FAQAccordion';
import ApplyIPOModal from '@/components/ApplyIPOModal';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';

const Index: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sectorFilter, setSectorFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showAllUpcoming, setShowAllUpcoming] = useState(false);
  const [showAllOngoing, setShowAllOngoing] = useState(false);
  const [showAllListed, setShowAllListed] = useState(false);

  const featuredIPOs = [...upcomingIPOs, ...ongoingIPOs].filter((ipo) => ipo.featured);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const allIPOs = [...upcomingIPOs, ...ongoingIPOs, ...listedIPOs];

  const filteredIPOs = useMemo(() => {
    return allIPOs.filter((ipo) => {
      const matchesSearch = ipo.companyName.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesSector =
        sectorFilter === '' || sectorFilter === 'all' || ipo.sector === sectorFilter;
      const matchesStatus =
        statusFilter === '' || statusFilter === 'all' || ipo.status === statusFilter;

      return matchesSearch && matchesSector && matchesStatus;
    });
  }, [searchQuery, sectorFilter, statusFilter, allIPOs]);

  const upcomingIPOsToShow = showAllUpcoming
    ? filteredIPOs.filter((ipo) => ipo.status === 'upcoming')
    : filteredIPOs.filter((ipo) => ipo.status === 'upcoming').slice(0, 3);

  const ongoingIPOsToShow = showAllOngoing
    ? filteredIPOs.filter((ipo) => ipo.status === 'ongoing')
    : filteredIPOs.filter((ipo) => ipo.status === 'ongoing').slice(0, 3);

  const listedIPOsToShow = showAllListed
    ? filteredIPOs.filter((ipo) => ipo.status === 'listed')
    : filteredIPOs.filter((ipo) => ipo.status === 'listed').slice(0, 3);

  const handleSearch = (query: string) => setSearchQuery(query);
  const handleSectorFilter = (sector: string) => setSectorFilter(sector);
  const handleStatusFilter = (status: string) => setStatusFilter(status);
  const handleClearFilters = () => {
    setSearchQuery('');
    setSectorFilter('');
    setStatusFilter('');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <img
                src="/logo.png"
                alt="Bluestock Logo"
                className="h-8 rounded object-cover hidden md:block"
              />
              <img
                src="/moblogo.png"
                alt="Bluestock Mobile Logo"
                className="h-8 rounded object-cover block md:hidden"
              />
            </div>

            <nav className="hidden md:flex items-center space-x-8">
              <a href="#" className="text-gray-600 hover:text-blue-600 font-medium">IPO</a>
              <a href="#" className="text-gray-600 hover:text-blue-600 font-medium">COMMUNITY</a>
              <a href="#" className="text-gray-600 hover:text-blue-600 font-medium">PRODUCTS</a>
              <a href="#" className="text-gray-600 hover:text-blue-600 font-medium">BROKERS</a>
            </nav>

            <div className="flex items-center space-x-4">
              <Button variant="ghost" className="hidden md:block">Sign In</Button>
 <Link to={"/admin"}>
              <Button variant="default" className="w-full text-left">GO TO ADMIN</Button>
              </Link>              <Button
                variant="ghost"
                size="sm"
                className="md:hidden"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </Button>
            </div>
          </div>

          {isMobileMenuOpen && (
            <div className="md:hidden pb-4 space-y-2">
              <a href="#" className="block text-gray-700 hover:text-blue-600 font-medium">IPO</a>
              <a href="#" className="block text-gray-700 hover:text-blue-600 font-medium">COMMUNITY</a>
              <a href="#" className="block text-gray-700 hover:text-blue-600 font-medium">PRODUCTS</a>
              <a href="#" className="block text-gray-700 hover:text-blue-600 font-medium">BROKERS</a>
             
              <Link to={"/admin"}>
              <Button variant="ghost" className="w-full text-left">GO TO ADMIN</Button>
              </Link>
            </div>
          )}
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">IPO</h1>
          <p className="text-xl text-gray-600 mb-2">
            Following is the list of companies for IPO as of today.
          </p>
        </div>

        {featuredIPOs.length > 0 && <FeaturedIPOCarousel ipos={featuredIPOs} />}

        <SearchAndFilter
          onSearch={handleSearch}
          onSectorFilter={handleSectorFilter}
          onStatusFilter={handleStatusFilter}
          onClearFilters={handleClearFilters}
        />

        <section className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Upcoming</h2>
              <p className="text-gray-600">
                Companies that have filed for an IPO with SEBI. Few details might not be disclosed by the companies here on.
              </p>
            </div>
            {filteredIPOs.filter((ipo) => ipo.status === 'upcoming').length > 3 && (
              <Button 
                variant="outline" 
                className="bg-blue-600 text-white hover:bg-blue-700"
                onClick={() => setShowAllUpcoming(!showAllUpcoming)}
              >
                {showAllUpcoming ? 'Show Less' : 'View All'}
              </Button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcomingIPOsToShow.map((ipo) => (
              <IPOCard key={ipo.id} ipo={ipo} onClick={() => setIsApplyModalOpen(true)} />
            ))}
          </div>
        </section>

        <ApplyIPOModal isOpen={isApplyModalOpen} onClose={() => setIsApplyModalOpen(false)} />

        {ongoingIPOs.length > 0 && (
          <section className="mb-12">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Ongoing</h2>
                <p className="text-gray-600">
                  Companies where live IPO investment process is started and can be subscribed soon in the stock market for regular trading.
                </p>
              </div>
              {filteredIPOs.filter((ipo) => ipo.status === 'ongoing').length > 3 && (
                <Button 
                  variant="outline" 
                  className="bg-blue-600 text-white hover:bg-blue-700"
                  onClick={() => setShowAllOngoing(!showAllOngoing)}
                >
                  {showAllOngoing ? 'Show Less' : 'View All'}
                </Button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {ongoingIPOsToShow.map((ipo) => (
                <IPOCard key={ipo.id} ipo={ipo} onClick={() => setIsApplyModalOpen(true)} />
              ))}
            </div>
          </section>
        )}

        <section className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">New Listed</h2>
              <p className="text-gray-600">
                Companies that have been listed recently through an IPO. Find their listing gains and returns here.
              </p>
            </div>
            {filteredIPOs.filter((ipo) => ipo.status === 'listed').length > 3 && (
              <Button 
                variant="outline" 
                className="bg-blue-600 text-white hover:bg-blue-700"
                onClick={() => setShowAllListed(!showAllListed)}
              >
                {showAllListed ? 'Show Less' : 'View All'}
              </Button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {listedIPOsToShow.map((ipo) => (
              <IPOCard key={ipo.id} ipo={ipo} variant="default" />
            ))}
          </div>
        </section>

        <section className="mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <NewsSection title="IPO News" news={ipoNews} viewAllLink="/news" />
            <NewsSection title="IPO Analysis" news={ipoAnalysis} viewAllLink="/analysis" />
          </div>
        </section>

        <section className="mb-12">
          <FAQAccordion faqs={faqData} />
        </section>
      </main>

      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded flex items-center justify-center">
                  <span className="text-white font-bold text-sm">B</span>
                </div>
                <span className="text-xl font-bold">BLUESTOCK</span>
              </div>
              <p className="text-gray-400">
                Your trusted partner for IPO investments and market insights.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Home</a></li>
                <li><a href="#" className="hover:text-white">About Us</a></li>
                <li><a href="#" className="hover:text-white">Services</a></li>
                <li><a href="#" className="hover:text-white">Contact</a></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Resources</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Blog</a></li>
                <li><a href="#" className="hover:text-white">FAQ</a></li>
                <li><a href="#" className="hover:text-white">Help Center</a></li>
                <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Contact</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Email: info@bluestock.com</li>
                <li>Phone: +91 12345 67890</li>
                <li>Support: 24/7 Available</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 Bluestock. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;