import React, { useState } from 'react';
import { TrendingUp, DollarSign, BookOpen, Users, Star, ArrowRight, Filter } from 'lucide-react';
import { AssessmentData, CareerMatch } from '../types';

interface ResultsProps {
  assessmentData: AssessmentData | null;
  careerMatches: CareerMatch[];
  onCareerSelect: (career: CareerMatch) => void;
  onBackToHome: () => void;
}

const Results: React.FC<ResultsProps> = ({ assessmentData, careerMatches, onCareerSelect, onBackToHome }) => {
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'high' | 'medium' | 'entry'>('all');
  const [sortBy, setSortBy] = useState<'match' | 'salary' | 'growth'>('match');

  const filteredCareers = careerMatches.filter(career => {
    if (selectedFilter === 'all') return true;
    if (selectedFilter === 'high' && career.matchScore >= 85) return true;
    if (selectedFilter === 'medium' && career.matchScore >= 70 && career.matchScore < 85) return true;
    if (selectedFilter === 'entry' && career.matchScore < 70) return true;
    return false;
  });

  const sortedCareers = [...filteredCareers].sort((a, b) => {
    if (sortBy === 'match') return b.matchScore - a.matchScore;
    if (sortBy === 'salary') return parseInt(b.salaryRange.split('-')[1]) - parseInt(a.salaryRange.split('-')[1]);
    if (sortBy === 'growth') return b.growth.localeCompare(a.growth);
    return 0;
  });

  const getMatchColor = (score: number) => {
    if (score >= 85) return 'text-green-600 bg-green-100';
    if (score >= 70) return 'text-blue-600 bg-blue-100';
    return 'text-orange-600 bg-orange-100';
  };

  const getMatchLabel = (score: number) => {
    if (score >= 85) return 'Excellent Match';
    if (score >= 70) return 'Good Match';
    return 'Potential Match';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-slate-50 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-slate-800 mb-4">
              Your Career Matches
            </h1>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Based on your assessment, we've found {careerMatches.length} careers that align with your 
              interests, skills, and values. Explore each option to learn more.
            </p>
          </div>

          {/* Assessment Summary */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-slate-800 mb-6">Your Profile Summary</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div>
                <h3 className="font-semibold text-slate-700 mb-3">Top Interests</h3>
                <div className="space-y-2">
                  {assessmentData?.interests.slice(0, 3).map((interest, index) => (
                    <span key={index} className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                      {interest}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-slate-700 mb-3">Key Skills</h3>
                <div className="space-y-2">
                  {assessmentData?.skills.slice(0, 3).map((skill, index) => (
                    <span key={index} className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-slate-700 mb-3">Core Values</h3>
                <div className="space-y-2">
                  {assessmentData?.values.slice(0, 3).map((value, index) => (
                    <span key={index} className="inline-block bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">
                      {value}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-slate-700 mb-3">Background</h3>
                <div className="space-y-2">
                  <div className="text-sm text-slate-600">
                    <strong>Education:</strong> {assessmentData?.education}
                  </div>
                  <div className="text-sm text-slate-600">
                    <strong>Experience:</strong> {assessmentData?.experience}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Filters and Sort */}
          <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="flex items-center space-x-4">
                <Filter className="w-5 h-5 text-slate-600" />
                <span className="font-medium text-slate-700">Filter by match quality:</span>
                <div className="flex space-x-2">
                  {[
                    { id: 'all', label: 'All' },
                    { id: 'high', label: 'High (85%+)' },
                    { id: 'medium', label: 'Medium (70-84%)' },
                    { id: 'entry', label: 'Entry (<70%)' }
                  ].map(filter => (
                    <button
                      key={filter.id}
                      onClick={() => setSelectedFilter(filter.id as any)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                        selectedFilter === filter.id
                          ? 'bg-blue-600 text-white'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {filter.label}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <span className="font-medium text-slate-700">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="match">Match Score</option>
                  <option value="salary">Salary Range</option>
                  <option value="growth">Growth Rate</option>
                </select>
              </div>
            </div>
          </div>

          {/* Career Cards */}
          <div className="grid lg:grid-cols-2 gap-8">
            {sortedCareers.map((career, index) => (
              <div key={career.id} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
                <div className="p-8">
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-slate-800 mb-2">{career.title}</h3>
                      <p className="text-slate-600 mb-4">{career.description}</p>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-sm font-medium ${getMatchColor(career.matchScore)}`}>
                      {career.matchScore}% Match
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="flex items-center space-x-2">
                      <DollarSign className="w-5 h-5 text-green-600" />
                      <div>
                        <div className="text-sm text-slate-600">Salary Range</div>
                        <div className="font-semibold text-slate-800">{career.salaryRange}</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <TrendingUp className="w-5 h-5 text-blue-600" />
                      <div>
                        <div className="text-sm text-slate-600">Growth Rate</div>
                        <div className="font-semibold text-slate-800">{career.growth}</div>
                      </div>
                    </div>
                  </div>

                  <div className="mb-6">
                    <h4 className="font-semibold text-slate-700 mb-3">Required Skills</h4>
                    <div className="flex flex-wrap gap-2">
                      {career.requiredSkills.slice(0, 4).map((skill, i) => (
                        <span key={i} className="bg-slate-100 text-slate-700 px-3 py-1 rounded-full text-sm">
                          {skill}
                        </span>
                      ))}
                      {career.requiredSkills.length > 4 && (
                        <span className="text-slate-500 text-sm">+{career.requiredSkills.length - 4} more</span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Star className="w-5 h-5 text-yellow-500 fill-current" />
                      <span className="text-sm text-slate-600">{getMatchLabel(career.matchScore)}</span>
                    </div>
                    <button
                      onClick={() => onCareerSelect(career)}
                      className="bg-gradient-to-r from-blue-600 to-teal-600 text-white px-6 py-2 rounded-lg font-medium hover:from-blue-700 hover:to-teal-700 transition-all duration-200 flex items-center space-x-2"
                    >
                      <span>Explore Career</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Back to Home */}
          <div className="text-center mt-12">
            <button
              onClick={onBackToHome}
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

export default Results;