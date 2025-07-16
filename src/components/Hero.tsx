import React from 'react';
import { ArrowRight, Target, TrendingUp, BookOpen, Users, User } from 'lucide-react';

interface HeroProps {
  onStartAssessment: () => void;
  onLogin: () => void;
  onSignup: () => void;
  user: { name: string; email: string } | null;
}

const Hero: React.FC<HeroProps> = ({ onStartAssessment, onLogin, onSignup, user }) => {
  const features = [
    {
      icon: Target,
      title: 'Personalized Assessment',
      description: 'Comprehensive evaluation of your interests, skills, and values'
    },
    {
      icon: TrendingUp,
      title: 'Career Matching',
      description: 'AI-powered recommendations based on your unique profile'
    },
    {
      icon: Users,
      title: 'Expert Mentors',
      description: 'Connect with industry professionals for personalized guidance'
    },
    {
      icon: BookOpen,
      title: 'Learning Roadmaps',
      description: 'Step-by-step guidance with resources and timelines'
    }
  ];

  const stats = [
    { value: '10K+', label: 'Students Guided' },
    { value: '500+', label: 'Career Paths' },
    { value: '95%', label: 'Success Rate' },
    { value: '50+', label: 'Industries' }
  ];

  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-blue-800 to-teal-800"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.05%22%3E%3Cpath%20d%3D%22M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E')] opacity-30"></div>
        
        <div className="relative container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              {user ? `Welcome back, ${user.name.split(' ')[0]}!` : 'Discover Your Perfect'}
              <span className="block bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                {user ? 'Ready to continue your journey?' : 'Career Path'}
              </span>
            </h1>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto leading-relaxed">
              {user 
                ? 'Continue exploring career opportunities and building your professional roadmap with personalized insights.'
                : 'Take our comprehensive career assessment and unlock personalized recommendations tailored to your unique skills, interests, and aspirations.'
              }
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={onStartAssessment}
                className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-yellow-500 hover:to-orange-600 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center justify-center space-x-2"
              >
                <span>Start Career Assessment</span>
                <ArrowRight className="w-5 h-5" />
              </button>
              {!user && (
                <div className="flex flex-col sm:flex-row gap-3">
                  <button 
                    onClick={onLogin}
                    className="bg-white/10 backdrop-blur-sm text-white px-6 py-4 rounded-xl font-semibold text-lg hover:bg-white/20 transition-all duration-200 border border-white/20 flex items-center justify-center space-x-2"
                  >
                    <User className="w-5 h-5" />
                    <span>Sign In</span>
                  </button>
                  <button 
                    onClick={onSignup}
                    className="bg-white text-blue-900 px-6 py-4 rounded-xl font-semibold text-lg hover:bg-blue-50 transition-all duration-200 shadow-lg hover:shadow-xl"
                  >
                    Sign Up Free
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-slate-800 mb-2">{stat.value}</div>
                <div className="text-slate-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-b from-white to-slate-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-6">
              How CareerCompass Works
            </h2>
            <p className="text-lg text-slate-600 leading-relaxed">
              Our intelligent platform combines advanced assessment techniques with comprehensive 
              career data to provide you with actionable insights and personalized guidance.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="group">
                  <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2 border border-slate-100">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-teal-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-slate-800 mb-3">{feature.title}</h3>
                    <p className="text-slate-600 leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-slate-900 to-slate-800">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Shape Your Future?
            </h2>
            <p className="text-xl text-slate-300 mb-8 leading-relaxed">
              Join thousands of students who have already discovered their ideal career path. 
              Your journey to professional success starts here.
            </p>
            <button
              onClick={onStartAssessment}
              className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-yellow-500 hover:to-orange-600 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center justify-center space-x-2 mx-auto"
            >
              <span>Begin Your Assessment</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Hero;