import React, { useState, useEffect } from 'react';
import { Star, MapPin, Clock, DollarSign, Calendar, Filter, Search, ArrowLeft, ExternalLink, User } from 'lucide-react';

interface Mentor {
  id: string;
  name: string;
  title: string;
  company: string;
  expertise: string[];
  bio: string;
  image_url?: string;
  linkedin_url?: string;
  email?: string;
  years_experience: number;
  rating: number;
  total_sessions: number;
  hourly_rate?: number;
  availability_status: string;
}

interface MentorsProps {
  onBack: () => void;
  user: { name: string; email: string } | null;
}

const Mentors: React.FC<MentorsProps> = ({ onBack, user }) => {
  const [mentors, setMentors] = useState<Mentor[]>([]);
  const [filteredMentors, setFilteredMentors] = useState<Mentor[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedExpertise, setSelectedExpertise] = useState<string>('all');
  const [selectedMentor, setSelectedMentor] = useState<Mentor | null>(null);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [bookingForm, setBookingForm] = useState({
    sessionDate: '',
    duration: 60,
    notes: ''
  });

  useEffect(() => {
    fetchMentors();
  }, []);

  useEffect(() => {
    filterMentors();
  }, [mentors, searchTerm, selectedExpertise]);

  const fetchMentors = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/mentors');
      const data = await response.json();
      setMentors(data.mentors || []);
    } catch (error) {
      console.error('Error fetching mentors:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterMentors = () => {
    let filtered = mentors;

    if (searchTerm) {
      filtered = filtered.filter(mentor =>
        mentor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        mentor.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        mentor.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        mentor.expertise.some(exp => exp.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    if (selectedExpertise !== 'all') {
      filtered = filtered.filter(mentor =>
        mentor.expertise.includes(selectedExpertise)
      );
    }

    setFilteredMentors(filtered);
  };

  const handleBookSession = async (mentor: Mentor) => {
    if (!user) {
      alert('Please sign in to book a session');
      return;
    }
    setSelectedMentor(mentor);
    setShowBookingModal(true);
  };

  const submitBooking = async () => {
    if (!selectedMentor || !user) return;

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/mentors/${selectedMentor.id}/book-session`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(bookingForm)
      });

      if (response.ok) {
        alert('Session booked successfully!');
        setShowBookingModal(false);
        setBookingForm({ sessionDate: '', duration: 60, notes: '' });
      } else {
        const error = await response.json();
        alert(error.error || 'Failed to book session');
      }
    } catch (error) {
      console.error('Booking error:', error);
      alert('Failed to book session');
    }
  };

  const allExpertise = Array.from(new Set(mentors.flatMap(mentor => mentor.expertise)));

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600">Loading mentors...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-slate-50 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <button
              onClick={onBack}
              className="flex items-center space-x-2 text-slate-600 hover:text-slate-800 mb-4 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Home</span>
            </button>
            
            <div className="text-center">
              <h1 className="text-4xl font-bold text-slate-800 mb-4">
                Connect with Industry Mentors
              </h1>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                Get personalized guidance from experienced professionals who can help accelerate your career growth.
              </p>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
            <div className="flex flex-col lg:flex-row gap-6">
              <div className="flex-1 relative">
                <Search className="w-5 h-5 text-slate-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search mentors by name, title, or expertise..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div className="flex items-center space-x-4">
                <Filter className="w-5 h-5 text-slate-600" />
                <select
                  value={selectedExpertise}
                  onChange={(e) => setSelectedExpertise(e.target.value)}
                  className="px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                >
                  <option value="all">All Expertise</option>
                  {allExpertise.map(expertise => (
                    <option key={expertise} value={expertise}>{expertise}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Mentors Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredMentors.map((mentor) => (
              <div key={mentor.id} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
                <div className="p-6">
                  <div className="flex items-start space-x-4 mb-4">
                    <div className="w-16 h-16 rounded-full overflow-hidden bg-gradient-to-r from-blue-600 to-teal-600 flex items-center justify-center">
                      {mentor.image_url ? (
                        <img src={mentor.image_url} alt={mentor.name} className="w-full h-full object-cover" />
                      ) : (
                        <User className="w-8 h-8 text-white" />
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-slate-800 mb-1">{mentor.name}</h3>
                      <p className="text-slate-600 text-sm mb-1">{mentor.title}</p>
                      <p className="text-slate-500 text-sm">{mentor.company}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4 mb-4 text-sm text-slate-600">
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span>{mentor.rating}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{mentor.total_sessions} sessions</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <MapPin className="w-4 h-4" />
                      <span>{mentor.years_experience}+ years</span>
                    </div>
                  </div>

                  <p className="text-slate-600 text-sm mb-4 line-clamp-3">{mentor.bio}</p>

                  <div className="mb-4">
                    <h4 className="font-semibold text-slate-700 mb-2 text-sm">Expertise</h4>
                    <div className="flex flex-wrap gap-2">
                      {mentor.expertise.slice(0, 3).map((skill, index) => (
                        <span key={index} className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                          {skill}
                        </span>
                      ))}
                      {mentor.expertise.length > 3 && (
                        <span className="text-slate-500 text-xs">+{mentor.expertise.length - 3} more</span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1 text-green-600">
                      <DollarSign className="w-4 h-4" />
                      <span className="font-semibold">${mentor.hourly_rate}/hr</span>
                    </div>
                    <div className="flex space-x-2">
                      {mentor.linkedin_url && (
                        <a
                          href={mentor.linkedin_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 text-slate-600 hover:text-blue-600 transition-colors"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                      <button
                        onClick={() => handleBookSession(mentor)}
                        className="bg-gradient-to-r from-blue-600 to-teal-600 text-white px-4 py-2 rounded-lg font-medium hover:from-blue-700 hover:to-teal-700 transition-all duration-200 flex items-center space-x-2"
                      >
                        <Calendar className="w-4 h-4" />
                        <span>Book Session</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* No Results */}
          {filteredMentors.length === 0 && (
            <div className="text-center py-12">
              <div className="text-slate-400 mb-4">
                <Search className="w-12 h-12 mx-auto" />
              </div>
              <h3 className="text-xl font-semibold text-slate-600 mb-2">No mentors found</h3>
              <p className="text-slate-500">Try adjusting your search criteria or filters</p>
            </div>
          )}
        </div>
      </div>

      {/* Booking Modal */}
      {showBookingModal && selectedMentor && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6">
            <h3 className="text-2xl font-bold text-slate-800 mb-4">
              Book Session with {selectedMentor.name}
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Session Date & Time
                </label>
                <input
                  type="datetime-local"
                  value={bookingForm.sessionDate}
                  onChange={(e) => setBookingForm(prev => ({ ...prev, sessionDate: e.target.value }))}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Duration (minutes)
                </label>
                <select
                  value={bookingForm.duration}
                  onChange={(e) => setBookingForm(prev => ({ ...prev, duration: parseInt(e.target.value) }))}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value={30}>30 minutes</option>
                  <option value={60}>60 minutes</option>
                  <option value={90}>90 minutes</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Notes (Optional)
                </label>
                <textarea
                  value={bookingForm.notes}
                  onChange={(e) => setBookingForm(prev => ({ ...prev, notes: e.target.value }))}
                  placeholder="What would you like to discuss?"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 h-20 resize-none"
                />
              </div>
              
              <div className="bg-slate-50 rounded-lg p-3">
                <div className="flex justify-between text-sm">
                  <span>Duration:</span>
                  <span>{bookingForm.duration} minutes</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Rate:</span>
                  <span>${selectedMentor.hourly_rate}/hour</span>
                </div>
                <div className="flex justify-between font-semibold text-slate-800 border-t border-slate-200 pt-2 mt-2">
                  <span>Total:</span>
                  <span>${((selectedMentor.hourly_rate || 0) * bookingForm.duration / 60).toFixed(2)}</span>
                </div>
              </div>
            </div>
            
            <div className="flex space-x-3 mt-6">
              <button
                onClick={() => setShowBookingModal(false)}
                className="flex-1 px-4 py-2 border border-slate-300 rounded-lg font-medium text-slate-700 hover:bg-slate-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={submitBooking}
                disabled={!bookingForm.sessionDate}
                className="flex-1 bg-gradient-to-r from-blue-600 to-teal-600 text-white px-4 py-2 rounded-lg font-medium hover:from-blue-700 hover:to-teal-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Book Session
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Mentors;