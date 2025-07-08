import React, { useState } from 'react';
import { CheckCircle, Circle, Calendar, BookOpen, Award, Briefcase, ArrowLeft, ExternalLink } from 'lucide-react';
import { CareerMatch, RoadmapStep } from '../types';
import { generateCareerRoadmap } from '../utils/roadmapGenerator';

interface CareerRoadmapProps {
  career: CareerMatch | null;
  onBack: () => void;
}

const CareerRoadmap: React.FC<CareerRoadmapProps> = ({ career, onBack }) => {
  const [completedSteps, setCompletedSteps] = useState<Set<string>>(new Set());
  const [activeTimeframe, setActiveTimeframe] = useState<'all' | 'immediate' | 'short' | 'long'>('all');

  if (!career) return null;

  const roadmapSteps = generateCareerRoadmap(career);

  const toggleStepCompletion = (stepId: string) => {
    setCompletedSteps(prev => {
      const newSet = new Set(prev);
      if (newSet.has(stepId)) {
        newSet.delete(stepId);
      } else {
        newSet.add(stepId);
      }
      return newSet;
    });
  };

  const getStepIcon = (type: string) => {
    switch (type) {
      case 'education': return BookOpen;
      case 'skill': return Award;
      case 'experience': return Briefcase;
      case 'certification': return Award;
      default: return Circle;
    }
  };

  const getStepColor = (type: string) => {
    switch (type) {
      case 'education': return 'bg-blue-100 text-blue-600';
      case 'skill': return 'bg-green-100 text-green-600';
      case 'experience': return 'bg-purple-100 text-purple-600';
      case 'certification': return 'bg-orange-100 text-orange-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  const filteredSteps = roadmapSteps.filter(step => {
    if (activeTimeframe === 'all') return true;
    if (activeTimeframe === 'immediate' && step.timeframe.includes('0-6 months')) return true;
    if (activeTimeframe === 'short' && step.timeframe.includes('6 months - 2 years')) return true;
    if (activeTimeframe === 'long' && step.timeframe.includes('2+ years')) return true;
    return false;
  });

  const completionPercentage = (completedSteps.size / roadmapSteps.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-slate-50 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <button
              onClick={onBack}
              className="flex items-center space-x-2 text-slate-600 hover:text-slate-800 mb-4"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Results</span>
            </button>
            
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h1 className="text-3xl font-bold text-slate-800 mb-2">{career.title}</h1>
                  <p className="text-lg text-slate-600 mb-4">{career.description}</p>
                  <div className="flex items-center space-x-6">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-slate-600">Match Score:</span>
                      <span className="font-semibold text-blue-600">{career.matchScore}%</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-slate-600">Salary Range:</span>
                      <span className="font-semibold text-green-600">{career.salaryRange}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-slate-600">Growth:</span>
                      <span className="font-semibold text-purple-600">{career.growth}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-slate-800 mb-1">
                    {Math.round(completionPercentage)}%
                  </div>
                  <div className="text-sm text-slate-600">Complete</div>
                  <div className="w-24 h-2 bg-slate-200 rounded-full mt-2">
                    <div
                      className="h-2 bg-gradient-to-r from-blue-600 to-teal-600 rounded-full transition-all duration-300"
                      style={{ width: `${completionPercentage}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Progress Overview */}
              <div className="grid grid-cols-4 gap-4">
                {['education', 'skill', 'experience', 'certification'].map(type => {
                  const count = roadmapSteps.filter(step => step.type === type).length;
                  const completed = roadmapSteps.filter(step => step.type === type && completedSteps.has(step.id)).length;
                  
                  return (
                    <div key={type} className="text-center">
                      <div className={`w-12 h-12 rounded-lg ${getStepColor(type)} flex items-center justify-center mx-auto mb-2`}>
                        {React.createElement(getStepIcon(type), { className: "w-6 h-6" })}
                      </div>
                      <div className="text-sm font-medium text-slate-700 capitalize">{type}</div>
                      <div className="text-xs text-slate-500">{completed}/{count} completed</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
            <div className="flex items-center space-x-4">
              <Calendar className="w-5 h-5 text-slate-600" />
              <span className="font-medium text-slate-700">Filter by timeframe:</span>
              <div className="flex space-x-2">
                {[
                  { id: 'all', label: 'All Steps' },
                  { id: 'immediate', label: 'Immediate (0-6 months)' },
                  { id: 'short', label: 'Short-term (6 months - 2 years)' },
                  { id: 'long', label: 'Long-term (2+ years)' }
                ].map(filter => (
                  <button
                    key={filter.id}
                    onClick={() => setActiveTimeframe(filter.id as any)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      activeTimeframe === filter.id
                        ? 'bg-blue-600 text-white'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {filter.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Roadmap Steps */}
          <div className="space-y-6">
            {filteredSteps.map((step, index) => {
              const isCompleted = completedSteps.has(step.id);
              const StepIcon = getStepIcon(step.type);
              
              return (
                <div key={step.id} className={`bg-white rounded-2xl shadow-lg transition-all duration-300 ${
                  isCompleted ? 'opacity-75' : ''
                }`}>
                  <div className="p-8">
                    <div className="flex items-start space-x-6">
                      <div className="flex-shrink-0">
                        <button
                          onClick={() => toggleStepCompletion(step.id)}
                          className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
                            isCompleted
                              ? 'bg-green-600 border-green-600 text-white'
                              : 'border-slate-300 hover:border-blue-500'
                          }`}
                        >
                          {isCompleted ? (
                            <CheckCircle className="w-5 h-5" />
                          ) : (
                            <Circle className="w-5 h-5" />
                          )}
                        </button>
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-4">
                          <div className={`w-8 h-8 rounded-lg ${getStepColor(step.type)} flex items-center justify-center`}>
                            <StepIcon className="w-4 h-4" />
                          </div>
                          <h3 className={`text-xl font-bold ${isCompleted ? 'line-through text-slate-500' : 'text-slate-800'}`}>
                            {step.title}
                          </h3>
                          <span className="bg-slate-100 text-slate-600 px-3 py-1 rounded-full text-sm font-medium">
                            {step.timeframe}
                          </span>
                        </div>
                        
                        <p className={`text-slate-600 mb-6 ${isCompleted ? 'line-through' : ''}`}>
                          {step.description}
                        </p>
                        
                        {/* Resources */}
                        {step.resources.length > 0 && (
                          <div>
                            <h4 className="font-semibold text-slate-700 mb-3">Recommended Resources</h4>
                            <div className="grid md:grid-cols-2 gap-4">
                              {step.resources.map((resource, i) => (
                                <div key={i} className="bg-slate-50 rounded-lg p-4 hover:bg-slate-100 transition-colors">
                                  <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                      <h5 className="font-medium text-slate-800 mb-1">{resource.title}</h5>
                                      <p className="text-sm text-slate-600 mb-2">{resource.provider}</p>
                                      <div className="flex items-center space-x-4 text-xs text-slate-500">
                                        <span className="capitalize">{resource.type}</span>
                                        {resource.duration && <span>{resource.duration}</span>}
                                        {resource.price && <span>{resource.price}</span>}
                                      </div>
                                    </div>
                                    <a
                                      href={resource.url}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="text-blue-600 hover:text-blue-800 transition-colors"
                                    >
                                      <ExternalLink className="w-4 h-4" />
                                    </a>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Career Insights */}
          <div className="mt-12 bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-slate-800 mb-6">Career Insights</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-semibold text-slate-700 mb-4">Key Advantages</h3>
                <ul className="space-y-2">
                  {career.pros.map((pro, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-slate-600">{pro}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-slate-700 mb-4">Considerations</h3>
                <ul className="space-y-2">
                  {career.cons.map((con, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <Circle className="w-5 h-5 text-orange-600 mt-0.5 flex-shrink-0" />
                      <span className="text-slate-600">{con}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CareerRoadmap;