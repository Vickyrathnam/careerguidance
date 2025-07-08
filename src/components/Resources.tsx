import React, { useState } from 'react';
import { Book, Video, Globe, Award, Search, Filter, ExternalLink, Star, Clock, DollarSign } from 'lucide-react';
import { Resource } from '../types';

interface ResourcesProps {
  onBack: () => void;
}

const Resources: React.FC<ResourcesProps> = ({ onBack }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'course' | 'book' | 'website' | 'certification' | 'tool'>('all');
  const [selectedProvider, setSelectedProvider] = useState<'all' | 'coursera' | 'udemy' | 'linkedin' | 'google' | 'amazon' | 'free'>('all');

  const resources: Resource[] = [
    {
      id: '1',
      title: 'Complete Web Development Bootcamp',
      type: 'course',
      url: 'https://www.udemy.com/course/the-complete-web-development-bootcamp/',
      provider: 'Udemy',
      duration: '65 hours',
      price: '$89.99',
      rating: 4.7
    },
    {
      id: '2',
      title: 'Google Data Analytics Certificate',
      type: 'certification',
      url: 'https://www.coursera.org/professional-certificates/google-data-analytics',
      provider: 'Coursera',
      duration: '3-6 months',
      price: '$39/month',
      rating: 4.6
    },
    {
      id: '3',
      title: 'Clean Code: A Handbook of Agile Software Craftsmanship',
      type: 'book',
      url: 'https://www.amazon.com/Clean-Code-Handbook-Software-Craftsmanship/dp/0132350882',
      provider: 'Amazon',
      duration: '464 pages',
      price: '$34.99',
      rating: 4.4
    },
    {
      id: '4',
      title: 'freeCodeCamp - Web Development',
      type: 'website',
      url: 'https://www.freecodecamp.org/',
      provider: 'freeCodeCamp',
      duration: 'Self-paced',
      price: 'Free',
      rating: 4.8
    },
    {
      id: '5',
      title: 'Visual Studio Code',
      type: 'tool',
      url: 'https://code.visualstudio.com/',
      provider: 'Microsoft',
      duration: 'N/A',
      price: 'Free',
      rating: 4.9
    },
    {
      id: '6',
      title: 'Machine Learning Specialization',
      type: 'course',
      url: 'https://www.coursera.org/specializations/machine-learning',
      provider: 'Coursera',
      duration: '3 months',
      price: '$49/month',
      rating: 4.8
    },
    {
      id: '7',
      title: 'AWS Cloud Practitioner Certification',
      type: 'certification',
      url: 'https://aws.amazon.com/certification/certified-cloud-practitioner/',
      provider: 'Amazon',
      duration: '1-2 months',
      price: '$100',
      rating: 4.5
    },
    {
      id: '8',
      title: 'The Pragmatic Programmer',
      type: 'book',
      url: 'https://www.amazon.com/Pragmatic-Programmer-journey-mastery-Anniversary/dp/0135957052',
      provider: 'Amazon',
      duration: '352 pages',
      price: '$39.99',
      rating: 4.6
    },
    {
      id: '9',
      title: 'LinkedIn Learning - Project Management',
      type: 'course',
      url: 'https://www.linkedin.com/learning/paths/become-a-project-manager',
      provider: 'LinkedIn Learning',
      duration: '16 hours',
      price: '$29.99/month',
      rating: 4.4
    },
    {
      id: '10',
      title: 'Khan Academy - Computer Science',
      type: 'website',
      url: 'https://www.khanacademy.org/computing/computer-science',
      provider: 'Khan Academy',
      duration: 'Self-paced',
      price: 'Free',
      rating: 4.7
    },
    {
      id: '11',
      title: 'Figma Design Tool',
      type: 'tool',
      url: 'https://www.figma.com/',
      provider: 'Figma',
      duration: 'N/A',
      price: 'Free/Paid',
      rating: 4.8
    },
    {
      id: '12',
      title: 'System Design Interview',
      type: 'book',
      url: 'https://www.amazon.com/System-Design-Interview-insiders-Second/dp/B08CMF2CQF',
      provider: 'Amazon',
      duration: '280 pages',
      price: '$32.99',
      rating: 4.5
    }
  ];

  const getResourceIcon = (type: string) => {
    switch (type) {
      case 'course': return Video;
      case 'book': return Book;
      case 'website': return Globe;
      case 'certification': return Award;
      case 'tool': return Award;
      default: return Book;
    }
  };

  const getResourceColor = (type: string) => {
    switch (type) {
      case 'course': return 'bg-blue-100 text-blue-600';
      case 'book': return 'bg-green-100 text-green-600';
      case 'website': return 'bg-purple-100 text-purple-600';
      case 'certification': return 'bg-orange-100 text-orange-600';
      case 'tool': return 'bg-teal-100 text-teal-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.provider.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || resource.type === selectedCategory;
    const matchesProvider = selectedProvider === 'all' || 
                           resource.provider.toLowerCase().includes(selectedProvider.toLowerCase()) ||
                           (selectedProvider === 'free' && resource.price === 'Free');
    
    return matchesSearch && matchesCategory && matchesProvider;
  });

  const categories = [
    { id: 'all', label: 'All Resources', count: resources.length },
    { id: 'course', label: 'Courses', count: resources.filter(r => r.type === 'course').length },
    { id: 'book', label: 'Books', count: resources.filter(r => r.type === 'book').length },
    { id: 'website', label: 'Websites', count: resources.filter(r => r.type === 'website').length },
    { id: 'certification', label: 'Certifications', count: resources.filter(r => r.type === 'certification').length },
    { id: 'tool', label: 'Tools', count: resources.filter(r => r.type === 'tool').length }
  ];

  const providers = [
    { id: 'all', label: 'All Providers' },
    { id: 'coursera', label: 'Coursera' },
    { id: 'udemy', label: 'Udemy' },
    { id: 'linkedin', label: 'LinkedIn Learning' },
    { id: 'google', label: 'Google' },
    { id: 'amazon', label: 'Amazon' },
    { id: 'free', label: 'Free Resources' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-slate-50 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-slate-800 mb-4">
              Learning Resources
            </h1>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Discover curated learning resources to develop your skills and advance your career. 
              From online courses to certifications, find everything you need to succeed.
            </p>
          </div>

          {/* Search and Filters */}
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Search */}
              <div className="flex-1 relative">
                <Search className="w-5 h-5 text-slate-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search resources..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Category Filter */}
              <div className="flex items-center space-x-2">
                <Filter className="w-5 h-5 text-slate-600" />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value as any)}
                  className="px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                >
                  {categories.map(category => (
                    <option key={category.id} value={category.id}>
                      {category.label} ({category.count})
                    </option>
                  ))}
                </select>
              </div>

              {/* Provider Filter */}
              <div className="flex items-center space-x-2">
                <select
                  value={selectedProvider}
                  onChange={(e) => setSelectedProvider(e.target.value as any)}
                  className="px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                >
                  {providers.map(provider => (
                    <option key={provider.id} value={provider.id}>
                      {provider.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Resource Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredResources.map((resource) => {
              const Icon = getResourceIcon(resource.type);
              
              return (
                <div key={resource.id} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className={`w-12 h-12 rounded-xl ${getResourceColor(resource.type)} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <div className="flex items-center space-x-1 text-sm text-slate-600">
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        <span>{resource.rating}</span>
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-bold text-slate-800 mb-2 line-clamp-2">
                      {resource.title}
                    </h3>
                    
                    <p className="text-slate-600 mb-4 text-sm">{resource.provider}</p>
                    
                    <div className="flex items-center justify-between text-sm text-slate-500 mb-6">
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>{resource.duration}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <DollarSign className="w-4 h-4" />
                        <span>{resource.price}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium capitalize ${getResourceColor(resource.type)}`}>
                        {resource.type}
                      </span>
                      <a
                        href={resource.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-gradient-to-r from-blue-600 to-teal-600 text-white px-4 py-2 rounded-lg font-medium hover:from-blue-700 hover:to-teal-700 transition-all duration-200 flex items-center space-x-2"
                      >
                        <span>View</span>
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* No Results */}
          {filteredResources.length === 0 && (
            <div className="text-center py-12">
              <div className="text-slate-400 mb-4">
                <Search className="w-12 h-12 mx-auto" />
              </div>
              <h3 className="text-xl font-semibold text-slate-600 mb-2">No resources found</h3>
              <p className="text-slate-500">Try adjusting your search criteria or filters</p>
            </div>
          )}

          {/* Back Button */}
          <div className="text-center mt-12">
            <button
              onClick={onBack}
              className="text-slate-600 hover:text-slate-800 font-medium transition-colors"
            >
              ← Back to Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Resources;