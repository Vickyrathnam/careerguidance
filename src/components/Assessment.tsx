import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, CheckCircle } from 'lucide-react';
import { AssessmentData, CareerMatch } from '../types';
import { generateCareerMatches } from '../utils/careerMatcher';

interface AssessmentProps {
  onComplete: (data: AssessmentData, matches: CareerMatch[]) => void;
}

const Assessment: React.FC<AssessmentProps> = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [responses, setResponses] = useState<AssessmentData>({
    interests: [],
    skills: [],
    values: [],
    workStyle: [],
    education: '',
    experience: '',
    personality: []
  });

  const steps = [
    {
      id: 'interests',
      title: 'What interests you most?',
      subtitle: 'Select all areas that excite you',
      type: 'multiple',
      options: [
        'Technology & Innovation', 'Healthcare & Medicine', 'Education & Training',
        'Arts & Creative', 'Business & Finance', 'Science & Research',
        'Social Impact & Community', 'Engineering & Manufacturing', 'Media & Communications',
        'Sports & Recreation', 'Environment & Sustainability', 'Law & Justice'
      ]
    },
    {
      id: 'skills',
      title: 'What are your strongest skills?',
      subtitle: 'Choose your top abilities',
      type: 'multiple',
      options: [
        'Problem Solving', 'Leadership', 'Communication', 'Creativity',
        'Analytical Thinking', 'Teamwork', 'Technical Skills', 'Organization',
        'Adaptability', 'Attention to Detail', 'Strategic Planning', 'Empathy'
      ]
    },
    {
      id: 'values',
      title: 'What matters most to you in a career?',
      subtitle: 'Select your core values',
      type: 'multiple',
      options: [
        'Work-Life Balance', 'High Salary', 'Job Security', 'Growth Opportunities',
        'Making a Difference', 'Independence', 'Recognition', 'Flexibility',
        'Learning & Development', 'Collaboration', 'Innovation', 'Stability'
      ]
    },
    {
      id: 'workStyle',
      title: 'What work environment suits you?',
      subtitle: 'Choose your preferred settings',
      type: 'multiple',
      options: [
        'Remote Work', 'Office Environment', 'Hybrid Model', 'Fieldwork',
        'Team Collaboration', 'Independent Work', 'Client Interaction', 'Research Setting',
        'Creative Studio', 'Fast-Paced Environment', 'Structured Routine', 'Flexible Schedule'
      ]
    },
    {
      id: 'education',
      title: 'What is your education level?',
      subtitle: 'Select your current or planned education',
      type: 'single',
      options: [
        'High School', 'Associate Degree', 'Bachelor\'s Degree', 'Master\'s Degree',
        'Doctoral Degree', 'Professional Certification', 'Trade School', 'Self-Taught'
      ]
    },
    {
      id: 'experience',
      title: 'What is your experience level?',
      subtitle: 'Choose your professional background',
      type: 'single',
      options: [
        'No Experience', 'Entry Level (0-2 years)', 'Mid-Level (3-5 years)',
        'Senior Level (6-10 years)', 'Expert Level (10+ years)', 'Student/Recent Graduate'
      ]
    },
    {
      id: 'personality',
      title: 'How would you describe yourself?',
      subtitle: 'Select traits that best describe you',
      type: 'multiple',
      options: [
        'Introverted', 'Extroverted', 'Detail-Oriented', 'Big Picture Thinker',
        'Risk-Taker', 'Cautious', 'Spontaneous', 'Planned', 'Competitive',
        'Collaborative', 'Innovative', 'Traditional'
      ]
    }
  ];

  const currentStepData = steps[currentStep];

  const handleOptionSelect = (option: string) => {
    const stepId = currentStepData.id as keyof AssessmentData;
    
    if (currentStepData.type === 'single') {
      setResponses(prev => ({
        ...prev,
        [stepId]: option
      }));
    } else {
      setResponses(prev => {
        const currentValues = prev[stepId] as string[];
        const newValues = currentValues.includes(option)
          ? currentValues.filter(v => v !== option)
          : [...currentValues, option];
        
        return {
          ...prev,
          [stepId]: newValues
        };
      });
    }
  };

  const isOptionSelected = (option: string): boolean => {
    const stepId = currentStepData.id as keyof AssessmentData;
    const value = responses[stepId];
    
    if (currentStepData.type === 'single') {
      return value === option;
    } else {
      return (value as string[]).includes(option);
    }
  };

  const canProceed = (): boolean => {
    const stepId = currentStepData.id as keyof AssessmentData;
    const value = responses[stepId];
    
    if (currentStepData.type === 'single') {
      return !!value;
    } else {
      return (value as string[]).length > 0;
    }
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Complete assessment
      const matches = generateCareerMatches(responses);
      onComplete(responses, matches);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const progress = ((currentStep + 1) / steps.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-slate-50 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-slate-600">
                Question {currentStep + 1} of {steps.length}
              </span>
              <span className="text-sm font-medium text-slate-600">
                {Math.round(progress)}% Complete
              </span>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-blue-600 to-teal-600 h-2 rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Question Card */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-slate-800 mb-2">
                {currentStepData.title}
              </h2>
              <p className="text-lg text-slate-600">{currentStepData.subtitle}</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {currentStepData.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleOptionSelect(option)}
                  className={`p-4 rounded-xl border-2 transition-all duration-200 text-left hover:shadow-md ${
                    isOptionSelected(option)
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-slate-200 hover:border-slate-300 text-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{option}</span>
                    {isOptionSelected(option) && (
                      <CheckCircle className="w-5 h-5 text-blue-500" />
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center">
            <button
              onClick={handlePrevious}
              disabled={currentStep === 0}
              className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
                currentStep === 0
                  ? 'text-slate-400 cursor-not-allowed'
                  : 'text-slate-600 hover:text-slate-800 hover:bg-slate-100'
              }`}
            >
              <ChevronLeft className="w-5 h-5" />
              <span>Previous</span>
            </button>

            <div className="flex space-x-2">
              {steps.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full transition-all duration-200 ${
                    index <= currentStep ? 'bg-blue-600' : 'bg-slate-300'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={handleNext}
              disabled={!canProceed()}
              className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
                canProceed()
                  ? 'bg-gradient-to-r from-blue-600 to-teal-600 text-white hover:from-blue-700 hover:to-teal-700 shadow-lg hover:shadow-xl'
                  : 'bg-slate-300 text-slate-500 cursor-not-allowed'
              }`}
            >
              <span>{currentStep === steps.length - 1 ? 'Complete' : 'Next'}</span>
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Assessment;