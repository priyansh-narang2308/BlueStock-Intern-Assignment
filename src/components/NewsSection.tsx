
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, ArrowRight } from 'lucide-react';

interface NewsItem {
  id: string;
  title: string;
  date: string;
  summary: string;
}

interface NewsSectionProps {
  title: string;
  news: NewsItem[];
  viewAllLink?: string;
}

const NewsSection: React.FC<NewsSectionProps> = ({ title, news, viewAllLink }) => {
  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle className="text-xl font-bold text-gray-900">{title}</CardTitle>
        {viewAllLink && (
          <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700">
            View All
            <ArrowRight className="w-4 h-4 ml-1" />
          </Button>
        )}
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {news.map((item) => (
            <div key={item.id} className="border-b border-gray-100 pb-4 last:border-b-0 last:pb-0">
              <h4 className="font-semibold text-gray-900 mb-2 hover:text-blue-600 cursor-pointer transition-colors">
                {item.title}
              </h4>
              <div className="flex items-center text-sm text-gray-500 mb-2">
                <Calendar className="w-4 h-4 mr-1" />
                {item.date}
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">{item.summary}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default NewsSection;
